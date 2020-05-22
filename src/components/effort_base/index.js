import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from "../input_field"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputMask from 'react-input-mask';
import { NavigationButtons } from '../functions'



export default function Effort_Base() {

  const dispatch = useDispatch()

  let effort = useSelector(state => state.enter_data.effort)
  let base = useSelector(state => state.enter_data.effort.base)
  let base_field = useSelector(state => state.initial_data)




  const handleSubmit = (event) => {
    dispatch({ type: "CHANGE_STAGE", data: 1 })

    const entered_data = JSON.parse(localStorage.getItem("entry_data"))
    let newdata = JSON.stringify({ ...entered_data, effort })
    localStorage.setItem("entry_data", newdata)
    event.preventDefault();

  };






  const stationOptions = () => {
    let opts = base_field.stations.map((station) => station.station_code)
    return (opts)
  }


  const protocolOptions = () => {
    let opts = base_field.protocols.map((protocol) => protocol.protocol_code)
    return (opts)
  }






  return (
    <Container>
      <Form onSubmit={handleSubmit} className="h-100">

        <Row>
          <div className="col-auto" >
            <TextField
              type="date" value={base.date} form="effort" upper_level="base" name="date" title="Data" />
          </div>
        </Row>
        <Row>
          <div className="col-auto">
            <TextField type="val" value={base.station} user_options={stationOptions()} form="effort" upper_level="base" name="station" title="Estação">

            </TextField>
          </div>
        </Row>
        <Row>
          <div className="col-auto">
            <TextField type="val" value={base.protocol} user_options={protocolOptions()} form="effort" upper_level="base" name="protocol" title="Protocolo">
            </TextField>
          </div>
        </Row>
        <NavigationButtons />
      </Form>
    </Container>
  );

}