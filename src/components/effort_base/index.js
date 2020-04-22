import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from "../input_field"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputMask from 'react-input-mask';




export default function Effort_Base() {

  const dispatch = useDispatch()
  function addCourseAction(data) {
    return { type: 'CHANGE_STAGE', data: data }
  }
  function nextEvent() {
    dispatch(addCourseAction(1))
  }
  let effort = useSelector(state => state.enter_data.effort)

  let base = useSelector(state => state.enter_data.effort.base)
  let base_field = useSelector(state => state.initial_data)
  let invalidValue = useSelector(state => state.enter_data.form_invalid)




  const handleSubmit = (event) => {
    nextEvent()
    const entered_data = JSON.parse(localStorage.getItem("entry_data"))
    let newdata = JSON.stringify({...entered_data,effort})
    localStorage.setItem("entry_data",newdata)
    
    event.preventDefault();

  };


  const protocolGetter = (entered_protocol) => {
    const protocol_data = base_field.protocols.filter((prot) => {
      let is_it = prot.protocol_code === entered_protocol
      console.log(is_it)
    }
    )
  }




  const stationOptions = () => {
    let opts = base_field.stations.map((station) => station.station_code)
    return (opts)
  }


  const protocolOptions = () => {
    let opts = base_field.protocols.map((protocol) => protocol.protocol_code)
    return (opts)
  }


  const Submitter = () => {


  }









  return (
    
    <Form onSubmit={handleSubmit}>

<Container>
  <Row>
        <Form.Group as={Col} controlId="validationCustom02">

          <TextField
             type="date" form="effort" upper_level="base" field="date" title="Data" />

          <div>
            <TextField type="val" options={stationOptions()} form="effort" upper_level="base" field="station" title="Estação">
            </TextField>
          </div>
          <div>
            <TextField type="val" options={protocolOptions()} form="effort" upper_level="base" field="protocol" title="Protocolo">
            </TextField>
          </div>
        </Form.Group>

      </Row>
        </Container>
        <Button
          disabled={invalidValue}
          type="submit"
        >Submit form</Button>

        </Form>

  );
  
}