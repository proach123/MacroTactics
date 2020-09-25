import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Row, Image, Jumbotron, Button} from 'react-bootstrap'
import townpic from '../siteImages/Townhall.png'

const Landing = () => {

    

    return(
        <Container fluid>
            <Jumbotron>
                <h1>Welcome to MacroTactics</h1>
                <p>The Groundbreaking New Competative Deckbuilder-Hybrid Card Game from Patrick Roach</p>
                <p>
                    {/* <Image src={townpic}></Image> */}
                </p>
                <p>
                    <Button href="/decks" variant='primary'>
                        See Decks
                    </Button>
                </p>
            </Jumbotron>
            <Container>

                <Row>What is MacroTactics?</Row>

                <Row>
                    <Link to='/decks'>decks</Link>
                </Row>

                <Row>Have any questions for me? Email me at patrickevanroach@gmail.com</Row>
            </Container>
        </Container>
    )
}

export default Landing