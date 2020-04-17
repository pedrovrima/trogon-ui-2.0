import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Effort_Base from '../effort_base';
// import Effort_Nets from '../effort_mistnets';


function addCourseAction() {
    return { type: 'CHANGE_STAGE', data: 1, key: "base" }
}

export default function Data_Entry() {

    let stage = useSelector(state => state.data_stage)
    const dispatch = useDispatch();
    function addCourse() {
        dispatch(addCourseAction())
    }


    return (
        <div>
            {stage == 0 ?
                <div>
                    <Effort_Base></Effort_Base>


                </div>
                :

                <div>
<p>Oi</p>

                </div>}
            <button type="button" onClick={addCourse}>
                Adicionar curso
    </button>
        </div>
    )
}
