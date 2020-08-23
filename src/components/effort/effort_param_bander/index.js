import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from "../../input_field";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {NameCreator} from "../../functions"
import functions from "../functions"

let NavigationButtons = functions.NavigationButtons


function addCourseAction() {
  return { type: "CHANGE_STAGE", data: 1, key: "base" };
}

export default function Effort_Param_Bander() {
  let effort = useSelector((state) => state.enter_data.effort);

  let banders = useSelector((state) => state.initial_data.banders);

  let effort_time = useSelector((state) => state.initial_data.effort_time);
  let effort_param = useSelector(
    (state) => state.initial_data.effort_variables
  );

  let entered_banders = useSelector((state) => state.enter_data.effort.banders);
  let entered_effort_param = useSelector(
    (state) => state.enter_data.effort.eff_params
  );
  const dispatch = useDispatch();
  function nextEvent() {
    dispatch(addCourseAction(1));
  }

  const handleSubmit = (event) => {
    const entered_data = JSON.parse(localStorage.getItem("entry_data"));
    let newdata = JSON.stringify({ ...entered_data, effort });
    localStorage.setItem("entry_data", newdata);

    event.preventDefault();
  };

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

  useEffect(()=>{
    console.log(entered_effort_param)
  },[entered_effort_param])

  useEffect(() => {
    if (entered_effort_param.length === 0) {
      let init_eff_param = effort_param.map((param) => {
        let par_obj = { name: param.name, vals: [] };

        effort_time.map((time) => {
          par_obj.vals[time.effort_time_id] = "";
          return null; 
        });

        return par_obj;
      });

      dispatch({ type: "NEW_EFFORT_PARAM", data: init_eff_param });
    }
  }, []);

  return (
    <div >
      <Form onSubmit={handleSubmit} className="h-100">
        <Row className="align-items-center">
          <Col className="border-right">
            <h2>Anilhadores</h2>
            {entered_banders.map(function (bander, i) {
              let bander_data = banders.filter(
                (value) => value.code === bander
              );

              return (
                <Row className="align-items-center">
                  <Col className="col-auto">
                    <TextField
                      type="val"
                      onChange={(e) =>
                        dispatch({
                          type: "BANDER_VALUE",
                          i: i,
                          data: e.target.value,
                        })
                      }
                      user_options={banders.map((bnd) => bnd.code)}
                      value={bander}
                      title=""
                      checkFunc={thisCheck}

                    ></TextField>
                  </Col>
                  <Col>
                    <p>{bander_data.length > 0 ? bander_data[0].name : null}</p>
                  </Col>
                </Row>
              );
            })}
            <Row>
              <Col>
                <FontAwesomeIcon
                  onClick={() =>
                    dispatch({
                      type: "UPDATE_EFFORT_LEVEL",
                      key: "banders",
                      data: [...entered_banders, ""],
                    })
                  }
                  icon="plus"
                  color="green"
                />
              </Col>
              <Col>
                {entered_banders.length > 1 ? (
                  <FontAwesomeIcon
                    onClick={() => dispatch({ type: "REMOVE_BANDER" })}
                    icon="minus"
                    color="red"
                  />
                ) : null}
              </Col>
            </Row>
          </Col>
          <Col>
            <h2>Parâmetros</h2>
            <Row>
              <Col md={4}></Col>
              {effort_time.map((time) => {
                return (
                  <>
                    <Col md={2}>{time.portuguese_label}</Col>
                  </>
                );
              })}
            </Row>

            {entered_effort_param.length === 0 ? (
              <p>loading</p>
            ) : (
              effort_param.map((par, i) => {
                console.log(par)
                return (
                  <Row>
                    <Col md={4}>
                      {NameCreator(par.portuguese_label, par.unit)}
                    </Col>
                    {effort_time.map((time) => {
                      let this_value = () => {
                        return entered_effort_param.filter(
                          (param) => param.name === par.name
                        )[0].vals[time.effort_time_id];
                      };

                      return (
                        <>
                          <Col md={2}>
                            <TextField
                              onChange={(e) =>
                                dispatch({
                                  type: "EFFORT_PARAM",
                                  par: par.name,
                                  i: i,
                                  time: time.effort_time_id,
                                  data: e.target.value,
                                })
                              }
                              name={par.name+time.effort_time_id}
                              type={par.type}
                              key={par.name+time.effort_time_id}
                              protocol_options={par.eff_options}
                              unit={par.unit}
                              value={this_value()}
                              title=""
                              checkFunc={thisCheck}

                            ></TextField>
                          </Col>
                        </>
                      );
                    })}
                  </Row>
                );
              })
            )}
          </Col>
        </Row>
        <NavigationButtons handleSub={handleSubmit} invalidForm={invalidForm} key={invalidForm}  />
      </Form>
    </div >
  );
}
