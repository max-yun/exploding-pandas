import React from 'react';
import { playerID } from "../index";
import { Board } from '../components/board';
import Hand from "../components/hand";

class BoardContainer extends React.Component {
    constructor(props) {
        super(props);
        this.drawCard = this.drawCard.bind(this);
        this.state = { hand: this.getHand() }
    }

    getHand() {
        return this.props.G.players[playerID].hand;
    }

    drawCard() {
        this.props.moves.drawCard();
        setTimeout(() => {
            this.setState({
                hand: this.getHand()
            })
        }, 10);

    }

    render() {
        return (
            <Board onClick={this.drawCard}>
                <Hand hand={this.state.hand}/>
            </Board>
        )
    }
}

export default BoardContainer;
