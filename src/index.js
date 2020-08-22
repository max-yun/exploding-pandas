import React from 'react';
import ReactDOM from 'react-dom';
import { Client } from 'boardgame.io/client';
import { SocketIO } from 'boardgame.io/multiplayer';
import { Lobby } from 'boardgame.io/react';
import { DndProvider} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ExplodingPandas } from './game';
import BoardContainer from './containers/boardContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { INTERNAL_API_PORT, SERVER_PORT } from './constants';
import Home from './home/home';

export let playerID;

export const GameClient = Client({
    game: ExplodingPandas,
    numPlayers: 4,
    board: BoardContainer,
    multiplayer: SocketIO({ server: `localhost:${SERVER_PORT}` }),
    debug: false
});

const importedGames = [
    { game: ExplodingPandas, board: BoardContainer },
];

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { playerID : null}
    }

    render() {
        if (this.state.playerID === null) {
            return (
                <Home />
                // <Lobby
                //     gameServer={`http://${window.location.hostname}:${SERVER_PORT}`}
                //     lobbyServer={`http://${window.location.hostname}:${INTERNAL_API_PORT}`}
                //     gameComponents={importedGames}
                // />
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
