import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Button from 'react-bootstrap/Button';
import { playerID } from '../app';

function PlayerCards(props) {
    function handleClick(e) {
        props.target(e.target.value);
    }

    const playerCards = Object.keys(props.players)
        .filter(player => player !== playerID && props.players[player].alive)
        .map((player, index) =>
        <Card key={player + index} className="text-center" style={{marginBottom: 15}}>
            <Card.Body>
                <Card.Title>Player { player }</Card.Title>
                <Card.Text>Number of cards: { props.players[player].hand.length }</Card.Text>
                <Button variant="primary" value={player} onClick={handleClick}>Select</Button>
            </Card.Body>
        </Card>
    );
    return (
        <CardDeck style={{margin: 0}}>
            { playerCards }
        </CardDeck>
    )
}

export default PlayerCards;

PlayerCards.propTypes = {
    players: PropTypes.object,
    target: PropTypes.func,
}
