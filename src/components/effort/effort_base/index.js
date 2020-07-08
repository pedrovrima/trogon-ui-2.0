import React from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from "../../input_field";
import Form from "react-bootstrap/Form";
import { NavigationButtons } from "../../functions";
import functions from "../functions"


export default function Effort_Base() {
  const dispatch = useDispatch();

  let effort = useSelector((state) => state.enter_data.effort);
  let initial_data = useSelector((state) => state.initial_data);


  return (
    <div className="container">
      <Form className="h-100">
        <div className="row">
          <div className="col-auto">
            <TextField
              type="date"
              value={effort.date}
              onChange={(e)=>functions.onChangeEffort(e,"date",effort,dispatch)}
              title="Data"
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


              title="Protocolo"
            ></TextField>
          </div>
        </div>
        <NavigationButtons handleSub={(event)=>functions.handleSubmit(effort,event)} />
      </Form>
    </div>
  );
}
