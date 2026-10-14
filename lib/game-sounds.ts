export type SoundEffect =
  | "paddle-hit"
  | "wall-bounce"
  | "score"
  | "win"
  | "lose"

type SoundSettings = {
  muted: boolean
  volume: number
}

type AudioContextConstructor = typeof AudioContext & {
  webkitAudioContext?: typeof AudioContext
}

export class GameSounds {
  private context: AudioContext | null = null
  private masterGain: GainNode | null = null

  private settings: SoundSettings = {
    muted: false,
    volume: 0.18,
  }

  private get AudioContextClass(): typeof AudioContext | null {
    if (typeof window === "undefined") {
      return null
    }

    const audioWindow = window as Window &
      typeof globalThis & {
        webkitAudioContext?: typeof AudioContext
      }

    return audioWindow.AudioContext ?? audioWindow.webkitAudioContext ?? null
  }

  private async getContext(): Promise<AudioContext | null> {
    const AudioContextClass = this.AudioContextClass

    if (!AudioContextClass) {
      return null
    }

    if (!this.context || this.context.state === "closed") {
      this.context = new AudioContextClass()

      this.masterGain = this.context.createGain()
      this.masterGain.gain.setValueAtTime(
        this.settings.muted ? 0 : this.settings.volume,
        this.context.currentTime,
      )
      this.masterGain.connect(this.context.destination)
    }

    if (this.context.state === "suspended") {
      await this.context.resume()
    }

    return this.context
  }

  async unlock(): Promise<void> {
    await this.getContext()
  }

  setMuted(muted: boolean): void {
    this.settings.muted = muted

    if (!this.context || !this.masterGain) {
      return
    }

    const now = this.context.currentTime
    this.masterGain.gain.cancelScheduledValues(now)
    this.masterGain.gain.linearRampToValueAtTime(
      muted ? 0 : this.settings.volume,
      now + 0.02,
    )
  }

  setVolume(volume: number): void {
    const safeVolume = Math.min(Math.max(volume, 0), 1)

    this.settings.volume = safeVolume

    if (!this.context || !this.masterGain || this.settings.muted) {
      return
    }

    const now = this.context.currentTime
    this.masterGain.gain.cancelScheduledValues(now)
    this.masterGain.gain.linearRampToValueAtTime(safeVolume, now + 0.02)
  }

  getMuted(): boolean {
    return this.settings.muted
  }

  getVolume(): number {
    return this.settings.volume
  }

  private async playTone(options: {
    frequency: number
    endFrequency?: number
    duration: number
    type?: OscillatorType
    volume?: number
    attack?: number
    release?: number
  }): Promise<void> {
    if (this.settings.muted) {
      return
    }

    const context = await this.getContext()

    if (!context || !this.masterGain) {
      return
    }

    const {
      frequency,
      endFrequency,
      duration,
      type = "square",
      volume = 0.5,
      attack = 0.008,
      release = 0.04,
    } = options

    const oscillator = context.createOscillator()
    const effectGain = context.createGain()

    const startTime = context.currentTime
    const attackEndTime = startTime + Math.min(attack, duration * 0.25)
    const releaseStartTime = Math.max(
      attackEndTime,
      startTime + duration - release,
    )
    const stopTime = startTime + duration + 0.03

    oscillator.type = type
    oscillator.frequency.setValueAtTime(frequency, startTime)

    if (endFrequency !== undefined) {
      oscillator.frequency.exponentialRampToValueAtTime(
        Math.max(endFrequency, 1),
        startTime + duration,
      )
    }

    effectGain.gain.setValueAtTime(0.0001, startTime)
    effectGain.gain.exponentialRampToValueAtTime(
      Math.max(volume, 0.0001),
      attackEndTime,
    )
    effectGain.gain.setValueAtTime(volume, releaseStartTime)
    effectGain.gain.exponentialRampToValueAtTime(
      0.0001,
      startTime + duration,
    )

    oscillator.connect(effectGain)
    effectGain.connect(this.masterGain)

    oscillator.start(startTime)
    oscillator.stop(stopTime)

    oscillator.addEventListener(
      "ended",
      () => {
        oscillator.disconnect()
        effectGain.disconnect()
      },
      { once: true },
    )
  }

  async paddleHit(): Promise<void> {
    await this.playTone({
      frequency: 480,
      endFrequency: 760,
      duration: 0.055,
      type: "square",
      volume: 0.55,
      attack: 0.004,
      release: 0.03,
    })
  }

  async wallBounce(): Promise<void> {
    await this.playTone({
      frequency: 240,
      endFrequency: 180,
      duration: 0.045,
      type: "triangle",
      volume: 0.38,
      attack: 0.004,
      release: 0.025,
    })
  }

  async score(): Promise<void> {
    await Promise.all([
      this.playTone({
        frequency: 440,
        endFrequency: 520,
        duration: 0.1,
        type: "square",
        volume: 0.42,
      }),
      this.playTone({
        frequency: 660,
        endFrequency: 760,
        duration: 0.16,
        type: "square",
        volume: 0.35,
        attack: 0.05,
        release: 0.08,
      }),
    ])
  }

  async win(): Promise<void> {
    const notes = [
      { frequency: 523.25, delay: 0 },
      { frequency: 659.25, delay: 0.12 },
      { frequency: 783.99, delay: 0.24 },
      { frequency: 1046.5, delay: 0.38 },
    ]

    for (const note of notes) {
      window.setTimeout(() => {
        void this.playTone({
          frequency: note.frequency,
          endFrequency: note.frequency * 1.02,
          duration: 0.16,
          type: "square",
          volume: 0.4,
          attack: 0.01,
          release: 0.1,
        })
      }, note.delay * 1000)
    }
  }

  async lose(): Promise<void> {
    await this.playTone({
      frequency: 340,
      endFrequency: 85,
      duration: 0.52,
      type: "sawtooth",
      volume: 0.32,
      attack: 0.01,
      release: 0.18,
    })
  }

  async play(effect: SoundEffect): Promise<void> {
    switch (effect) {
      case "paddle-hit":
        return this.paddleHit()

      case "wall-bounce":
        return this.wallBounce()

      case "score":
        return this.score()

      case "win":
        return this.win()

      case "lose":
        return this.lose()
    }
  }

  async close(): Promise<void> {
    if (!this.context || this.context.state === "closed") {
      return
    }

    await this.context.close()
    this.context = null
    this.masterGain = null
  }
}