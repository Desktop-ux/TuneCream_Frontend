import React, { useEffect, useRef, useState } from 'react'
import "./Player.css"
import ShinyText from '../ShinyText/ShinyText'

const Player = ({ currentSong, playlist, setCurrentSong, currentIndex, setCurrentIndex }) => {
    const audioRef = useRef(null)
    const progressRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)

    useEffect(() => {
        if (currentSong && audioRef.current) {
            audioRef.current.load()
            audioRef.current.play()
            setIsPlaying(true)
        }
    }, [currentSong])

    const togglePlay = () => {
        if (!audioRef.current) return

        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }

        setIsPlaying(!isPlaying)
    }

    const HandleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime)
    }
    const HandleDuration = () => {
        setDuration(audioRef.current.duration)
    }

    const handleSeek = (e) => {
        const rect = progressRef.current.getBoundingClientRect()
        const clickX = e.clientX - rect.left
        const percent = clickX / rect.width
        const newTime = percent * duration

        audioRef.current.currentTime = newTime
        setCurrentTime(newTime)
    }

    const formatTime = (time) => {
        if (!time) return "0:00"
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
    }

    const playNext = () => {
  setCurrentIndex(prevIndex => {
    if (prevIndex < playlist.length - 1) {
      const nextIndex = prevIndex + 1
      setCurrentSong(playlist[nextIndex])
      return nextIndex
    }
    return prevIndex
  })
}


  const playPrev = () => {
  setCurrentIndex(prevIndex => {
    if (prevIndex > 0) {
      const prev = prevIndex - 1
      setCurrentSong(playlist[prev])
      return prev
    }
    return prevIndex
  })
}


  


    if (!currentSong) {
        return (
            <div className='player_container'>
                <p><ShinyText text="Now Playing" /> 🎧</p>
                <div className="player">
                    <p style={{ opacity: 0.6 }}>Select a song to play 🎵</p>
                </div>
            </div>
        )
    }

    const progressPercent = duration ? (currentTime / duration) * 100 : 0


    return (
        <div className='player_container'>
            <p><ShinyText text="Now Playing" /> 🎧</p>

            <div className="player">
                <h2 className="title">{currentSong.title}</h2>
                <h3 className="artist">{currentSong.artist}</h3>

                <div className="playline" ref={progressRef} onClick={handleSeek}>
                    <div className="playhead" style={{ left: `${progressPercent}%` }} ></div>
                </div>

                <div className="timing">
                    <p className='time_left'>{formatTime(currentTime)}</p>
                    <p className="song_duration">{formatTime(duration)}</p>
                </div>

                <div className="play_buttons">
                    <div className="backward" onClick={playPrev}>
                        <i className="fa-solid fa-backward-step"></i>
                    </div>

                    <div className="play" onClick={togglePlay}>
                        {isPlaying ? (
                            <i className="fa-solid fa-pause"></i>
                        ) : (
                            <i className="fa-solid fa-play"></i>
                        )}
                    </div>

                    <div className="forward" onClick={playNext}>
                        <i className="fa-solid fa-forward-step"></i>
                    </div>
                </div>


                <audio ref={audioRef} onTimeUpdate={HandleTimeUpdate}
                    onLoadedMetadata={HandleDuration}
                    onEnded={playNext}>
                    <source src={currentSong.audio} type="audio/mpeg" />
                </audio>
            </div>
        </div>
    )
}

export default Player
