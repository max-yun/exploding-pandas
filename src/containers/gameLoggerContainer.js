import React from 'react';
import { GameLogger } from '../components/gameLogger';

class GameLoggerContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { message: null };
        this.handleChange = this.handleChange.bind(this);
        this.handleSend = this.handleSend.bind(this);
    }

    handleChange(e) {
        this.setState({
            message: e.target.value
        });
    }

    handleSend() {
        if (this.state.message) {
            this.props.sendMessage(this.state.message);
            document.getElementById('log-send').reset();
            this.setState({ message: null });
        }
    }

    render() {
        return <GameLogger
            messages={this.props.messages}
            onChange={this.handleChange}
            onClick={this.handleSend}
        />
    }
}

export default GameLoggerContainer;
