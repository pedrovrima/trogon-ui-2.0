import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function CaptureNav() {
  let dispatch = useDispatch();

  let capture_index = useSelector((state) => state.capture_index);
  let capture_data = useSelector((state) => state.enter_data.captures);

  let [index_invalid, setIndexInvalid] = useState(0);

let capture_index_field=capture_index+1
  let is_invalid_class = index_invalid === 0 ? "" : "is-invalid";
  let [message, setMessage] = useState("");

  let setCaptureIndex = (value) =>
    dispatch({ type: "CHANGE_CAPTURE_INDEX", data: value });

   let setCaptureStage=(value)=>{
    dispatch({ type: "CHANGE_CAPTURE_STAGE", data: value });

   } 

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
    <div>
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
                    setCaptureStage(0)
                    // setCaptureIndexField(capture_index);
                  }}
                  tabIndex="-1"
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
                    //   onChange={(e) => setCaptureIndexField(e.target.value)}
                      value={capture_index_field}
                      style={{ width: "3rem" }}
                      href="#"
                    ></input>
                    <div className="invalid-tooltip ">{message}</div>
                  </li>
                </form>
              </div>
              <li className="page-item">
                <button
                  className="page-link btn"
                  disabled={capture_index === capture_data.length - 1}
                  onClick={(e) => {
                    setCaptureIndex(capture_index + 1);
                    setCaptureStage(0);
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
  );
}
