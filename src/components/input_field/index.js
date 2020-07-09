import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Typeahead } from "react-bootstrap-typeahead";
import { useDispatch } from "react-redux";
import Cleave from "cleave.js/react";
import { createChecker, NameCreator } from "../functions";
import RegularField from "./regularfield"
export default function FieldGroup(props) {

  const createTitle = (title, unit) => {
    let newT = NameCreator(title, unit);
    return (
      <Row>
        <Form.Label>{newT}</Form.Label>
      </Row>
    );
  };

  return (
    <Form.Group as={Col}>
      {createTitle(props.title, props.unit)}
      <Row>
        {["spp_name", "band_number"].indexOf(props.type) < 0 ? (
          Array.isArray(props.value) ? (
            props.value.map((val,i) => (
              <RegularField as={Cleave} {...props}
              i={i}
              value={val} />
            ))
          ) : (
            <RegularField as={Cleave} {...props} />
          )
        ) : (
          <Typeahead
            name={props.name}
            value={props.value}
            // isInvalid={invalid}
            // onBlur={checkInvalid}
            // onFocus={() => setInvalid(0)}
            // {...checker.props}
            {...props}
            options={props.options ? props.options : ""}
          />
        )}


      </Row>
    </Form.Group>
  );
}
