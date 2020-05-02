import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Typeahead } from 'react-bootstrap-typeahead';
import { useDispatch, useSelector } from 'react-redux';
import validateDate from 'validate-date'
import InputMask from 'react-input-mask';
import Cleave from 'cleave.js/react';




export default function RegularField({ changeFunc = null, type, options = null, field = null, upper_level = null, form, title = null, param = null, ...props }) {
    let up_level = useSelector(state => state.enter_data[form])
    let lower_level = useSelector(state => state.enter_data[form][upper_level])
    let invalidValue = useSelector(state => state.enter_data.form_invalid)
    let level_up = upper_level === null ?
        up_level : lower_level
    let value = Object.prototype.hasOwnProperty.call(props, "value") ?
        props.value : level_up[field]
    function changeEffortValue(data) {
        return { type: 'UPDATE_EFFORT_LEVEL', data: data, key: upper_level }
    }




    const dispatch = useDispatch();
    let [invalid, setInvalid] = useState(0)

    function setInvalidation(data, key) {

        return { type: 'FORM_VALIDATION', data: data, key: key }
    }




    function handleChange(event, key) {


        let value = event.target.value
        let new_group = { ...level_up, [key]: value }
        dispatch(changeEffortValue(new_group))
 

        // ===null? []:upper_level.nets
        if (changeFunc !== null) {
            let mistArray = lower_level.nets
                    changeFunc(value, mistArray)}



    }








    const createChecker = () => {
        switch (type) {

            case "val":
                return ({
                    check: () => options.indexOf(value) < 0,
                    message: "Valores permitidos:" + options,
                    props: {

                    }
                })


            case "date":
                return ({
                    check: () => validateDate(value),
                    message: "Data inválida",
                    props: {
                        options: { date: true }

                    }
                })


            case "cont":
                return ({
                    check: () => value === "",
                    message: "No message",
                    props: {

                    }
                })

            case "time":
                return ({
                    check: () => value === "",
                    message: "No message",
                    props: {
                        options: {
                            time: true,
                            timePattern: ['h', 'm']
                        }

                    }
                })



        }



    }

    const checker = createChecker()
    const checkInvalid = () => {
        let is_invalid = checker.check(value)
        setInvalid(is_invalid)
        dispatch(setInvalidation(is_invalid, field))
    }







    const createTitle = () => {
        let newT = title === null ?
            param.title :
            title

        return (
            <Row>
                <Form.Label>{newT}</Form.Label>
            </Row>

        )
    }



    return (
        <Form.Group as={Col} >
            {createTitle()}
            <Row>
                <Form.Control
                    as={Cleave}
                    name={field}
                    value={value}
                    isInvalid={invalid}
                    onChange={(e) => handleChange(e, field)}
                    onBlur={checkInvalid}
                    {...checker.props}
                    {...props}
                />


                <Form.Control.Feedback type="invalid">
                    {value === "" ?
                        "Obrigatório" :
                        checker.message}
                </Form.Control.Feedback>


                <Form.Control.Feedback type="valid">
                    Show
                    </Form.Control.Feedback>

            </Row>
        </Form.Group>
    )
}
