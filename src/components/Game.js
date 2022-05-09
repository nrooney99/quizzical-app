import React, { Fragment } from 'react';
import '../App.css';
import Question from './Question.js'
import { nanoid } from 'nanoid';
import { SpinnerCircular } from 'spinners-react';


export default function Game(props){
    const [questions,setQuestions] = React.useState([])
    const [selected,setSelected] = React.useState([-1,-1,-1,-1,-1])
    const [finished,setFinished] = React.useState(false)
    const [count,setCount] = React.useState(0)
    const [loading, setLoading] = React.useState(false)
    const [allAnswered,setAllAnswered] = React.useState(false)
    
    const fetchQuestions = async ()=> {
        function shuffleArray(array) {
            let currentIndex = array.length,  randomIndex;
            
            // While there remain elements to shuffle.
            while (currentIndex != 0) {
            
                // Pick a remaining element.
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                // And swap it with the current element.
                [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
            }
            
            return array;
            }
        setLoading(true)
        const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple&difficulty=easy")
        const {results}= await res.json()
        let dataShuffled = results.map(qst=>{
                setLoading(false)
                let options=shuffleArray([...qst.incorrect_answers,qst.correct_answer])
                return {...qst,options:options,id:nanoid(),correctIndex:options.indexOf(qst.correct_answer)}
                })
                setQuestions(dataShuffled)
    }
    
    React.useEffect(()=>{fetchQuestions()},[])

    React.useEffect(()=>{
        if (!selected.some((selection)=>selection==-1)){
            setAllAnswered(true)
        }
    },[selected])
    
    function changeSelected(questionIndex,answerIndex){
        setSelected(oldValue=> oldValue.map((answerSelection, qstIndex)=>{
            return questionIndex==qstIndex?
                     answerIndex : 
                     answerSelection
        }))
    }

    function handleCheck(){
            if (allAnswered){setFinished(true)
            let totalCorrect=selected.reduce((a,b,i)=>{
                return (b==questions[i].correctIndex?a+1:a)
            },0)
            setCount(totalCorrect)
            props.addToRecord(totalCorrect)
    }}

    function handleAgain(){
        setQuestions([])
        setSelected([-1,-1,-1,-1,-1])
        setFinished(false)
        setCount(0)
        setAllAnswered(false)
        fetchQuestions()
    }

    return (
        <div className='game-container'>
            {loading &&<div><SpinnerCircular /><p>Loading...</p></div>}
            {questions.map((qst,i)=>{
                return(<Question 
                        key={qst.id} 
                        question={qst.question} 
                        options={qst.options} 
                        handleChange={(answerIndex)=>changeSelected(i,answerIndex)}
                        selectedAnswer={selected[i]}
                        finished={finished}
                        correctIndex={qst.correctIndex}
                        />)
            })}
            
            {!finished?
            <footer>
                {!loading && allAnswered &&<button 
                className='btn check-button'
                onClick={()=>{handleCheck()}}>
                    Check answers
                </button>}
                {!loading && !allAnswered &&
                <h3>Please give an answer for each question 😅</h3>}
            </footer> :
            <footer>
                <button 
                className='btn footer-button'
                onClick={()=>{props.handleBack(); handleAgain();}}>
                    Go back
                </button>
                <p>You scored {count}/5 correct answers</p>
                <button 
                className='btn footer-button'
                onClick={handleAgain}>
                    Play again
                </button>
            </footer>
            } 
            
        </div>
    )
    }