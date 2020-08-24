import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Client } from 'boardgame.io/client';
import { ExplodingPandas } from './game';
import BoardContainer from './containers/boardContainer';
import { SocketIO } from 'boardgame.io/multiplayer';
import { SERVER_PORT } from './constants';

const GameClient = Client({
    game: ExplodingPandas,
    numPlayers: 4,
    board: BoardContainer,
    multiplayer: SocketIO({ server: `localhost:${SERVER_PORT}` }),
    debug: false
});

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { playerID: null };
    }
    render() {
        return (
            <div>
                <DndProvider backend={HTML5Backend}>
                    <GameClient playerID={this.state.playerID} />
                </DndProvider>
            </div>
        );
    }
}

export default App;
