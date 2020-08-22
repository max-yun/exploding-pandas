import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function PopUpNopeCounter(props) {
    function clickYes() {
        props.onHide(true);
    }

    function clickNo() {
        props.onHide(false);
    }

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            aria-labelledby="contained-modal-title-vcenter"
            backdrop={"static"}
            keyboard={false}
            centered
        >
            <Modal.Header style={{margin: '0 auto', borderBottom: 0}}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Your card was Noped!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                This will negate your previous action.
                If you play a Nope card, you can reverse the effect of their Nope.
            </Modal.Body>
            <Modal.Footer style={{justifyContent: 'center'}}>
                <Button variant="primary" onClick={clickYes} disabled={props.disabled}>Nope their nope!</Button>
                <Button variant="primary" onClick={clickNo}>Fine, whatever...</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PopUpNopeCounter;

PopUpNopeCounter.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    disabled: PropTypes.bool,
}
