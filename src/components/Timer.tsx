import { useEffect, useRef, useState } from 'react'

type TimerProps = {
  onStart: () => void
  onStop: () => void
}

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function Timer({ onStart, onStop }: TimerProps) {
  const [inputMinutes, setInputMinutes] = useState<string>('25')
  const [secondsLeft, setSecondsLeft] = useState<number>(25 * 60)
  const [running, setRunning] = useState<boolean>(false)

  const intervalRef = useRef<number | null>(null)

  // Handle timer ticking
  useEffect(() => {
    if (!running) return

    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [running])

  // Stop timer + music when time reaches 0
  useEffect(() => {
    if (secondsLeft === 0 && intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
      setRunning(false)
      onStop()
    }
  }, [secondsLeft, onStop])

  const handleSet = () => {
    const mins = Math.max(0, Math.floor(Number(inputMinutes) || 0))
    setSecondsLeft(mins * 60)
  }

  const toggle = () => {
    setRunning((r) => {
      const next = !r

      if (next) {
        onStart() // ▶️ start music
      } else {
        onStop()  // ⏸ pause music
      }

      return next
    })
  }

  const reset = () => {
    const mins = Math.max(0, Math.floor(Number(inputMinutes) || 0))
    setSecondsLeft(mins * 60)
    setRunning(false)
    onStop() // 🔇 stop music
  }

  return (
    <main className="timer">
      <header className="timer__header">
        <h1>Timer</h1>
      </header>

      <section className="timer__display" aria-live="polite">
        <div className="time">{formatTime(secondsLeft)}</div>
      </section>

      <section className="timer__controls">
        <div className="control-row">
          <label htmlFor="minutes">Minutes</label>
          <input
            id="minutes"
            type="number"
            min={0}
            value={inputMinutes}
            onChange={(e) => setInputMinutes(e.target.value)}
          />
          <button className="btn" onClick={handleSet}>Set</button>
        </div>

        <div className="control-row">
          <button className="btn btn-primary" onClick={toggle}>
            {running ? 'Pause' : 'Start'}
          </button>
          <button className="btn" onClick={reset}>Reset</button>
        </div>
      </section>

      <footer className="timer__footer">
        <small>Tip: Use Set to apply changes before starting.</small>
      </footer>
    </main>
  )
}

export default Timer
