import React from 'react'
import {Switch} from 'react-router-dom'

import Route from './Route'

import Landing from '../pages/Landing'
import Decks from '../pages/Decks'
import Deck from '../pages/Deck'
import Test from '../pages/Test'

export default function Routes(){
    return(
        <Switch>

            <Route exact path='/'  component={Landing}></Route>
            <Route exact path='/decks'  component={Decks}></Route>
            
            <Route path='/decks/:id' children ={<Deck />} />

        </Switch>
    )
}
