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
import Button from 'react-bootstrap/Button';

class BoardContainer extends React.Component {
    constructor(props) {
        super(props);
        this.errorTimeout = null;
        this.drawCard = this.drawCard.bind(this);
        this.playCard = this.playCard.bind(this);
        this.activateAlert = this.activateAlert.bind(this);
        this.setTargetPlayer = this.setTargetPlayer.bind(this);
        this.removeFutureState = this.removeFutureState.bind(this);
        this.handleNope = this.handleNope.bind(this);
        this.handleDefuse = this.handleDefuse.bind(this);
        this.acceptFate = this.acceptFate.bind(this);
        this.state = {
            future: false,
            alert: null,
            fading: false
        };
    }

    drawCard() {
        this.props.moves.drawCard();
    }

    activateAlert(message) {
        clearTimeout(this.errorTimeout);
        this.setState({ alert: message });
        this.setState({ fading: true });
        this.errorTimeout = setTimeout(() => {
            this.setState({
                fading: false
            });
        }, 3000);
    }

    playCard(cardID) {
        this.props.moves.playCard(cardID);
        // Error message for when inactive
        if (!this.isActive()) {
            this.activateAlert('It\'s not your turn.');
            return null;
        }
        // Error message for lacking regular cards
        if (cardID.includes('Regular')) {
            if (this.props.G.regular < 2) {
                this.activateAlert('You need more of the same card to play that.');
            }
        } else if (cardID.includes('Defuse')) {
            this.activateAlert('A Defuse card will only be played if you draw an Exploding Panda.');
        } else if (cardID.includes('future')) {
            this.setFutureState();
        }
    }

    setFutureState() {
        this.setState({ future: true });
    }

    removeFutureState() {
        this.setState({ future: false });
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
        let turnHeader = 'Your Turn';
        let currentPlayer = this.props.ctx.currentPlayer;
        let playerObject = this.props.G.players[currentPlayer];
        if (currentPlayer !== playerID) {
            turnHeader = this.props.G.players[currentPlayer].name + '\'s Turn';
        }

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
                    canDefuse={playerObject.hand.includes('defuse')}
                    deckSize={this.props.G.deck.length}
                    onClick={this.handleDefuse}
                    onHide={this.acceptFate}
                />
                <NopePopUp
                    show={this.props.G.target === playerID}
                    onHide={this.handleNope}
                    card={this.props.G.lastCard}
                    player={currentPlayer}
                    count={this.props.G.regular}
                    steal={this.props.G.steal}
                    disabled={!playerObject.hand.includes('nope')}
                />
                <CardPopUp
                    show={this.state.future}
                    onHide={this.removeFutureState}
                    cards={this.props.G.future}
                    />
                <h1 id={'turn-order'}>{turnHeader}</h1>
                <div id={'main'}>
                    <PlayerSidecardContainer
                        players={this.props.G.players}
                        current={currentPlayer}
                    />
                    <PlayAreaContainer
                        playCard={this.playCard}
                        lastCard={this.props.G.lastCard}
                    />
                    <GameLoggerContainer
                        messages={this.props.G.messages}
                    />
                </div>
                <div id={'alert'}>
                    <span id={this.state.fading ? 'alert-text' : ''}>
                        {this.state.alert}
                    </span>
                </div>

                <div id={'bottom'}>
                    <div id={this.props.G.target != null ? 'inactive' : ''}>
                        <Hand
                            hand={this.props.G.players[playerID].hand}
                        />
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Button variant="primary" onClick={this.drawCard} id="draw-card">End Turn</Button>
                        </div>
                    </div>
                </div>
            </Board>
        );
    }
}

export default BoardContainer;
