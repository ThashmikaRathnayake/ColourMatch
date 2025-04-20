import React, {useState} from 'react';
import './ColourMatch.css';

const colourMixes = {
    black_blue: 'darkblue',
    black_green: 'darkgreen',
    black_orange: 'darkorange',
    black_red: 'brown',
    black_white: 'gray',
    black_yellow: 'darkyellow',
    
    blue_green: 'cyan',
    blue_orange: 'brown',
    blue_red: 'purple',
    blue_white: 'lightblue',
    blue_yellow: 'green',
    
    green_orange: 'brown',
    green_red: 'brown',
    green_white: 'lightgreen',
    green_yellow: 'limegreen',
    
    orange_red: 'vermilion',
    orange_white: 'peach',
    orange_yellow: 'yellow orange',
    
    red_white: 'pink',
    red_yellow: 'orange',
    
    white_yellow: 'lightyellow'
  };

function ColourMatch() {
    const correctSound = new Audio('/sounds/correct.mp3');
    const wrongSound = new Audio('/sounds/wrong.mp3');

    const [colour1, setColour1] = useState("");
    const [colour2, setColour2] = useState("");
    const [guess, setGuess] = useState("");
    const [result, setResult] = useState(""); 
    const [streak, setStreak] = useState(0);
    const [feedback,setFeedback] = useState("");
    
    const getMixKey = (c1,c2) => {
        return [c1,c2].sort().join('_');
    };

    const handleColour1Change = (e) => {
        setColour1(e.target.value);
        setGuess("");
        setFeedback("");
        setResult("");
    }
    const handleColour2Change = (e) => {
        setColour2(e.target.value);
        setGuess("");
        setFeedback("");
        setResult("");
    }
    const handleGuessChange = (e) => {
        setGuess(e.target.value);
    }

    const handleSubmit = () => {
        if (!colour1 || !colour2){
            setFeedback('Select both colours first');
            setTimeout(() => setFeedback(""), 2000);
            return;
        }
        const key = getMixKey(colour1,colour2);
        const correctAnswer = colourMixes[key];
        if (!correctAnswer){
            setFeedback('This combination is not supported yet.');
            setResult("");
            setStreak(0);
            setTimeout(() => setFeedback(""), 3000);
            return;
        }
        setResult(correctAnswer);
        if (guess.trim().toLowerCase().replace(/\s+/g, '') === correctAnswer.toLowerCase().replace(/\s+/g, '')) {
            setFeedback('Bingo!!🤩💖'); 
            setStreak(prev => prev + 1);
            correctSound.play();
            setTimeout(() => setFeedback(""), 3000);
        }
        else {
            setFeedback(`Oops you missed it! The correct answer was "${correctAnswer}".`);
            setStreak(0);
            wrongSound.play();
            setTimeout(() => setFeedback(""), 4000);
        }
    }

    const handleHint = () => {
        if (!colour1 || !colour2){
            setFeedback('Select both colours first');
            setTimeout(() => setFeedback(""), 2000);
            return;
        }
        const key = getMixKey(colour1,colour2);
        const correctAnswer = colourMixes[key];
        if (!correctAnswer){
            setFeedback('This combination is not supported yet.');
            setTimeout(() => setFeedback(""), 3000);
        }
        else {
            setFeedback(`Hint: Starts with: "${correctAnswer[0]}".`);
            setTimeout(() => setFeedback(''), 3000);
        }
    }

    const handleReset = () => {
        setColour1("");
        setColour2("");
        setGuess("");
        setResult("");
        setFeedback("");
        setStreak(0);
    };

  return (
    <div className='colourMatch-container'>
       
        <h2 className='colurMatch-title'>Mix It Up!</h2>

        <div className='colourMatch-input'>
            <div className='colourMatch-input-colour'>
                    <select value={colour1} onChange={handleColour1Change}>
                        <option value="">Select a colour</option>
                        <option value="blue">Blue</option>
                        <option value="red">Red</option>
                        <option value="black">Black</option>
                        <option value="green">Green</option>
                        <option value="orange">Orange</option>
                        <option value="white">White</option>
                        <option value="yellow">Yellow</option>
                    </select>
            </div>
            <div className='colourMatch-input-colour'>
                    <select value={colour2} onChange={handleColour2Change}>
                        <option value="">Select a colour</option>
                        <option value="blue">Blue</option>
                        <option value="red">Red</option>
                        <option value="black">Black</option>
                        <option value="green">Green</option>
                        <option value="orange">Orange</option>
                        <option value="white">White</option>
                        <option value="yellow">Yellow</option>
                    </select>
            </div>
        </div>
        
        
        <div className='colourMatch-input-colour'>
            <label>Guess the mixed colour: 
                <input 
                    type='text'
                    value={guess}
                    onChange={handleGuessChange}
                    placeholder='Ex: Purple'
                />
            </label>
        </div>
        
        <button className='colourMatch-button' onClick={handleSubmit}>Check</button>

        <div className='colourMatch-feedback'>{feedback}</div>

        <div 
            className='colourMatch-display-box' 
            style={{backgroundColor: result || 'transparent'}}
        />

        <div className='colourMatch-streak'>Streak {streak} </div>

        <button className='colourMatch-button' onClick={handleReset}>Reset</button>
        
        <button 
            className='colourMatch-button'
            onClick={handleHint}
            > 💡
        </button>

    </div>
  )
}

export default ColourMatch