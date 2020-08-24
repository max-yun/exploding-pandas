import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import PlayerCards from './playerCards';

function PopUpPlayer(props) {
    return (
        <Modal
            show={props.show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            backdrop={"static"}
            keyboard={false}
            centered
        >
            <Modal.Header style={{margin: '0 auto', borderBottom: 0}}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Use {props.card} card on:
                </Modal.Title>
            </Modal.Header>
            <PlayerCards
                playerID={props.playerID}
                players={props.players}
                target={props.target}
            />
        </Modal>
    );
}

export default PopUpPlayer;

PlayerCards.propTypes = {
    show: PropTypes.bool,
    players: PropTypes.object,
    attack: PropTypes.func,
}
