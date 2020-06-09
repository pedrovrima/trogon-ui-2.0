import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EffortBase from '../effort_base';
import EffortNets from '../effort_mistnets';
import EffortParamBander from '../effort_param_bander';
import EffortSummaryNotes from '../effort_sumamry_notes';
import CaptureCotainer from "../capture_container"

import Row from 'react-bootstrap/Row'
import div from 'react-bootstrap/Col'






function addCourseAction(data) {
    return { type: 'CHANGE_STAGE', data: data }
}

function localStorageChecker(data) {
    return { type: 'LOCAL_STORAGE_DATA', data: data }
}

export default function Data_Entry() {
    const dispatch = useDispatch();


    let local_data = localStorage.getItem("entry_data")
    let loaded = useSelector(state => state.loaded)
    let effort_data = useSelector(state => state.enter_data.effort)


    useEffect(() => {

        const init_data = localStorage.getItem("registerData")
        dispatch({ type: "LOCAL_SETTER", data: JSON.parse(init_data) })


        if (local_data !== null) {

            dispatch(localStorageChecker(JSON.parse(local_data)))

        } else {
            dispatch({ type: "LOADER", data: 1 })
        }
    }, []
    )





    let effort_stage = useSelector(state => state.data_stage)

    let entry_stage = useSelector(state => state.entry_stage)



    return (
<>
                <div className=" shadow col-sm-8 p-4 bg-white rounded">
                    <Row className="mb-5 ml-2 w-100" >
                        <div>

                            <h1 >
                                {entry_stage === "effort" ? "Esforço" : "Captura"}
                            </h1>
                        </div>
                    </Row>
                    <Row  >
                        <div className="col">
                            {
                                loaded === 0 ?
                                    <p>Loading...</p>

                                    : entry_stage === "effort" ?
                                        effort_stage === 0 ?
                                            <div>
                                                <EffortBase></EffortBase>


                                            </div>
                                            : effort_stage === 1 ?

                                                <div>
                                                    <EffortNets></EffortNets>
                                                </div>
                                                : effort_stage === 2 ?
                                                    <EffortParamBander></EffortParamBander> :
                                                    <EffortSummaryNotes></EffortSummaryNotes> :
                                        <CaptureCotainer></CaptureCotainer>
                            }


                        </div>




                    </Row>
                </div>
                <div className="col-sm-4 h-75">
                    <div className="row align-items-center h-100 ml-2 ">
                        <div className="shadow  col-sm-12 p-2 bg-white rounded" ><h3>Sumário do esforço</h3>
                            <div className="row">
                                <div className="col">
                                    <p>Estação: {effort_data.base.station}</p>
                                    <p>Data: {effort_data.base.date}</p>
                                    <p>Total de Redes: {effort_data.mistnets.total}</p>
                                </div>



                                <div className="col ">
                                    <button className="btn btn-primary" disabled={entry_stage == "effort"} onClick={() => {
                                        dispatch({ type: "CHANGE_ENTRY", data: "effort" })
                                        dispatch(
                                            { type: "CHANGE_STAGE", data: 0 }
                                        )
                                    }}> Editar Esforço</button>
                                </div>
                            </div>
                        </div>

                        <div className="shadow col-sm-12 p-2 bg-white rounded" ><h3>Sumário Capturas</h3>
                            <p>{`Sem Anilha: 0/${effort_data.summary.unbanded}`}</p>
                            <p>{`Recapturas: 0/${effort_data.summary.recapture}`}</p>

                            <p>{`Novas: 0/${effort_data.summary.new}`}</p>
                            <button className="btn btn-primary" disabled={entry_stage == "capture"} onClick={() => {
                                        dispatch({ type: "CHANGE_ENTRY", data: "capture" })
                                        dispatch(
                                            { type: "CHANGE_STAGE", data: 0 }
                                        )
                                    }}> Editar Captura</button>

                        </div>
                    </div>
                </div>

  </>

    )
}
