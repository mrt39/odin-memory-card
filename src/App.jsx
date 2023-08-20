import { useEffect, useState } from 'react'
import PokemonCard from './components/Card.jsx';
import { TypeAnimation } from 'react-type-animation';
import failureSoundFile from './assets/sounds/failure.mp3'
import successSoundFile from './assets/sounds/success.wav'
import gamestartSoundFile from './assets/sounds/game-start.mp3'
import themeSoundFile from './assets/sounds/theme.mp3'
import logoImg from './assets/images/logo.png'
import SoundToggleButton from './components/SoundButton.jsx';
import ReactHowler from 'react-howler' //audio player for react (https://github.com/thangngoc89/react-howler)

function App() {
  
  const [selectedPokemonArray, userSelects] = useState([]);

  const [score, scoreChange] = useState(0);

  const [cardCount, changeCardCount] = useState(0); //decide how many cards will be displayed on screen, based on difficulty

  const [cardPositions, shuffleCards] = useState([]); //cardpositions is an array of objects that holds names and imgurl's.

  const [gameStatus, statusChange] = useState(0); //gamestatus. 0:startmenu, 1:game start, 2:game over, 3:how to play, 4:select difficulty, 5:user wins

  const [isFlipped, setFlipped] = useState(false);

  const [inBetweenClicks, setBetweenClicks] = useState(false); //prevents user from clicking another card until the cards are displayed back

  const [soundOn, toggleSound] = useState(true); 


  //create a pool of random pokemons, return an array of random pokemons
  function fillThePokemonPool(){

    //how many cards will be displayed on screen
    let numberofPokemons = cardCount
    //add that many objects to the array of random pokemons, 
    for (let x = 0; x < numberofPokemons; x++){
      cardPositions[x] = {"name": "", "imgUrl": "" }
    }
    //set up an array of UNIQUE random numbers 
    let randomNumbersArray = []
    while (randomNumbersArray.length < cardCount){
      var r = Math.floor(Math.random() * 70) + 1;
      if(randomNumbersArray.indexOf(r) === -1) randomNumbersArray.push(r);
    }

    //use random numbers as pokemon id and set up the allPokemons array with extracting data from pokemon api
    for (let i = 0; i < randomNumbersArray.length; i++) {
      fetch('https://pokeapi.co/api/v2/pokemon/'+randomNumbersArray[i])
      .then((res) => res.json())
      .then((data) => {
        cardPositions[i].name = data.forms[0].name;
        //randomizing the cards AFTER the process above is completed, which also triggers the effect for loading up images.
        randomizeCards();
      })
      .catch((err) => {
        console.log(err.message);
      }); 
      
    }

  }

  
  function startMenutoDifficultyTransition(event){
    //play game-start sound
    if (soundOn === true) {
      var gameStartSound = new Audio(gamestartSoundFile);
      gameStartSound.play();
      }
      let clickedText = event.currentTarget
      //blink the text 3 times before start
      // 👇️ add blinking className on click
      clickedText.classList.add('blinking-startGame');
      //after 1 second, remove the className and execute the game start condition
      setTimeout(function()
      {clickedText.classList.remove('blinking-startGame');
        statusChange(4);
      }
      , 1000);
  }

  function startGame(event){

    //event.target.getAttribute("name") is how you get the nameattribute from an element
    //as soon as cardcount changes from here, useEffect below this function gets activated!
    if (event.target.getAttribute("name") === "easy"){
      changeCardCount(6)

    }
    if (event.target.getAttribute("name") === "medium"){
      changeCardCount(8)

    }
    if (event.target.getAttribute("name") === "hard"){
      changeCardCount(10)
    } 

    //after 1 second, execute the game start condition
    setTimeout(function()
    {statusChange(1);
    }
    , 1000);

  }
  //every time user makes a difficulty choice, 
  useEffect(() => {
    //empty the pool
    shuffleCards([])

    //refill the pool
    fillThePokemonPool()

  }, [cardCount])

     

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


  function handleBlinkClick (event){

    if (inBetweenClicks){
      return
    }
    //prevent user from clicking before the cards are displayed again
    setBetweenClicks(true)

    let clickedCard = event.currentTarget
    //check if the clicked card is something user has clicked on before, if yes, blink the card red and gameover
    //event.target.getAttribute("name") is how you get the nameattribute from a div
    if (selectedPokemonArray.includes(event.target.getAttribute("name"))=== false){
      //blink the card green
      // 👇️ add blinking className on click
      clickedCard.classList.add('blinking-correct');
      //add the user selected pokemon to the selectedPokemonArray array and increase the score
      userSelects(selectedPokemonArray.concat(event.target.getAttribute("name")))
      scoreChange(score => score + 1)
      //play the success sound 
      if (soundOn === true) {
      var successSound = new Audio(successSoundFile);
      successSound.play();
      }
      //check if the user has won!
      if (score === cardCount-1){
        setTimeout(function()
        {//check if the user has reached winning condition, if yes, win
        statusChange(5);
        }
        , 1000);
      }
      //after 1 second, remove and flip the card
      setTimeout(function()
      {
      clickedCard.classList.remove('blinking-correct');
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

    //else, user choice is correct, add it to selectedPokemonArray and increase user score
    else{
    //blink the card red
    // 👇️ add blinking className on click
    clickedCard.classList.add('blinking-false');
    //play the failure sound 
    if (soundOn === true) {
    var failureSound = new Audio(failureSoundFile);
    failureSound.play();
    }
    //after 1 second, remove the blinking class and execute game over condition
    setTimeout(function()
    {clickedCard.classList.remove('blinking-false');
      statusChange(2);
      setBetweenClicks(false)
    }
    , 1000);
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
    //empty the pool
    shuffleCards([])
    //change card count to 0, so it changes back whenever user makes difficulty selection and the effect gets activated!
    changeCardCount(0)
    //go to start menu
    statusChange(0)

  }
  
  function toggleSoundOnOff(){
    toggleSound(!soundOn)
  }


  
  return (
    <div>
      {/* audio player for react.
      hierarchically, this is above the other components so it will keep playing no matter what other component is rendered on page. */}
      <ReactHowler
        src={themeSoundFile}
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
      <img id="logo" src={logoImg} alt="" /> 
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
        <h3 className="startScreenButton" onClick={startMenutoDifficultyTransition}>Start The Game</h3>
        <h3 className="startScreenButton" id='howToPlay' onClick={() => statusChange(3)}>How to Play</h3>
      </div>
      </div>
      </>
      }
      {gameStatus === 2 &&
      <>
      <h1 id="gameOver">Game Over</h1>
      <img className="winLoseImage" src="https://i.giphy.com/media/ubEwB9ZVYtfyg/giphy.webp" alt="" />
      <h4>Score: {score}</h4>
      <h3 className="onHoverWhitecursorPointer restart" onClick={() => restartGame()}>Restart</h3>
      </>
      }
      {gameStatus === 5 &&
      <>
      <h1 id="gameOver">You Win!</h1>
      <img className="winLoseImage" src="https://i.giphy.com/media/MhHXeM4SpKrpC/giphy.webp" alt="" />
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
      {gameStatus === 4 &&
      <div id='difficultyContainer'>
        <h1 id="selectDifficultyh1">Select Difficulty</h1>
        <div id="difficultySettings">
          <h3 className="startScreenButton" name="easy" onClick={startGame}>Easy</h3>
          <h3 className="startScreenButton" name="medium" onClick={startGame}>Medium</h3>
          <h3 className="startScreenButton" name="hard" onClick={startGame}>Hard</h3>
        </div>
      </div>
      }
      {gameStatus === 1 &&
      <div id = "gameContainer">
          <h1 className="onHoverWhitecursorPointer" onClick={() => returnToStartMenu()} id="returnh1">Return</h1>
        <div id='cardsContainer'> 
          {/* render all items in the cardPositions array */}
          {cardPositions.map((cardPosition) => {
          return <PokemonCard key={cardPosition.name} 
          isFlipped = {isFlipped}
          handleBlinkClick = {handleBlinkClick}
          name = {cardPosition.name}
          imgUrl = {cardPosition.imgUrl} />;
          })}
        </div>
        <h1 id='scoreDisplay'>Score: {score}/{cardCount}</h1>
      </div>
      }
    </div>
  )
}

export default App




