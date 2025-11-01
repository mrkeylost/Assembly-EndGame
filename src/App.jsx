import { useState } from 'react'
import './App.css'
import Description from './components/Description'
import LanguangeChips from './components/LanguangeChips'
import { languages } from './scripts/languanges'
import Confetti from 'react-confetti'
import clsx from 'clsx'
import { getFarewellText, getRandomWord } from './scripts/utils'

function App() {
  const [currentWord, setCurrentWord] = useState(() => getRandomWord())
  const [guessedWord, setGuessedWord] = useState([])
  const [farewell, setFarewell] = useState(null)

  let wrongGuessCount = guessedWord.filter(el => {
      return !currentWord.includes(el)
    }).length
  let notFound = currentWord.split('').filter(
    el => !guessedWord.includes(el)
  )

  let isGameWon = 
    currentWord.split('').every(char => guessedWord.includes(char))
  let isGameLost = wrongGuessCount === languages.length - 1
  let isGameOver = isGameLost || isGameWon

  const languangeDataChips = languages.map((item, index) => {
    const styles = () => (
        {
            backgroundColor: item.backgroundColor,
            color: item.color,
        }
    )

    let alive = index + 1 > wrongGuessCount

    return <LanguangeChips 
              key={index}
              style={styles()}
              name={item.name}
              alive={alive} />
  })

  let arrayBox = currentWord.split('').map((char, index) => {
    const show = guessedWord.includes(char)

    if(isGameLost){
      const miss = notFound.includes(char)
      return (
        <span className={clsx({'not-found': miss})} key={index}>
          {char.toUpperCase()}
        </span>
      )
    }

    return <span key={index}>{show ? char.toUpperCase() : ''}</span>
  })

  function addGuessWord(letter) {
    setGuessedWord((prev) => {

      if(!currentWord.includes(letter)) {
        setFarewell(getFarewellText(languages[wrongGuessCount].name))
      }

      return prev.includes(letter) ? prev : [...prev, letter]
    })  
  }

  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  let alphabetButton = alphabet.split('').map((char, index) => {
    const isGuess = guessedWord.includes(char)
    const isCorrect = isGuess && currentWord.includes(char)
    const isWrong = isGuess && !currentWord.includes(char)

    return  <button 
              onClick={() => addGuessWord(char)} 
              key={index}
              className={clsx(
                isCorrect && 'true',
                isWrong && 'false',
                isGameOver && 'game-over'
              )}
              disabled={isGameOver}
              aria-disabled={isGameOver}
              aria-label={`letter ${char}`}
            >
              {char.toUpperCase()}
            </button>
  })

  function newGame() {
    setCurrentWord(() => getRandomWord())
    setGuessedWord([])
    setFarewell(null)
  }

  return (
    <main>
      {isGameWon && <Confetti />}
      <Description 
        gameWon={isGameWon} 
        gameOver={isGameOver} 
        farewell={farewell} 
      />
      <section className='languange-chips'>
        {languangeDataChips}
      </section>
      <section className='array-box'>
        {arrayBox}
      </section>
      <section className='keyboard'>
        {alphabetButton}
      </section>
      { isGameOver && 
        <section className='trigger-game'>
          <button onClick={newGame}>New Game</button>
        </section>
      }
    </main>
  )
}

export default App
