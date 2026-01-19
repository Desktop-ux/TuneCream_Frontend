import React from 'react'
import './Moods.css'
import axios from 'axios'

const mood = ["Happy", "Sad", "Focus", "Energetic", "Chill", "Love"]

const Moods = ({onMoodSelect}) => {
  // async function  getSongs(mood) {
  //   await axios.get(`http://localhost:5000/songs?mood=${mood}`).then(response=>{
  //     console.log(response.data)
  //   })
  // }

  return (
    <div className='mood_container'>

      {mood.map((mood, index) =>
        (<button  onClick={()=> onMoodSelect(mood)} key={index} className='mood_btn'>{mood}</button>)
      )
      }
    </div>
  )
}

export default Moods