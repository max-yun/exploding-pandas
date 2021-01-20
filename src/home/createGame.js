import React from 'react';
import { withRouter } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import axios from 'axios';
import { API_PORT } from '../constants';
import InputGroup from 'react-bootstrap/InputGroup';
import { setupPlayers } from '../helpers';
import '../css/createGame.css';

class CreateGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            numPlayers: 2,
            unlisted: false,
        };
        this.changeName = this.changeName.bind(this);
        this.changeNumPlayers = this.changeNumPlayers.bind(this);
        this.changeUnlisted = this.changeUnlisted.bind(this);
        this.createGame = this.createGame.bind(this);
        // this.apiBase = (process.env.NODE_ENV === 'production') ? '/api' :
        //     `${window.location.protocol}//${window.location.hostname}:${API_PORT}`;
        this.apiBase = `${window.location.protocol}//${window.location.hostname}:${API_PORT}`;
    }

    changeName(e) {
        this.setState({ name: e.target.value });
    }

    changeNumPlayers(e) {
        this.setState({ numPlayers: parseInt(e.target.value) });
    }

    changeUnlisted(e) {
        this.setState({ unlisted: parseInt(e.target.value) });
    }

    async createGame(e) {
        e.preventDefault();
        if (this.state.name) {
            const createResponse = await axios
                .post(`${this.apiBase}/create`, {
                    numPlayers: this.state.numPlayers,
                    setupData: setupPlayers(this.state.numPlayers, this.state.name),
                    unlisted: this.state.unlisted,
                });

            const gameID = createResponse.data.gameID;

            const joinResponse = await axios
                .post(`${this.apiBase}/join`, {
                    gameID: gameID,
                    playerName: this.state.name,
                    playerID: '0',
                });

            const credentials = joinResponse.data.playerCredentials;

            this.props.history.push({
                pathname: `/${gameID}`,
                state: {
                    gameID: gameID,
                    playerID: '0',
                    credentials: credentials
                }
            });
        }
    }

    render() {
        const { to, staticContext, ...rest } = this.props;
        return (
            <Modal
                {...rest}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create a Game</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.createGame}>
                        <Form.Group onChange={this.changeName}>
                            <Form.Label>Your name</Form.Label>
                            <Form.Control
                                placeholder="Enter name"
                                required={true}
                            />
                        </Form.Group>
                        <Form.Group onChange={this.changeNumPlayers}>
                            <Form.Label>Number of players:</Form.Label>
                            <Form.Control as="select">
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                            </Form.Control>
                        </Form.Group>
                        <InputGroup id="public" onChange={this.changeUnlisted}>
                            <Form.Label>Visible to public:</Form.Label>
                            {['radio'].map((type) => (
                                <div key={`default-${type}`} className="mb-3">
                                    <Form.Check
                                        inline label="Yes"
                                        type={type}
                                        value={1}
                                        name={'public'}
                                        id={`inline-${type}-yes`}
                                    />
                                    <Form.Check
                                        inline label="No"
                                        type={type}
                                        value={0}
                                        name={'public'}
                                        id={`inline-${type}-no`}
                                        defaultChecked
                                    />
                                </div>
                            ))}
                        </InputGroup>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.props.onHide}>
                                Cancel
                            </Button>
                            <Button variant="primary" type={"submit"}>
                                Create game
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}

CreateGame.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
}

export default withRouter(CreateGame);
