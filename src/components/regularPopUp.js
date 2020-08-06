import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PlayerCards from './playerCards';

function RegularPopUp(props) {
    const [showFirst, setFirst] = useState(true);
    const [showSecond, setSecond] = useState(false);
    const [showThird, setThird] = useState(false);
    const [card, setCard] = useState(null);
    const [value, setValue] = useState(0);

    function handleClick(e) {
        let val = parseInt(e.target.value);
        setFirst(false);
        setSecond(true);
        if (val === 3) {
            setValue(val);
            setThird(true);
        }
    }

    function handleTarget(target) {
        if (showThird) {
            if (card) {
                setSecond(false);
                setThird(false);
                props.target(target, value, card);
            }
        } else {
            setSecond(false);
            props.target(target, value);
        }
    }

    if (props.regular < 2) {

    }

    return (
        <div>
            <Modal
                show={props.show && showFirst}
                onHide={props.onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                backdrop={"static"}
                keyboard={false}
                centered
            >
                <Modal.Header style={{margin: '0 auto', borderBottom: 0}}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        You played a non-special card!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    If you play one more of these cards, you can take a random card
                    from an opponent's hand. If you play two more of these cards, you
                    can specify which card you want to take from an opponent. These cards
                    will automatically be played from your hand based on your choice.
                </Modal.Body>
                <Modal.Footer style={{justifyContent: 'center'}}>
                    <Button variant="primary" value={2} onClick={handleClick}>Play one more</Button>
                    <Button variant="primary" value={3} onClick={handleClick} disabled={props.regular !== 3}>Play two more</Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showSecond}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                backdrop={"static"}
                keyboard={false}
                centered
            >
                <Modal.Header style={{margin: '0 auto', borderBottom: 0}}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Who are you targeting?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {showThird && (<div>
                            Choose a card to steal:
                            <select
                                onChange={(e) => setCard(e.target.value)}
                                style={{margin: '0.5rem'}}
                                defaultValue={'DEFAULT'}>
                                <option value={'DEFAULT'} disabled>Choose card</option>
                                <option value={'attack'}>Attack</option>
                                <option value={'defuse'}>Defuse</option>
                                <option value={'reverse'}>Reverse</option>
                                <option value={'skip'}>Skip</option>
                                <option value={'shuffle'}>Shuffle</option>
                                <option value={'future'}>See the Future</option>
                            </select>
                        </div>)}
                        <PlayerCards
                            players={props.players}
                            target={handleTarget}
                        />
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default RegularPopUp;

RegularPopUp.propTypes = {
    show: PropTypes.bool,
    regular: PropTypes.number,
    target: PropTypes.func,
    players: PropTypes.object,
}
