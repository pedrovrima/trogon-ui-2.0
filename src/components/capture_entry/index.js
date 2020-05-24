import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CaptureInit from "../capture_init"
import CaptureVals from "../capture_vals"


export default function CaptureEntry(capture_index) {
    let [capture_stage, setCaptureStage] = useState(1)
console.log(capture_stage)

    return (

        <>
            
            {
                capture_stage===0?
                <CaptureInit ></CaptureInit>:
                capture_stage===1?
                <CaptureVals></CaptureVals> :
                null
            }
            
        </>

        )



}