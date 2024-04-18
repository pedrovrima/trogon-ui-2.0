import React, { useEffect } from "react";
import EffortBase from "./effort_base";
import EffortNets from "./effort_mistnets";
import EffortParamBander from "./effort_param_bander";
import EffortSummaryNotes from "./effort_sumamry_notes";
import SubmittEffort from "./submit_effort";
import { useSelector, useDispatch } from "react-redux";

const EffortEntry = () => {
  const dispatch = useDispatch();
  let effort_stage = useSelector((state) => state.data_stage);

  return (
    <div>
      {effort_stage === 0 ? (
        <EffortBase></EffortBase>
      ) : effort_stage === 1 ? (
        <EffortNets></EffortNets>
      ) : effort_stage === 2 ? (
        <EffortParamBander></EffortParamBander>
      ) : effort_stage === 3 ? (
        <EffortSummaryNotes></EffortSummaryNotes>
      ) : (
        <SubmittEffort></SubmittEffort>
      )}
    </div>
  );
};

export default EffortEntry;
