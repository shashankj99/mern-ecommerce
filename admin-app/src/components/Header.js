import React from "react";
import {Nav, Navbar, Container} from "react-bootstrap";
import {NavLink, Link} from 'react-router-dom';

const Header = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Link to='/' className='navbar-brand'>Admin Dashboard</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto"></Nav>
                    <Nav>
                        <li className='nav-item'>
                            <NavLink to='login' className='nav-link'>Login</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink to='register' className='nav-link'>Register</NavLink>
                        </li>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
