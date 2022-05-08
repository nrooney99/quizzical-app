import { nanoid } from 'nanoid';
import React from 'react';
import '../App.css';

export default function Question(props){

    const getDecodedString = (str) => {
        const txt = document.createElement('textarea');
        txt.innerHTML = str;
        return txt.value;
    };
    return (
        <div className='question-container'>
            <h3>{getDecodedString(props.question)}</h3>
            <div className='answers-container'>
                {props.options.map((option,answerIndex)=>{
                    if (!props.finished){
                        return <div 
                                key={nanoid()} 
                                className={`answer-box ab ${answerIndex==props.selectedAnswer?'answer-box-selected':''}`}
                                onClick={()=>props.handleChange(answerIndex)}>
                                    {getDecodedString(option)}
                                </div>
                    } else {
                        return <div 
                                key={nanoid()} 
                                className={`answer-box 
                                            ${answerIndex==props.correctIndex?'right-answer':''}
                                            ${answerIndex==props.selectedAnswer&answerIndex!=props.correctIndex?'wrong-answer':''}`}>
                                    {getDecodedString(option)}
                                </div>
                    }
                })}
            </div>
            <hr/>
        </div>
    )
    }