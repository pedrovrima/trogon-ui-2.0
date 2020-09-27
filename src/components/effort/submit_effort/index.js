import React, {useEffect, useState} from "react"
import axios from "axios"
import { useSelector } from "react-redux";


const SubmitEffort = () =>{
    let effortData = useSelector((state) => state.enter_data.effort);
 
    const subEffort= async()=>{
        try{
        let resu = await axios.post("http://localhost:3332/effort", effortData)
        console.log(resu)
        if(resu.status===200){setSub("ok")}
        if(resu.status===409){setSub("Dado já existe")}
    }
        catch(e){
            console.log(e.response.status)
            if(e.response.status===409){setSub("Dado já existe")}

}
    }
    let [submitted,setSub] = useState("sending")

    useEffect(()=>{
        subEffort()
    },[])
    return(
        <div>
            {
                submitted==="sending"?
                    `Loading`
                :submitted==="failed"?"falhou":submitted            }
        </div>

    )
}

export default SubmitEffort