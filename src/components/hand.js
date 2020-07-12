import React from 'react';
import PropTypes from 'prop-types';
import CardContainer from "../containers/cardContainer";

class Hand extends React.Component {
    render() {
        const hand = this.props.hand.map((card, index) =>
            <li key={index}>
                <CardContainer name={card}
                               id={card + index}/>
            </li>
        )
        return (
            <ul>{hand}</ul>
        )
    }
}

export default Hand;

Hand.propTypes = {
    hand: PropTypes.array.isRequired
}