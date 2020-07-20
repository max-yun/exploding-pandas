import React from 'react';
import PropTypes from 'prop-types';
import '../css/gameLogger.css';

export const GameLogger = (props) => {
    return (
        <ul className={'log'}>{props.messages}</ul>
    )
}
