import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EffortBase from '../effort_base';
import EffortNets from '../effort_mistnets';
import EffortParamBander from '../effort_param_bander';


function addCourseAction(data) {
    return { type: 'CHANGE_STAGE', data: data }
}

export default function Data_Entry() {

    let stage = useSelector(state => state.data_stage)
    const dispatch = useDispatch();
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
                : stage===1?

                <div>
<EffortNets></EffortNets>
                </div>
                : stage===2?
<EffortParamBander></EffortParamBander>:
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
