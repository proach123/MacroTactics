import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import history from './services/history.js'
import Routes from './routes'

import { SocketIO } from 'boardgame.io/multiplayer'

import {Client} from 'boardgame.io/react';
import {MacroTactics} from './Game';
import {MacroTacticsBoard} from './Board'
import { render } from "react-dom";

import { PlayerView } from 'boardgame.io/core';


import './App.css';

const MacroClient = Client({
  game: MacroTactics,
  board: MacroTacticsBoard,
  multiplayer: SocketIO({ server: 'localhost:8000' }),
  playerView: PlayerView.STRIP_SECRETS,
  
})

class App extends React.Component {

  state = { playerID: null };

  render(){
    if (this.state.playerID === null) {
      return (
        <div>
          <p>Play as</p>
          <button onClick={() => this.setState({ playerID: "0" })}>
            Player 0
          </button>
          <button onClick={() => this.setState({ playerID: "1" })}>
            Player 1
          </button>
        </div>
      );
    }
  return(
      <div>
        <MacroClient playerID={this.state.playerID} matchId = '0' />
      </div>
  )

} 
}

render(<App />, document.getElementById("root"));

export default App

// function App() {
//   return (
//     <Router history={history}>
//       <Routes />
//     </Router>
//   );
// }