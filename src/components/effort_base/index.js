import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from "../input_field"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
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
  const [validated, setValidated] = useState(false);
  let base = useSelector(state => state.enter_data.effort.base)
  let base_field = useSelector(state => state.initial_data)
  let invalidValue = useSelector(state => state.enter_data.form_invalid)


  const handleSubmit = (event) => {
    nextEvent()


  };
  

  const stationGetter = (entered_station) => {
    const station_data = base_field.stations.filter((stats) => {
      let is_it = stats.station_code === entered_station
      return (is_it)
    }
    )
    console.log(station_data)
  }

  const protocolGetter = (entered_protocol) => {
    const protocol_data = base_field.protocols.filter((prot) => {
      let is_it = prot.protocol_code === entered_protocol
      console.log(is_it)
      return (is_it)
    }
    )
    console.log(protocol_data)
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
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Col} md="4" controlId="validationCustom02">

          <TextField
            as={InputMask}
            mask={"99/99/9999"} form="effort" upper_level="base" field="date" title="Data" />

          <div>
            <TextField type="val" options={stationOptions()} form="effort" upper_level="base" field="station" title="Estação">
            </TextField>
          </div>
          <div>
            <TextField type="val" options={protocolOptions()} form="effort" upper_level="base" field="protocol" title="Protocolo">
            </TextField>
          </div>
        </Form.Group>

        <Button 
        disabled={invalidValue}
         >Submit form</Button>
      </Form>
      <div>
        {JSON.stringify(base)}
      </div>



    </>
  );
}