import React from 'react';
import ReactDOM from 'react-dom';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import { Game } from './game';
import BoardContainer from './containers/boardContainer';
import Area from './components/playArea';

export let playerID;

export const GameClient = Client({
    game: Game,
    board: BoardContainer,
    multiplayer: SocketIO({ server: 'localhost:8080' }),
});

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { playerID : null}
    }

    getPlayerID() {
        return this.state.playerID;
    }

    render() {
        if (this.state.playerID === null) {
            return (
                <div>
                    <p>Play as</p>
                    <button onClick={() => {
                        this.setState({ playerID: "0" });
                        playerID = "0";
                        }
                    }>
                        Player 0
                    </button>
                    <button onClick={() => {
                        this.setState({ playerID: "1" });
                        playerID = "1";
                        }
                    }>
                        Player 1
                    </button>
                </div>
            );
        }
        return (
            <div>
                <Area id="play-area" class="box" />
                <GameClient playerID={this.state.playerID} />
                {/*<HandContainer playerID={this.state.playerID} />*/}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
