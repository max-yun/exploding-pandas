import React from 'react';
import { GameLogger } from '../components/gameLogger';

class GameLoggerContainer extends React.Component {
    render() {
        const log = this.props.messages.map((message, index) =>
            <li key={index}>
                {message}
            </li>
        )
        return <GameLogger messages={log}/>
    }
}

export default GameLoggerContainer;
