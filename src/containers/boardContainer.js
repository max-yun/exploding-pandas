import React from 'react';
import { playerID } from '../index';
import Board from '../components/board';
import Hand from '../components/hand';
import PlayAreaContainer from './playAreaContainer';
import PlayerSidecardContainer from './playerSidecardContainer';
import GameLoggerContainer from './gameLoggerContainer';
import RegularPopUp from '../components/regularPopUp';
import PlayerPopUp from '../components/playerPopUp';
import NopePopUp from '../components/nopePopUp';
import ExplodePopUp from '../components/explodePopUp';
import CardPopUp from '../components/cardPopUp';

class BoardContainer extends React.Component {
    constructor(props) {
        super(props);
        this.drawCard = this.drawCard.bind(this);
        this.playCard = this.playCard.bind(this);
        this.setTargetPlayer = this.setTargetPlayer.bind(this);
        this.removeFutureState = this.removeFutureState.bind(this);
        this.handleNope = this.handleNope.bind(this);
        this.handleDefuse = this.handleDefuse.bind(this);
        this.acceptFate = this.acceptFate.bind(this);
        this.state = { targetPlayer: null, modalTarget: false, future: false, regular: false };
    }

    drawCard() {
        this.props.moves.drawCard();
    }

    playCard(cardID) {
        if (!this.isActive()) {
            // TODO: make fancier. Maybe just a big notice at the top indicating turn
            console.log('Not your turn!');
            return null;
        }
        this.props.moves.playCard(cardID);
        if (cardID.includes('future')) {
            this.setFutureState();
        }
    }

    setFutureState() {
        this.setState({ future: true});
    }

    removeFutureState() {
        this.setState({future: false});
    }

    setTargetPlayer(target, val=0, card=null) {
        this.props.moves.setTargetPlayer(target, val, card);
    }

    handleNope(played) {
        this.props.moves.handleNope(played);
    }

    handleDefuse(position) {
        this.props.moves.handleDefuse(position);
    }

    acceptFate() {
        this.props.moves.acceptFate(playerID);
    }

    isActive() {
        return this.props.ctx.currentPlayer === playerID;
    }

    render() {
        return (
            <Board>
                <RegularPopUp
                    show={this.props.G.regularInitiator === playerID}
                    regular={this.props.G.regular}
                    target={this.setTargetPlayer}
                    players={this.props.G.players}
                />
                <PlayerPopUp
                    show={this.props.G.initiator === playerID}
                    players={this.props.G.players}
                    target={this.setTargetPlayer}
                    card={this.props.G.lastCard}
                />
                <ExplodePopUp
                    show={this.props.G.exploding === playerID}
                    canDefuse={this.props.G.players[playerID].hand.includes('defuse')}
                    deckSize={this.props.G.deck.length}
                    onClick={this.handleDefuse}
                    onHide={this.acceptFate}
                />
                <NopePopUp
                    show={this.props.G.target === playerID}
                    onHide={this.handleNope}
                    card={this.props.G.lastCard}
                    player={this.props.ctx.currentPlayer}
                    disabled={!this.props.G.players[playerID].hand.includes('nope')}
                />
                <CardPopUp
                    show={this.state.future}
                    onHide={this.removeFutureState}
                    cards={this.props.G.future}
                    />
                <div id={'main'}>
                    <PlayerSidecardContainer
                        players={this.props.G.players}
                    />
                    <PlayAreaContainer
                        playCard={this.playCard}
                        lastCard={this.props.G.lastCard}
                    />
                    <GameLoggerContainer
                        messages={this.props.G.messages}
                    />
                </div>
                <div id={'bottom'}>
                    <div id={'bottom-left'}>
                        <button onClick={this.drawCard} id="draw-card">End Turn</button>
                    </div>
                    <Hand
                        hand={this.props.G.players[playerID].hand}
                    />
                    <div id={'bottom-right'}></div>
                </div>
            </Board>
        );
    }
}

export default BoardContainer;
