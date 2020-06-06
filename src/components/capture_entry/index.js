import React from "react";
import { useSelector } from "react-redux";
import CaptureInit from "../capture_init";
import CaptureVals from "../capture_vals";
import CaptureEnd from "../capture_end";

export default function CaptureEntry(capture_index) {
  let capture_stage = useSelector((state) => state.capture_stage);
  return (
    <>
      {capture_stage === 0 ? (
        <CaptureInit></CaptureInit>
      ) : capture_stage === 1 ? (
        <CaptureVals></CaptureVals>
      ) : capture_stage === 2 ? (
        <CaptureEnd></CaptureEnd>
      ) : null}
    </>
  );
}
