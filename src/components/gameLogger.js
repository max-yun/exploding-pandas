import React from 'react';
import PropTypes from 'prop-types';
import '../css/gameLogger.css';

export const GameLogger = (props) => {
    return (
        <div className={'logger'}>
            <ul id={'log-list'}>{props.messages}</ul>
        </div>
    )
}
