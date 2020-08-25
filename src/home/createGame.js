import React from 'react';
import { withRouter } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import axios from 'axios';
import { API_PORT, INTERNAL_API_PORT } from '../constants';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import '../css/createGame.css';

class CreateGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            numPlayers: 2,
            public: false,
        };
        this.changeName = this.changeName.bind(this);
        this.changeNumPlayers = this.changeNumPlayers.bind(this);
        this.changePublic = this.changePublic.bind(this);
        this.createGame = this.createGame.bind(this);
        this.apiBase = (process.env.NODE_ENV === 'production') ? '/api' :
            `${window.location.protocol}//${window.location.hostname}:${API_PORT}`;
    }

    changeName(e) {
        this.setState({ name: e.target.value });
    }

    changeNumPlayers(e) {
        this.setState({ numPlayers: e.target.value });
    }

    changePublic(e) {
        this.setState({ public: e.target.value });
    }

    async createGame(e) {
        e.preventDefault();
        if (this.state.name) {
            const createResponse = await axios
                .post(`${this.apiBase}/create`, {
                    numPlayers: this.state.numPlayers,
                    public: this.state.public,
                });

            const gameID = createResponse.data.gameID;

            const joinResponse = await axios
                .post(`${this.apiBase}/join`, {
                    gameID: gameID,
                    playerName: this.state.name,
                    playerID: '0',
                })

            const credentials = joinResponse.data.playerCredentials;

            this.props.history.push({
                pathname: `/${gameID}`,
                state: { gameID: gameID, playerCredentials: credentials }
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
                        <InputGroup className="mb-3" id="name" onChange={this.changeName}>
                            <Form.Label>Your name:</Form.Label>
                            <FormControl
                                placeholder="Enter here"
                                aria-label="Name"
                                aria-describedby="basic-addon1"
                                required={true}
                            />
                        </InputGroup>
                        <InputGroup className="mb-3" id="numPlayers" onChange={this.changeNumPlayers}>
                            <Form.Label>Number of players:</Form.Label>
                            <Form.Control as="select">
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </Form.Control>
                        </InputGroup>
                        <InputGroup id="public" onChange={this.changePublic}>
                            <Form.Label>Visible to public:</Form.Label>
                            {['radio'].map((type) => (
                                <div key={`default-${type}`} className="mb-3">
                                    <Form.Check
                                        inline label="Yes"
                                        type={type}
                                        value={true}
                                        name={'public'}
                                        id={`inline-${type}-yes`}
                                    />
                                    <Form.Check
                                        inline label="No"
                                        type={type}
                                        value={false}
                                        name={'public'}
                                        id={`inline-${type}-no`}
                                        defaultChecked
                                    />
                                </div>
                            ))}
                        </InputGroup>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={rest.onHide}>
                                Cancel
                            </Button>
                            <Button variant="primary" type={"submit"}>
                                Create
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
    handleClose: PropTypes.func,
}

export default withRouter(CreateGame);
