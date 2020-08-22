import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default function Header(props) {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Exploding Pandas Logo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">About</Nav.Link>
                    <Nav.Link href="#link">How to Play</Nav.Link>
                    <Nav.Link href="#link">Cards</Nav.Link>
                    <Nav.Link href="https://github.com/max-yun/exploding-pandas" target={"_blank"}>Github</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}