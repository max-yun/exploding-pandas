import React from 'react';
import Header from './header';
import Main from './main';
import '../css/home.css';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header />
                <div id={'home'}>
                    <Main />
                </div>
            </div>
        )
    }
}

export default Home;
