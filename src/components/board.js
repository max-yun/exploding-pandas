import React from 'react';
import PropTypes from 'prop-types';
import '../css/board.css';

export function Board(props) {
    return (
        <div>
            <button onClick={props.onClick} id="draw-card">End Turn and Draw Card</button>
            {props.children}
        </div>
    )
}

Board.propTypes = {
    onClick: PropTypes.func
}