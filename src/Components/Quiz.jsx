import React from 'react'
import {nanoid} from "nanoid"
import "../index.css"

function Quiz(props) {
  const answerElements = props.answers.map(ans => {
    let id;
    if (props.checked){
      if(props.correctAnswer === ans){
        id = "correct"
      }else if(props.selected === ans){
        id = "in-correct"
      }else{
        id = "not-selected"
      }
    }
    return(
      <button 
          key={nanoid()}
          id={id} 
          className= {props.selected === ans ? 'ans-btn selected' : 'ans-btn'}
          onClick={() => {props.handleClick(props.id, ans)}}>{ans}
      </button>
  ) 
  })

  return (
    <div className='quiz'>
      <h3 className='quiz-question'>{props.question}</h3>
      <div className='quiz-ans'>
        {answerElements}
      </div>
    </div>
  )
}

export default Quiz