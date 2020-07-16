import React from 'react';
import { playerID } from '../index';
import Board from '../components/board';
import Hand from '../components/hand';
import PlayAreaContainer from './playAreaContainer';
import PlayerSidecardContainer from './playerSidecardContainer';
import PlayerPopUp from '../components/playerPopUp';

class BoardContainer extends React.Component {
    constructor(props) {
        super(props);
        this.drawCard = this.drawCard.bind(this);
        this.playCard = this.playCard.bind(this);
        this.playAttackCard = this.playAttackCard.bind(this);
        this.removeTarget = this.removeTarget.bind(this);
        this.state = { targetPlayer: null, modalTarget: false };
    }

    drawCard() {
        this.props.moves.drawCard();
    }

    playCard(cardID) {
        if (this.props.ctx.currentPlayer !== playerID) {
            // TODO: make fancier. Maybe just a big notice at the top indicating turn
            console.log('Not your turn!');
            return null;
        }
        if (cardID.includes('attack')) {
            this.setTarget();
        }
        this.props.moves.playCard(cardID);
    }

    setTarget() {
        this.setState({ modalTarget: true});
    }

    playAttackCard(target) {
        const hand = this.props.G.players[target].hand;
        hand.push(this.props.G.deck.pop());
        hand.push(this.props.G.deck.pop());
        // this.props.moves.playCard('attack', target);
    }

    removeTarget() {
        this.setState({modalTarget: false});
    }

    render() {
        return (
            <Board onClick={this.drawCard}>
                <PlayerPopUp
                    show={this.state.modalTarget}
                    hide={this.removeTarget}
                    players={this.props.G.players}
                    attack={this.playAttackCard}
                />
                <div className={'main'}>
                    <PlayerSidecardContainer
                        players={this.props.G.players}
                    />
                    <PlayAreaContainer
                        playCard={this.playCard}
                        lastCard={this.props.G.lastCard}
                    />
                </div>
                <Hand
                    hand={this.props.G.players[playerID].hand}
                />
            </Board>
        )
    }
}

export default BoardContainer;
