import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const allPokemons = ["x", "y", "z", "a", "b", "c"]

  const [selectedPokemonArray, userSelects] = useState([]);

  const [score, scoreChange] = useState(0);

  //this is where you'll draw the pictures from:
  //https://github.com/PokeAPI/sprites
  //https://pokeapi.co/

  useEffect(() => {
    scoreChange(score => score + 1)

    return () => {
      userSelects[""] //empty the array;
    }
  }, [selectedPokemonArray])

  
  return (
    <div>
      Yo waddup
    </div>
  )
}

export default App
