import React, { useEffect, useState } from 'react'
import "./App.css"
import Moods from './Components/Moods/Moods'
import Player from './Components/Player/Player'
import Recommended from './Components/Recommended/Recommended'
import axios from 'axios'

const App = () => {
  const [songs, setSongs] = useState([])
  const [selectedMood, setSelectedMood] = useState("");
  const [currentSong, setCurrentSong] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const shuffleArray = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }



  useEffect(() => {
    if (songs.length > 0) {
      setCurrentIndex(0)
      setCurrentSong(songs[0])
    }
  }, [songs])

  const handleSongSelect = (song, index) => {
    setCurrentSong(song)
    setCurrentIndex(index)
  }

  const handleMoodSelect = async (mood) => {
    setSelectedMood(mood);

    try {
      const res = await axios.get(
        `https://tunecream-backend.onrender.com/api/songs?mood=${mood}`
      );

      console.log(res.data);
      const songsData = Array.isArray(res.data)
        ? res.data
        : res.data.songs || []

      setSongs(shuffleArray(songsData))

      console.log(songs.length)

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
      <Moods selectedMood = {selectedMood} onMoodSelect={handleMoodSelect} />
      <div className="line"></div>
      <Player currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} currentSong={currentSong} playlist={songs} setCurrentSong={setCurrentSong} />
      <div className="line"></div>
      <Recommended currentIndex={currentIndex} currentSong={currentSong} songs={songs} onSongSelect={handleSongSelect} mood={selectedMood} />
    </div>
  )
}

export default App
