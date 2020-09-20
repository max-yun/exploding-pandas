import React from 'react';
import Button from 'react-bootstrap/Button';
import CreateGame from './createGame';
import JoinGame from './joinGame';
import Header from './header';
import ErrorModal from './errorModal';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showCreate: false, showJoin: false, showError: false };
    }

    render() {
        return (
            <div>
                <Header />
                <div className={'base'} id={'main-section'}>
                    <div id={'main-form'}>
                        <img src={require("../images/logo.png")} alt={"logo"} style={{width: "80%"}}/>
                        <CreateGame
                            show={this.state.showCreate}
                            onHide={() => this.setState({showCreate: false})}
                        />
                        <Button
                            onClick={() => this.setState({showCreate: true})}
                        >Create a game
                        </Button>
                        <br />
                        <JoinGame
                            show={this.state.showJoin}
                            onHide={() => this.setState({showJoin: false})}
                            error={() => this.setState({showError: true})}
                        />
                        <ErrorModal
                            show={this.state.showError}
                            onHide={() => this.setState({showError: false})}
                        />
                        <Button
                            onClick={() => this.setState({showJoin: true})}
                        >Join a game
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;
