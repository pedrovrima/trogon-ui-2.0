import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Typeahead } from "react-bootstrap-typeahead";
import { useDispatch } from "react-redux";
import Cleave from "cleave.js/react";
import { createChecker, NameCreator } from "../functions";
import RegularField from "./regularfield";
import fieldFunctions from "./field_functions";

export default function FieldGroup(props) {
  const [invalid, setInvalid] = useState(false);

  const dispatch = useDispatch();
  const createTitle = (title, unit) => {
    let newT = NameCreator(title, unit);
    return (
      <Row>
        <Form.Label>{newT}</Form.Label>
      </Row>
    );
  };

  const onBlurF = (props) => {
    if (props.type === "band_number") {
      const is_invalid = props.value[0] === "" || props.value.length === 0;
      setInvalid(is_invalid);
      props.checkFunc(props.name, is_invalid);
    } else {
      const is_invalid = props.value
        ? props.value.length
          ? !props.value[0]
          : !props.value
        : true;

      setInvalid(is_invalid);
      props.checkFunc(props.name, is_invalid);
    }

    // if(props.checkFunc) props.checkFunc(props.name, invalid)
  };

  return (
    <Form.Group as={Col}>
      {createTitle(props.title, props.unit)}{" "}
      {props.duplicable ? (
        <div
          onClick={() =>
            fieldFunctions.addField(
              props.name ? props.name : props.variable.name,
              dispatch
            )
          }
        >
          +
        </div>
      ) : null}
      <Row>
        {["spp_name", "band_number"].indexOf(props.type) < 0 ? (
          Array.isArray(props.value) ? (
            props.value.map((val, i) => (
              <RegularField as={Cleave} {...props} i={i} value={val} />
            ))
          ) : (
            <RegularField as={Cleave} {...props} />
          )
        ) : (
          <Typeahead
            name={props.name}
            value={props.value}
            isInvalid={invalid}
            onBlur={() => onBlurF(props)}
            onFocus={() => setInvalid(false)}
            // {...checker.props}
            {...props}
            options={props.options ? props.options : ""}
          />
        )}
      </Row>
    </Form.Group>
  );
}
