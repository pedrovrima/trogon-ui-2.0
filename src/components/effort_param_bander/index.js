import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function addCourseAction() {
  return { type: 'CHANGE_STAGE', data: 1, key: "base" }
}

export default function Effort_Param_Bander() {



  let base = useSelector(state => state.data_stage)
  const [labase, setLabase] = useState(base)
  let alabase = JSON.stringify(labase)
  let string_abase = JSON.stringify(base)



  const dispatch = useDispatch();
  function addCourse() {
    let new_base = { ...base, station: "PORT", protocol: "AES" }
    setLabase(new_base)
    dispatch(addCourseAction())
  }




  return (
    <>
      <div>
        {alabase}
      </div>
      <div>
        {string_abase}
      </div>
 


    </>
  );
}