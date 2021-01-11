import React, { useEffect, useState } from "react";
import axios from "axios";
import { MDBDataTable } from 'mdbreact';
import { Button} from 'react-bootstrap';
// import Notifications from "./Notifications";
// import { Link } from "react-router-dom";
// import Paginator from "./Paginator";
import { MDBBtn } from "mdbreact";
import NavBar from "./NavBar";

function ViewApplications(props) {
    // const [searchString, setSearchString] = useState("")
    // const [currentPage, setCurrentPage] = useState(1)
    // const [dataPerPage] = useState(5)
    const [data, setData] = useState([])
    const [role] = useState(sessionStorage.getItem('username')) 
    const [Datacolumns] = useState([
        {
            label: 'First Name',
            field: 'firstname',
            sort: 'asc',
            width: 100
        },
        {
            label: 'Last Name',
            field: 'lastname',
            sort: 'asc',
            width: 100
        },
        {
            label: 'Status',
            field: 'status',
            sort: 'asc',
            width: 100
        },
        {
            label: 'Actions',
            field: 'action',
            sort: 'disabled',
            width: 100
        }
    ])

    const [dataObj, setDataObj] = useState({ columns: Datacolumns })

    useEffect(async () => {
        await axios.get('http://localhost:800/Users').then(response => {    
            for (let key in response.data) {
                response.data[key].action=<Button className="btn-info-custom" variant="info"><a href={"/viewapplications/" + response.data[key].id}>View</a></Button>
            }
                setDataObj({ ...dataObj, rows: response.data.map(item => {
                    if(role === "admin" && item.status==="Draft"){
                        return 0
                    }else{
                        return item
                    }
                }
            )})
        })
    }, [])

    // const paginate = (pageNo) => {
    //     setCurrentPage(pageNo)
    // }

    // const indexOfLastEntry = currentPage * dataPerPage;    // 1 * 5
    // const indexOfFirstEntry = indexOfLastEntry - dataPerPage;
    // const currentEntry = data.slice(indexOfFirstEntry, indexOfLastEntry)

    return (
        <div>
            <NavBar/>
            {role === "user" ?
                <div style = {{display:"flex"}}>
                    <a href="/fillInfo"><MDBBtn color="success" type="button" className="back-btn">Go Back</MDBBtn></a>
                </div>
                : null
            }
            <div style={{ marginLeft: "1%", marginRight: "2%" }}>
                    <MDBDataTable
                        striped
                        bordered
                        small
                        data={dataObj}
                        entriesOptions={[5, 10, 15 ]}
                        entries={5}
                    />
            </div>
            {
                // <Notifications />
            }
        </div>
    )
}

export default ViewApplications

// <div>
//     <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
//         <input style={{ width: "40%", height: "25px", textAlign: "center" }} placeholder="Search" type="text" value={searchString} onChange={e => setSearchString(e.target.value)} />
//     </div>
//     {currentEntry.length > 0 ?
//         currentEntry.map(data =>
//             <Link key={data.id} to={`/viewApplications/${data.id}`}>
//                 {
//                     searchString !== "" && data.firstname.toLowerCase().indexOf(searchString.toLowerCase()) === -1 && data.lastname.toLowerCase().indexOf(searchString.toLowerCase()) === -1 ?
//                     null :
//                     <ul key={data.id} style={{ display: "flex", justifyContent: "center" }}>
//                         <li>{data.firstname + ` ` + data.lastname}
//                             <button>View Application</button></li>
//                     </ul>
//                 }
//             </Link>
//         )
//         : null
//     }
// </div>
// <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
//     <Paginator dataPerPage={dataPerPage} totalData={data.length} paginate={paginate} />
// </div>