import React from 'react';
import PropTypes from 'prop-types';
import '../css/card.css';

export function Card(props) {
    return (
        <img src={require(`../images/${props.card}.svg`)}
             alt={props.id}
             id={props.id}
             className='card'
             onDragStart={props.onDragStart}
             onDragOver={props.onDragOver}
             draggable={true}
        />
    )
}

Card.propTypes = {
    id: PropTypes.string,
    onDragStart: PropTypes.func,
    onDragOver: PropTypes.func,
    card: PropTypes.string
}