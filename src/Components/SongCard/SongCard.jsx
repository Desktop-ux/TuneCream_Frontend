import React, { forwardRef } from 'react'
import './SongCard.css'

const SongCard = forwardRef(({ song, onClick, isActive }, ref) => {
  return (
    <div
      ref={ref}  
      className={`songcard ${isActive ? "active_song" : ""}`}
      onClick={onClick}
    >
      <h2 className="songtitle">{song.title}</h2>

      <div className="nextSong">
        <i className="fa-solid fa-angle-right"></i>
      </div>
    </div>
  )
})

export default SongCard
