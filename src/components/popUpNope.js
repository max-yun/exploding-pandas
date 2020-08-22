import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { generateNopeText } from '../generateText';

function PopUpNope(props) {
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
                    {props.player.name} has targeted you!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.show ? generateNopeText(props.card, props.player.name, props.count,
                    props.steal, props.player.cardsToDraw * 2) : ''}
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

export default PopUpNope;

PopUpNope.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    card: PropTypes.string,
    player: PropTypes.object,
    count: PropTypes.number,
    steal: PropTypes.string,
    disabled: PropTypes.bool,
    counterNope: PropTypes.bool,
}
