import React from 'react';
import PropTypes from 'prop-types';
import GameCardContainer from '../containers/gameCardContainer';
import '../css/hand.css';

class Hand extends React.Component {
    render() {
        const hand = this.props.hand.map((card, index) =>
            <li
                className={'game-card-container'}
                key={index}>
                <GameCardContainer card={card}
                                   id={card + '-' + index}
                />
            </li>
        )
        return (
            <ul id={'hand'}>{hand}</ul>
        )
    }
}

export default Hand;

Hand.propTypes = {
    hand: PropTypes.array.isRequired,
    active: PropTypes.bool
}