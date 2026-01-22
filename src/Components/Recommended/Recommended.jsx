import React, { useEffect, useRef } from 'react'
import './Recommended.css'
import ShinyText from '../ShinyText/ShinyText'
import SongCard from '../SongCard/SongCard'

const Recommended = ({ songs, mood, onSongSelect, currentSong }) => {
  const songRefs = useRef({})

  // 🔥 AUTO SCROLL ACTIVE SONG
  useEffect(() => {
    if (currentSong && songRefs.current[currentSong._id]) {
      songRefs.current[currentSong._id].scrollIntoView({
        behavior: "smooth",
        block: "center"
      })
    }
  }, [currentSong])

  return (
    <div className='recommended_container'>
      {mood !== "" ? (
        <p>Recommended for {mood} 🎧</p>
      ) : (
        <p>Recommended Songs 🎧</p>
      )}

      <div className="list">
        {songs.length === 0 ? (
          <p>No Mood Selected 🎵</p>
        ) : (
          <div className="song_list">
            {songs.map((song, index) => (
              <SongCard
                key={song._id}
                ref={(el) => (songRefs.current[song._id] = el)} // 👈 STORE REF
                song={song}
                isActive={currentSong?._id === song._id}
                onClick={() => onSongSelect(song, index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Recommended
