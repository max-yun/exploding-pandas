import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Base from './home/base';

ReactDOM.render((
    <BrowserRouter>
        <Base />
    </BrowserRouter>
), document.getElementById('root'));