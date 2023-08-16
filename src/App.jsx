import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const allPokemons = [ 
    {"name": "pikachu", "imgurl": "" }, 
    {"name": "charmander", "imgurl": "" }, 
    {"name": "squirtle", "imgurl": "" }, 
    {"name": "meowth", "imgurl": "" }
  ]

  const [selectedPokemonArray, userSelects] = useState([]);

  const [score, scoreChange] = useState(0);

  const [cardPositions, shuffleCards] = useState(allPokemons); //cardpositions is an array of objects that holds names and imgurl's.
  

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
    fillArrayWithImages()
  }

  //fill the imgurl key in the objects within the cardPositions array
  function fillArrayWithImages () {

    for (let i = 0; i < cardPositions.length; i++) {
      
      fetch('https://pokeapi.co/api/v2/pokemon/'+cardPositions[i].name)
          .then((res) => res.json())
          .then((data) => {
            //console.log(data.sprites.other["official-artwork"].front_default);
            cardPositions[i].imgurl = data.sprites.other["official-artwork"].front_default

          })
          .catch((err) => {
            console.log(err.message);
          }); 
    }
    console.log(cardPositions)  
  }
  
  function handleClick(){
    //check if the card is something user has created before, if yes, gameover
    //check if the user has reached winning condition, if yes, win
    //randomize cards from randomizeCards() function
  }

 /*  useEffect(() => {
    scoreChange(score => score + 1)

    return () => {
      userSelects[""] //empty the array;
    }
  }, [cardPositions]) */

  //get the images from the API after each change in selectedPokemonArray
  useEffect(() => {
    //get the api and fill the cardPositions array.
    //example:
    //let pokemonName = cardpositions[0].pokemonname
    //cardpositions[0].imagelink = search API with the pokemonName
    //rinse and repeat for cardpositions[1], 2, ,3 ,4
    


    return () => {
      userSelects[""] //empty the array;
    }
  }, [cardPositions])

  
  return (
    <>
    {/* these take their order from cardPositions array,  
    cardPositions[0].pokemonName
    cardPositions[0].imagelink
    since these change each time user clicks on something, it will be
    re-rendered with new values each time*/}
    <div onClick= {randomizeCards} id='card0'>
      1
    </div>
    <div id='card1'>
      2
      <img src={cardPositions[1].imgurl} alt="xd" />
    </div>
    <div id='card2'>
      3
      Score = {score}
    </div>
    <div id='card3'>
      4
    </div>
    <div id='card4'>
      5
    </div>
    </>
  )
}

export default App


