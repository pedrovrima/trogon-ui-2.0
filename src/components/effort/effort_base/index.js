import React, {useState,useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from "../../input_field";
import Form from "react-bootstrap/Form";
import functions from "../functions"

let NavigationButtons = functions.NavigationButtons

export default function Effort_Base() {
  const dispatch = useDispatch();


  let effort = useSelector((state) => state.enter_data.effort);
  let initial_data = useSelector((state) => state.initial_data);


  let [checkFields, setCheckFields] = useState({});

  let thisCheck = (name, value) => {
    setCheckFields((preCheck) => {
      return { ...preCheck, [name]: value };
    });
  };

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
    <div className="container">
      <Form className="h-100">
        <div className="row">
          <div className="col-auto">
            <TextField
              type="date"
              value={effort.date}
              onChange={(e)=>functions.onChangeEffort(e,"date",effort,dispatch)}
              title="Data (DD/MM/AAAA)"
              checkFunc={thisCheck}
              name="date"

            />
          </div>
        </div>
        <div className="row">
        
          <div className="col-auto">
            <TextField
              type="val"
              value={effort.station}
              onChange={(e)=>functions.onChangeEffort(e,"station",effort,dispatch)}
              user_options={functions.stationOptions(initial_data)}
              title="Estação"
              checkFunc={thisCheck}
              name="station"

            ></TextField>
          </div>
        </div>
        <div className="row">
        
          <div className="col-auto">
            <TextField
              type="val"
              value={effort.protocol}
              user_options={functions.protocolOptions(initial_data)}
              onChange={(e)=>functions.onChangeEffort(e,"protocol",effort,dispatch)}
              checkFunc={thisCheck}
              name="protocol"


              title="Protocolo"
            ></TextField>
          </div>
        </div>
        <NavigationButtons handleSub={(event)=>functions.handleSubmit(effort,event)} invalidForm={invalidForm} key={invalidForm} />
      </Form>
    </div>
  );
}
