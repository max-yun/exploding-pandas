import React from 'react';
import PropTypes from 'prop-types';
import PopUpRegular from './popUpRegular';
import PopUpPlayer from './popUpPlayer';
import PopUpNope from './popUpNope';
import PopUpExplode from './popUpExplode';
import PopUpCard from './popUpCard';
import PopUpNopeCounter from './popUpNopeCounter';
import PopUpVictory from './popUpVictory';

export default function PopUpRouter(props) {
    if (props.victory) {
        return <PopUpVictory
            show={true}
            />
    } else if (props.showRegular) {
        return <PopUpRegular
            show={true}
            regular={props.count}
            target={props.target}
            players={props.players}
        />
    } else if (props.showPlayers) {
        return <PopUpPlayer
            show={true}
            target={props.target}
            players={props.players}
            card={props.lastCard}
            />
    } else if (props.showNope) {
        return <PopUpNope
            show={true}
            onHide={props.handleNope}
            showCounter={props.showCounterNope}
            card={props.lastCard}
            player={props.playerObject}
            count={props.count}
            steal={props.stealCard}
            disabled={!props.targetPlayerObject.hand.includes('Nope')}
        />
    } else if (props.showCounterNope) {
        return <PopUpNopeCounter
            show={true}
            onHide={props.handleNope}
            disabled={!props.playerObject.hand.includes('Nope')}
            />
    } if (props.showFuture) {
        return <PopUpCard
            show={true}
            onHide={props.removeFutureState}
            cards={props.futureCards}
            />
    } else if (props.showExplode) {
        return <PopUpExplode
            show={true}
            canDefuse={props.playerObject.hand.includes('Defuse')}
            deckSize={props.deckSize}
            onClick={props.handleDefuse}
            onHide={props.acceptFate}
        />
    } else {
        return null;
    }
}

PopUpRouter.propTypes = {
    showRegular: PropTypes.bool,
    showPlayers: PropTypes.bool,
    showNope: PropTypes.bool,
    showCounterNope: PropTypes.bool,
    showExploding: PropTypes.bool,
    showFuture: PropTypes.bool,
    players: PropTypes.object,
    count: PropTypes.number,
    target: PropTypes.func,
    playerObject: PropTypes.object,
    handleNope: PropTypes.func,
    currentPlayer: PropTypes.string,
    deckSize: PropTypes.number,
    handleDefuse: PropTypes.func,
    acceptFate: PropTypes.func,
    lastCard: PropTypes.string,
    stealCard: PropTypes.string,
    removeFutureState: PropTypes.func,
    futureCards: PropTypes.array,
    playerID: PropTypes.string,
}