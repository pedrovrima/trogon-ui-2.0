import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Typeahead } from "react-bootstrap-typeahead";
import { useDispatch } from "react-redux";
import Cleave from "cleave.js/react";
import { createChecker, NameCreator } from "../functions";

export default function RegularField({
  variable = null,
  unit = null,
  changeFunc = null,
  options = null,
  type = null,
  user_options = null,
  name = null,
  upper_level = null,
  form,
  title = null,
  value = null,
  param = null,
  protocol_options = null,

  ...props
}) {
  let new_options = [];

  if (protocol_options) {
    new_options.push(protocol_options.map((opt) => opt.value_oama));
  } else if (user_options) {
    new_options.push(user_options);
  }

  useEffect(() => {
    let is_invalid = checker.check(value);
    let checkInv = props.checkFunc ? props.checkFunc(name, is_invalid) : null;
  }, []);



  let [invalid, setInvalid] = useState(0);


  const createTitle = (title, unit) => {
    let newT = NameCreator(title, unit);
    return (
      <Row>
        <Form.Label>{newT}</Form.Label>
      </Row>
    );
  };

  const checker = createChecker(
    unit,
    type,
    user_options,
    new_options,
    options
  );
  const checkInvalid = () => {
    let is_invalid = checker.check(value);
    if(is_invalid!==invalid){
      let checkInv = props.checkFunc ? props.checkFunc(name, is_invalid) : null;
    }
    setInvalid(is_invalid);
      };

  return (
    <Form.Group as={Col}>
      {createTitle(title, unit)}
      <Row>
        {["spp_name", "band_number"].indexOf(type) < 0 ? (
          <Form.Control
            {...props}
            as={Cleave}
            name={name}
            value={value}
            isInvalid={invalid}
            onBlur={()=>checkInvalid()}
            onFocus={() => setInvalid(0)}
            onChange={(e) => {
              props.onChange(e);
              console.log(e.target.value);
              let is_invalid = checker.check(e.target.value);
              if(is_invalid!==invalid){
                let checkInv = props.checkFunc ? props.checkFunc(name, is_invalid) : null;
              }
            }}
            {...checker.props}
          />
        ) : (
          <Typeahead
            name={name}
            value={value}
            isInvalid={invalid}
            onBlur={checkInvalid}
            onFocus={() => setInvalid(0)}
            {...checker.props}
            {...props}
            options={options ? options : ""}
          />
        )}

        {invalid ? (
          <div className={"row"}>
            <div className="col">
              <p className="text-danger">
                {value === "" ? "Obrigatório" : checker.message}
              </p>
            </div>
          </div>
        ) : null}
      </Row>
    </Form.Group>
  );
}
