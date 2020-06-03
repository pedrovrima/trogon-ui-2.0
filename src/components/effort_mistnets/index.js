import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from "../input_field";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavigationButtons } from "../functions";

export default function Effort_Nets() {
  let effort = useSelector((state) => state.enter_data.effort);
  let mistnets = useSelector((state) => state.enter_data.effort.mistnets,[]);
  let base = useSelector((state) => state.enter_data.effort.base);
  let mistArray = mistnets.nets;
  let base_field = useSelector((state) => state.initial_data);
  let invalidValue = useSelector((state) => state.enter_data.form_invalid);

  const stationGetter = (entered_station) => {
    const station_data = base_field.stations.filter((stats) => {
      let is_it = stats.station_code === entered_station;
      return is_it;
    });
    return station_data[0];
  };

  const dispatch = useDispatch();
  function addCourseAction(data) {
    return { type: "CHANGE_STAGE", data: data };
  }
  function nextEvent() {
    dispatch(addCourseAction(1));
  }


  const station_mistnets = stationGetter(base.station).mistnets;

  const netnums = station_mistnets.map((net) => net.net_number);

  const handleSubmit = (event) => {
    dispatch({ type: "CHANGE_STAGE", data: 1 });
    const entered_data = JSON.parse(localStorage.getItem("entry_data"));
    let newdata = JSON.stringify({ ...entered_data, effort });
    localStorage.setItem("entry_data", newdata);

    event.preventDefault();
  };

  let changeMists = (value, mistArray) => {
    const dummyNet = (n) => {
      return {
        net_number: n,
        oc: [{ open: mistnets.open, close: mistnets.close }],
      };
    };
    let i = mistArray.length;
    while (mistArray.length < value) {
      let netnum = netnums[i];
      mistArray.push(dummyNet(netnum));
      i++;
    }

    dispatch({ type: "CREATE_NETS", data: mistArray });
  };

  let changeTime = (value, mistArray, classy) => {
    let netss = mistArray.map((net) => {
      let oc = net.oc.map((oc) => {
        return { ...oc, [classy]: value };
      });
      return { ...net, oc };
    });
    dispatch({ type: "CREATE_NETS", data: netss });
  };

  let onChangeNetInfo = (e, type, func) => {
    console.log("here")
    let new_net_info = { ...mistnets, [type]: e.target.value };
    dispatch({ type: "MIST_INFO", data: new_net_info });
    func(e.target.value, mistArray, type);
  };

  let total = mistnets.total === "" ? 0 : parseInt(mistnets.total, 10);

  let slicer =
    mistnets.nets.length - total === 0
      ? mistnets.nets.length
      : mistnets.nets.length - total === mistnets.nets.length
      ? 0
      : total;

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row className="align-items-center">
          <Col className="border-right" md={4}>
            <Row>
              <Col className="col-auto">
                <TextField
                  type="cont"
                  unit="nets"
                  user_options={netnums.length}
                  value={mistnets.total}
                  form="effort"
                  onChange={(e) => onChangeNetInfo(e, "total", changeMists)}
                  upper_level="mistnets"
                  name="total"
                  title="Total de Redes"
                ></TextField>
              </Col>
            </Row>

            <Row>
              <Col className="col-auto">
                <TextField
                  type="time"
                  value={mistnets.open}
                  form="effort"
                  onChange={(e) => onChangeNetInfo(e, "open", changeTime)}
                  upper_level="mistnets"
                  name="open"
                  title="Hora de Início"
                ></TextField>
              </Col>
            </Row>
            <Row>
              <Col className="col-auto">
                <TextField
                  type="time"
                  value={mistnets.close}
                  onChange={(e) => onChangeNetInfo(e, "close", changeTime)}
                  form="effort"
                  upper_level="mistnets"
                  name="close"
                  title="Hora de Fim"
                ></TextField>
              </Col>
            </Row>
          </Col>
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
        </Row>
        <NavigationButtons handleSub={handleSubmit} />
      </Form>
    </Container>
  );
}
