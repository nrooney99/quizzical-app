import React from 'react';
import '../App.css';

export default function Start(props){
return (
    <div className='start-container'>
        <h1>Quizzical</h1>
        {props.record.total==0?
        (<h2>You have to answer correctly, are you ready?</h2>):
        <h2>Effectivity: {Math.round(props.record.correct/props.record.total*10000)/100}% 
            <br/>
            {props.record.correct} out of {props.record.total}</h2>}
        <button 
        className='btn start-button' 
        onClick={props.handleButton}>
            Start quiz
        </button>
    </div>
)
}