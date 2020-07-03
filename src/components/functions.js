import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector, useDispatch } from "react-redux";
import validateDate from "validate-date";
import TextField from "./input_field";

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
            disabled={effort_stage === 0}
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
            // disabled={invalidValue}
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
    return { name: variable.name, a_value: "" };
  });

  let ageSex = [
    { name: "age_wrp", a_value: "" },
    { name: "age_criteria", a_value: "" },
    { name: "sex", a_value: "" },
    { name: "sex_criteria", a_value: "" },
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

export function createChecker(
  unit,
  type,
  value,
  user_options,
  new_options,
  options
) {
  const checkCont = () => {
    switch (unit) {
      case "percentage":
        return {
          check: () =>
            value === "NA"
              ? false
              : !Number(value)
              ? !Number(value)
              : value > 100 || value < 0,
          message: "Valores devem estar entre 0 e 100",
          props: {
            options: {
              uppercase: true,
            },
          },
        };

      case "nets":
        return {
          check: () => value > user_options,
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
          check: () => (value === "NA" ? false : !Number(value)),
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
    case "val":
      return {
        check: () =>
          value === "NA" ? false : new_options[0].indexOf(value) < 0,
        message: "Valores permitidos:" + new_options,
        props: {
          options: {
            uppercase: true,
          },
        },
      };

    case "date":
      return {
        check: () => !validateDate(value, "boolean", "dd/mm/yyyy"),
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
        check: () => value === "",
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
        check: () => value.length > 3,
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
        check: () => null,
      };
    default:
      return {
        check: () => null,
      };
      break;
  }
}

export function VarField(...props) {
  let a_props = props[0];
  return (
    <TextField
      type={a_props.variable.type}
      onChange={(e) => a_props.onChangeFunc(e, a_props.variable.name)}
      value={a_props.value}
      title={a_props.variable.portuguese_label}
      protocol_options={a_props.variable.options}
      unit={a_props.variable.unit}
      duplicable={a_props.variable.duplicable}
    ></TextField>
  );
}

export function CaptureNavigationButtons(handleSub = () => null) {
  let capture_index = useSelector((state) => state.capture_index);
  let dispatch = useDispatch();
  let capture_data = useSelector((state) => state.enter_data.captures);
  let setCaptureIndex = (value) =>
    dispatch({ type: "CHANGE_CAPTURE_INDEX", data: value });
  let effort_values = useSelector((state) => state.enter_data.effort);

  let user_protocols = useSelector((state) => state.initial_data.protocols);
  let capture_variables = useSelector(
    (state) => state.initial_data.capture_variables
  );
  let this_protocol = effort_values.base.protocol;

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

  const capture_stage = useSelector((state) => state.capture_stage);
  const entry_stage = useSelector((state) => state.entry_stage);
  let fake_capture_data = createCapture(mandatory_variables);

  const finishCapture = () => {
    const entered_data = JSON.parse(localStorage.getItem("entry_data"));
    let newdata = JSON.stringify({
      ...entered_data,
      captures: capture_data,
    });
    localStorage.setItem("entry_data", newdata);

    dispatch({ type: "ADD_CAPTURE", data: fake_capture_data });
    dispatch({ type: "CHANGE_CAPTURE_INDEX", data: "new" });
    dispatch({ type: "CHANGE_CAPTURE_STAGE", data: 0 });
  };

  let invalidValue = useSelector((state) => state.enter_data.form_invalid);
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
              // handleSub.handleSub(e);
              capture_stage < 2
                ? dispatch({ type: "CHANGE_CAPTURE_STAGE", data: 1 })
                : finishCapture();
            }}
            // disabled={invalidValue}
            type="button"
          >
            {capture_stage < 2 ? "Próximo" : "Nova captura"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
