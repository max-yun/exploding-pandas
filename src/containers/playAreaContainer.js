import React from 'react';
import PlayArea from "../components/playArea";
import PropTypes from 'prop-types';
import '../css/playArea.css'
import { useDrop } from "react-dnd";
import { ItemTypes } from "../constants";
import GameCardContainer from './gameCardContainer';

function PlayAreaContainer(props) {
    const [{ isDragging}, drop] = useDrop({
        accept: ItemTypes.CARD,
        drop: monitor => props.playCard(monitor.id),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
            isDragging: !!monitor.getItemType(),
        }),
    })

    return (
            <PlayArea ref={drop}
                      lastCard={props.lastCard}
                      deckSize={props.deckSize}
                      turnHeader={props.turnHeader}
            >
                {isDragging && (
                    <div style={{
                        margin: '0 auto',
                        height: '100%',
                        width: '100%',
                        zIndex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 'inset 0 0 0 3px #3a3a3a',
                        position: 'absolute',
                        backgroundColor: 'white',

                    }}
                    >
                        Drop card here
                    </div>
                )}
                <GameCardContainer
                    id={'last-card'}
                    card={props.lastCard}
                />
            </PlayArea>
    )
}

export default PlayAreaContainer;

PlayAreaContainer.propTypes = {
    turnHeader: PropTypes.string,
    playCard: PropTypes.func,
    lastCard: PropTypes.string
}
