import React from 'react';
import { playerID } from '../index';
import Board from '../components/board';
import Hand from '../components/hand';
import PlayAreaContainer from './playAreaContainer';
import PlayerSidecardContainer from './playerSidecardContainer';
import GameLoggerContainer from './gameLoggerContainer';
import PlayerPopUp from '../components/playerPopUp';
import NopePopUp from '../components/nopePopUp';

class BoardContainer extends React.Component {
    constructor(props) {
        super(props);
        this.drawCard = this.drawCard.bind(this);
        this.playCard = this.playCard.bind(this);
        this.removeTargetingState = this.removeTargetingState.bind(this);
        this.setTargetPlayer = this.setTargetPlayer.bind(this);
        this.handleNope = this.handleNope.bind(this);
        this.state = { targetPlayer: null, modalTarget: false, messages: ['Game has begun.'] };
    }

    drawCard() {
        this.props.moves.drawCard();
        if (this.isActive()) {
            this.addLog(this.props.ctx.currentPlayer + ' drew a card and ended turn.');
        }
    }

    playCard(cardID) {
        if (!this.isActive()) {
            // TODO: make fancier. Maybe just a big notice at the top indicating turn
            console.log('Not your turn!');
            return null;
        }
        this.props.moves.playCard(cardID);
        this.addLog(`${this.props.ctx.currentPlayer} played a ${cardID.split('-')[0]} + card.`);
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

    handleNope(played) {
        this.props.moves.handleNope(played);
        if (played) {
            this.addLog(`${this.props.G.target} played a nope card!`);
        } else {
            this.addLog(`${this.props.G.target} took it like a champ.`);
        }
    }

    setTargetPlayer(target) {
        this.props.moves.setTargetPlayer(target);
        if (this.isActive()) {
            // may need to be target.name
            this.addLog(`${this.props.ctx.currentPlayer} targeted ${target}.`);
        }
    }

    addLog(message) {
       this.setState((prevState) => ({
           messages: [
               ...prevState.messages,
               message
           ]
       }));
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
                        messages={this.state.messages}
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
