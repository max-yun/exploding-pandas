import React from 'react';
import ReactDOM from 'react-dom';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import { DndProvider} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Game } from './game';
import BoardContainer from './containers/boardContainer';
import 'bootstrap/dist/css/bootstrap.min.css';

export let playerID;

export const GameClient = Client({
    game: Game,
    numPlayers: 4,
    board: BoardContainer,
    multiplayer: SocketIO({ server: 'localhost:8080' }),
});

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { playerID : null}
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
                    <button onClick={() => {
                        this.setState({ playerID: "2" });
                        playerID = "2";
                    }
                    }>
                        Player 2
                    </button>
                    <button onClick={() => {
                        this.setState({ playerID: "3" });
                        playerID = "3";
                    }
                    }>
                        Player 3
                    </button>
                </div>
            );
        }
        return (
            <div>
                <DndProvider backend={HTML5Backend}>
                    <GameClient playerID={this.state.playerID} />
                </DndProvider>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
