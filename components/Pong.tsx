"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { SoundControls } from "@/components/sound-controls"
import { useGameSounds } from "@/hooks/use-game-sounds"

type GameStatus = "ready" | "playing" | "paused" | "game-over"

type Ball = {
  x: number
  y: number
  radius: number
  velocityX: number
  velocityY: number
  speed: number
}

const CANVAS_WIDTH = 900
const CANVAS_HEIGHT = 500
const PADDLE_WIDTH = 16
const PADDLE_HEIGHT = 100
const WINNING_SCORE = 11

export function PongGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const lastPaddleHitTimeRef = useRef(0)
  const lastWallHitTimeRef = useRef(0)

  const [status, setStatus] = useState<GameStatus>("ready")
  const [leftScore, setLeftScore] = useState(0)
  const [rightScore, setRightScore] = useState(0)

  const {
    muted,
    volume,
    unlock,
    play,
    toggleMuted,
    setVolume,
  } = useGameSounds(0.18)

  const ballRef = useRef<Ball>({
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2,
    radius: 9,
    velocityX: 5,
    velocityY: 3,
    speed: 5,
  })

  const resetBall = useCallback((direction: 1 | -1) => {
    ballRef.current = {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT / 2,
      radius: 9,
      velocityX: 5 * direction,
      velocityY: Math.random() > 0.5 ? 3 : -3,
      speed: 5,
    }
  }, [])

  const stopLoop = useCallback(() => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
  }, [])

  const handlePoint = useCallback(
    (winner: "left" | "right") => {
      stopLoop()
      void play("score")

      if (winner === "left") {
        setLeftScore((score) => {
          const nextScore = score + 1

          if (nextScore >= WINNING_SCORE) {
            setStatus("game-over")
            void play("win")
          } else {
            window.setTimeout(() => {
              resetBall(-1)
              setStatus("playing")
            }, 700)
          }

          return nextScore
        })
      }

      if (winner === "right") {
        setRightScore((score) => {
          const nextScore = score + 1

          if (nextScore >= WINNING_SCORE) {
            setStatus("game-over")
            void play("lose")
          } else {
            window.setTimeout(() => {
              resetBall(1)
              setStatus("playing")
            }, 700)
          }

          return nextScore
        })
      }
    },
    [play, resetBall, stopLoop],
  )

  const updateBall = useCallback(() => {
    const ball = ballRef.current
    const now = performance.now()

    ball.x += ball.velocityX
    ball.y += ball.velocityY

    const hitTopOrBottom =
      ball.y - ball.radius <= 0 ||
      ball.y + ball.radius >= CANVAS_HEIGHT

    if (hitTopOrBottom) {
      ball.velocityY *= -1

      if (now - lastWallHitTimeRef.current > 45) {
        lastWallHitTimeRef.current = now
        void play("wall-bounce")
      }
    }

    const leftPaddle = {
      x: 30,
      y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2,
      width: PADDLE_WIDTH,
      height: PADDLE_HEIGHT,
    }

    const rightPaddle = {
      x: CANVAS_WIDTH - 30 - PADDLE_WIDTH,
      y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2,
      width: PADDLE_WIDTH,
      height: PADDLE_HEIGHT,
    }

    const hitsLeftPaddle =
      ball.velocityX < 0 &&
      ball.x - ball.radius <= leftPaddle.x + leftPaddle.width &&
      ball.x + ball.radius >= leftPaddle.x &&
      ball.y + ball.radius >= leftPaddle.y &&
      ball.y - ball.radius <= leftPaddle.y + leftPaddle.height

    const hitsRightPaddle =
      ball.velocityX > 0 &&
      ball.x + ball.radius >= rightPaddle.x &&
      ball.x - ball.radius <= rightPaddle.x + rightPaddle.width &&
      ball.y + ball.radius >= rightPaddle.y &&
      ball.y - ball.radius <= rightPaddle.y + rightPaddle.height

    if (hitsLeftPaddle || hitsRightPaddle) {
      const paddle = hitsLeftPaddle ? leftPaddle : rightPaddle
      const paddleCenter = paddle.y + paddle.height / 2
      const relativeHit = (ball.y - paddleCenter) / (paddle.height / 2)
      const bounceAngle = relativeHit * (Math.PI / 3)

      ball.speed = Math.min(ball.speed + 0.35, 11)

      const direction = hitsLeftPaddle ? 1 : -1
      ball.velocityX = Math.cos(bounceAngle) * ball.speed * direction
      ball.velocityY = Math.sin(bounceAngle) * ball.speed

      // Move the ball outside the paddle to avoid repeated collision audio.
      ball.x =
        hitsLeftPaddle
          ? paddle.x + paddle.width + ball.radius + 1
          : paddle.x - ball.radius - 1

      if (now - lastPaddleHitTimeRef.current > 55) {
        lastPaddleHitTimeRef.current = now
        void play("paddle-hit")
      }
    }

    if (ball.x + ball.radius < 0) {
      handlePoint("right")
      return
    }

    if (ball.x - ball.radius > CANVAS_WIDTH) {
      handlePoint("left")
    }
  }, [handlePoint, play])

  const drawGame = useCallback(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")

    if (!canvas || !context) {
      return
    }

    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    context.fillStyle = "#020617"
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    context.setLineDash([10, 14])
    context.strokeStyle = "rgba(34, 211, 238, 0.55)"
    context.lineWidth = 2
    context.beginPath()
    context.moveTo(CANVAS_WIDTH / 2, 0)
    context.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT)
    context.stroke()
    context.setLineDash([])

    context.fillStyle = "#22d3ee"
    context.fillRect(
      30,
      CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2,
      PADDLE_WIDTH,
      PADDLE_HEIGHT,
    )

    context.fillStyle = "#f472b6"
    context.fillRect(
      CANVAS_WIDTH - 30 - PADDLE_WIDTH,
      CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2,
      PADDLE_WIDTH,
      PADDLE_HEIGHT,
    )

    const ball = ballRef.current

    context.beginPath()
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
    context.fillStyle = "#f8fafc"
    context.shadowColor = "#a855f7"
    context.shadowBlur = 18
    context.fill()
    context.shadowBlur = 0
  }, [])

  const gameLoop = useCallback(() => {
    updateBall()
    drawGame()

    animationFrameRef.current = requestAnimationFrame(gameLoop)
  }, [drawGame, updateBall])

  const startGame = useCallback(async () => {
    await unlock()

    if (status === "game-over") {
      setLeftScore(0)
      setRightScore(0)
      resetBall(Math.random() > 0.5 ? 1 : -1)
    }

    setStatus("playing")
  }, [resetBall, status, unlock])

  const pauseGame = useCallback(() => {
    stopLoop()
    setStatus("paused")
  }, [stopLoop])

  useEffect(() => {
    if (status !== "playing") {
      stopLoop()
      drawGame()
      return
    }

    animationFrameRef.current = requestAnimationFrame(gameLoop)

    return stopLoop
  }, [drawGame, gameLoop, status, stopLoop])

  useEffect(() => {
    drawGame()
  }, [drawGame])

  useEffect(() => {
    return () => {
      stopLoop()
    }
  }, [stopLoop])

  return (
    <section className="mx-auto max-w-5xl space-y-5 rounded-2xl border border-cyan-400/20 bg-slate-950 p-4 shadow-2xl shadow-cyan-950/30 sm:p-6">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
            Neon Arena
          </p>
          <h1 className="text-3xl font-bold text-white">Ping Pong</h1>
        </div>

        <SoundControls
          muted={muted}
          volume={volume}
          onToggleMuted={toggleMuted}
          onVolumeChange={setVolume}
        />
      </header>

      <div className="flex items-center justify-center gap-8 text-center">
        <div>
          <p className="text-xs uppercase tracking-wider text-cyan-300">
            Player 1
          </p>
          <p className="text-4xl font-black text-cyan-200">{leftScore}</p>
        </div>

        <p className="rounded-full border border-violet-400/40 px-3 py-1 text-xs font-bold uppercase tracking-wider text-violet-200">
          {status}
        </p>

        <div>
          <p className="text-xs uppercase tracking-wider text-pink-300">
            Player 2
          </p>
          <p className="text-4xl font-black text-pink-200">{rightScore}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-950">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          aria-label="Ping Pong game area"
          className="block h-auto w-full"
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {status === "playing" ? (
          <button
            type="button"
            onClick={pauseGame}
            className="rounded-md bg-amber-400 px-4 py-2 font-semibold text-slate-950 transition hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-200"
          >
            Pause
          </button>
        ) : (
          <button
            type="button"
            onClick={() => void startGame()}
            className="rounded-md bg-cyan-400 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-200"
          >
            {status === "paused" ? "Resume" : "Start game"}
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            stopLoop()
            setLeftScore(0)
            setRightScore(0)
            resetBall(Math.random() > 0.5 ? 1 : -1)
            setStatus("ready")
          }}
          className="rounded-md border border-slate-600 px-4 py-2 font-semibold text-slate-100 transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300"
        >
          Restart
        </button>
      </div>

      <p className="text-center text-sm text-slate-400">
        Sound starts after you select <strong>Start game</strong>. This is
        required by browser audio-autoplay policies.
      </p>
    </section>
  )
}