
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
            <div>

                <button onClick={ () => this.startGame() } className="btn btn-info btn-lg btn-block mt-3">New Game</button>

            </div>
        )
    }
}

export default HomePage