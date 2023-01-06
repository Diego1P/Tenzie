import './App.css';
import Die from './components/Die';
import React, {useState, useEffect } from 'react';
import {nanoid} from "nanoid"

function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, settenzies] = useState(false)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const allSameValue = dice.every(die => die.value === dice[0].value)
    if(allHeld && allSameValue){
      settenzies(true)
      console.log("You Won!")
    }
  }, [dice])

  function generateNewDie(){
    return {value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid()}
  }

  function allNewDice(){
    const newDice = []
    for(let i = 0; i < 10; i++){
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function rollDice(){

    if(!tenzies){
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld? die: generateNewDie()
      }))
    }
    else{
      settenzies(false)
      setDice(allNewDice)
    }

  
  }

  function holdDice(id){
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))}

  const diceElement = dice.map(die => 
    <Die key={die.id} isHeld={die.isHeld} value={die.value} holdDice={() => holdDice(die.id)} />)

  return (
    <main className="App">
      {tenzies && allNewDice}
      <h1 className='title'>Tenzie</h1>
      <p className='instructions'>
        Roll until all dice are the same. Click each die to freeze
        it.
      </p>
      <div className='dice--container'>
        {diceElement}
      </div>

      <button className='roll-dice' onClick={rollDice}> {tenzies? "New Game" : "Roll"} </button>
      {tenzies && <h1> You've won!!! </h1>}
    </main>
  );
}

export default App;