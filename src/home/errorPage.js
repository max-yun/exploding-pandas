import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';

export default function ErrorPage() {
    return (
        <Jumbotron>
            <h1>That action is not allowed.</h1>
            <p>
                An unexpected error occurred. Please <a href={"/"}>return to the homepage</a> and try again.
            </p>
        </Jumbotron>
    );
}