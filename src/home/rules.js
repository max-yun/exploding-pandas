import React from 'react';
import Header from './header';

export default function Rules() {
    return (
        <div>
            <Header rules={true}/>
            <div id={'base'}>
                This is the rules page.
            </div>
        </div>
    )
}