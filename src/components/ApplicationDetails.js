import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Button } from 'react-bootstrap';
import { MDBBtn, MDBDataTable } from 'mdbreact';
import Modal from "react-modal"
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Notifications from "./Notifications";
function ApplicationDetails({ match }) {
    const [item, setItem] = useState({})
    const [showComment, setShowComment] = useState(false)
    const [addComment, setAddComment] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [modalMsg] = useState("")
    const [role] = useState(sessionStorage.getItem('username'))
    let history = useHistory()
    const [Datacolumns] = useState([
        {
            label: 'First Name',
            field: 'firstname',
            width: 100
        },
        {
            label: 'Last Name',
            field: 'lastname',
            width: 100
        },
        {
            label: 'Email',
            field: 'email',
            width: 100
        },
        {
            label: 'College',
            field: 'college',
            width: 100
        },
        {
            label: 'Course',
            field: 'course',
            width: 100
        },
        {
            label: 'Status',
            field: 'status',
            width: 100
        }
    ])

    const [dataObj, setDataObj] = useState({ columns: Datacolumns })
    const fetchItem = async () => {
        await axios.get(`http://localhost:800/Users/${match.params.id}`).then(response => {
            setDataObj({ ...dataObj, rows: [response.data] })
            setItem(response.data)
        })
    }

    useEffect(() => {
        fetchItem()
    }, [])

    const handleReject = async (e) => {
        if (!addComment.trim()) {
            alert("Please add Neccessary Comment")
            return false
        }
        if (addComment.length < 10) {
            alert("Enter minimum 10 characters")
            return false
        }
        await axios.put(`http://localhost:800/Users/${match.params.id}`, { ...item, "comment": addComment, "status": "Rejected" }).then(response => {
            if (response.request.statusText === "OK") {
                toast.error("Application Rejected", {
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: true,
                    autoClose: 800
                });
            }
        })

        // await axios.post('http://localhost:8000/status', { "comment": addComment, "status": "Rejected" })
        history.push("/viewApplications")
    }

    const handleApproved = async () => {
        await axios.put(`http://localhost:800/Users/${match.params.id}`, { ...item, "status": "Approved" }).then(response => {
            if (response.request.statusText === "OK") {
                toast.success("Application Approved", {
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: true,
                    autoClose: 800
                });
            }
        })
        // await axios.post('http://localhost:8000/status', { ...item, "status": "approved" })
        history.push("/viewApplications")
    }

    const handleEdit = async (e) => {
        history.push("/fillInfo?userid=" + item.id)
    }

    return (
        <div>
            <a href="/viewApplications"><MDBBtn>Back to List</MDBBtn></a>
            
            <Card>
                <Card.Header as="h5">{item.status === "Rejected"}</Card.Header>
                <Card.Body>
                    <Card.Title>Application Details</Card.Title>
                    <Card.Text>
                        <div style={{ marginLeft: "1%", marginRight: "2%" }}>
                            <MDBDataTable
                                striped
                                data={dataObj}
                                searching={false}
                                paging={false}
                                sortable={false}
                            />
                        </div>
                    </Card.Text>
                    {item.status === "Approved" || item.status === "Rejected" || item.status === "Draft" ? null :
                        <div>
                            {role === "admin" ?
                                <div>
                                    <Button variant="success" onClick={e => handleApproved(e)}>Approve</Button>
                                    {
                                        showComment === false ? <Button variant="danger" id="btn-one-reject" onClick={() => setShowComment(true)}>Reject</Button>
                                            :
                                            null
                                    }
                                </div>
                                : null}
                        </div>
                    }
                    {
                        item.status === "Approved" || item.status === "Rejected" || item.status === "Pending" ? null :
                            <div>
                                {role === "user" ?
                                    <Button variant="primary" onClick={e => handleEdit(e)}>Edit</Button>
                                    : null}
                            </div>
                    }
                    {showComment ?
                        <div>
                            <textarea required={true} style={{ marginTop: 10 }} rows={5} cols={45} placeholder="Enter reason to reject" value={addComment} onChange={e => setAddComment(e.target.value)} />
                            <p><Button variant="danger" onClick={() => handleReject(true)}>Reject</Button></p>
                        </div>
                        :
                        null
                    }
                    {role === "user" && item.status === "Rejected" ?
                        <blockquote className="blockquote mb-0">
                            <p>
                                Reason of Rejection
                            </p>
                            <footer className="blockquote-footer">
                                {item.comment}
                            </footer>
                        </blockquote>
                        : null
                    }
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Modal
                            style={{ content: { textAlign: "center", justifyContent: "center", height: 150, width: 250, color: "red" } }}
                            isOpen={showModal}
                        >
                            {modalMsg}
                            <MDBBtn style={{ padding: 5 }} onClick={() => setShowModal(false)}>Ok</MDBBtn>
                        </Modal>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ApplicationDetails