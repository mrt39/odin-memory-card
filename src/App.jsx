import { useEffect, useState } from 'react'
import './App.css';
import PokemonCard from './Card.jsx';
import { TypeAnimation } from 'react-type-animation';
import SoundToggleButton from './SoundButton.jsx';
import ReactHowler from 'react-howler' //audio player for react (https://github.com/thangngoc89/react-howler)


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

  const [inBetweenClicks, setBetweenClicks] = useState(false); //prevents user from clicking another card until the cards are displayed back

  const [soundOn, toggleSound] = useState(true); //prevents user from clicking another card until the cards are displayed back

  
  function toggleSoundOnOff(event){
    toggleSound(!soundOn)
  }
  
  
  function startGame(event){
    //randomize cards 
    randomizeCards()

    //play game-start sound
    if (soundOn === true) {
    var gameStartSound = new Audio('src/sounds/game-start.mp3');
    gameStartSound.play();
    }
    let clickedText = event.currentTarget
    //blink the text 3 times before start
    // 👇️ add blinking className on click
    clickedText.classList.add('blinking-startGame');
    //after 1 second, remove the className and execute the game start condition
    setTimeout(function()
    {clickedText.classList.remove('blinking-startGame');
      statusChange(1);
    }
    , 1000);

  }


  function handleBlinkClick (event){

    if (inBetweenClicks){
      return
    }
    //prevent user from clicking before the cards are displayed again
    setBetweenClicks(true)

    let clickedCard = event.currentTarget
    //check if the clicked card is something user has clicked on before, if yes, blink the card red and gameover
    //event.target.getAttribute("name") is how you get the nameattribute from a div
    if (selectedPokemonArray.includes(event.target.getAttribute("name"))){
    //blink the card red
    // 👇️ add blinking className on click
    clickedCard.classList.add('blinking-false');
    //play the failure sound 
    if (soundOn === true) {
    var failureSound = new Audio('src/sounds/failure.mp3');
    failureSound.play();
    }
    //after 1 second, remove and flip and execute game over condition
    setTimeout(function()
    {clickedCard.classList.remove('blinking-false');
      statusChange(2);
      setBetweenClicks(false)
    }
    , 1000);
    }
    //TODO:
    //check if the user has reached winning condition, if yes, win

    //else, user choice is correct, add it to selectedPokemonArray and increase user score
    else{
      //blink the card green
      // 👇️ add blinking className on click
      clickedCard.classList.add('blinking-correct');
      //add the user selected pokemon to the selectedPokemonArray array and increase the score
      userSelects(selectedPokemonArray.concat(event.target.getAttribute("name")))
      scoreChange(score => score + 1)
      //play the success sound 
      if (soundOn === true) {
      var successSound = new Audio('src/sounds/success.wav');
      successSound.play();
      }
      //after 1 second, remove and flip the card
      setTimeout(function()
      {clickedCard.classList.remove('blinking-correct');
        setFlipped(true);
      }
      , 1000);
      //randomize cards while flipped
      setTimeout(function()
      {randomizeCards();}
      , 2000);
      //flip the cards back
      setTimeout(function()
      {setFlipped(false);}
      , 3000);
      //let user be able to click again 
      setTimeout(function()
      {setBetweenClicks(false);}
      , 4000);


      
    }

   }


  //restarts the game when the user clicks on "restart" after game is over
  function restartGame(){
    scoreChange(0)
    //empty the selected pokemon array
    userSelects([])
    //randomize cards 
    randomizeCards()
    //start the game 
    statusChange(1)
  }

  //returns the start menu when the user clicks on "Return" during the game
  function returnToStartMenu(){
    scoreChange(0)
    //empty the selected pokemon array
    userSelects([])
    //randomize cards 
    randomizeCards()
    //go to start menu
    statusChange(0)

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
    <div>
      {/* audio player for react.
      hierarchically, this is above the other components so it will keep playing no matter what other component is rendered on page. */}
      <ReactHowler
        src="src\sounds\theme.mp3"
        volume= "0.8"
        loop = "true"
        playing= {soundOn}
      />
      {/* hierarchically, this sound toggle button is above the other components so it will keep playing no matter what other 
      component is rendered on page. */}
      <SoundToggleButton
      toggleSoundOnOff = {toggleSoundOnOff}
      soundOn = {soundOn}
      />
      {gameStatus === 0 &&
      <>
      <div id= "startScreen">
      <img id="logo" src="src\images\logo.png" alt="" /> 
      <br /><br />
      {/* using the react-type-animation library
      https://github.com/maxeth/react-type-animation */}
      <TypeAnimation
          sequence={[
            "The Memory Card Game",
            1000,
          ]}
          speed={40}
          style={{ fontSize: '1.5em', fontWeight: 'bold', marginLeft: "25px" }}
        />
      <div id="startButtonsContainer">
        <h3 className="startScreenButton" onClick={startGame}>Start The Game</h3>
        <h3 className="startScreenButton" id='howToPlay' onClick={() => statusChange(3)}>How to Play</h3>
      </div>
      </div>
      </>
      }
      {gameStatus === 2 &&
      <>
      <h1 id="gameOver">Game Over</h1>
      <h4>Score: {score}</h4>
      <h3 className="onHoverWhitecursorPointer restart" onClick={() => restartGame()}>Restart</h3>
      </>
      }
      {gameStatus === 3 &&
      <>
      <span id="howToPlayContainer">
      <div id="howToPlayDiv">
      <TypeAnimation
          sequence={[
            "Don't click any of the cards more than once! You win the game if you successfully click each unique Pokemon card once.",
            1000,
          ]}
          speed={60}
          style={{ fontSize: '1.1em', fontWeight: 'bold', margin:"3rem", marginTop: "3rem"}}
        />
        <h3 id= "howToReturn" onClick={() => statusChange(0)}>Return</h3>
      </div>
      </span>
      </>
      }
      {gameStatus === 1 &&
      <div id = "gameContainer">
          <h1 className="onHoverWhitecursorPointer" onClick={() => returnToStartMenu()} id="returnh1">Return</h1>
        <div id='cardsContainer'> 
          <PokemonCard 
            isFlipped = {isFlipped}
            handleBlinkClick = {handleBlinkClick}
            name = {cardPositions[0].name}
            imgUrl = {cardPositions[0].imgUrl} 
          /> 
          <PokemonCard 
            isFlipped = {isFlipped}
            handleBlinkClick = {handleBlinkClick}
            name = {cardPositions[1].name}
            imgUrl = {cardPositions[1].imgUrl} 
          /> 
          <PokemonCard 
            isFlipped = {isFlipped}
            handleBlinkClick = {handleBlinkClick}
            name = {cardPositions[2].name}
            imgUrl = {cardPositions[2].imgUrl} 
          /> 
          <PokemonCard 
            isFlipped = {isFlipped}
            handleBlinkClick = {handleBlinkClick}
            name = {cardPositions[3].name}
            imgUrl = {cardPositions[3].imgUrl} 
          /> 
          <PokemonCard 
            isFlipped = {isFlipped}
            handleBlinkClick = {handleBlinkClick}
            name = {cardPositions[4].name}
            imgUrl = {cardPositions[4].imgUrl} 
          /> 
          <PokemonCard 
            isFlipped = {isFlipped}
            handleBlinkClick = {handleBlinkClick}
            name = {cardPositions[5].name}
            imgUrl = {cardPositions[5].imgUrl} 
          /> 
          <PokemonCard 
            isFlipped = {isFlipped}
            handleBlinkClick = {handleBlinkClick}
            name = {cardPositions[6].name}
            imgUrl = {cardPositions[6].imgUrl} 
          /> 
        </div>
        <h1 id='scoreDisplay'>Score: {score}</h1>
      </div>
      }
    </div>
  )
}

export default App



