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
  multiplayer: SocketIO({ server: 'localhost:8000' }), //this local host needs to change to the backend server that hasn't been built out yet. Might use the loby api but not sure yet need to research more on the docs.
  //there are some issues with creating the server right now
  //I'm not sure if i want to create it without the backend yet, and the front end deploy isn't working totally yet.
  //I'm thinking the todo should be some of the visual css effects and then focus on the rest.
  // Need to add more card abilities and strategies. Might balance tweek the relics where they have to be played before being active in the players' deck.
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