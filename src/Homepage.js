
import React from 'react';

import shortid from 'shortid'
import ReactGA from 'react-ga'


class HomePage extends React.Component {
    state = {
        playAs: "first",
        gameID: shortid.generate()
    }

    startGame() {
        let gameURL = "/play/" + this.state.gameID + "/" + this.state.playAs
        ReactGA.outboundLink({
            label: 'started game ' + this.state.gameID
        }, function () {
            window.location.href = gameURL + '?inviteLink=1'
        })
    }

    render() {

        return (
            <div className='homepage'>

                <div className='homepage-container'>

                    <div>How to play:
                    <div>
                            MacroTactics is a new prototype game of immense possibilities. The core gameplay could be called a PvP deckbuilder strategy game. On the right of the screen is a turn display which shows who's turn is who's with green on the side of the player who's turn it is. Play begins by clicking the draw action and then you have two actions to play cards or aquire new ones from the central market.
                            Relic's go into effect after the next draw step of the player who purchased it.
                    </div>
                    </div>

                    <button onClick={() => this.startGame()} className="btn btn-info btn-lg btn-block mt-3">New Game</button>


                </div>
                <div className='rotate-device'>Please rotate your device to play MacroTactics</div>
            </div>
        )
    }
}

export default HomePage