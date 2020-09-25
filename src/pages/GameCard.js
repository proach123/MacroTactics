import React from 'react'
import {Card} from 'react-bootstrap'

const GameCard = (props) =>{

    console.log(props)


    return(
        <Card>
            <Card.Img variant='top' src={props.value.cardImg}/>
            <Card.Body>
                <Card.Title>
    {props.value.cardTitle} , {props.value.cardCost}
                </Card.Title>
                <Card.Text>
                    {props.value.cardType}:<br/>
                    {props.value.cardText}
                </Card.Text>
            </Card.Body>
        </Card>
    )

}

export default GameCard