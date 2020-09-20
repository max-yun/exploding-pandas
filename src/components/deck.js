import React from 'react';
import { GameCard } from './gameCard';

export default function Deck(props) {
    let deck = [...Array(props.deckSize)].map((e, i) =>
        <div key={i} className={'game-card deck-card'}>
            <GameCard card={'Card-Back'} />
        </div>
    );
    let remaining;
    if (props.deckSize) {
        remaining = 'Cards remaining: ' + props.deckSize;
    }
    return (
        <div id={'deck-pile'}>
            <div id={'deck'}>
                {deck}
            </div>
            {remaining}
        </div>
    );
}
