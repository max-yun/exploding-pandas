import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Main from './main';
import About from './about';
import Rules from './rules';
import App from '../app';
import WaitingRoom  from '../waitingRoom';
import '../css/main.css';

export default class Base extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route exact path='/' component={Main}/>
                <Route path='/about' component={About}/>
                <Route path='/how-to-play' component={Rules}/>
                <Route path={'/:gameID'} component={App}/>
            </Switch>
        )
    }
}
