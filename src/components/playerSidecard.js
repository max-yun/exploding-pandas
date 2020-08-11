import React from 'react';
import PropTypes from 'prop-types';
import '../css/playerSidecard.css';
import ListGroup from 'react-bootstrap/ListGroup';

export const PlayerSidecard = (props) => {
    if (props.active) {
        return (
            <ListGroup.Item active>
                <p style={{margin: '0'}}>Player: { props.name }</p>
                <p style={{margin: '0'}}>Number of cards in hand: { props.numOfCards }</p>
            </ListGroup.Item>
        )
    } else {
        return (
            <ListGroup.Item className={props.alive ? '' : 'dead-player'}>
                <p style={{margin: '0'}}>Player: { props.name }</p>
                <p style={{margin: '0'}}>Number of cards in hand: { props.numOfCards }</p>
            </ListGroup.Item>
        )
    }
}

PlayerSidecard.propTypes = {
    name: PropTypes.string,
    numOfCards: PropTypes.number,
    active: PropTypes.bool,
    alive: PropTypes.bool,
}