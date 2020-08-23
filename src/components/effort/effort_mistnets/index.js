import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from "../../input_field";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mistnetFunctions from "./mistnet_functions"
import functions from "../functions"

let NavigationButtons = functions.NavigationButtons

export default function Effort_Nets() {
  let effort = useSelector((state) => state.enter_data.effort);
  let mistnets = useSelector((state) => state.enter_data.effort.mistnets,[]);
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

  const dispatch = useDispatch();
  
  const station_mistnets = functions.stationGetter(initial_data,effort.station).mistnets;
  const netnums = station_mistnets.map((net) => net.net_number);


  

  let total = mistnets.total === "" ? 0 : parseInt(mistnets.total, 10);

  let slicer =
    mistnets.nets.length - total === 0
      ? mistnets.nets.length
      : mistnets.nets.length - total === mistnets.nets.length
      ? 0
      : total;

  return (
    <Container>
      <Form >
        <div  className="align-items-center row">
          <div className=" col-4 border-right">
            <div className="row">
              <div className="col-auto">
                <TextField
                  type="cont"
                  unit="nets"
                  user_options={netnums.length}
                  value={mistnets.total}
                  onChange={(e) => mistnetFunctions.onChangeNetInfo(e, "total", mistnets,dispatch,netnums)}
                  name="total"
                  title="Total de Redes"
                  checkFunc={thisCheck}

                ></TextField>
              </div>
            </div >

            <div className="row">
              <div className="col-auto">
                <TextField
                  type="time"
                  value={mistnets.open}
                  onChange={(e) => mistnetFunctions.onChangeNetInfo(e, "open", mistnets,dispatch)}
                  name="open"
                  title="Hora de Início"
                  checkFunc={thisCheck}

                ></TextField>
              </div>
            </div>
            <div className="row">
              <div className="col-auto">
                <TextField
                  type="time"
                  value={mistnets.close}
                  onChange={(e) => mistnetFunctions.onChangeNetInfo(e, "close", mistnets,dispatch,)}
                  form="effort"
                  upper_level="mistnets"
                  name="close"
                  title="Hora de Fim"
                  checkFunc={thisCheck}

                ></TextField>
              </div>
            </div>
          </div>
          <Col>
            <Row className="border" style={{ minHeight: 0 }}>
              <Col>
                <Row className="mt-2 mb-3">
                  <Col md={4}>
                    <h5>Número da Rede</h5>
                  </Col>
                  <Col md={8}>
                    <Row>
                      <Col>
                        <h5>Abertura</h5>
                      </Col>
                      <Col>
                        <h5>Fechamento</h5>
                      </Col>
                      <Col md={2}></Col>
                    </Row>
                  </Col>
                </Row>
                <Container
                  className="mb-5"
                  style={{ overflowY: "scroll", maxHeight: "30vh" }}
                >
                  {mistnets.nets.slice(0, slicer).map((net, i) => {
                    let color = i % 2 === 0 ? "" : "bg-light";

                    return (
                      <Row className={color}>
                        <Col md={4}>
                          <TextField
                            type="cont"
                            key={i}
                            form="effort"
                            onChange={(e) =>
                              dispatch({
                                type: "NET_NUM",
                                data: e.target.value,
                                i: i,
                              })
                            }
                            value={net.net_number}
                            upper_level="mistnets"
                            name="close"
                            title=""
                            
                          ></TextField>
                        </Col>

                        <Col md={8}>
                          {net.oc.map((occ, o) => {
                            return (
                              <Row className="align-items-center">
                                <Col>
                                  <TextField
                                    type="time"
                                    key={"open" + i + o}
                                    form="effort"
                                    onChange={(e) =>
                                      dispatch({
                                        type: "NET_TIME",
                                        data: e.target.value,
                                        i: i,
                                        o: o,
                                        oc: "open",
                                      })
                                    }
                                    value={net.oc[o].open}
                                    upper_level="mistnets"
                                    name="open"
                                    title=""
                                  ></TextField>
                                </Col>
                                <Col>
                                  <TextField
                                    type="time"
                                    key={"close" + i + o}
                                    form="effort"
                                    onChange={(e) =>
                                      dispatch({
                                        type: "NET_TIME",
                                        data: e.target.value,
                                        i: i,
                                        o: o,
                                        oc: "close",
                                      })
                                    }
                                    value={net.oc[o].close}
                                    upper_level="mistnets"
                                    name="close"
                                    arr={1}
                                    title=""
                                  ></TextField>
                                </Col>
                                <Col md={2} className={"align-self-center"}>
                                  {o == net.oc.length - 1 ? (
                                    <>
                                      <Row>
                                        <Col>
                                          <FontAwesomeIcon
                                            onClick={() =>
                                              dispatch({
                                                type: "ADD_HOUR",
                                                o: o,
                                                i: i,
                                              })
                                            }
                                            icon="plus-square"
                                            color="green"
                                          />
                                        </Col>
                                      </Row>
                                      {net.oc.length > 1 ? (
                                        <Row>
                                          <Col>
                                            <FontAwesomeIcon
                                              onClick={() =>
                                                dispatch({
                                                  type: "REMOVE_HOUR",
                                                  o: o,
                                                  i: i,
                                                })
                                              }
                                              icon="minus-square"
                                              color="red"
                                            />
                                          </Col>
                                        </Row>
                                      ) : (
                                        ""
                                      )}
                                    </>
                                  ) : (
                                    <Row></Row>
                                  )}
                                </Col>
                              </Row>
                            );
                          })}
                        </Col>
                      </Row>
                    );
                  })}
                </Container>
              </Col>
            </Row>
          </Col>
        </div>
        <NavigationButtons handleSub={(e)=>functions.handleSubmit(effort,e)}  invalidForm={invalidForm} key={invalidForm} />
      </Form>
    </Container>
  );
}
