import React, {useState} from 'react';
import {Link, useRouteMatch} from 'react-router-dom'
import Deck from './Deck'

const Decks = () => {

    const [deckList, setDeckList] =useState([{
        deckName: 'Goblins',
        deckData: {}
    },
    {
        deckName: 'Elves',
        deckData: {}
    }
    ])


// TODO: route to the decks with lil deck icons

    let {path, url} = useRouteMatch();

    return(
        <div>
            <h3> Your Decks </h3>

            <div>

                {deckList.map((deck) => {
                    return(
                        <div>
                            <Link to={`${url}/${deck.deckName}`}>
                            {deck.deckName}
                            </Link>

                        </div>
                    )
                })}

            </div>




        </div>
    )
}

export default Decks

// <Deck key={deck.deckName} value={deck.deckData}></Deck>