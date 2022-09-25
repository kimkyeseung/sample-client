import { useEffect, useMemo, useState, useCallback } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { io } from 'socket.io-client'
import HowToPlay from 'components/remote/HowToPlay'
import Controller from 'components/remote/Controller'

export default function Remote() {
  const router = useRouter()
  const [started, setStarted] = useState(false)
  const socket = useMemo(() => io('http://localhost:3000'), [])

  const onDevelopment = process.env.NODE_ENV !== 'production'

  useEffect(() => {
    socket.emit('remote-connected')

    return () => {
      socket.emit('remote-disconnected')
    }
  })

  useEffect(() => {
    const gameId = router.query['game-id']
    if (gameId) {
      axios.get(`/api/start/${gameId}`)
    }
  }, [router.query])

  const handleStartGame = useCallback(() => {
    setStarted(true)
  }, [])

  return (
    <div>
      {started ? <Controller /> : <HowToPlay onStartGame={handleStartGame} />}
    </div>
  )
}
