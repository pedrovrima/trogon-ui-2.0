import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createCapture } from "../functions";
import CaptureEntry from "../capture_entry";

export default function CaptureContainer(capture_data = null) {
  let capture_index = useSelector((state) => state.capture_index);
  let dispatch = useDispatch();
  capture_data = useSelector((state) => state.enter_data.captures);
  let setCaptureIndex = (value) =>
    dispatch({ type: "CHANGE_CAPTURE_INDEX", data: value });
  let effort_values = useSelector((state) => state.enter_data.effort);

  let user_protocols = useSelector((state) => state.initial_data.protocols);
  let capture_variables = useSelector(
    (state) => state.initial_data.capture_variables
  );

  let this_protocol = effort_values.base.protocol;

  let protocol_variables = user_protocols.filter(
    (prot) => prot.protocol_code === this_protocol
  )[0].vars;

  let mandatory_variables_id = protocol_variables
    .filter((vars) => vars.mandatory === 1)
    .map((vars) => vars.capture_variable_id);
  let mandatory_variables = capture_variables.filter(
    (variable) =>
      mandatory_variables_id.indexOf(variable.capture_variable_id) > -1
  );

  let [index_invalid, setIndexInvalid] = useState(0);
  let [capture_index_field, setCaptureIndexField] = useState(capture_index + 1);
  let is_invalid_class = index_invalid === 0 ? "" : "is-invalid";
  let [message, setMessage] = useState("");
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  useEffect(() => {
    if (capture_data.length === 0) {
      let capture_data = createCapture(mandatory_variables);

      dispatch({ type: "ADD_CAPTURE", data: capture_data });
    }
  }, []);

  useEffect(() => {
    console.log(capture_data);
    forceUpdate();
  }, [capture_data]);

  const changePage = (e) => {
    e.preventDefault();
    if (capture_index_field < 1) {
      setIndexInvalid(1);
      setMessage("Precisa ser maior que zero");
    } else {
      if (capture_index_field > capture_data.length) {
        setIndexInvalid(1);
        setMessage(
          `Existe(m) apenas ${capture_data.length} captura(s) cadastrada(s)`
        );
      } else {
        setIndexInvalid(0);
        setCaptureIndex(capture_index_field - 1);
      }
    }
  };

  return (
    <>
      {capture_data.length === 0 ? (
        capture_data.length
      ) : (
        <div className="container">
          <div className="row">
            <div className="col">
              <CaptureEntry></CaptureEntry>
            </div>
          </div>

          <div className="row align-items-end text-center">
            <div className="col ">
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                  <li className="page-item">
                    <button
                      className="page-link btn"
                      href="#"
                      disabled={capture_index === 0}
                      onClick={() => {
                        setCaptureIndex(capture_index - 1);
                        setCaptureIndexField(capture_index);
                      }}
                      tabindex="-1"
                    >
                      <span>&#60;</span>
                    </button>
                  </li>
                  <div className="container m-0 p-0" style={{ width: "3rem" }}>
                    <form
                      onSubmit={(e) => {
                        changePage(e);
                      }}
                    >
                      <li className="page-item" style={{ width: "inherit" }}>
                        <input
                          className={`page-link form-control ${is_invalid_class} `}
                          onChange={(e) => setCaptureIndexField(e.target.value)}
                          value={capture_index_field}
                          style={{ width: "3rem" }}
                          href="#"
                        ></input>
                        <div class="invalid-tooltip ">{message}</div>
                      </li>
                    </form>
                  </div>
                  <li className="page-item">
                    <button
                      className="page-link btn"
                      disabled={capture_index === capture_data.length - 1}
                      onClick={(e) => {
                        setCaptureIndex(capture_index + 1);
                        setCaptureIndexField(capture_index + 2);
                      }}
                      href="#"
                    >
                      >
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
