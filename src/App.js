import { useState } from 'react';
import './App.css';


const Button = ({opacity,disabled, HandleClick, mapelem, index}) => {
  return(
    <button style={{opacity: opacity}} className='buttons' disabled={disabled} onClick={() => {HandleClick(index, mapelem)}}>
      {mapelem}
    </button>
  )
}

const Game = ({count, children, click, items, title}) => {
  return(
    <div className='Game'>
      <h2 className='titleandcount'>{title}: {`${count}`}</h2>
      <div className='screen'>
        <img style={{width: '100%'}} src={items[click]}></img>
      </div>
      <div className='buttonsDiv'>
        {children}
      </div>
    </div>
  )
}

function App() {
  const [disabled, setDisabled] = useState(false);
  const [text, setText] = useState('');
  const [playercount, setPlayercount] = useState(0);
  const compsystem = Math.floor(Math.random() * 3);
  const [compcount, setCompcount] = useState(0);
  const [computer, setComputer] = useState(3);
  const [clicked, setClicked] = useState(3);
  const [opacity, setOpacity] = useState('1')
  const items = [
    'https://cdn.pixabay.com/photo/2014/03/25/15/26/rock-paper-scissors-296854_1280.png',
    'https://cdn.pixabay.com/photo/2014/03/25/15/26/rock-paper-scissors-296855_1280.png',
    'https://cdn.pixabay.com/photo/2014/03/25/15/26/rock-paper-scissors-296853_1280.png',
    // Waiting 
    'https://icons.veryicon.com/png/o/miscellaneous/decon/wait-4.png',
  ]
  const elements = [
    'Rock',
    'Paper',
    'Scissors' 
  ]
  const compelement = [
    'Rock',
    'Paper',
    'Scissors'
  ]
  const weapons = [
    {
      wins: 'Scissors',
    },
    {
      wins: 'Rock',
    },
    {
      wins: 'Paper',
    },
  ];
  const Refresh = () => {
    setDisabled(false);
    setComputer(3)
    setText('')
    setClicked(3)
    setOpacity('1');
  }
  const HandleClick = (index, mapelem) => {
      setComputer(compsystem);
      setClicked(index);
      setDisabled(true);
      setOpacity('0.5');
      if(weapons[index].wins !== compelement[compsystem]){
        setCompcount(compcount + 1);
        setText('You Lose!')
      }
      if(mapelem == compelement[compsystem]){
        setText('Draw!');
      }
      else if(weapons[index].wins == compelement[compsystem]){
        setPlayercount(playercount + 1)
        setText('You Win!')
      }
  }
  return (
    <div className="App">
        <Game count={playercount} title={'Player'} click={clicked} items={items}>
            {elements.map((mapelem, index) => <Button opacity={opacity} disabled={disabled} index={index} mapelem={mapelem} HandleClick={HandleClick}/>)}
        </Game>
        <div className='result'>
          {disabled && <button className='refresh' onClick={Refresh}>  
            <img src="https://qph.cf2.quoracdn.net/main-qimg-ae92b32bf2255fc758cf0ea8e4b76b18.webp"></img>
          </button>}
          <h2>{text}</h2>
        </div>
        <Game count={compcount} title={"Computer"} click={computer} items={items}></Game>
    </div>
  );
}

export default App;
