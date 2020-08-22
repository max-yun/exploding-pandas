import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Header from './header';
import Main from './main';
import About from './about';
import Rules from './rules';
import '../css/main.css';

export default class Base extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header />
                <div id={'base'}>
                    <Switch>
                        <Route exact path='/' component={Main}/>
                        <Route path='/about' component={About}/>
                        <Route path='/how-to-play' component={Rules}/>
                    </Switch>
                </div>
            </div>
        )
    }
}
