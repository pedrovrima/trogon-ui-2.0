const getDate = (date,split) => {
  let parts = date.split(split);
  console.log(parts)
  let ndate = Date.UTC(parts[2], parts[1] - 1, parts[0]);
  return ndate;
};

const getDateEff = (date,split) => {
  let parts = date.split(split);
  console.log(parts)
  let ndate = (Date.UTC(parts[0], parts[1] - 1, parts[2]));
  return ndate;
};

export const getEffort = (datum, efforts, stations, protocols) => {
  const filEff = efforts.filter((eff) => {
    const eff_date = getDateEff(eff.date_effort.split("T")[0],"-")
    console.log((getDate(datum.date,"/"))===(eff_date))
    return (
      datum.station === getStationCode(stations, eff.station_id) &&
      (getDate(datum.date,"/")) === (eff_date))
  });

  const thisEffort = filEff.length
    ? { ...filEff[0], protocol: getProtocol(protocols, filEff[0].protocol_id) }
    : false;

  return thisEffort;
};

const getStationCode = (stations, id) =>
  stations.filter((stat) => stat.station_id === id)[0].station_code;

const getProtocol = (protocols, id) => {
  console.log(protocols, id);
  return protocols.filter((stat) => stat.protocol_id === id)[0].protocol_code;
};
