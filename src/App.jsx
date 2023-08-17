import { useEffect, useState } from 'react'
import './App.css'

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
      console.log(isFlipped)
    }
    , 1000);
    
    //flip the cards back
    setTimeout(function()
    {setFlipped(false);
      console.log(isFlipped)}
    , 3000);
   
  }

  function flipBack(){

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
    console.log(cardPositions)
    //fillArrayWithImages()
    console.log(cardPositions)
    console.log(cardPositions[0].name) 
    console.log(cardPositions[0].imgUrl)
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
    console.log(score)
    //initate randomizing the cards
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
      <div id='card0'>
        <img onClick={handleClick} name={cardPositions[0].name} src={cardPositions[0].imgUrl} alt="xd" />
      </div>
      <div id='card1'>
        <img onClick={handleClick} name={cardPositions[1].name} src={cardPositions[1].imgUrl} alt="xd" />
      </div>
      <div id='card2'>
        <img onClick={handleClick} name={cardPositions[2].name} src={cardPositions[2].imgUrl} alt="xd" />
      </div>
      <div id='card3'>
        <img onClick={handleClick} name={cardPositions[3].name} src={cardPositions[3].imgUrl} alt="xd" />
      </div>
      <div id='card4'>
        <img onClick={handleClick} name={cardPositions[4].name} src={cardPositions[4].imgUrl} alt="xd" />
      </div>
      <div id='card5'>
        <img onClick={handleClick} name={cardPositions[5].name} src={cardPositions[5].imgUrl} alt="xd" />
      </div>
      <div>
      <div id='card6'>
        <div name="xd" onClick={handleBlinkClick}>
        <img onClick={handleClick} name={cardPositions[6].name} src={cardPositions[6].imgUrl} alt="xd" />
        </div>
      </div>
      </div>
      <div className="scene scene--card">
        {/* ADD THIS TOGGLE TO THE ALREADY EXISTING handleClick function.
        Before you change the state of isFlipped, add a function for displaying the right or wrong choices! */}
               {/* ADD THIS TOGGLE TO THE ALREADY EXISTING handleClick function.
        Before you change the state of isFlipped, add a function for displaying the right or wrong choices! */}
               {/* ADD THIS TOGGLE TO THE ALREADY EXISTING handleClick function.
        Before you change the state of isFlipped, add a function for displaying the right or wrong choices! */}
               {/* ADD 8bit or 16bit music*/}
  <div onClick= {handleToggleFlip} 
  className={ isFlipped
     ? "card is-flipped" 
     : "card"}   >
    <div className="card__face card__face--front">
      <div className="blinkContainer" onClick={handleBlinkClick}>
    <img onClick={handleClick} name={cardPositions[6].name} src={cardPositions[6].imgUrl} alt="xd" />
      </div>
    </div>
    <div className="card__face card__face--back"></div>
  </div>

</div>
<div className="scene scene--card">
  <div className="card">
    <div className="card__face card__face--front">front</div>
    <div className="card__face card__face--back">back</div>
  </div>
</div>
    </div>
    }
    </>
  )
}

export default App



