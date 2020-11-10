import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"

import { SocketIO } from 'boardgame.io/multiplayer'

import {Client} from 'boardgame.io/react';
import {MacroTactics} from './Game';
import {MacroTacticsBoard} from './Board'

import HomePage from './Homepage'

import { PlayerView } from 'boardgame.io/core';


import './App.css';

import shortid from 'shortid';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-84206931-2');
ReactGA.pageview(window.location.pathname + window.location.search);

const { hostname, port } = window.location;

console.log( window.location)

const serverSocket = `${hostname}:${8000}`
console.log(serverSocket)
const MacroClient = Client({
  game: MacroTactics,
  board: MacroTacticsBoard,
  multiplayer: SocketIO({ server: serverSocket }), 

  playerView: PlayerView.STRIP_SECRETS,
  //need to figure out how to strip the player view on p1 and keep the cards actionable
})

const App = ()=>(
  <Router>
        <div>
            <Route path="/" exact component={HomePage} />
            <Route path="/play/:id?/:player?" render={ ({match}) => {
                if (typeof match.params.id === 'undefined' || !shortid.isValid(match.params.id)) {
                    return <HomePage />
                }
                let playerID = ''
                if (match.params.player === 'first') {
                    playerID = '0'
                } else if (match.params.player === 'second') {
                    playerID = '1'
                } else if (typeof match.params.player !== 'undefined') {
                    return null
                }
                return <MacroClient matchID={match.params.id} playerID={playerID} debug={false} />
            }} />
        </div>
    </Router>
)

export default App