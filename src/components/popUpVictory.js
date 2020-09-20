import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';

function PopUpVictory(props) {
    return (
        <Modal
            show={props.show}
            aria-labelledby="contained-modal-title-vcenter"
            backdrop={"static"}
            keyboard={false}
            centered
        >
            <Modal.Header style={{margin: '0 auto', borderBottom: 0}}>
                <Modal.Title id="contained-modal-title-vcenter">
                    VICTORY!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                You have emerged victorious among the chaos of Exploding Pandas!
                You can start a new game by returning to the homepage.
            </Modal.Body>
        </Modal>
    );
}

export default PopUpVictory;

PopUpVictory.propTypes = {
    show: PropTypes.bool,
}
