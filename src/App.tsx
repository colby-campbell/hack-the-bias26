import { Route, Routes } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import Landing from './components/Landing'
import Timer from './components/Timer'
import { MUSIC_CATALOG } from './music/catalog'
import type { MusicCategory } from './music/catalog'


function App() {
  const audioRef = useRef<HTMLAudioElement>(null)

  // 🔁 queue state
  const [category] = useState<MusicCategory>('lofi')
  const [queue, setQueue] = useState<string[]>([...MUSIC_CATALOG.lofi])
  const [currentTrack, setCurrentTrack] = useState(0)
  const [playing, setPlaying] = useState(false)

  // Load track when index changes
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.src = queue[currentTrack]
    audio.load()

    if (playing) {
      audio.play().catch(() => {})
    }
  }, [currentTrack, queue, playing])

  // When a song ends → rotate queue
  const handleEnded = () => {
    setQueue((prev) => {
      const [finished, ...rest] = prev
      return [...rest, finished]
    })
    setCurrentTrack(0)
  }

  const startMusic = () => {
  audioRef.current?.play()
}

const pauseMusic = () => {
  audioRef.current?.pause()
}

const stopMusic = () => {
  if (!audioRef.current) return
  audioRef.current.pause()
  audioRef.current.currentTime = 0
}


  return (
    <div className="app-container">
      <audio
        ref={audioRef}
        preload="auto"
        onEnded={handleEnded}
      />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/timer"
          element={<Timer
  onStart={startMusic}
  onPause={pauseMusic}
  onStop={stopMusic}
/>
}
        />
      </Routes>
    </div>
  )
}

export default App
