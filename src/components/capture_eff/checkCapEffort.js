const getDate = (date) => {
    let parts = date.split("/");
    let ndate = new Date(parts[2], parts[1] - 1, parts[0]);
    return ndate;
  };
  

export const getEffort = (datum,efforts,stations,protocols)=>{
    const filEff=efforts.filter(eff=>{
        console.log(Date.parse(getDate(datum.date))===Date.parse(Date(eff.date_effort)))   
        return datum.station===getStationCode(stations,eff.station_id) && Date.parse(getDate(datum.date))===Date.parse(eff.date_effort)}
   )

      
   const thisEffort = filEff.length?{...filEff[0],protocol:getProtocol(protocols,filEff[0].protocol_id)}:false
   
        return(thisEffort)
}



const getStationCode = (stations,id)=>   stations.filter(stat=> stat.station_id===id)[0].station_code

const getProtocol = (protocols,id)=>   {
  console.log(protocols,id)
  return protocols.filter(stat=> stat.protocol_id===id)[0].protocol_code}


