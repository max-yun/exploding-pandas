import React from 'react';
import PropTypes from 'prop-types';
import '../css/gameCard.css';

export const GameCard = (props) => {
    if (props.card) {
        return (
            <img src={require(`../images/${props.card}.png`)}
                 alt={props.id}
                 style={{
                     width: '100%',
                     height: '100%',
                 }}
            />
        )
    }
    return null;
}

GameCard.propTypes = {
    id: PropTypes.string,
    card: PropTypes.string
}
