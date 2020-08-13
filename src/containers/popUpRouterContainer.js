import React from 'react';
import PropTypes from 'prop-types';
import RegularPopUp from '../components/regularPopUp';
import PlayerPopUp from '../components/playerPopUp';
import NopePopUp from '../components/nopePopUp';
import ExplodePopUp from '../components/explodePopUp';
import CardPopUp from '../components/cardPopUp';
import CounterNopePopUp from '../components/counterNopePopUp';

export default function PopUpRouterContainer(props) {
    if (props.showRegular) {
        return <RegularPopUp
            show={true}
            regular={props.count}
            target={props.target}
            players={props.players}
        />
    } else if (props.showPlayers) {
        return <PlayerPopUp
            show={true}
            target={props.target}
            players={props.players}
            card={props.lastCard}
            />
    } else if (props.showNope) {
        return <NopePopUp
            show={true}
            onHide={props.handleNope}
            showCounter={props.showCounterNope}
            card={props.lastCard}
            player={props.currentPlayer}
            count={props.count}
            steal={props.stealCard}
            disabled={!props.targetPlayerObject.hand.includes('Nope')}
        />
    } else if (props.showCounterNope) {
        return <CounterNopePopUp
            show={true}
            onHide={props.handleNope}
            disabled={!props.playerObject.hand.includes('Nope')}
            />
    } if (props.showFuture) {
        return <CardPopUp
            show={true}
            onHide={props.removeFutureState}
            cards={props.futureCards}
            />
    } else if (props.showExploding) {
        return <ExplodePopUp
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

PopUpRouterContainer.propTypes = {
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
}