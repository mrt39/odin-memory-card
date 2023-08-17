import { useEffect, useState } from 'react'
import './App.css'
import PokemonCard from './Card.jsx'

function App() {
  
  const allPokemons = [ 
    {"name": "pikachu", "imgUrl": "" }, 
    {"name": "charmander", "imgUrl": "" }, 
    {"name": "squirtle", "imgUrl": "" }, 
    {"name": "meowth", "imgUrl": "" },
    {"name": "eevee", "imgUrl": "" }, 
    {"name": "psyduck", "imgUrl": "" }, 
    {"name": "bulbasaur", "imgUrl": "" },
  ]

  const [selectedPokemonArray, userSelects] = useState([]);

  const [score, scoreChange] = useState(0);

  const [cardPositions, shuffleCards] = useState(allPokemons); //cardpositions is an array of objects that holds names and imgurl's.

  const [gameStatus, statusChange] = useState(0); //gamestatus. 1 is how the game starts, 2 is game over. 

  const [isFlipped, setFlipped] = useState(false);

  function handleToggleFlip (event) {

    //flip the card
   //  setFlipped(!isFlipped);
  };

  function handleBlinkClick (event){
    let clickedCard = event.currentTarget
    //blink the card
    // 👇️ add blinking class on click
    clickedCard.classList.add('blinking-false');
    console.log(isFlipped)
    //after 1 second, remove and flip the card
    setTimeout(function()
    {clickedCard.classList.remove('blinking-false');
      setFlipped(true);
    }
    , 1000);

    //flip the cards back
    setTimeout(function()
    {setFlipped(false);}
    , 3000);

   }


  function randomizeCards(){
    /* Randomize cardPositions array using Durstenfeld shuffle algorithm */
    let shuffledPokemons = cardPositions.map(l => Object.assign({}, l)); /* this is how you copy an array of objects in react. */
    for (var i = shuffledPokemons.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = shuffledPokemons[i];
      shuffledPokemons[i] = shuffledPokemons[j];
      shuffledPokemons[j] = temp;
    }
    shuffleCards(shuffledPokemons)
  }

  
  function handleClick(event){
    //check if the clicked card is something user has clicked on before, if yes, gameover
    if (selectedPokemonArray.includes(event.target.name)){
      statusChange(2)
    }
    //check if the user has reached winning condition, if yes, win
    //else, add it to selectedPokemonArray and increase user score
    else {
    userSelects(selectedPokemonArray.concat(event.target.name))
    scoreChange(score => score + 1)
    }
    //randomize cards from randomizeCards() function
    randomizeCards()
  }

  //restarts the game when the user clicks on "restart" after game is over
  function restartGame(){
    scoreChange(0)
    statusChange(1)
    //empty the selected pokemon array
    userSelects([])
  }

  //get the images from the API and fill the cardPositions array after each change in cardPositions array
  useEffect(() => {
    for (let i = 0; i < cardPositions.length; i++) {
      
      fetch('https://pokeapi.co/api/v2/pokemon/'+cardPositions[i].name)
          .then((res) => res.json())
          .then((data) => {
            cardPositions[i].imgUrl = data.sprites.other["official-artwork"].front_default

          })
          .catch((err) => {
            console.log(err.message);
          }); 
    }

  }, [cardPositions])

  
  return (
    <>
    {gameStatus === 0 &&
    <>
    <h1 onClick={() => statusChange(1)}>Start The Game</h1>
    </>
    }
    {gameStatus === 2 &&
    <>
    <h1>Game Over</h1>
    <h2 onClick={() => restartGame()}>Restart</h2>
    </>
    }
    {gameStatus === 1 &&
    <div id='gameContainer'> 
    <h1>Score: {score}</h1>
      <PokemonCard 
        isFlipped = {isFlipped}
        handleBlinkClick = {handleBlinkClick}
        handleClick = {handleClick}
        name = {cardPositions[0].name}
        imgUrl = {cardPositions[0].imgUrl} 
      /> 
      <PokemonCard 
        isFlipped = {isFlipped}
        handleBlinkClick = {handleBlinkClick}
        handleClick = {handleClick}
        name = {cardPositions[1].name}
        imgUrl = {cardPositions[1].imgUrl} 
      /> 
      <PokemonCard 
        isFlipped = {isFlipped}
        handleBlinkClick = {handleBlinkClick}
        handleClick = {handleClick}
        name = {cardPositions[2].name}
        imgUrl = {cardPositions[2].imgUrl} 
      /> 
      <PokemonCard 
        isFlipped = {isFlipped}
        handleBlinkClick = {handleBlinkClick}
        handleClick = {handleClick}
        name = {cardPositions[3].name}
        imgUrl = {cardPositions[3].imgUrl} 
      /> 
      <PokemonCard 
        isFlipped = {isFlipped}
        handleBlinkClick = {handleBlinkClick}
        handleClick = {handleClick}
        name = {cardPositions[4].name}
        imgUrl = {cardPositions[4].imgUrl} 
      /> 
      <PokemonCard 
        isFlipped = {isFlipped}
        handleBlinkClick = {handleBlinkClick}
        handleClick = {handleClick}
        name = {cardPositions[5].name}
        imgUrl = {cardPositions[5].imgUrl} 
      /> 
      <PokemonCard 
        isFlipped = {isFlipped}
        handleBlinkClick = {handleBlinkClick}
        handleClick = {handleClick}
        name = {cardPositions[6].name}
        imgUrl = {cardPositions[6].imgUrl} 
      /> 
    </div>
    }
    </>
  )
}

export default App



