import React from 'react';
import PropTypes from 'prop-types';
import '../css/playArea.css'

function PlayArea(props) {
    const drop = e => {
        e.preventDefault();
        const cardID = e.dataTransfer.getData('cardID');
        const card = document.getElementById(cardID);
        card.style.display = 'block';

        e.target.appendChild(card);
    }

    const dragOver = e => {
        e.preventDefault();
    }

    return (
        <div id={props.id}
            className={props.className}
            onDrop={drop}
            onDragOver={dragOver}
        >
            { props.children }
        </div>
    )
}

export default PlayArea;