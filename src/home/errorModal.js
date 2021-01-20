import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function ErrorModal(props) {
    return (
        <Modal
            show={props.show}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>An error occurred!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Please ensure that the room you are trying to join either exists or has space.
                If errors continue to occur, please try again later.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={props.onHide}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
