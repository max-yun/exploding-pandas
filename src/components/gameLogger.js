import React from 'react';
import '../css/gameLogger.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const GameLogger = (props) => {
    const log = props.messages.map((message, index) => {
        if (message.includes(':')) {
            let i = message.indexOf(':');
            let player = message.substr(0, i + 1);
            return (
                <li key={index}>
                    <b>{player}</b> {message.substr(i + 1, message.length)}
                </li>
            );
        } else {
            return (
                <li key={index}>
                    {message}
                </li>
            );
        }
    });

    return (
        <div id={'logger'}>
            <h5 id={'log-header'}>
                Game Log
            </h5>
            <ul id={'log-list'}>{log}</ul>
            <div id={'log-send-container'}>
                <Form
                    id={'log-send'}
                    onKeyDown={
                        (e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                props.onClick();
                            }
                        }
                    }
                >
                    <Form.Group id={'log-input'} onChange={props.onChange}>
                        <Form.Control placeholder="Type message here" />
                    </Form.Group>
                    <Button type="button" variant="secondary" onClick={props.onClick}>
                        Send
                    </Button>
                </Form>
            </div>
        </div>
    )
}
