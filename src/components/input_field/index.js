import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Typeahead } from 'react-bootstrap-typeahead';
import { useDispatch, useSelector } from 'react-redux';
import validateDate from 'validate-date'
import InputMask from 'react-input-mask';

export default function RegularField({ type, options=null, field, upper_level = null, form, title = null, param = null ,...props}) {
    let up_level = useSelector(state => state.enter_data[form])
    let lower_level = useSelector(state => state.enter_data[form][upper_level])
    let invalidValue = useSelector(state => state.enter_data.form_invalid)

    let base = upper_level = null ?
        up_level : lower_level
    let value = base[field]

    function addCourseAction(data) {

        return { type: 'UPDATE_EFFORT_LEVEL', data: data, key: "base" }
    }

    const dispatch = useDispatch();
    let [valid, setValid] = useState(0)

    function setInvalidation (data, key) {

        return { type: 'FORM_VALIDATION', data: data, key:key }
    }
   

    function handleChange(event, key) {
        let value = event.target.value
        let new_group = { ...base, [key]: value }
        dispatch(addCourseAction(new_group))


    }


    let checkValid = () => {
        let aclass = value ===""? 1 : options!==null ?
         options.indexOf(value) < 0 ?
            1 : 0 :
         validateDate(value)


            setValid(aclass)
            dispatch(setInvalidation(aclass, field))
            
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
                    //   inputProps={{ required: true }}
                    mask={props.mask}
                    name={field}
                    id={1}
                    as={props.as}    
                    value={value}
                    minLength={2}
                    isInvalid={valid}
                    onChange={(e) => handleChange(e, field)}
                    onBlur={checkValid}
                    required

                />


                <Form.Control.Feedback type="invalid">
                    {value === "" ?
                        "Obrigatório" : 
                        options!==null ?
                        "Opções aceitas:" + options :
                        title+ " não aceita(o)"}
                </Form.Control.Feedback>


                <Form.Control.Feedback type="valid">
                    Show
                    </Form.Control.Feedback>

            </Row>
        </Form.Group>
    )
}
