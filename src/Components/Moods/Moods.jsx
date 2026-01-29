import React from 'react'
import './Moods.css'


const mood = ["Happy", "Sad", "Focus", "Energetic", "Chill", "Love"]

const Moods = ({onMoodSelect, selectedMood}) => {
 
 
  return (
    <div className='mood_container'>

      {mood.map((mood, index) =>
        (<button  onClick={()=> onMoodSelect(mood)} key={index} className={`mood_btn ${selectedMood === mood ? 'active_mood' : ''}`}>{mood}</button>)
      )
      }
    </div>
  )
}

export default Moods