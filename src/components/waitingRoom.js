import React from 'react';
import PropTypes from 'prop-types';
import GameLoggerContainer from '../containers/gameLoggerContainer';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { API_PORT } from '../constants';
import '../css/waitingRoom.css';

class WaitingRoom extends React.Component {
    constructor(props) {
        super(props);
        this.leaveGame = this.leaveGame.bind(this);
        this.loadRoom = this.loadRoom.bind(this);
        this.copy = this.copy.bind(this);
        this.state = {
            filled: false,
            players: [],
            copyMessage: null,
            timer: null,
        };
        // this.apiBase = (process.env.NODE_ENV === 'production') ? '/api' :
        //     `${window.location.protocol}//${window.location.hostname}:${API_PORT}`;
        this.apiBase = `http://localhost:${API_PORT}`;
    }

    componentDidMount() {
        this.loadRoom();
        this.setState({timer: setInterval(this.loadRoom, 5000)});
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    async loadRoom() {
        const getRoomResponse = await axios
            .get(`${this.apiBase}/games/${this.props.gameID}`);
        let players = getRoomResponse.data.players;

        let arr = [];
        for (let i = 0; i < players.length; i++) {
            if (players[i].name !== undefined) {
                arr.push(players[i]);
            }
        }

        // let newPlayers = arr.filter(e => !this.inPlayers(this.state.players, e));
        // let oldPlayers = this.state.players.filter(e => !this.inPlayers(arr, e));
        // newPlayers.forEach(player => {
        //     this.props.sendMessage(`${player.name} joined the game.`, true);
        // });
        // oldPlayers.forEach(player => {
        //     this.props.sendMessage(`${player.name} left the game.`, true);
        // });

        this.setState({ players: arr });

        // Allow game to be started
        if (this.state.players.length === this.props.gameMetadata.length) {
            this.setState({ filled: true });
        } else {
            this.setState({ filled: false });
        }
    }

    leaveGame() {
        try {
            axios
                .post(`${this.apiBase}/leave/${this.props.gameID}`, {
                    playerID: this.props.playerID,
                    credentials: this.props.credentials,
                });
            // this.props.sendMessage(`${this.state.players[this.props.playerID].name} left the game.`, true);
            this.props.history.push({
                pathname: `/`,
            });
        } catch(e) {

        }

    }

    copy() {
        const el = document.createElement('textarea');
        el.value = this.props.gameID;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        this.setState({copyMessage : 'Copied!'});
        setTimeout(() => {
            this.setState({copyMessage: null});
        }, 800);
    }

    render() {
        let title;
        if (this.state.filled) {
            if (!this.props.host) {
                title = <h1 className={'loading'}>Waiting for Host to Start</h1>;
            } else {
                title = <h1>Game is Ready to Start!</h1>;
            }
        } else {
            title = <h1 className={'loading'}>Waiting for additional players</h1>;
        }

        let players = this.state.players
            .map((player, index) =>
                <li
                    key={index}
                    className={'player-card'}
                >
                    Player {index + 1}: {player.name}
                </li>
            );

        return (
            <div id={'waiting-room'}>
                <div id={'waiting-room-child-left'}>
                    {title}
                    <div id={'room-link'}>
                        <div>
                            <span>Share this code for others to join:</span>
                            <span id={'game-id'} onClick={this.copy}>{this.props.gameID}</span>
                            <span>{this.state.copyMessage}</span>
                        </div>
                    </div>
                    <div id={'joined-players'}>
                        <h2>Players in the room:</h2>
                        <div id={'players-list'}>{players}</div>
                    </div>
                        <div id={'start-cancel-buttons'}>
                            {this.props.host &&
                            <Button variant="primary" onClick={this.props.startGame} disabled={!this.state.filled}>
                                {this.state.filled ? 'Start game' : 'Waiting for players...'}
                            </Button>
                            }
                            <Button variant="secondary" onClick={this.leaveGame}>
                                Leave game
                            </Button>
                        </div>
                </div>
                <div id={'waiting-room-child-right'}>
                    <GameLoggerContainer
                        messages={this.props.messages}
                        sendMessage={this.props.sendMessage}
                    />
                </div>
            </div>
        )
    }
}

WaitingRoom.propTypes = {
    gameID: PropTypes.string,
    playerID: PropTypes.string,
    host: PropTypes.bool,
    credentials: PropTypes.string,
    gameMetadata: PropTypes.array,
    startGame: PropTypes.func,
    messages: PropTypes.array,
    sendMessage: PropTypes.func,
}

export default withRouter(WaitingRoom);