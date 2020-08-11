import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { generateNopeText } from '../generateText';

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
                    {props.player} has targeted you!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.show ? generateNopeText(props.card, props.player, props.count, props.steal) : ''}
                <br />
                <br />
                If you play a Nope card, you can prevent this action.
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
    card: PropTypes.string,
    player: PropTypes.string,
    count: PropTypes.number,
    steal: PropTypes.string,
    disabled: PropTypes.bool,
}
