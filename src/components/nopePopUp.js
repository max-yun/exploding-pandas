import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function NopePopUp(props) {
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
                    {props.player} has played a card against you!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                This {props.card} card will do blah blah blah.
                If you have a Nope card, you can prevent this action.
            </Modal.Body>
            <Modal.Footer style={{justifyContent: 'center'}}>
                <Button variant="primary" onClick={clickYes} disabled={props.disabled}>Say nope!</Button>
                <Button variant="primary" onClick={clickNo}>Let it happen</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default NopePopUp;

NopePopUp.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    player: PropTypes.string,
    card: PropTypes.string,
}
