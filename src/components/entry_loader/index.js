import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import setLocalStorage from "../../controllers/localstore";



export default function EntryLoader(props){
    const dispatch = useDispatch();
    
const [loading,setLoading] = useState(true)
    const localSetter = async()=>{
        const data=await setLocalStorage()
            if (data) {
              dispatch({ type: "LOCAL_SETTER", data: { ...data } });
            }
            setLoading(false);
          
    }

    useEffect(() => {
localSetter()
    },[]);
  
    return(
    <>
                    <div className=" shadow col-sm-8 p-4 bg-white rounded">

    <h2>Bem vindo ao Trogon Data System</h2>
        <button className="btn btn-primary" onClick={()=>(dispatch({type:"CHANGE_ENTRY",data:"effort"}))} disabled={loading}>Esforço</button>
        <button className="btn btn-primary" title="em breve" onClick={()=>(dispatch({type:"CHANGE_ENTRY",data:"capture"}))} disabled={loading}>Captura</button>

</div>
    </>)


}