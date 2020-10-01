import React, {useState,useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"

const stationOptions = (initial_data) => {
    let opts = initial_data.stations.map((station) => station.station_code);
    return opts;
  };

  const protocolOptions = (initial_data) => {
    let opts = initial_data.protocols.map((protocol) => protocol.protocol_code);
    return opts;
  };



  const onChangeEffort = (event, key, effort, dispatch) => {
    let value = event.target.value;
    let new_effort = { ...effort, [key]: value };
    dispatch({ type: "UPDATE_EFFORT", data:new_effort });
  };


  const handleSubmit = (effort,event) => {
    const entered_data = JSON.parse(localStorage.getItem("entry_data"));
    let newdata = JSON.stringify({ ...entered_data, effort });
    localStorage.setItem("entry_data", newdata);
    event.preventDefault();
  };


  const stationGetter = (initial_data,entered_station) => {
    const station_data = initial_data.stations.filter((stats) => {
      let is_it = stats.station_code === entered_station;
      return is_it;
    });
    return station_data[0];
  };



   const NavigationButtons= (props) =>{
    const effort_stage = useSelector((state) => state.data_stage);
    const dispatch = useDispatch();
  
    return (
      <div className="contaienr">
        <div className="row mb-3 mt-5">
          <div className="col" md={{ span: 2, offset: 8 }}>
            <button className="btn btn-primary"
              onClick={() => {
                console.log("-1")
                dispatch({ type: "CHANGE_STAGE", data: -1 });
              }}
              disabled={effort_stage === 0}
              type="button"
            >
              Anterior
            </button>
          </div>
          <div className="col"  md={{ span: 2 }}>
            <button className="btn btn-primary"
              color="blue"
              onClick={(e) => {
                props.handleSub(e);
                  dispatch({ type: "CHANGE_STAGE", data: 1 })
              }}
                         disabled={props.invalidForm}

              type="button"
            >
              {effort_stage < 3 ? "Próximo" : "Enviar Dados"}
            </button>
          </div>
        </div>
      </div>
    );
  }
  export default  {stationOptions,protocolOptions,onChangeEffort, handleSubmit, stationGetter, NavigationButtons}