import React from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from "../input_field";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputMask from "react-input-mask";
import { NavigationButtons } from "../functions";

export default function Effort_Base() {
  const intNaN = (val) => (isNaN(val) ? 0 : val === null ? 0 : parseInt(val));
  const dispatch = useDispatch();
  function addCourseAction(data) {
    return { type: "CHANGE_STAGE", data: data };
  }
  function nextEvent() {
    dispatch(addCourseAction(1));
  }

  let effort = useSelector((state) => state.enter_data.effort);
  let summary = useSelector((state) => state.enter_data.effort.summary);
  let invalidValue = useSelector((state) => state.enter_data.form_invalid);
  let notes = useSelector((state) => state.enter_data.effort.notes);

  const handleSubmit = (event) => {
    nextEvent();
    const entered_data = JSON.parse(localStorage.getItem("entry_data"));
    let newdata = JSON.stringify({ ...entered_data, effort });
    localStorage.setItem("entry_data", newdata);

    event.preventDefault();
  };
  const onChangeSummary = (event, key) => {
    let value = event.target.value;
    let new_summary = { ...summary, [key]: value };
    dispatch({ type: "SUMMARY_EFFORT", data:new_summary });
  };

  return (
    <Form onSubmit={handleSubmit} className="form">
      <Container>
        <Row>
          <Col>
            <Row>
              <TextField
                type="cont"
                form="effort"
                upper_level="summary"
                name="new"
                value={summary.new}
                title="Novos"
                onChange={(e)=>onChangeSummary(e,"new")}
              />
            </Row>
            <Row>
              <TextField
                type="cont"
                form="effort"
                upper_level="summary"
                name="recapture"
                value={summary.recapture}
                title="Recaptura"
                onChange={(e)=>onChangeSummary(e,"recapture")}

              ></TextField>
            </Row>
            <Row>
              <TextField
                type="cont"
                form="effort"
                upper_level="summary"
                name="unbanded"
                value={summary.unbanded}
                title="Sem Anilha"
                onChange={(e)=>onChangeSummary(e,"unbanded")}

              ></TextField>
            </Row>
            <Row>
              <p>
                Total:{" "}
                {intNaN(summary.new) +
                  intNaN(summary.recapture) +
                  intNaN(summary.unbanded)}
              </p>
            </Row>
          </Col>
          <Col>
            <TextField
              value={notes}
              type="notes"
              form="effort"
              name="notes"
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_EFFORT_LEVEL",
                  key: "notes",
                  data: e.target.value,
                })
              }
              title="Notas"
              as="textarea"
              rows="3"
            ></TextField>
          </Col>
        </Row>
      </Container>
      <NavigationButtons handleSub={handleSubmit} />
    </Form>
  );
}
