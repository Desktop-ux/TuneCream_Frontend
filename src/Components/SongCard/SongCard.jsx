import React from 'react'
import './SongCard.css'

const SongCard = ({song , onClick , isActive}) => {
  return (
    <div 
     className={`songcard ${isActive ? "active_song" : ""}`} 
    onClick={onClick}>
        <h2 className="songtitle">{song.title}</h2>
        <div className="nextSong" ><i class="fa-solid fa-angle-right"></i></div>
    </div>
  )
}

export default SongCard