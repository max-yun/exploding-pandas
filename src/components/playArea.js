import React from 'react';
import '../css/playArea.css'
import Deck from './deck';

const PlayArea = React.forwardRef((props, ref) => (
    <div id={'play-area'}>
        <h1 id={'turn-order'}>{props.turnHeader}</h1>
        <div id={'play-pile-deck'}>
            <div ref={ref} id={'play-pile'}>
                { props.children }
            </div>
            <Deck deckSize={props.deckSize}/>
        </div>
    </div>
));

export default PlayArea;
