import React, { useEffect, useState } from 'react'
import Quiz from './Components/Quiz'
import "./index.css";
import {nanoid} from "nanoid";

function App() {
  const [page,setPage] = useState(false)
  const [quiz,setQuiz] = useState([])
  const [count,setCount] =useState(0)
  const [check,setCheck] = useState(false)
  const [correct,setCorrect] = useState(0)

  const shuffledArray = (ans) => ans.sort(() => Math.random() - 0.5)
  
  useEffect(() => {
    async function getQuiz(){
    const res = await fetch("https://opentdb.com/api.php?amount=7&difficulty=medium&type=multiple")
    const data = await res.json()
   
    const newQuiz = []
    data.results.forEach(question =>{
      newQuiz.push(
      {
      id:nanoid(),
      question: question.question,
      selected:null,
      checked:false,
      answers:shuffledArray([...question.incorrect_answers, question.correct_answer]),
      correctAnswer:question.correct_answer
    }
    )
  })
  setQuiz(newQuiz);
  }
    getQuiz()

    return () => {

    }
  }, [count]);

  function handleCheck(){
    let correctAns = 0
    quiz.forEach(items =>{
      if(items.selected === items.correctAnswer){
        correctAns += 1
      }
    })
    setCorrect(correctAns)
    setQuiz(prevQuiz => prevQuiz.map(items => {
      return {...items ,checked: true}
    }))
    setCheck(true)
  }

  function handleClick(id, answer){
    setQuiz(prevQuiz => prevQuiz.map(items =>{
      return(
        items.id === id ?
        {...items, selected: answer} : items
      )
    }))
  }

  const quizElements = quiz.map(items =>{
    return(
      <Quiz
        key={items.id}
        {...items}
        handleClick={handleClick}
        />
    )
  })

  function playAgain(){
    setCount(count + 1)
    setCheck(false)
  }

  function pageLoad(){
    setPage(prevQuiz => !prevQuiz)
  }
  return (
    <main>
      {!page ?
      <div className='container'>
        <h1>Quizzical</h1>
        <p>Some description if needed</p>
        <button className='start-btn' onClick={pageLoad}>Start quiz</button>
      </div>
      :
      
      <div>
        <div className='quiz-page'>
        {quizElements}
        </div>

        <div className='quiz-check'>
          {check && <span>You have scored {correct}/7 correct answers </span>}
          
        <button className='quiz-btn' 
        onClick={check ? playAgain : handleCheck}>
           {check ? "Play again" : "Check answers"}</button>
        </div>
    </div>
      }
    </main>
  )
}

export default App