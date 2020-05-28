import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector, useDispatch } from "react-redux";

export function NavigationButtons(handleSub = () => null) {
  const effort_stage = useSelector((state) => state.data_stage);
  const entry_stage = useSelector((state) => state.entry_stage);
  const dispatch = useDispatch();

  let invalidValue = useSelector((state) => state.enter_data.form_invalid);
  return (
    <Container>
      <Row className="mb-3 mt-5">
        <Col md={{ span: 2, offset: 8 }}>
          <Button
            onClick={() => {
              dispatch({ type: "CHANGE_STAGE", data: -1 });
            }}
            disabled={invalidValue || effort_stage === 0}
          >
            Anterior
          </Button>
        </Col>
        <Col md={{ span: 2 }}>
          <Button
            color="blue"
            onClick={(e) => {
              handleSub.handleSub(e);
              effort_stage < 3
                ? dispatch({ type: "CHANGE_STAGE", data: 1 })
                : dispatch({ type: "CHANGE_ENTRY", data: "capture" });
            }}
            disabled={invalidValue}
            type="button"
          >
            {effort_stage < 3 ? "Próximo" : "Iniciar Capturas"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export function NameCreator(title = "", unit = null) {
  if (title !== "") {
    let getUnitText = (unit) => {
      switch (unit) {
        case "percentage":
          return " (%)";
        case "celsius":
          return " (°C)";
        case "gr":
          return " (gr)";
        case "mm":
          return "mm";
        default:
          return "";
      }
    };
    return <h5>{title + getUnitText(unit)}</h5>;
  } else {
    return "";
  }
}

export function createCapture() {
  return {
    capture_time: "",
    net_number: "",
    bander: "",

    capture_code: "",
    band_size: "",
    band_number: "",

    note: "",
    spp_id: "",
    variables: [],
  };
}

export function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
