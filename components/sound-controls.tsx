"use client"

type SoundControlsProps = {
  muted: boolean
  volume: number
  onToggleMuted: () => void
  onVolumeChange: (volume: number) => void
}

export function SoundControls({
  muted,
  volume,
  onToggleMuted,
  onVolumeChange,
}: SoundControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={onToggleMuted}
        aria-label={muted ? "Turn sound on" : "Turn sound off"}
        aria-pressed={!muted}
        className="rounded-md border border-cyan-400/50 bg-slate-950 px-3 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-400/10 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950"
      >
        {muted ? "🔇 Sound off" : "🔊 Sound on"}
      </button>

      <label className="flex items-center gap-2 text-sm text-slate-200">
        <span>Volume</span>

        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          disabled={muted}
          onChange={(event) => onVolumeChange(Number(event.target.value))}
          aria-label="Sound volume"
          className="accent-cyan-400 disabled:cursor-not-allowed disabled:opacity-40"
        />

        <span className="w-10 text-right tabular-nums">
          {Math.round(volume * 100)}%
        </span>
      </label>
    </div>
  )
}