import React from "react";
import EffortBase from "./effort_base";
import EffortNets from "./effort_mistnets";
import EffortParamBander from "./effort_param_bander";
import EffortSummaryNotes from "./effort_sumamry_notes";
import { useSelector } from "react-redux";

const EffortEntry = () => {
  let effort_stage = useSelector((state) => state.data_stage);

  return (
    <div>
      {effort_stage === 0 ? (
        <EffortBase></EffortBase>
      ) : effort_stage === 1 ? (
        <EffortNets></EffortNets>
      ) : effort_stage === 2 ? (
        <EffortParamBander></EffortParamBander>
      ) : (
        <EffortSummaryNotes></EffortSummaryNotes>
      )}
    </div>
  );
};

export default EffortEntry;
