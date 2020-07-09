import React, {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "../input_field";
import {CaptureNavigationButtons} from "../functions"

export default function CaptureVals() {
  let dispatch = useDispatch();
  let capture_index = useSelector((state) => state.capture_index);
  let all_capture_values = useSelector((state) => state.enter_data.captures);

  let capture_values = useSelector((state) => state.enter_data.captures);

  let this_capture_values = capture_values[capture_index];
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

  const onChangeCap = (e, name,i) => {
    let new_cap = this_capture_values;
    let var_names = new_cap.variables.map((variable) => variable.name);
    let var_index = var_names.indexOf(name);
    new_cap.variables[var_index].a_value[i] = e.target.value;
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

  
  let [checkFields, setCheckFields] = useState({});
 
  let thisCheck = (name, value) => {
    
    setCheckFields(preCheck=> {return{...preCheck,
    [name]:value}});
  };



  useEffect(()=>console.log(checkFields),[checkFields])

  let [invalidForm, setInvalidForm] = useState(false);

  let checkForm = () => {
    let invalidSum = Object.keys(checkFields).reduce((sum, key) => {
      return sum + Number(checkFields[key]);
    }, 0);

    let formInvalid = invalidSum > 0 ? true : false;
    setInvalidForm(formInvalid);
  };

  useEffect(() => {
    checkForm();
  }, [checkFields]);


  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {mandatory_variables.map((variable) => {
            let this_value = () => {
              return this_capture_values.variables.filter((param) => {
                return param.name === variable.name;
              })[0].a_value;
            };

            console.log(this_value())
            return (
              <>
                <div className="col-3">
                  <TextField

                    type={variable.type}
                    onChange={(e,i) => onChangeCap(e, variable.name,i)}
                    value={this_value()}
                    title={variable.portuguese_label}
                    protocol_options={variable.options}
                    unit={variable.unit}
                    checkFunc={thisCheck}
                    name={variable.name}
                    duplicable={variable.duplicable}
                  ></TextField>
                </div>
              </>
            );
          })}
        </div>
        <CaptureNavigationButtons invalidForm={invalidForm} key={invalidForm} />
      </form>
    </>
  );
}
