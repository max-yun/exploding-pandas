import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default function Header(props) {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Exploding Pandas Logo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/about" active={props.about}>About</Nav.Link>
                    <Nav.Link href="/how-to-play" active={props.rules}>How to Play</Nav.Link>
                    <Nav.Link href="/cards">Cards</Nav.Link>
                    <Nav.Link href="https://github.com/max-yun/exploding-pandas" target={"_blank"}>Github</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}