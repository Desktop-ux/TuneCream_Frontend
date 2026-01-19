import React from 'react'
import './Recommended.css'
import ShinyText from '../ShinyText/ShinyText'
import SongCard from '../SongCard/SongCard'

const Recommended = ({songs , mood , onSongSelect , currentSong}) => {
  return (
    <div className='recommended_container'>
      {mood !== "" ? <p>Recommended for {mood} 🎧</p>:<p>Recommended Songs🎧</p>}
        
        <div className="list">
           {songs.length === 0 ? (
        <p>No Mood Selected 🎵</p>
      ) : (
        <div className="song_list">
          {songs.map((song) => (
            <SongCard  
            onClick={() => onSongSelect(song)} 
            isActive={currentSong?._id === song._id}  
            key={song._id} song={song} 
            />
          ))}
        </div>
      )}
            
            
        </div>
    </div>
  )
}

export default Recommended