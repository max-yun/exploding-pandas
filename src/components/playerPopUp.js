import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import PlayerCards from './playerCards';

function PlayerPopUp(props) {
    return (
        <Modal
            show={props.show}
            onHide={props.hide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            backdrop={"static"}
            keyboard={false}
            centered
        >
            <Modal.Header style={{margin: '0 auto', borderBottom: 0}}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Target player
                </Modal.Title>
            </Modal.Header>
            <PlayerCards
                players={props.players}
                hide={props.hide}
                attack={props.attack}
            />
        </Modal>
    );
}

export default PlayerPopUp;

PlayerCards.propTypes = {
    players: PropTypes.object,
    hide: PropTypes.func,
    attack: PropTypes.func,
}
