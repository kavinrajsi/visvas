'use client'

import { createContext, useContext, useState } from 'react'

const VideoPlaybackContext = createContext()

export function VideoPlaybackProvider({ children }) {
  const [playingVideoId, setPlayingVideoId] = useState(null)

  return (
    <VideoPlaybackContext.Provider value={{ playingVideoId, setPlayingVideoId }}>
      {children}
    </VideoPlaybackContext.Provider>
  )
}

export function useVideoPlayback() {
  const context = useContext(VideoPlaybackContext)
  if (!context) {
    throw new Error('useVideoPlayback must be used within VideoPlaybackProvider')
  }
  return context
}
