import React from 'react';
import { playerID } from '../index';
import Board from '../components/board';
import Hand from '../components/hand';
import PlayAreaContainer from './playAreaContainer';
import PlayerSidecardContainer from './playerSidecardContainer';
import GameLoggerContainer from './gameLoggerContainer';
import PlayerPopUp from '../components/playerPopUp';
import NopePopUp from '../components/nopePopUp';
import ExplodePopUp from '../components/explodePopUp';

class BoardContainer extends React.Component {
    constructor(props) {
        super(props);
        this.drawCard = this.drawCard.bind(this);
        this.playCard = this.playCard.bind(this);
        this.removeTargetingState = this.removeTargetingState.bind(this);
        this.setTargetPlayer = this.setTargetPlayer.bind(this);
        this.handleNope = this.handleNope.bind(this);
        this.handleDefuse = this.handleDefuse.bind(this);
        this.acceptFate = this.acceptFate.bind(this);
        this.state = { targetPlayer: null, modalTarget: false };
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
        if (cardID.includes('attack')) {
            this.setTargetingState();
        }
    }

    setTargetingState() {
        this.setState({ modalTarget: true});
    }

    removeTargetingState() {
        this.setState({modalTarget: false});
    }

    setTargetPlayer(target) {
        this.props.moves.setTargetPlayer(target);
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
            <Board onClick={this.drawCard}>
                <PlayerPopUp
                    show={this.state.modalTarget}
                    onHide={this.removeTargetingState}
                    players={this.props.G.players}
                    target={this.setTargetPlayer}
                />
                <ExplodePopUp
                    show={this.props.G.exploding === playerID}
                    canDefuse={this.props.G.players[playerID].hand.includes('defuse')}
                    deckSize={this.props.G.deck.length}
                    onClick={this.handleDefuse}
                    // TODO: IMPLEMENT THIS SHIT
                    onHide={this.acceptFate}
                />
                <NopePopUp
                    show={this.props.G.target === playerID}
                    onHide={this.handleNope}
                    card={this.props.G.lastCard}
                    player={this.props.ctx.currentPlayer}
                    disabled={!this.props.G.players[playerID].hand.includes('nope')}
                />
                <div className={'main'}>
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
                <Hand
                    hand={this.props.G.players[playerID].hand}
                />
            </Board>
        );
    }
}

export default BoardContainer;
