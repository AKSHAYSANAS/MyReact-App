import React, { useState } from "react";
import Modal from "react-modal"
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import { toast } from "react-toastify";
import { doLogin } from "../redux/actions/actionCreators";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

function Login(props) {
    const [username, setName] = useState("")
    const [pass, setPass] = useState("")
    const [nameError, setNameError] = useState("")
    const [passError, setPassError] = useState("")
    const [successFlag, setSuccessFlag] = useState(false)
    let history = useHistory()
    
    const checkCredential = (event) => {
        setNameError("")
        setPassError("")
        
        event.preventDefault()
        if (!username.trim()) {
            setNameError("Username cannot be empty")
            return false
        }
        if (!pass.trim()) {
            setPassError("Password cannot be empty")
            return false
        }
        if(Number(username)){
            setNameError("Username must contain only alphabets")
            return false;
        }
        if(username.length < 4 || pass.length < 4){
            username.length < 4 ? setNameError("Minimum 4 characters required") : setPassError("Minimum 4 characters required")
            return false
        }
        let userCredential = username === "user" && pass === "user" ? true : false
        let adminCredential = username === "admin" && pass === "admin" ? true : false
        if (userCredential || adminCredential) {
            sessionStorage.setItem('username',username)
            sessionStorage.setItem('password', pass)
            props.doLogin()
            toast.success("Login Successfull..!", {
                position: toast.POSITION.TOP_CENTER,
                hideProgressBar: true,
                autoClose: 500
            });
            setTimeout(() => {
                userCredential ? history.push("/fillInfo") : history.push("/viewApplications")
            }, 500);
        } else {
            toast.error("Login Failed !", {
                position: toast.POSITION.BOTTOM_CENTER,
                hideProgressBar: true,
                autoClose: 500
              });
            setName("")
            setPass("")
        }
    }

    return (
        <div className="margin-top">
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="6">
                        <MDBCard>
                            <MDBCardBody>
                                <form>
                                    <p className="h4 text-center py-4">Login{props.count}</p>
                                    <label
                                        htmlFor="defaultFormCardNameEx"
                                        className="grey-text font-weight-light"
                                    >
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        id="defaultFormCardNameEx"
                                        className="form-control"
                                        value={username}
                                        onChange={e => setName(e.target.value)}
                                    />
                                    <small style={{color: "red"}}>{nameError}</small>
                                    <br />
                                    <label
                                        htmlFor="defaultFormCardEmailEx"
                                        className="grey-text font-weight-light"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="defaultFormCardEmailEx"
                                        className="form-control"
                                        value={pass}
                                        onChange={e => setPass(e.target.value)}
                                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                                        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" 
                                        required
                                    />
                                    <small style={{color: "red"}}>{passError}</small>
                                    <div className="text-center py-4 mt-3">
                                    <MDBBtn className="btn btn-outline-purple" type="submit" onClick={e => checkCredential(e)}>
                                        Submit
                                    </MDBBtn>
                                    </div>
                                </form>
                                <p style={{ marginLeft: "70%" }}>
                                    <Modal
                                        style={{ content: { textAlign: "center", justifyContent: "center", height: 150, width: 250, color: "green" } }}
                                        isOpen={successFlag}
                                    >
                                        <h4>Login Successfull..!</h4>
                                        <p>Welcome</p>
                                        <button onClick={() => setSuccessFlag(false)}>OK</button>
                                    </Modal>
                                </p>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {
        isLoggedIn: state.isLoggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        doLogin: () => dispatch(doLogin())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)