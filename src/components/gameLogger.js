import React from 'react';
import '../css/gameLogger.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const GameLogger = (props) => {
    return (
        <div id={'logger'}>
            <h5 id={'log-header'}>
                Game Log
            </h5>
            <ul id={'log-list'}>{props.messages}</ul>
            <div id={'log-send-container'}>
                <Form id={'log-send'}>
                    <Form.Group id={'log-input'}>
                        <Form.Control placeholder="Type message here" />
                    </Form.Group>
                    <Button variant="secondary">
                        Send
                    </Button>
                </Form>
            </div>
        </div>
    )
}
