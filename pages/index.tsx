import React, { useMemo, useState, useCallback, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Chat from '../components/Chat'
import Test from '../components/Test'
import MainLayout from 'components/layout/MainLayout'
import QR from 'components/QR'
import generator from 'lib/levelGenerator'
import { uuid4 } from 'lib/utils'
import { io } from 'socket.io-client'
import { ServerStyleSheet } from 'styled-components'
import useActionQueue from 'hooks/useActionQueue'

const DEFAULT_LIFE = 3

const initialState = {
  game: {
    level: 0,
    timeLimit: 0,
    isSpeedUp: false,
    optionCount: 0,
    answerIndex: null,
    options: []
  },
  startedAt: null,
  endedAt: null,
  life: 3,
  delay: 0,
  status: 'main'
}

const reducer = (state, action) => {
  switch (action.type) {
    case READY:
      return {
        ...state,
        status: 'ready',
        delay: action.delay
      }

    case START_GAME:
      return {
        ...state,
        status: 'playing',
        startedAt: Date.now(),
        life: DEFAULT_LIFE,
        game: {
          ...state.game,
          ...levelGenerator.next().value
        }
      }
    case CORRECT_ANSWER:
      return {
        ...state,
        status: 'correct-answer',
        delay: action.delay
      }
    case WRONG_ANSWER:
      return {
        ...state,
        status: 'wrong-answer',
        life: state.life - 1,
        delay: action.delay
      }
    case SET_NEXT_LEVEL:
      return state.life
        ? {
            ...state,
            status: 'playing',
            game: {
              ...state.game,
              ...levelGenerator.next().value
            }
          }
        : { ...state, status: 'over', life: 0, delay: action.delay }
    case INITIALIZE_GAME:
      return {
        ...state,
        status: 'ready'
      }
    default:
      return state
  }
}

export const READY = 'READY'
export const START_GAME = 'START_GAME'
export const SET_NEXT_LEVEL = 'SET_NEXT_LEVEL'
export const CORRECT_ANSWER = 'CORRECT_ANSWER'
export const WRONG_ANSWER = 'WRONG_ANSWER'
export const INITIALIZE_GAME = 'INITIALIZE_GAME'

const levelGenerator = generator()

export default function Home() {
  const gameId = useMemo(() => uuid4(), [])
  const socket = useMemo(() => io(process.env.REACT_APP_API_URL), [])
  const [connected, setConnected] = useState(false)

  const handleRemoteConnected = useCallback((connected: boolean) => {
    setConnected(connected)
  }, [])

  useEffect(() => {
    socket.on('remote-connected', () => handleRemoteConnected(true))
    socket.on('remote-disconnected', () => handleRemoteConnected(false))

    return () => {
      socket.removeAllListeners()
    }
  })

  const handleStartGame = () => {}

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout debugItems={[]}>
        <h1>Let&apos;s play Game!</h1>

        <p>
          Find the diffrent <code>QR code!</code>
        </p>

        <div>
          <QR
            url={'remote'}
            query={{ 'game-id': gameId }}
            data-tip="start"
            onDevelopment={true}
          />
        </div>

        {connected ? <p>remote connected!</p> : <p>remote disconnected...</p>}
        {process.env.NODE_ENV}
      </MainLayout>
    </div>
  )
}
