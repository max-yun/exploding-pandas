import React from 'react';
import { withRouter } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import axios from 'axios';
import { API_PORT } from '../constants';
import FormControl from 'react-bootstrap/FormControl';
import '../css/joinGame.css';

class JoinGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            gameID: null,
        };
        this.changeName = this.changeName.bind(this);
        this.changeGameID = this.changeGameID.bind(this);
        this.joinGame = this.joinGame.bind(this);
        this.apiBase = (process.env.NODE_ENV === 'production') ? '/api' :
            `${window.location.protocol}//${window.location.hostname}:${API_PORT}`;
    }

    changeName(e) {
        this.setState({ name: e.target.value });
    }

    changeGameID(e) {
        this.setState({ gameID: e.target.value });
    }

    generatePlayerID(players) {
        for (let i = 0; i < players.length; i++) {
            if (players[i].name === undefined) {
                return i.toString();
            }
        }
        return null;
    }

    async joinGame(e) {
        e.preventDefault();
        if (this.state.name && this.state.gameID) {
            // Retrieve the room data to figure out the new player's ID
            const getRoomResponse = await axios
                .get(`${this.apiBase}/games/${this.state.gameID}`);

            let playerID = this.generatePlayerID(getRoomResponse.data.players, getRoomResponse.data.setupData);
            // Join the room
            try {
                const joinResponse = await axios
                    .post(`${this.apiBase}/join`, {
                        gameID: this.state.gameID,
                        playerName: this.state.name,
                        playerID: playerID,
                    });

                const credentials = joinResponse.data.playerCredentials;
                this.props.history.push({
                    pathname: `/${this.state.gameID}`,
                    state: {
                        gameID: this.state.gameID,
                        playerID: playerID,
                        credentials: credentials
                    }
                });
            } catch(e) {
                console.error(e);
                this.props.onHide();
                this.props.error();
            }
        }
    }

    render() {
        const { to, staticContext, error, ...rest } = this.props;
        return (
            <Modal
                {...rest}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Join a Game</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.joinGame}>
                        <Form.Group onChange={this.changeName}>
                            <Form.Label>Your name</Form.Label>
                            <Form.Control
                                placeholder="Enter name"
                                required={true}
                            />
                        </Form.Group>
                        <Form.Group onChange={this.changeGameID}>
                            <Form.Label>Game ID</Form.Label>
                            <FormControl
                                placeholder="Enter here"
                                aria-label="Name"
                                aria-describedby="basic-addon1"
                                required={true}
                            />
                        </Form.Group>
                        {/*<div id={'public-link'}>Or view all public games <a href={'#'}>here</a>.</div>*/}
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.props.onHide}>
                                Cancel
                            </Button>
                            <Button variant="primary" type={"submit"}>
                                Join game
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}

JoinGame.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    showError: PropTypes.func,
}

export default withRouter(JoinGame);
