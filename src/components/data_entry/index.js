import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EffortBase from '../effort_base';
import EffortNets from '../effort_mistnets';
import EffortParamBander from '../effort_param_bander';


function addCourseAction(data) {
    return { type: 'CHANGE_STAGE', data: data }
}

function localStorageChecker(data) {
    return { type: 'LOCAL_STORAGE_DATA', data: data }
}

export default function Data_Entry() {
    const dispatch = useDispatch();


    let local_data = localStorage.getItem("entry_data")
    let base_field = useSelector(state => state.enter_data)

    useEffect(() => {

        if (local_data !== null) {

            dispatch(localStorageChecker(JSON.parse(local_data)))

        }
    }, []
    )




    let stage = useSelector(state => state.data_stage)
    function nextEvent() {
        dispatch(addCourseAction(1))
    }

    function previousEvent() {
        dispatch(addCourseAction(-1))
    }
    return (
        <div>
            {stage === 0 ?
                <div>
                    <EffortBase></EffortBase>


                </div>
                : stage === 1 ?

                    <div>
                        <EffortNets></EffortNets>
                    </div>
                    : stage === 2 ?
                        <EffortParamBander></EffortParamBander> :
                        <div>
                            <p>The end</p>
                        </div>


            }
            <button type="button" onClick={previousEvent}>
                Anterior
    </button>
            <button type="button" onClick={nextEvent}>
                Próximo
    </button>
        </div>
    )
}
