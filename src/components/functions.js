import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector, useDispatch } from "react-redux";
import validateDate from "validate-date";
import TextField from "./input_field";
import store from "../store";
import axios from "axios";

export function countCaptures() {
  let state = store.getState();
  let captures = state.enter_data.captures;
  let count = captures.reduce(
    (obj, capVal) => {
      switch (capVal.capture_code) {
        case "N":
          obj.n++;
          break;
        case "R":
          obj.r++;
          break;
        case "U":
          obj.u++;
          break;
        default:
      }
      return obj;
    },
    { n: 0, r: 0, u: 0 }
  );
  return count;
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
          return "(mm)";
        default:
          return "";
      }
    };
    return <h6>{title + getUnitText(unit)}</h6>;
  } else {
    return "";
  }
}

export function createCapture(protocol_variables) {
  let cap_vars = protocol_variables.map((variable) => {
    return { name: variable.name, a_value: [""] };
  });

  let ageSex = [
    { name: "age_wrp", a_value: [""] },
    { name: "age_criteria", a_value: [""] },
    { name: "sex", a_value: [""] },
    { name: "sex_criteria", a_value: [""] },
  ];

  ageSex.map((avar) => cap_vars.push(avar));

  return {
    capture_time: "",
    net_number: "",
    bander: "",

    capture_code: "",
    band_size: "",
    band_number: "",

    note: "",
    spp_id: "",
    variables: cap_vars,
  };
}

export function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export function createChecker(unit, type, user_options, new_options, options) {
  const checkCont = () => {
    switch (unit) {
      case "percentage":
        return {
          check: (value) => {
            return value === "0"
              ? false
              : value === "NA"
              ? false
              : !Number(value)
              ? !Number(value)
              : value > 100 || value < 0;
          },
          message: "Valores devem estar entre 0 e 100",
          props: {
            options: {
              uppercase: true,
            },
          },
        };

      case "nets":
        return {
          check: (value) => value > user_options,
          message:
            "Esta estação possui apenas " + user_options + " registradas",
          props: {
            options: {
              uppercase: true,
            },
          },
        };

      default:
        return {
          check: (value) =>
            value === "0" ? false : value === "NA" ? false : !Number(value),
          message: "Deve ser um número",
          props: {
            options: {
              uppercase: true,
            },
          },
        };
    }
  };

  switch (type) {
    case "val": {
      return {
        check: (value) =>
          value === "NA" ? false : new_options[0].indexOf(value) < 0,
        message: "Valores permitidos:" + new_options,
        props: {
          options: {
            uppercase: true,
          },
        },
      };
    }
    case "date":
      return {
        check: () => null,
        check: (value) => !validateDate(value, "boolean", "dd/mm/yyyy"),
        message: "Data inválida",
        props: {
          options: { date: true },
        },
      };

    case "cont":
      let pre_checker = checkCont();
      return pre_checker;

    case "time":
      return {
        check: (value) => value === "",
        message: "No message",
        props: {
          options: {
            time: true,
            timePattern: ["h", "m"],
          },
        },
      };

    case "cap_time":
      return {
        check: (value) => value.length > 3,
        message: "Máximo de 3 caracteres",
      };

    case "spp_name":
      return {
        check: (value) => {
          return value
            ? options.map((spp) => spp.code).indexOf(value.target.value) < 0
            : null;
        },
        message: "Espécies inválida",
        props: {
          options: {
            uppercase: true,
          },
        },
      };

    case "band_number":
      return {
        check: (value) => null,
      };
    default:
      return {
        check: (value) => null,
      };
      break;
  }
}

export function VarField(...props) {
  let a_props = props[0];
  return (
    <TextField
      name={a_props.variable.name}
      type={a_props.variable.type}
      onChange={(e, i) => {
        a_props.onChangeFunc(e, a_props.variable.name, i);
      }}
      value={a_props.value}
      title={a_props.variable.portuguese_label}
      protocol_options={a_props.variable.options}
      unit={a_props.variable.unit}
      duplicable={a_props.variable.duplicable}
      checkFunc={a_props.checkFunc}
    ></TextField>
  );
}

export function CaptureNavigationButtons(props) {
  let capture_index = useSelector((state) => state.capture_index);
  let dispatch = useDispatch();
  let capture_data = useSelector((state) => state.enter_data.captures);
  let setCaptureIndex = (value) =>
    dispatch({ type: "CHANGE_CAPTURE_INDEX", data: value });
  let effort_values = useSelector((state) => state.enter_data.effort);

  const capture_stage = useSelector((state) => state.capture_stage);
  const entry_stage = useSelector((state) => state.entry_stage);

  const finishCapture = () => {
    const non_sub_data = JSON.parse(
      localStorage.getItem("non_submitted_captures")
    );
    const old_data = non_sub_data ? non_sub_data : [];
    let newdata = JSON.stringify([...old_data, ...capture_data]);
    localStorage.setItem("non_submitted_captures", newdata);

    dispatch({ type: "ZERO_CAPTURE" });
    // dispatch({ type: "CHANGE_CAPTURE_INDEX", data: "new" });
    dispatch({ type: "CHANGE_CAPTURE_STAGE", data: 0 });
  };

  return (
    <Container>
      <Row className="mb-3 mt-5">
        <Col md={{ span: 2, offset: 8 }}>
          <Button
            onClick={() => {
              dispatch({ type: "CHANGE_CAPTURE_STAGE", data: -1 });
            }}
            disabled={capture_stage === 0}
          >
            Anterior
          </Button>
        </Col>
        <Col md={{ span: 2 }}>
          <Button
            color="blue"
            onClick={(e) => {
              dispatch({ type: "CHANGE_CAPTURE_STAGE", data: 1 });
            }}
            disabled={props.invalidForm}
            type="button"
          >
            {capture_stage < 3 ? "Próximo" : "Enviar"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
