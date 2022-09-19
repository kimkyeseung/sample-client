import React, { useState } from 'react'
import QR from '../QR'

const HowToPlay = ({ onStartGame }) => {
  return (
    <div>
      <h1>How To Play</h1>
      <div>
        <ul>
          <li>There are several QR codes</li>
          <li>only one QR code is diffrent from others</li>
          <li>find and capture that</li>
        </ul>
      </div>

      <div>
        <QR value={1} />
        <QR value={1} />
        <QR value={1} />
        <QR value={2} />
      </div>

      <div>
        <button onClick={onStartGame}>understand!</button>
      </div>
    </div>
  )
}

export default HowToPlay
