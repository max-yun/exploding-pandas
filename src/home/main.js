import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import CreateGame from './createGame';
import Header from './header';

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
            <div>
                <Header />
                <div id={'base'}>
                    <div id={'main-form'}>
                        <h1>Exploding Pandas</h1>
                        <CreateGame show={this.state.show} onHide={this.handleClose} />
                        <Button onClick={this.handleShow}>Create a game</Button>
                        <br />
                        <Button>Join a game</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;
