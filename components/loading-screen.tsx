'use client'

import { useState, useEffect, useRef } from 'react'

export function LoadingScreen({ onLoadingComplete }: { onLoadingComplete: () => void }) {
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleEnded = () => {
      setIsLoading(false)
      onLoadingComplete()
    }

    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('ended', handleEnded)
    }
  }, [onLoadingComplete])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design-RemLR5qbzYPiL1I7ynlKSnDIzxxSQX.mp4" type="video/mp4" />
      </video>
    </div>
  )
}

