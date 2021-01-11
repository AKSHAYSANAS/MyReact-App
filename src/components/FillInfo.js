import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";
import NavBar from "./NavBar";
import { useHistory } from "react-router-dom";
import { doLogin } from "../redux/actions/actionCreators";
import { connect } from "react-redux";
// import emailjs from 'emailjs-com';

function FillInfo(props) {
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [course, setCourse] = useState("")
    const [college, setCollege] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [fnameError, setFnameError] = useState("")
    const [lnameError, setLnameError] = useState("")
    // const [emailError, setEmailError] = useState("")
    // const [courseError, setCourseError] = useState("")
    // const [addressError, setAddressError] = useState("")
    const [userId, setUserId] = useState("")
    const queryString = require('query-string');
    const parsed = queryString.parse(props.location.search);
    let history = useHistory()
    
    useEffect(async () => {
        if (!(Object.keys(parsed).length === 0)) {
            await axios.get(`http://localhost:800/Users/${parsed.userid}`).then(
                response => {
                    console.log("response", response);
                    setFirstName(response.data.firstname)
                    setLastName(response.data.lastname)
                    setEmail(response.data.email)
                    setCourse(response.data.course)
                    setCity(response.data.city)
                    setAddress(response.data.address)
                    setCollege(response.data.college)
                    setUserId(response.data.id)
                }
            )
        }
    }, [])

    const saveHandler = async (e) => {    props.doLogin()

        e.preventDefault()
        const userInfo = {
            "firstname": firstname,
            "lastname": lastname,
            "college": college,
            "email": email,
            "course": course,
            "address": address,
            "city": city,
            "status": "Draft"
        }

        if (userId.length > 0) {
            await axios.put(`http://localhost:800/Users/${userId}`, userInfo).then(
                response => {
                    console.log(userInfo, response);
                    if (response.request.statusText === "OK") {
                        toast.warning("Draft Saved!", {
                            position: toast.POSITION.BOTTOM_CENTER,
                            hideProgressBar: true,
                            autoClose: 500
                        });
                        setCollege("")
                        setCourse("")
                        setEmail("")
                        setFirstName("")
                        setLastName("")
                        setAddress("")
                        setCity("")
                        setUserId("")
                    }
                }
            )
        } else {
            await axios.post('http://localhost:800/Users', userInfo).then(
                response => {
                    console.log(userInfo, response);
                    if (response.request.statusText === "Created") {
                        toast.warning("Draft Saved!", {
                            position: toast.POSITION.BOTTOM_CENTER,
                            hideProgressBar: true,
                            autoClose: 500
                        });
                        // let templateParams = {
                        //     from_name: "akshaysanas159@gmail.com",
                        //     to_name: 'sanasakshay1999@gmail.com',
                        //     subject: "sample",
                        //     message_html: "first email sent",
                        //    }
                        // emailjs.send(
                        //     'gmail',
                        //     'template_yn71eu2',
                        //      templateParams,
                        //     'user_0byazTVQhwVb5EEzZziRh'
                        //    )
                        
                        setCollege("")
                        setCourse("")
                        setEmail("")
                        setFirstName("")
                        setLastName("")
                        setAddress("")
                        setCity("")
                        setUserId("")
                    }
                }
            )
        }
        history.push("/viewApplications")
    }

    const submit_Handler = async (event) => {
        event.preventDefault();
        // event.target.className += " was-validated";
        if (!firstname.trim() || !lastname.trim()) {
            !firstname.trim() ? setFnameError("field cannot be empty") : setLnameError("field cannot be empty")
            return false
        }
        
        if (!isNaN(firstname) || !isNaN(lastname)) {
            !isNaN(firstname) ? setFnameError("only characters are allowed") : setLnameError("Only characters are allowed")
            return false
        }

        if (firstname.length < 4 || lastname.length < 4) {
            firstname.length < 4 ? setFnameError("Minimum 4 characters required") : setLnameError("minimum 4 characters required")
            return false
        }

        const userInfo = {
            "firstname": firstname,
            "lastname": lastname,
            "college": college,
            "email": email,
            "course": course,
            "address": address,
            "city": city,
            "status": "Pending"
        }

        if (userId.length > 0) {
            await axios.put(`http://localhost:800/Users/${userId}`, userInfo).then(
                response => {
                    console.log(userInfo, response);
                    if (response.request.statusText === "OK") {
                        toast.success("Application Submitted",{
                            position: toast.POSITION.BOTTOM_CENTER,
                            hideProgressBar: true,
                            autoClose: 1000
                        })
                        setCollege("")
                        setCourse("")
                        setEmail("")
                        setFirstName("")
                        setLastName("")
                        setAddress("")
                        setCity("")
                        setUserId("")
                    }
                }
            )
        } else {
            await axios.post('http://localhost:800/Users', userInfo).then(
                response => {
                    console.log(userInfo, response);
                    if (response.request.statusText === "Created") {
                        toast.success("Application Submitted",{
                            position: toast.POSITION.BOTTOM_CENTER,
                            hideProgressBar: true,
                            autoClose: 1000
                        })
                        
                        setCollege("")
                        setCourse("")
                        setEmail("")
                        setFirstName("")
                        setLastName("")
                        setAddress("")
                        setCity("")
                        setUserId("")
                    }
                }
            )
        }
        history.push("/viewApplications")
    }

    return (
        <div>
        <NavBar/>{console.log("fillinfo props",props,props.isLoggedIn)}
            <h2 style={{ textAlign: "center" }}>Application Form</h2>
            <div style={{ marginLeft: "30%", justifyContent: "center", alignItems: "center", display: "flex" }}>
                <form
                    onSubmit={submit_Handler}
                    style={{ width: "100%" }}
                >
                    <MDBRow>
                        <MDBCol md="4" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterNameEx"
                                className="grey-text"
                            >
                                First name
                            </label>
                            <input
                                value={firstname}
                                name="fname"
                                onChange={e => setFirstName(e.target.value)}
                                type="text"
                                id="defaultFormRegisterNameEx"
                                className="form-control"
                                placeholder="First name"
                                required
                            />
                            <small style={{color: "red"}}>
                                {fnameError}
                            </small>
                        </MDBCol>

                        <MDBCol md="4" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterEmailEx2"
                                className="grey-text"
                            >
                                Last name
                            </label>
                            <input
                                value={lastname}
                                name="lname"
                                onChange={e => setLastName(e.target.value)}
                                type="text"
                                id="defaultFormRegisterEmailEx2"
                                className="form-control"
                                placeholder="Last name"
                                required
                            />
                            <div className="invalid-feedback">Enter valid entry!</div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="4" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterConfirmEx3"
                                className="grey-text"
                            >
                                Email
                             </label>
                            <input
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                type="email"
                                id="defaultFormRegisterConfirmEx3"
                                className="form-control"
                                name="email"
                                placeholder="Your Email address"
                            />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="4" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterPasswordEx4"
                                className="grey-text"
                            >
                                City
                            </label>
                            <input
                                value={city}
                                onChange={e => setCity(e.target.value)}
                                type="text"
                                id="defaultFormRegisterPasswordEx4"
                                className="form-control"
                                name="city"
                                placeholder="City"
                                required
                            />
                            <div className="invalid-feedback">
                                Please provide a valid city.
                            </div>
                        </MDBCol>
                        <MDBCol md="4" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterPasswordEx4"
                                className="grey-text"
                            >
                                Address
                            </label>
                            <input
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                type="text"
                                id="defaultFormRegisterPasswordEx4"
                                className="form-control"
                                name="city"
                                placeholder="Address"
                                required
                            />
                            <div className="invalid-feedback">
                                Please provide a valid city.
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="4" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterPasswordEx4"
                                className="grey-text"
                            >
                                College
                            </label>
                            <input
                                value={college}
                                onChange={e => setCollege(e.target.value)}
                                type="text"
                                id="defaultFormRegisterPasswordEx4"
                                className="form-control"
                                name="College"
                                placeholder="College"
                                required
                            />
                            <div className="invalid-feedback">
                                Please provide a valid entry.
                            </div>
                        </MDBCol>
                        <MDBCol md="4" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterPasswordEx4"
                                className="grey-text"
                            >
                                Course
                            </label>
                            <input
                                value={course}
                                onChange={e => setCourse(e.target.value)}
                                type="text"
                                id="defaultFormRegisterPasswordEx4"
                                className="form-control"
                                name="city"
                                placeholder="Course"
                                required
                            />
                            <input
                                value={userId}
                                name="userid"
                                type="hidden"
                            />
                            <div className="invalid-feedback">
                                Please provide a valid entry.
                            </div>
                            <div className="valid-feedback">Looks good!</div>
                        </MDBCol>
                    </MDBRow>
                    <MDBBtn color="primary" type="button" onClick={e => saveHandler(e)}>
                        Save
                    </MDBBtn>
                    <MDBBtn color="primary" type="submit">
                        Submit
                    </MDBBtn>
                </form>
            </div>
            <div style = {{display:"flex", alignItems: "flex-end", justifyContent: "flex-end"}}><a href="/viewApplications"><MDBBtn color="primary" type="button">View All applicatins</MDBBtn></a></div>
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
        doLogin: () => dispatch(doLogin())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FillInfo)