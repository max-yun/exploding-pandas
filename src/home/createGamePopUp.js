import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import axios from 'axios';
import { API_PORT, INTERNAL_API_PORT } from '../constants';

class CreateGamePopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numPlayers: 2,
            public: false,
            room: null,
        };
        this.createGame = this.createGame.bind(this);
        this.apiBase = (process.env.NODE_ENV === 'production') ? '/api' :
            `${window.location.protocol}//${window.location.hostname}:${API_PORT}`;
    }

    async createGame() {
        const r = await axios
            .post(`${this.apiBase}/create`, {
                numPlayers: this.state.numPlayers,
                public: this.state.public,
            });

        this.setState({ room: r.data.room });
    }

    render() {
        return (
            <Modal
                {...this.props}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create Game</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="numPlayers">
                            <Form.Label>Number of players:</Form.Label>
                            <Form.Control as="select">
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="public">
                            <Form.Label>Visible to public:</Form.Label>
                            {['radio'].map((type) => (
                                <div key={`default-${type}`} className="mb-3">
                                    <Form.Check inline label="Yes" type={type} id={`inline-${type}-yes`} />
                                    <Form.Check inline label="No" type={type} id={`inline-${type}-no`} defaultChecked/>
                                </div>
                            ))}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onHide}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={this.createGame}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

CreateGamePopUp.propTypes = {
    show: PropTypes.bool,
    handleClose: PropTypes.func,
}

export default CreateGamePopUp;
