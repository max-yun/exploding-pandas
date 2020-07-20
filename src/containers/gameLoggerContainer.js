import React from 'react';
import { GameLogger } from '../components/gameLogger';

class GameLoggerContainer extends React.Component {
    render() {
        const log = this.props.messages.map((message, index) =>
            <li key={index}>
                <p id={message + '-' + index}>
                    {message}
                </p>
            </li>
        )
        return <GameLogger messages={log}/>
    }
}

export default GameLoggerContainer;
