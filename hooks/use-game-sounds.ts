"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { GameSounds, type SoundEffect } from "@/lib/game-sounds"

export function useGameSounds(initialVolume = 0.18) {
  const soundsRef = useRef<GameSounds | null>(null)

  const [muted, setMutedState] = useState(false)
  const [volume, setVolumeState] = useState(initialVolume)
  const [isUnlocked, setIsUnlocked] = useState(false)

  if (!soundsRef.current) {
    soundsRef.current = new GameSounds()
    soundsRef.current.setVolume(initialVolume)
  }

  const unlock = useCallback(async () => {
    await soundsRef.current?.unlock()
    setIsUnlocked(true)
  }, [])

  const play = useCallback(async (effect: SoundEffect) => {
    await soundsRef.current?.play(effect)
  }, [])

  const toggleMuted = useCallback(() => {
    setMutedState((currentMuted) => {
      const nextMuted = !currentMuted

      soundsRef.current?.setMuted(nextMuted)

      return nextMuted
    })
  }, [])

  const setMuted = useCallback((nextMuted: boolean) => {
    soundsRef.current?.setMuted(nextMuted)
    setMutedState(nextMuted)
  }, [])

  const setVolume = useCallback((nextVolume: number) => {
    const safeVolume = Math.min(Math.max(nextVolume, 0), 1)

    soundsRef.current?.setVolume(safeVolume)
    setVolumeState(safeVolume)
  }, [])

  useEffect(() => {
    return () => {
      void soundsRef.current?.close()
    }
  }, [])

  return {
    muted,
    volume,
    isUnlocked,
    unlock,
    play,
    toggleMuted,
    setMuted,
    setVolume,
  }
}