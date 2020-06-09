import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';



export default function EntryLoader(props){
    function localStorageChecker(data) {
        return { type: 'LOCAL_STORAGE_DATA', data: data }
    }
    const dispatch = useDispatch();
    let local_data = localStorage.getItem("entry_data")
    
    let dataLoaded=useSelector((state)=>state.loaded)
    useEffect(() => {

        const init_data = localStorage.getItem("registerData")
        dispatch({ type: "LOCAL_SETTER", data: JSON.parse(init_data) })


        if (local_data !== null) {

            // dispatch(localStorageChecker(JSON.parse(local_data)))
        } else {
            // dispatch({ type: "LOADER", data: 1 })
        }
    }, []
    )

    return(
    <>
                    <div className=" shadow col-sm-8 p-4 bg-white rounded">

    <h2>Bem vindo ao Trogon Data System</h2>
        <button className="btn btn-primary" onClick={()=>(props.setStage("entry"))} disabled={!dataLoaded}>Entrar Dados</button>

</div>
    </>)


}