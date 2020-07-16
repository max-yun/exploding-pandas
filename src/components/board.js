import React from 'react';
import PropTypes from 'prop-types';
import '../css/board.css';

function Board(props) {
    return (
        <div className={'board'}>
            {props.children}
            <button onClick={props.onClick} id="draw-card">End Turn and Draw Card</button>
        </div>
    )
}

Board.propTypes = {
    onClick: PropTypes.func
}

export default Board;
