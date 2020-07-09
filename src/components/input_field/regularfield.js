import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { createChecker, NameCreator } from "../functions";

const RegularField = (props) => {

    let new_options = [];

    if (props.protocol_options) {
      new_options.push(props.protocol_options.map((opt) => opt.value_oama));
    } else if (props.user_options) {
      new_options.push(props.user_options);
    }
  
  let [invalid, setInvalid] = useState(0);

  const checker = createChecker(
    props.unit,
    props.type,
    props.user_options,
    new_options,
    props.options
  );
  useEffect(() => {
    let is_invalid = checker.check(props.value);
    let checkInv = props.checkFunc
      ? props.checkFunc(props.name, is_invalid)
      : null;
  }, []);

  const checkInvalid = () => {
    let is_invalid = checker.check(props.value);
    if (is_invalid !== invalid) {
      let checkInv = props.checkFunc
        ? props.checkFunc(props.name, is_invalid)
        : null;
    }
    setInvalid(is_invalid);
  };

  return (
    <div>
      <Form.Control
        {...props}
        {...checker.props}
        type={undefined}

        isInvalid={invalid}
        onBlur={() => checkInvalid()}
        onFocus={() => setInvalid(0)}
        onChange={(e) => {
          props.onChange(e,props.i);
          let is_invalid = checker.check(e.target.value);
          if (is_invalid !== invalid) {
            let checkInv = props.checkFunc
              ? props.checkFunc(props.name, is_invalid)
              : null;
          }
        }}
      />
      {invalid ? (
        <div className={"row"}>
          <div className="col">
            <p className="text-danger">
              {props.value === "" ? "Obrigatório" : checker.message}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default RegularField;
