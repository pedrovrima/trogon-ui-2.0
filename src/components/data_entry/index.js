import React, { useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import CaptureCotainer from "../capture_container";
import Row from "react-bootstrap/Row";
import EffortEntry from "../effort";
import {countCaptures} from "../functions"


function localStorageChecker(data) {
  return { type: "LOCAL_STORAGE_DATA", data: data };
}

export default function Data_Entry() {
  const dispatch = useDispatch();
  let capture_data = useSelector((state) => state.enter_data.captures);
    let local_data = localStorage.getItem("entry_data");
  let loaded = useSelector((state) => state.loaded);
  let effort_data = useSelector((state) => state.enter_data.effort);
  let [capCount,setCapCount]=useState(countCaptures())

  useEffect(() => {
    const init_data = localStorage.getItem("registerData");
    dispatch({ type: "LOCAL_SETTER", data: JSON.parse(init_data) });

    if (local_data !== null) {
      dispatch(localStorageChecker(JSON.parse(local_data)));
    } else {
      dispatch({ type: "LOADER", data: 1 });
    }
  }, []);




  useEffect(() => {
    setCapCount( countCaptures())

  }, [capture_data]);

  let entry_stage = useSelector((state) => state.entry_stage);

  return (
    <>
      <div className=" shadow col-sm-8 p-4 bg-white rounded">
        <Row className="mb-5 ml-2 w-100">
          <div>
            <h1>{entry_stage === "effort" ? "Esforço" : "Captura"}</h1>
          </div>
        </Row>
        <Row>
          <div className="col">
            {loaded === 0 ? (
              <p>Loading...</p>
            ) : entry_stage === "effort" ? (
              <EffortEntry></EffortEntry>
            ) : (
              <CaptureCotainer></CaptureCotainer>
            )}
          </div>
        </Row>
      </div>
      <div className="col-sm-4 h-75">
        <div className="row align-items-center h-100 ml-2 ">
          <div className="shadow  col-sm-12 p-2 bg-white rounded">
            <h3>Sumário do esforço</h3>
            <div className="row">
              <div className="col">
                <p>Estação: {effort_data.station}</p>
                <p>Data: {effort_data.date}</p>
                <p>Total de Redes: {effort_data.mistnets.total}</p>
              </div>

              <div className="col ">
                <button
                  className="btn btn-primary"
                  disabled={entry_stage === "effort"}
                  onClick={() => {
                    dispatch({ type: "CHANGE_ENTRY", data: "effort" });
                    dispatch({ type: "CHANGE_STAGE", data: 0 });
                  }}
                >
                  {" "}
                  Editar Esforço
                </button>
              </div>
            </div>
          </div>

          <div className="shadow col-sm-12 p-2 bg-white rounded">
            <h3>Sumário Capturas</h3>
            <p>{`Sem Anilha: ${capCount.u}/${effort_data.summary.unbanded}`}</p>
            <p>{`Recapturas: ${capCount.r}/${effort_data.summary.recapture}`}</p>

            <p>{`Novas: ${capCount.n}/${effort_data.summary.new}`}</p>
            <button
              className="btn btn-primary"
              disabled={entry_stage === "capture"}
              onClick={() => {
                dispatch({ type: "CHANGE_ENTRY", data: "capture" });
                dispatch({ type: "CHANGE_STAGE", data: 0 });
              }}
            >
              {" "}
              Editar Captura
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
