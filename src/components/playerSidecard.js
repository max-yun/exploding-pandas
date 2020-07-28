import React from 'react';
import PropTypes from 'prop-types';
import '../css/playerSidecard.css';
import ListGroup from 'react-bootstrap/ListGroup';

export const PlayerSidecard = (props) => {
    return (
        <ListGroup.Item>
            <p style={{margin: '0'}}>Player: { props.playerID }</p>
            <p style={{margin: '0'}}>Number of cards in hand: { props.numOfCards }</p>
        </ListGroup.Item>
    )
}

PlayerSidecard.propTypes = {
    playerID: PropTypes.string,
    numOfCards: PropTypes.number
}