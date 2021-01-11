import React, { useState } from "react";
import "../App.css";
import { MDBBtn } from 'mdbreact';
import { connect } from "react-redux";
import { doLogOut } from "../redux/actions/actionCreators";
import { useHistory } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Button, Dropdown } from 'react-bootstrap';

function NavBar(props) {
    const navStyle = {
        color: 'yellow'
    }
    const [role] = useState(sessionStorage.getItem('username'))
    let history = useHistory()
    const logOut = (e) => {
        sessionStorage.removeItem('username')
        sessionStorage.removeItem('password')
        history.push("/")
        e.preventDefault()
        props.doLogOut()
    }

    return (
        <div className="sidebar" style={{ navStyle }}>
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/home">Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="/viewApplications">{role === "user" ? "Your Records" : "Applications List"}</Nav.Link>
                                <div style={{justifyContent:"flex-end", alignItems:"flex-end", display:"flex"}}>
                                    <NavDropdown title="Profile">
                                        <NavDropdown.Item href="#action/3.1"><MDBBtn color="primary" type="button" onClick={e => logOut(e)}>Logout</MDBBtn></NavDropdown.Item>
                                    </NavDropdown>
                                </div>
                            </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        count: state.count,
        isLoggedIn: state.isLoggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        doLogOut: () => dispatch(doLogOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)