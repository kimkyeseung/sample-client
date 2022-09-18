import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback
} from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import QRCode from 'qrcode'
import qs from 'qs'

type Props = { host: string | null }

const QR = ({
  url,
  query,
  onDevelopment,
  value,
  isCorrect,
  handleSubmit,
  host,
  ...props
}) => {
  const ref = useRef()
  const [ready, setReady] = useState(false)

  const qr = useMemo(() => (url ? `${host}/${url}` : String(value)), [])
  const qrType = useMemo(() => (url ? 'url' : 'choice'), [url])

  useEffect(() => {
    QRCode.toCanvas(ref.current, qr, (error) => {
      if (error) {
        console.error(error)
      } else {
        setReady(true)
      }
    })
  }, [])

  const handleClick = useCallback(() => {
    if (onDevelopment) {
      qrType === 'url'
        ? window.open(`${url}?${qs.stringify(query)}`)
        : handleSubmit(value, isCorrect)
    }
  }, [url])

  return (
    <div onClick={handleClick} {...props}>
      {ready || <div>LOADING...</div>}
      <canvas ref={ref}></canvas>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => ({ props: { host: context.req.headers.host || null } })

export default QR
