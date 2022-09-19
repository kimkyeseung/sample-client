import React, { useMemo, useState, useCallback, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Chat from '../components/Chat'
import Test from '../components/Test'
import MainLayout from 'components/layout/MainLayout'
import QR from 'components/QR'
import { uuid4 } from 'lib/utils'
import { io } from 'socket.io-client'
import { ServerStyleSheet } from 'styled-components'

export default function Home() {
  const gameId = useMemo(() => uuid4(), [])
  const socket = useMemo(() => io('http://localhost:3000'), [])
  const [connected, setConnected] = useState(false)

  const handleRemoteConnected = useCallback(() => {
    setConnected(true)
  }, [])

  useEffect(() => {
    socket.on('remote-connected', handleRemoteConnected)

    return () => {
      socket.removeAllListeners()
    }
  })

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
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

        {connected && <p>remote connected!</p>}
      </MainLayout>
    </div>
  )
}