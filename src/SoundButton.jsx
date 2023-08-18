
function SoundToggle ({toggleSoundOnOff, soundOn}) {

    return (
        <div id="soundButtonContainer">
            {soundOn ?
            <svg fill="#213547" height="100px" width="100px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" xmlSpace="preserve"
            onClick={toggleSoundOnOff}>
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> <g> <polygon points="16,14 17,14 17,10 16,10 16,9 15,9 15,15 16,15 "></polygon> 
            <path d="M11,3v1h-1v1H9v1H8v1H7v1H6v1H5v1H4v1H3v2h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h2V3H11z M11,16h-1v-1H9v-1H8v-1H7v-2h1v-1h1V9 h1V8h1V16z"></path>
            <polygon points="19,7 19,6 15,6 15,8 17,8 17,9 18,9 18,15 17,15 17,16 15,16 15,18 19,18 19,17 20,17 20,7 "></polygon> </g> </g></svg>
            : 
            /* if soundOn is false */
            <svg fill="#213547" height="100px" width="100px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24.00 24.00" xmlSpace="preserve"
            onClick={toggleSoundOnOff} 
            stroke="#213547" strokeWidth="0.00024000000000000003"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round">
            </g><g id="SVGRepo_iconCarrier"> <g> 
            <path d="M11,3v1h-1v1H9v1H8v1H7v1H6v1H5v1H4v1H3v2h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h2V3H11z M11,16h-1v-1H9v-1H8v-1H7v-2h1v-1h1V9 h1V8h1V16z"></path> 
            <polygon points="19,10 19,11 18,11 18,10 16,10 16,12 17,12 17,13 16,13 16,15 18,15 18,14 19,14 19,15 21,15 21,13 20,13 20,12 21,12 21,10 "></polygon> 
            </g> </g></svg>
            }
        </div>
    )
}

export default SoundToggle;
