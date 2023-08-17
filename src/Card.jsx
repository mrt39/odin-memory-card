function PokemonCard ({isFlipped, handleBlinkClick, handleClick, name, imgUrl}) {

    return (
        <div className="scene scene--card">
            <div id='card6'
            className={ isFlipped
                ? "card is-flipped" 
                : "card"}   >
            <div className="card__face card__face--front">
                <div className="blinkContainer" onClick={handleBlinkClick}>
            <img onClick={handleClick} name={name} src={imgUrl} alt="xd" />
                </div>
            </div>
            <div className="card__face card__face--back"></div>
            </div>
        </div>

)}

export default PokemonCard;
