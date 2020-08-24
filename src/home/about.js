import React from 'react';
import Header from './header';

export default function About() {
    return (
        <div>
            <Header about={true}/>
            <div id={'base'}>
                This is the about page.
            </div>
        </div>
    )
}