import React from 'react';
import PropTypes from 'prop-types';
import '../css/sidecard.css';

export const PlayerSidecard = (props) => {
    return (
        <div>
            <p>Player: { props.playerID }</p>
            <p>Number of cards in hand: { props.numOfCards }</p>
        </div>
    )
}

PlayerSidecard.propTypes = {
    playerID: PropTypes.string,
    numOfCards: PropTypes.number
}