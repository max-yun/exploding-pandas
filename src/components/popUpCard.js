import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import { GameCard } from './gameCard';
import '../css/cardPopUp.css';
import Button from 'react-bootstrap/Button';

function PopUpCard(props) {
    function handleClick() {
        props.onHide();
    }

    const cards = props.cards.filter(card => card !== null).map((card, index) =>
        <div
            key={index}
            className={'cardholder'}
        >
            <GameCard
                card={card}
            />
            <p>{index + 1}</p>
        </div>
    )
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
                    Next cards:
                </Modal.Title>
            </Modal.Header>
            <Modal.Body
                id={'cardholderContainer'}
            >
                {cards}
            </Modal.Body>
            <Modal.Footer style={{justifyContent: 'center'}}>
                <Button variant="primary" onClick={handleClick}>OK</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PopUpCard;

PopUpCard.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    cards: PropTypes.array,
}
