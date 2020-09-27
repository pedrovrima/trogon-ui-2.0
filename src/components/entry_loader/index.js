import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';



export default function EntryLoader(props){
    console.log(props)
    const dispatch = useDispatch();
    let local_data = localStorage.getItem("entry_data")
    

    return(
    <>
                    <div className=" shadow col-sm-8 p-4 bg-white rounded">

    <h2>Bem vindo ao Trogon Data System</h2>
        <button className="btn btn-primary" onClick={()=>(props.setStage("effort"))} disabled={props.disabled}>Esforço</button>
        <button className="btn btn-primary" title="em breve" onClick={()=>(props.setStage("capture"))} disabled={props.disabled}>Captura</button>

</div>
    </>)


}