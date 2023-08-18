function PokemonCard ({isFlipped, handleBlinkClick, name, imgUrl}) {

    return (
        <div className="scene scene--card">
            <div id='card6'
            className={ isFlipped
                ? "card is-flipped" 
                : "card"}   >
            <div className="card__face card__face--front">
                <div name={name} className="blinkContainer" onClick={handleBlinkClick}>
                    <img name={name} src={imgUrl}/>
                    <h6>{name}</h6>
                </div>
            </div>
            <div  className="card__face card__face--back"></div>
            </div>
        </div>

)}

export default PokemonCard;
