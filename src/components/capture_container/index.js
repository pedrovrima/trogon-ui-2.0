import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createCapture } from "../functions";
import CaptureEntry from "../capture_entry";

import CaptureEff from "../capture_eff";
import CaptureSubmit from "../submit_capture";

export default function CaptureContainer() {
  let capture_stage = useSelector((state) => state.capture_stage);

  let dispatch = useDispatch();
  let effort_values = useSelector((state) => state.enter_data.capture_effort);
  let user_protocols = useSelector((state) => state.initial_data.protocols);
  let capture_variables = useSelector(
    (state) => state.initial_data.capture_variables
  );

  const [hasEffort, setHasEffort] = useState(false);

  useEffect(() => {
    let this_protocol = effort_values.protocol;

    if (this_protocol) {
      let protocol_variables = user_protocols.filter(
        (prot) => prot.protocol_code === this_protocol
      )[0].vars;

      let mandatory_variables_id = protocol_variables
        .filter((vars) => vars.mandatory === true)
        .map((vars) => vars.capture_variable_id);
      let mandatory_variables = capture_variables.filter(
        (variable) =>
          mandatory_variables_id.indexOf(variable.capture_variable_id) > -1
      );

      let capture_data = createCapture(mandatory_variables);

      dispatch({ type: "ADD_CAPTURE", data: capture_data });
      setHasEffort(true);
    }
  }, [effort_values]);

  return (
    <>
      {!hasEffort || capture_stage === 0 ? (
        <CaptureEff></CaptureEff>
      ) : capture_stage < 5 ? (
        <div className="container">
          <div className="row">
            <div className="col">
              <CaptureEntry></CaptureEntry>
            </div>
          </div>

          {/* <CaptureNav></CaptureNav> */}
        </div>
      ) : (
        <CaptureSubmit />
      )}
    </>
  );
}
