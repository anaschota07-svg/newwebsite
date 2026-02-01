'use client'

import { useEffect } from 'react'

interface AdSenseProps {
  format?: 'horizontal' | 'vertical' | 'rectangle'
  slot?: string
  style?: React.CSSProperties
}

export default function AdSense({ 
  format = 'horizontal',
  slot = '4571421232',
  style
}: AdSenseProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
      }
    } catch (err) {
      console.error('AdSense error:', err)
    }
  }, [])

  const defaultStyle: React.CSSProperties = {
    display: 'block',
    ...style,
  }

  return (
    <div className="my-8 flex justify-center">
      <ins
        className="adsbygoogle"
        style={defaultStyle}
        data-ad-client="ca-pub-2268511139409784"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
