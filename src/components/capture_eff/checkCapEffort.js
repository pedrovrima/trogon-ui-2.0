const getDate = (date) => {
    let parts = date.split("/");
    let ndate = new Date(parts[2], parts[1] - 1, parts[0]);
    return ndate;
  };
  

const getEffort = (datum,efforts,stations)=>{
    const filEff=efforts.filter(eff=>{
        console.log(Date.parse(getDate(datum.date))===Date.parse(Date(eff.date_effort)))   
        return datum.station===getStationCode(stations,eff.station_id) && Date.parse(getDate(datum.date))===Date.parse(eff.date_effort)}
   )
        return(filEff.length?filEff[0].effort_id:false)
}



const getStationCode = (stations,id)=>   stations.filter(stat=> stat.station_id===id)[0].station_code

module.exports = {getEffort}
