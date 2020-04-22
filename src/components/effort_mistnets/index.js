import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from "../input_field"
import Cleave from 'cleave.js/react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


export default function Effort_Nets() {

  const stationGetter = (entered_station) => {
    const station_data = base_field.stations.filter((stats) => {

      let is_it = stats.station_code === entered_station
      return (is_it)
    }
    )
    return (station_data[0])
  }


  const dispatch = useDispatch()
  function addCourseAction(data) {
    return { type: 'CHANGE_STAGE', data: data }
  }
  function nextEvent() {
    dispatch(addCourseAction(1))
  }

  let effort = useSelector(state => state.enter_data.effort)
  let mistnets = useSelector(state => state.enter_data.effort.mistnets)
  console.log(mistnets)
  let base = useSelector(state => state.enter_data.effort.base)


  let base_field = useSelector(state => state.initial_data)
  let invalidValue = useSelector(state => state.enter_data.form_invalid)



  const station_mistnets = stationGetter(base.station).mistnets

  const netnums = station_mistnets.map((net) => net.net_number)

  console.log(netnums)
  const handleSubmit = (event) => {
    nextEvent()
    const entered_data = JSON.parse(localStorage.getItem("entry_data"))
    let newdata = JSON.stringify({ ...entered_data, effort })
    localStorage.setItem("entry_data", newdata)

    event.preventDefault();

  };


  return (
    <Form onSubmit={handleSubmit}>

      <Container>
        <Row>
          <Form.Group as={Col} controlId="validationCustom02">

            <div>
              <TextField type="cont" form="effort" upper_level="mistnets" field="total" title="Total de Redes">
              </TextField>
            </div>


            <div>
              <TextField type="time" form="effort" upper_level="mistnets" field="open" title="Hora de Abertura">
              </TextField>

            </div>


            <div>
              <TextField type="time" form="effort" upper_level="mistnets" field="close" title="Hora de Fechamento">
              </TextField>

            </div>
          </Form.Group>
          <Form.Group as={Col} controlId="validationCustom02">
            { 
            mistnets.nets.map(
              (net,i)=>{
                return(
              <TextField type="time" key={i} form="effort" upper_level="mistnets" field="close" arr={1} title="Hora de Fechamento">
              </TextField>
)
              }

            )


          }
          </Form.Group>



        </Row>
      </Container>
<Button onClick={()=>{dispatch({type:"CREATE_NETS",data:1})}}>Add Net</Button>
      <Button
        disabled={invalidValue}
        type="submit"
      >Submit form</Button>

    </Form>

  );
}