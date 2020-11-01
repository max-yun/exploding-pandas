import React from 'react';
import Board from '../components/board';
import Hand from '../components/hand';
import WaitingRoom from '../components/waitingRoom';
import PlayAreaContainer from './playAreaContainer';
import PlayerSidecardContainer from './playerSidecardContainer';
import GameLoggerContainer from './gameLoggerContainer';
import PopUpRouter from '../components/popUpRouter';
import Button from 'react-bootstrap/Button';

class BoardContainer extends React.Component {
    constructor(props) {
        super(props);
        this.playerID = this.props.playerID;
        this.errorTimeout = null;
        this.startGame = this.startGame.bind(this);
        this.drawCard = this.drawCard.bind(this);
        this.playCard = this.playCard.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
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

    componentDidMount() {
        this.props.moves.setName(this.playerID, this.props.gameMetadata[parseInt(this.playerID)].name);
    }

    startGame() {
        this.props.moves.startGame();
    }

    drawCard() {
        if (!this.isActive()) {
            this.activateAlert('It\'s not your turn.');
            return null;
        }
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
        } else if (cardID.includes('Nope')) {
            this.activateAlert('A Nope card can only be played if you are targeted by someone.');
        } else if (cardID.includes('Future')) {
            this.setFutureState();
        }
        this.props.moves.playCard(cardID);
    }

    sendMessage(message, nonPlayer=false) {
        if (nonPlayer) {
            this.props.moves.sendMessage(message);
        } else {
            this.props.moves.sendMessage(message, this.playerID);
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
        this.props.moves.acceptFate(this.playerID);
    }

    isActive() {
        return this.props.ctx.currentPlayer === this.playerID;
    }

    render() {
        if (!this.props.G.started) {
            return <WaitingRoom
                gameID={this.props.gameID}
                playerID={this.props.playerID}
                host={this.props.playerID === '0'}
                credentials={this.props.credentials}
                gameMetadata={this.props.gameMetadata}
                startGame={this.startGame}
                messages={this.props.G.messages}
                sendMessage={this.sendMessage}
            />
        }

        let lastCard = this.props.G.playedCards[this.props.G.playedCards.length - 1];
        let turnHeader = 'Your Turn';
        let currentPlayer = this.props.ctx.currentPlayer;
        let playerObject = this.props.G.players[currentPlayer];
        let otherPlayers = JSON.parse(JSON.stringify(this.props.G.players));
        delete otherPlayers[this.playerID];
        if (currentPlayer !== this.playerID) {
            turnHeader = this.props.G.players[currentPlayer].name + '\'s Turn';
        }
        return (
            <Board>
                <PopUpRouter
                    showRegular={this.props.G.regularInitiator === this.playerID}
                    showPlayers={this.props.G.initiator === this.playerID}
                    showNope={this.props.G.target === this.playerID && !this.props.G.counterNope}
                    showExplode={this.props.G.exploding === this.playerID}
                    showFuture={this.state.future}
                    showCounterNope={this.props.G.counterNope === this.playerID}
                    players={otherPlayers}
                    count={this.props.G.regular}
                    target={this.setTargetPlayer}
                    playerObject={playerObject}
                    targetPlayerObject={this.props.G.players[this.props.G.target]}
                    handleNope={this.handleNope}
                    currentPlayer={this.props.ctx.currentPlayer}
                    deckSize={this.props.G.deck.length}
                    handleDefuse={this.handleDefuse}
                    acceptFate={this.acceptFate}
                    lastCard={lastCard}
                    stealCard={this.props.G.steal}
                    removeFutureState={this.removeFutureState}
                    futureCards={this.props.G.future}
                    playerID={this.playerID}
                    victory={this.props.ctx.gameover && this.props.ctx.gameover.winner === this.playerID}
                />
                <div id={'main'}>
                    <PlayerSidecardContainer
                        players={this.props.G.players}
                        current={currentPlayer}
                    />
                    <PlayAreaContainer
                        turnHeader={turnHeader}
                        playCard={this.playCard}
                        lastCard={lastCard}
                        deckSize={this.props.G.deck.length}
                    />
                    <GameLoggerContainer
                        messages={this.props.G.messages}
                        sendMessage={this.sendMessage}
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
                            hand={this.props.G.players[this.playerID].hand}
                        />
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Button variant="secondary" onClick={this.drawCard} id="draw-card">End Turn</Button>
                        </div>
                    </div>
                </div>
            </Board>
        );
    }
}

export default BoardContainer;
