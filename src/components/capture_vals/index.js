import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "../input_field";
import { onlyUnique } from "../functions";
import { Typeahead } from "react-bootstrap-typeahead"; // ES2015

export default function CaptureVals() {
  let dispatch = useDispatch();
  let capture_index = useSelector((state) => state.capture_index);
  let all_capture_values = useSelector((state) => state.enter_data.captures);

  let capture_values = all_capture_values[capture_index];
  let effort_values = useSelector((state) => state.enter_data.effort);
  let user_protocols = useSelector((state) => state.initial_data.protocols);
  let capture_variables = useSelector(
    (state) => state.initial_data.capture_variables
  );

  let this_protocol = effort_values.base.protocol;

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
  let optional_variables = capture_variables.filter(
    (variable) =>
      mandatory_variables_id.indexOf(variable.capture_variable_id) < 0
  );

  const onChangeCap = (e, name) => {
    let new_cap = { ...capture_values, [name]: e.target.value };

    dispatch({
      type: "UPDATE_CAPTURE_VALUE",
      data: new_cap,
      index: capture_index,
    });
  };

  const handleSubmit = (event) => {
    const entered_data = JSON.parse(localStorage.getItem("entry_data"));
    let newdata = JSON.stringify({
      ...entered_data,
      captures: all_capture_values,
    });
    localStorage.setItem("entry_data", newdata);
    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* {mandatory_variables.map((variable) => {
          let this_value = () => {
            return entered_effort_param.filter(
              (param) => param.name === par.name
            )[0].vals[time.effort_time_id];
          };

          return (
            <>
              <div className="col" md={2}>
                <TextField
                  onChange={(e) => onChangeCap(variable)}
                  form="effort"
                  value={this_value()}
                  variable={par}
                  title=""
                ></TextField>
              </div>
            </>
          );
        })} */}
      </form>
    </>
  );
}
