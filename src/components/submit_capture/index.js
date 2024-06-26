import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const SubmitCapture = () => {
  // let fake_capture_data = createCapture(mandatory_variables);

  let capData = useSelector((state) => state.enter_data.captures[0]);
  let capEff = useSelector((state) => state.enter_data.capture_effort);

  const capNetEff = capEff.nets.filter(
    (net) => net.net_number === capData.net_number
  )[0].net_effort.net_eff_id;
  console.log(capNetEff);
  const capFinal = { ...capData, net_eff_id: capNetEff };
  const dispatch = useDispatch();
  const subCapture = async () => {
    try {
      let resu = await axios.post("/capture", capFinal);
      if (resu.status === 200) {
        setSub("ok");
      }
      if (resu.status === 409) {
        setSub("Dado já existe");
      }
    } catch (e) {
      console.log(e.response.status);
      if (e.response.status === 409) {
        setSub("Dado já existe");
      } 
      if (e.response.status === 400) {
        setSub("Erro de conexão");
      } 
      if (e.response.status === 503) {
        setSub("Erro nos dados");
      } 
      const non_sub_data = JSON.parse(
        localStorage.getItem("non_submitted_captures")
      );
      const old_data = non_sub_data ? non_sub_data : [];
      let newdata = JSON.stringify([
        ...old_data,
        { status: e.response.status, data: capFinal },
      ]);
      localStorage.setItem("non_submitted_captures", newdata);

      // dispatch({ type: "CHANGE_CAPTURE_INDEX", data: "new" });
    }
  };
  let [submitted, setSub] = useState("sending");

  useEffect(() => {
    subCapture();
  }, []);
  return (
    <>
      <div>
        {submitted}
      </div>
      <button
      disabled={submitted==="sending"}
        className="btn btn-primary mr-1"
        onClick={() => dispatch({ type: "CHANGE_ENTRY", data: "initial" })}
      >
        Início
      </button>

      <button
            disabled={submitted==="sending"}

        className="btn btn-primary"
        onClick={() => {
          dispatch({ type: "ZERO_CAPTURE" });
          dispatch({ type: "CHANGE_CAPTURE_STAGE", data: 0 });
        }}
      >
        Nova Captura
      </button>


      {/* <button
            disabled={submitted==="sending"}

        className="btn btn-primary"
        onClick={() => {
          dispatch({ type: "ZERO_CAPTURE" });
          dispatch({ type: "CHANGE_CAPTURE_STAGE", data: 0 });
        }}
      >
        Nova Captura - Mesmo Esforço
      </button> */}

    </>
  );
};

export default SubmitCapture;
