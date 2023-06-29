import React, { useState, useEffect } from "react";


function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  /*
  function cleanup() {
    if(timeRemaining ===0){
      setTimeRemaining(10);
      onAnswered(false)
    }
  }

  useEffect((()=>{
    setTimeout(()=>{
      setTimeRemaining(
        (x)=> x = timeRemaining - 1)}
    , 1000)
  return cleanup})
  , [timeRemaining]);
  */

  const [isMounted, setIsMounted] = useState(true);

  function cleanup(time) {
    clearTimeout(time);
    if(time === 0){
    //clearTimeout(time);
    setTimeRemaining(()=>10);
    onAnswered(false);
    }
    if(!question){
      setIsMounted(false);
    }
    return isMounted;
  }

  useEffect((()=>{
    setTimeout(()=>{
      setTimeRemaining(
        (x)=> x = timeRemaining - 1)}
    , 1000)
  return cleanup(timeRemaining)})
  , [timeRemaining, question]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }
// HOW DOES THIS WORK???
  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
