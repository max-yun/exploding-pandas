import React from 'react';
import PropTypes from 'prop-types';
import '../css/playerSidecard.css';
import ListGroup from 'react-bootstrap/ListGroup';

export const PlayerSidecard = (props) => {
    if (props.active) {
        return (
            <ListGroup.Item active>
                <div>
                    <div><h5>Player: { props.name }</h5></div>
                    <div>Number of cards in hand: { props.numOfCards }</div>
                </div>
            </ListGroup.Item>
        )
    } else {
        return (
            <ListGroup.Item className={props.alive ? '' : 'dead-player'}>
                <div>
                    <div><h5>Player: { props.name }</h5></div>
                    <div>Number of cards in hand: { props.numOfCards }</div>
                </div>
                    {!props.alive &&
                    <img src={require("../images/Dead.png")} className={"dead-icon"} alt={"dead-icon"}/>
                    }
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