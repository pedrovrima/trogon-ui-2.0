import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "../input_field";
import { VarField } from "../functions";
import VarModal from "../capture_opt_vars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function CaptureInit() {
  let dispatch = useDispatch();
  let capture_index = useSelector((state) => state.capture_index);
  let all_capture_values = useSelector((state) => state.enter_data.captures);
  let effort_values = useSelector((state) => state.enter_data.effort);

  let capture_values = all_capture_values[capture_index];
  let user_protocols = useSelector((state) => state.initial_data.protocols);
  let capture_variables = useSelector(
    (state) => state.initial_data.capture_variables
  );
  let this_protocol = effort_values.base.protocol;

  let protocol_variables = user_protocols.filter(
    (prot) => prot.protocol_code === this_protocol
  )[0].vars;

  let cap_variables_id = protocol_variables.map(
    (vars) => vars.capture_variable_id
  );
  let cap_variables = capture_variables.filter(
    (variable) => cap_variables_id.indexOf(variable.capture_variable_id) > -1
  );

  let [extraVars, newVars] = useState([]);

  let addVariable = (name) => {
    if (!capture_values.extra_vars) {
      let new_cap = capture_values;
      new_cap.extra_vars = [];
      dispatch({
        type: "UPDATE_CAPTURE_VALUE",
        data: new_cap,
        index: capture_index,
      });
    }
    let new_cap = capture_values;
    new_cap.extra_vars.push({ name: name, a_value: "as" });

    dispatch({
      type: "UPDATE_CAPTURE_VALUE",
      data: new_cap,
      index: capture_index,
    });
  };

  let [modalState, setModal] = useState(false);

  const onChangeCapVar = (e, name) => {
    let new_cap = capture_values;
    let var_names = new_cap.variables.map((variable) => variable.name);
    let var_index = var_names.indexOf(name);
    new_cap.variables[var_index].a_value = e.target.value;
    dispatch({
      type: "UPDATE_CAPTURE_VALUE",
      data: new_cap,
      index: capture_index,
    });
  };

  const onChangeExtraVar = (e, name) => {
    let new_cap = capture_values;
    let var_names = new_cap.extra_vars.map((variable) => variable.name);
    let var_index = var_names.indexOf(name);
    new_cap.extra_vars[var_index].a_value = e.target.value;
    dispatch({
      type: "UPDATE_CAPTURE_VALUE",
      data: new_cap,
      index: capture_index,
    });
  };

  const onChangeNote = (e) => {
    let new_cap = capture_values;
    new_cap.note = e.target.value;
    dispatch({
      type: "UPDATE_CAPTURE_VALUE",
      data: new_cap,
      index: capture_index,
    });
  };

  let optional_vars = cap_variables.filter((cap_var) => {
    return (
      capture_values.variables
        .map((on_data) => on_data.name)
        .indexOf(cap_var.name) < 0
    );
  });

  const getVariable = (obj, var_name) => {
    return obj.filter((param) => {
      return param.name === var_name;
    })[0];
  };

  let age_wrp = getVariable(cap_variables, "age_wrp");
  let age_criteria = getVariable(cap_variables, "age_criteria");
  let sex = getVariable(cap_variables, "sex");
  let sex_criteria = getVariable(cap_variables, "sex_criteria");
  let notes_value = capture_values.note;
  const handleSubmit = (event) => {
    const entered_data = JSON.parse(localStorage.getItem("entry_data"));
    let newdata = JSON.stringify({
      ...entered_data,
      captures: all_capture_values,
    });
    localStorage.setItem("entry_data", newdata);
    event.preventDefault();
  };

  let this_value = (variable) => {
    return capture_values.variables.filter((param) => {
      return param.name === variable.name;
    })[0].a_value;
  };

  let extra_this_value = (variable) => {
    return capture_values.extra_vars.filter((param) => {
      return param.name === variable.name;
    })[0].a_value;
  };

  return (
    <>
      <VarModal
        modalState={modalState}
        setModal={setModal}
        addVariable={addVariable}
        captureVars={optional_vars}
      />

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-6">
            <div className="row">
              <div className="col-6">
                <VarField
                  variable={age_wrp}
                  value={this_value(age_wrp)}
                  onChangeFunc={onChangeCapVar}
                />
              </div>
              <div className="col-6">
                <VarField
                  variable={age_criteria}
                  value={this_value(age_criteria)}
                  onChangeFunc={onChangeCapVar}
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col-6">
                <VarField
                  variable={sex}
                  value={this_value(sex)}
                  onChangeFunc={onChangeCapVar}
                />
              </div>
              <div className="col-6">
                <VarField
                  variable={sex_criteria}
                  value={this_value(sex_criteria)}
                  onChangeFunc={onChangeCapVar}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <TextField
              value={notes_value}
              type="note"
              onChange={(e) => onChangeNote(e)}
              title="Notas"
              as="textarea"
              rows="3"
            ></TextField>
          </div>

          <div className="col-6">
            <h6>Variáveis Extras</h6>                <FontAwesomeIcon
                  onClick={() => setModal(true)
                  }
                  icon="plus"
                  color="green"
                />

            <div className="row">
              {capture_values.extra_vars?
              capture_values.extra_vars.map((e_var) => {
                let this_variable = getVariable(cap_variables, e_var.name);
                return (
                  <div className="col-6">
                    <VarField
                      variable={this_variable}
                      value={extra_this_value(this_variable)}
                      onChangeFunc={onChangeExtraVar}
                    />
                  </div>
                );
              }):null}
            </div>
          </div>
        </div>

      </form>
    </>
  );
}
