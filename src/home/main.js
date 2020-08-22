import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import CreateGamePopUp from './createGamePopUp';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = { show: false };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleClose() {
        this.setState({ show: false });
    }

    render() {
        return (
            <div id={'home-form'}>
                <h1>Exploding Pandas</h1>
                <CreateGamePopUp show={this.state.show} onHide={this.handleClose} />
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <Button onClick={this.handleShow}>Create Game</Button>
                <br />
                <Button>Join Game</Button>
            </div>
        );
    }
}

export default Main;
