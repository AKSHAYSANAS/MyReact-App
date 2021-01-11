import React from "react";

function Paginator({dataPerPage, totalData, paginate, }){
    const pageNo = []
    for(let i = 1; i<= Math.ceil(totalData/dataPerPage); i++){
        pageNo.push(i)
    }
    return(
        <div>
            <table className="paginate-table">
                <tbody>
                    <tr className="paginate-row">
                    {
                    pageNo.map( number => 
                        <td style={{width: "40px", height:"0", textAlign:"center"}} key={number} className="paginate-data">
                            <div onClick={()=> paginate(number)}>
                                {pageNo.length <= 1 ? null : <p>{number}</p>}
                            </div>
                        </td>)
                    }
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Paginator