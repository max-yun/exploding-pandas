import React from 'react';
import PropTypes from 'prop-types';
import { GameCard } from '../components/gameCard';
import { useDrag } from 'react-dnd';
import { ItemTypes } from "../constants";

const GameCardContainer = (props) => {
    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.CARD, id: props.id },
        collect: monitor => ({
            item: monitor.getItem(),
            isDragging: !!monitor.isDragging(),
        })
    })
    if (!props.card) {
        return (
            <div
                className={'game-card'}
                id={props.id}
                ref={drag}
                style={{
                    boxShadow: '0',
                    borderRadius: '0',
                }}
            />
        )
    }
    return (
        <div
            className={'game-card'}
            id={props.id}
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            <GameCard card={props.card}/>
        </div>
    )
}

export default GameCardContainer;

GameCardContainer.propTypes = {
    id: PropTypes.string,
    // Currently, refers to the card's type, eg. 'regular' or 'attack'
    card: PropTypes.string
}
