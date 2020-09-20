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
import Cards from './home/cards';
import HowToPlay from './home/howToPlay';
import ErrorPage from './home/errorPage';
import './css/main.css';

export function Routes() {
    return (
        <Switch>
            <Route exact path={'/'} component={Main}/>
            <Route path={'/about'} component={About}/>
            <Route path={'/how-to-play'} component={HowToPlay}/>
            <Route path={'/cards'} component={Cards}/>
            <Route path={'/:gameID'} component={App}/>
        </Switch>
    )
}

const GameClient = Client({
    game: ExplodingPandas,
    board: BoardContainer,
    debug: false,
    multiplayer: SocketIO({ server: `${window.location.hostname}:${SERVER_PORT}` }),
});

// Tried to put this in its own file but comes up with some React error
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameID: null,
            playerID: null,
            credentials: null,
            error: false,
        }
    }

    componentDidMount() {
        try {
            this.setState({ gameID: this.props.location.state.gameID });
            this.setState({ playerID: this.props.location.state.playerID });
            this.setState({ credentials: this.props.location.state.credentials });
        } catch(e) {
            this.setState({ error: true });
        }

    }

    render() {
        if (this.state.error) {
            return (
                <ErrorPage />
            )
        }
        return (
            <div>
                <DndProvider backend={HTML5Backend}>
                    <GameClient
                        gameID={this.state.gameID}
                        playerID={this.state.playerID}
                        credentials={this.state.credentials}
                    />
                </DndProvider>
            </div>
        );
    }
}
