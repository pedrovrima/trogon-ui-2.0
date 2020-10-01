import React from "react";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import functions from "../effort/functions";
import TextField from "../input_field";
import { useState, useEffect } from "react";
import { CaptureNavigationButtons } from "../functions";
import { getEffort } from "./checkCapEffort";

const CapEff = () => {
  const [capEff, setCapEff] = useState({ date: "", station: "" });
  let initial_data = useSelector((state) => state.initial_data);
  let dispatch = useDispatch()
  let [checkFields, setCheckFields] = useState({});

  let [invalidForm, setInvalidForm] = useState(false);
  const [effortId, setEffortId] = useState(false);

  let checkForm = () => {
    let invalidSum = Object.keys(checkFields).reduce((sum, key) => {
      return sum + Number(checkFields[key]);
    }, 0);

    let formInvalid = invalidSum > 0 ? true : false;
    setInvalidForm(formInvalid);
  };

  useEffect(()=>{
    dispatch({type: "SET_CAPTURE_EFF",
    data: effortId})
  },[effortId])

  useEffect(() => {
    checkForm();
  }, [checkFields]);

  const changeCapEff = (event, key) => {
    let value = event.target.value;
    let newcapEff = { ...capEff, [key]: value };
    setCapEff(newcapEff);
    
  };

  let thisCheck = (name, value) => {
    setCheckFields((preCheck) => {
      return { ...preCheck, [name]: value };
    });
  };

  return (
    <div className="container">
      <Form className="h-100">
        <div className="row">
          <div className="col-auto">
            <TextField
              type="date"
              value={capEff.date}
              onChange={(e) => changeCapEff(e, "date")}
              title="Data"
              checkFunc={thisCheck}
              name="date"
              extraonBlur={() => {
                if (!invalidForm)
                  setEffortId(
                    getEffort(
                      capEff,
                      initial_data.effort,
                      initial_data.stations,
                      initial_data.protocols
                    )
                  );
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-auto">
            <TextField
              type="val"
              value={capEff.station}
              onChange={(e) => changeCapEff(e, "station")}
              user_options={functions.stationOptions(initial_data)}
              title="Estação"
              checkFunc={thisCheck}
              name="station"
              extraonBlur={() => {
                if (!invalidForm)
                  setEffortId(
                    getEffort(
                      capEff,
                      initial_data.effort,
                      initial_data.stations,
                      initial_data.protocols
                    )
                  );
              }}
            ></TextField>
          </div>
        </div>
        <CaptureNavigationButtons
          invalidForm={!effortId || invalidForm}
          key={invalidForm}
        />
      </Form>
    </div>
  );
};

export default CapEff;
