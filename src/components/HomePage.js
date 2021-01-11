import { React } from "react";

function HomeComponent(){
    const role = sessionStorage.getItem("username")
    return(
        <div style={{display: "flex", justifyContent:"center", alignItems:"center"}}>
            This is home page of {role}
        </div>
    )
}
export default HomeComponent