import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

function Notifications(props){
    const [ setNotifData]= useState([])
    const [ setShowNotifFlag ] = useState(false)
    const role = sessionStorage.getItem('username')
    const getNotifData = () =>{console.log("props in notif", props);
        if(role === "user"){
                axios.get(`http://localhost:800/Users/`+props.id).then(response => {
                setNotifData(response.data)
                if(response.data.status === "Approved"){
                    setShowNotifFlag(true)
                        notify()
                }
            })
        }
    }

    useEffect(() => {
        getNotifData();
        // notify()
    },[])

    const notify = () => {
        toast.info("New Application Approved",{
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar: true,
            autoClose: 2000
        })
    }
    return null
}

export default Notifications