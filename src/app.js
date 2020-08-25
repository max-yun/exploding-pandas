import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import { DndProvider} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ExplodingPandas } from './game';
import { SERVER_PORT } from './constants';
import BoardContainer from './containers/boardContainer';
import Main from './home/main';
import About from './home/about';
import Rules from './home/rules';
import './css/main.css';

export function Routes() {
    return (
        <Switch>
            <Route exact path='/' component={Main}/>
            <Route path='/about' component={About}/>
            <Route path='/how-to-play' component={Rules}/>
            <Route path={'/:gameID'} component={App}/>
        </Switch>
    )
}

const GameClient = Client({
    game: ExplodingPandas,
    numPlayers: 4,
    board: BoardContainer,
    multiplayer: SocketIO({ server: `${window.location.hostname}:${SERVER_PORT}` }),
});

// Tried to put this in its own file but comes up with some React error
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameID: null,
            playerID : '1',
        }
    }

    componentDidMount() {
        this.setState({ gameID: this.props.location.state.gameID} );
    }

    render() {
        return (
            <div>
                <DndProvider backend={HTML5Backend}>
                    <GameClient gameID={this.state.gameID} playerID={this.state.playerID} />
                </DndProvider>
            </div>
        );
    }
}
