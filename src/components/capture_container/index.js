import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createCapture } from "../functions";
import CaptureEntry from "../capture_entry";
import CaptureNav from "../capture_navigation"


export default function CaptureContainer() {
  let dispatch = useDispatch();
  let capture_data = useSelector((state) => state.enter_data.captures);
  let effort_values = useSelector((state) => state.enter_data.effort);

  let user_protocols = useSelector((state) => state.initial_data.protocols);
  let capture_variables = useSelector(
    (state) => state.initial_data.capture_variables
  );


  let this_protocol = effort_values.protocol;

  let protocol_variables = user_protocols.filter(
    (prot) => prot.protocol_code === this_protocol
  )[0].vars;

  let mandatory_variables_id = protocol_variables
    .filter((vars) => vars.mandatory === 1)
    .map((vars) => vars.capture_variable_id);
  let mandatory_variables = capture_variables.filter(
    (variable) =>
      mandatory_variables_id.indexOf(variable.capture_variable_id) > -1
  );


  useEffect(() => {
    if (capture_data.length === 0) {
      let capture_data = createCapture(mandatory_variables);

      dispatch({ type: "ADD_CAPTURE", data: capture_data });
    }
  }, []);


  return (
    <>
      {capture_data.length === 0 ? (
        capture_data.length
      ) : (
        <div className="container">
          <div className="row">
            <div className="col">
              <CaptureEntry></CaptureEntry>
            </div>
          </div>

          <CaptureNav></CaptureNav>
        </div>
      )}
    </>
  );
}
