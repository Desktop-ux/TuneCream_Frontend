import React, { useState } from 'react'
import "./App.css"
import Moods from './Components/Moods/Moods'
import Player from './Components/Player/Player'
import Recommended from './Components/Recommended/Recommended'
import axios from 'axios'

const App = () => {
  const [songs, setSongs] = useState([])
  const [selectedMood, setSelectedMood] = useState("");
  const [currentSong, setCurrentSong] = useState(null)

  const handleMoodSelect = async (mood) => {
    setSelectedMood(mood);

    try {
      const res = await axios.get(
        `http://localhost:5000/songs?mood=${mood}`
      );

      console.log(res.data); 
       setSongs(Array.isArray(res.data) ? res.data : res.data.songs || []);   

    } catch (err) {
      console.log("Error fetching songs", err);
    }
  };

  return (
    <div className='app_container'>
      <div className="app_head">
        <h1>TuneCream</h1>
        <p>Music Therapy</p>
      </div>
      <div className="line"></div>
      <Moods onMoodSelect={handleMoodSelect}/>
      <div className="line"></div>
      <Player currentSong ={currentSong} playlist={songs} setCurrentSong={setCurrentSong}/>
      <div className="line"></div>
      <Recommended currentSong ={currentSong} songs={songs} onSongSelect = {setCurrentSong} mood={selectedMood}/>
    </div>
  )
}

export default App
