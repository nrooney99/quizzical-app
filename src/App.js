import React from 'react';
import Start from './components/Start.js'
import Game from './components/Game.js'
import './App.css';

function App() {
  const [start,setStart] = React.useState(true) //cambiar a true
  const [record,setRecord] = React.useState(() =>JSON.parse(localStorage.getItem('record'))|| {correct:0,total:0})

  function handleBegin (){
    setStart(false)
  }

  function handleBack(){
    setStart(true)
  }

  function handleRecord(correct_answers){
    setRecord(oldRecord=>{
      return {correct: oldRecord.correct + correct_answers, total: oldRecord.total + 5}
    })
  }

  React.useEffect(() => {
    localStorage.setItem('record', JSON.stringify(record));
  }, [record]);

  return (
    <div className="App">
      <div className='blob-1'/>
      <div className='blob-2'/>
      {start?
      <Start handleButton={handleBegin} record={record}/> :
      <Game handleBack={handleBack} addToRecord={(correct_answers)=>handleRecord(correct_answers)}/> 
      }
      {start && <a href='https://www.linkedin.com/in/nicolas-rooney/' target="_blank"><div className='connect'> <img src='./linkedin-logo.png' className='linkedin-logo'/> Nicolás Rooney</div></a>}
    </div>
  );
}

export default App;
