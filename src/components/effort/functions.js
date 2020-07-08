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

  module.exports={stationOptions,protocolOptions,onChangeEffort, handleSubmit, stationGetter}