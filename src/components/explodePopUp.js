import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class ExplodePopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { replace: 0 }
        this.replaceBomb = this.replaceBomb.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        this.props.onHide();
    }

    replaceBomb() {
        this.props.onClick(this.state.replace);
    }

    render() {
        if (!this.props.canDefuse) {
            return (
                <Modal
                    show={this.props.show}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header style={{margin: '0 auto', borderBottom: 0}}>
                        <Modal.Title id="contained-modal-title-vcenter">
                            You drew an Exploding Panda!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Too bad you don't have a <b>defuse</b> card... Better luck next time!
                        You can continue watching the game if you want.
                    </Modal.Body>
                    <Modal.Footer style={{justifyContent: 'center'}}>
                        <Button
                            className="primary"
                            onClick={this.closeModal}
                        >
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
            )
        }

        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                aria-labelledby="contained-modal-title-vcenter"
                backdrop={"static"}
                keyboard={false}
                centered
            >
                <Modal.Header style={{margin: '0 auto', borderBottom: 0}}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        You drew an Exploding Panda!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Good thing you have a <b>defuse</b> card, though. This <b>defuse</b> card will automatically
                    be played from your hand and allows you to place the Exploding Panda back anywhere in the deck.
                </Modal.Body>
                <Modal.Footer style={{justifyContent: 'center'}}>
                    <div>
                        Replace the card
                        <select
                            onChange={(e) => this.setState({ replace: e.target.value })}
                            style={{margin: '0.5rem'}}
                        >
                            { _.range(0, this.props.deckSize + 1).map(value =>
                                <option key={value} value={value}>{value}
                                </option>)}
                        </select>
                        spot(s) from the top of the deck.
                    </div>
                    <div>
                        <Button
                            className="primary" onClick={this.replaceBomb}
                            style={{margin: '1rem'}}
                        >
                            Bombs away!
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ExplodePopUp;

ExplodePopUp.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    player: PropTypes.string,
    card: PropTypes.string,
}
