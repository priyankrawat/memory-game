import { useEffect, useState } from 'react';
import './App.css';
import SoloCard from './components/SoloCard';


const cardImages = [
  {"src" : "/img/helmet-1.png"},
  {"src" : "/img/potion-1.png"},
  {"src" : "/img/ring-1.png"},
  {"src" : "/img/scroll-1.png"},
  {"src" : "/img/shield-1.png"},
  {"src" : "/img/sword-1.png"}
]

function App() {



  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoicTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)


  const handleChoice = (card) => {
    
    choiceOne !== card && choiceOne ? setChoicTwo(card) : setChoiceOne(card)
  }

  const resetTurn = () => {
    setChoiceOne(null)
    setChoicTwo(null)
    setTurns(prevTurn => prevTurn+1)
    setDisabled(false)
  }

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages] 
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random(), matched: false}))

    setChoiceOne(null)
    setChoicTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  useEffect(() => {
    if(choiceOne && choiceTwo){
      setDisabled(true)

      if(choiceOne.src === choiceTwo.src) {
        setCards( prevCards => {
          return prevCards.map( card => {
            if(card.src === choiceOne.src) {
              return ({...card, matched: true})
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {

       setTimeout(() =>  resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)

  useEffect(() => {
    shuffleCards()
  }, [])

  return (

    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
       <div className='card-grid'>

        {cards.map((card => (
          <SoloCard key={card.id} card={card} handleChoice = {handleChoice} 
          flipped = {card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}/>
        )))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
