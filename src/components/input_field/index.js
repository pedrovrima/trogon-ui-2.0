import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Typeahead } from 'react-bootstrap-typeahead';
import { useDispatch, useSelector } from 'react-redux';
import validateDate from 'validate-date'
import InputMask from 'react-input-mask';
import Cleave from 'cleave.js/react';
import { NameCreator } from '../functions'



export default function RegularField({ variable = null, unit=null, changeFunc = null, options = null, type = null, user_options = null, name = null, upper_level = null, form, title = null, value = null, param = null, ...props }) {


    let new_options = []

    if (type === null && user_options === null && name === null && variable !== null) {
        if (Object.keys(variable).indexOf("eff_options") > -1) {
                ({ type, unit,name } = variable)
            new_options.push(variable.eff_options.map((opt) => opt.value_oama))
                }else{
        ({ type, options, unit, name } = variable)
        new_options.push(options.map((opt) => opt.value_oama))
    }
    }else{
        new_options.push(user_options)
        
    }



    let up_level = useSelector(state => state.enter_data[form])
    let lower_level = useSelector(state => state.enter_data[form][upper_level])
    let invalidValue = useSelector(state => state.enter_data.form_invalid)
    let level_up = upper_level === null ?
        up_level : lower_level
    function changeEffortValue(data) {
        return { type: 'UPDATE_EFFORT_LEVEL', data: data, key: upper_level }
    }



    useEffect(() => {
        let is_invalid = checker.check(value)
        dispatch(setInvalidation(is_invalid, name))

    }, [])



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
            changeFunc(value, mistArray)
        }



    }




    const createTitle = (title,unit) => {
        let newT = NameCreator(title,unit)
        return (
            <Row>
                <Form.Label>{newT}</Form.Label>
            </Row>

        )
    }



    const checkCont = () => {
        switch (unit){
            case "percentage":
               return( {
                    check: () => value > 100 && value > 0 ,
                    message: "Valores devem estar entre 0 e 100",
                    props: {

                    }
                })


                case "nets":
                    console.log(user_options)
                    return( {
                         check: () => value > user_options ,
                         message: "Esta estação possui apenas " + user_options + " registradas",
                         props: {
     
                         }
                     })
     

                default:
                    return( {
                        check: () => value === 0 ,
                        message: "Valores devem estar entre 0 e 100",
                        props: {
    
                        }
                    })
         


        }
        


    }



    const createChecker = () => {
        switch (type) {

            case "val":
                return ({
                    check: () => new_options[0].indexOf(value) < 0,
                    message: "Valores permitidos:" + new_options,
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
                let pre_checker = checkCont()
                return (pre_checker)

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

            case "cap_time":
                return(
                    {check:()=>value.length>3,
                        message: "Máximo de 3 caracteres"

                    }
                )

             case "spp_name":
                 return(
                     {
                     check: (value)=> {return(value ? options.map((spp)=>spp.code).indexOf(value.target.value)<0:null)}  ,
                     message: "Espécies inválida"                 
                   })   

                   case "band_number":
                       return({
                           check: ()=> null
                       }
                       )


        }



    }

    const checker = createChecker()

    const checkInvalid = (value) => {
        let is_invalid = checker.check(value)
        setInvalid(is_invalid)
        dispatch(setInvalidation(is_invalid, name))
    }








    return (
        <Form.Group as={Col} >
            {createTitle(title,unit)}
            <Row>
                {["spp_name"].indexOf(type)<0  ? <Form.Control
                    as={Cleave}
                    name={name}
                    value={value}
                    isInvalid={invalid}
                    onChange={(e) => handleChange(e, name)}
                    onBlur={checkInvalid}
                    onFocus={()=>setInvalid(0)}
                    {...checker.props}
                    {...props}
                />

:
<Typeahead
                    as={Form.Control, Cleave}
                    name={name}
                    value={value}
                    isInvalid={invalid}
                    onChange={(e) => handleChange(e, name)}
                    onBlur={checkInvalid}
                    onFocus={()=>setInvalid(0)}
                    {...checker.props}
                    {...props}
                    options={options}
                />


                }

                {invalid? 
                    <div className={"row"}>
                    <div className="col">
                    <p className="text-danger">
                    {value === "" ?
                        "Obrigatório" :
                        checker.message}
                </p>
                </div>
                </div> : null

                }
            </Row>
        </Form.Group>
    )
}
