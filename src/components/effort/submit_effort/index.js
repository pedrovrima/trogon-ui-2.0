import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const SubmitEffort = () => {
  const dispatch = useDispatch();

  let effortData = useSelector((state) => state.enter_data.effort);
  let [submitted, setSub] = useState("Enviando");

  const subEffort = useCallback(
    async (submitted) => {
      if (submitted === "Enviando") {
        try {
          let resu = await axios.post("/effort", effortData);

          console.log(resu);
          // dispatch({type:"NEW_EFFORT"})
          if (resu.status === 200) {
            setSub("Dados salvos com sucesso");
          }
          if (resu.status === 409) {
            setSub("Dado já existe");
          }
          if (resu.status === 500) {
            setSub("Erro - Contate seu surpervisor");
          }
        } catch (e) {
          console.log(e);
          console.log(e.response.status);
          if (e.response.status === 500) {
            setSub("Erro - Contate seu surpervisor");
          }
          if (e.response.status === 409) {
            setSub(
              "Dado já existe. Se achar que isto é um erro, entre em contato com o administrador. Os dados entrados estão armazenados no seu computador. "
            );
            const non_sub_data = JSON.parse(
              localStorage.getItem("non_submitted_efforts")
            );
            const old_data = non_sub_data ? non_sub_data : [];
            let newdata = JSON.stringify([
              ...old_data,
              { status: e.response.status, data: effortData },
            ]);
            localStorage.setItem("non_submitted_captures", newdata);
          }
        }
      }
    },
    [effortData]
  );

  useEffect(() => {
    subEffort(submitted);
  }, [subEffort, submitted]);
  return (
    <>
      <div>
        <p>{submitted} </p>
      </div>
      <button
        className="btn btn-primary"
        disabled={submitted === "Enviando"}
        onClick={() => {
          dispatch({ type: "NEW_EFFORT" });
          dispatch({ type: "CHANGE_ENTRY", data: "initial" });
          dispatch({ type: "RESTART_EFFORT" });
        }}
      >
        Início
      </button>
    </>
  );
};

export default SubmitEffort;
