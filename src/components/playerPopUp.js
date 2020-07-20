import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import PlayerCards from './playerCards';

function PlayerPopUp(props) {
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            backdrop={"static"}
            keyboard={false}
            centered
        >
            <Modal.Header style={{margin: '0 auto', borderBottom: 0}}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Use attack card on:
                </Modal.Title>
            </Modal.Header>
            <PlayerCards
                players={props.players}
                onHide={props.onHide}
                target={props.target}
            />
        </Modal>
    );
}

export default PlayerPopUp;

PlayerCards.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    players: PropTypes.object,
    attack: PropTypes.func,
}
