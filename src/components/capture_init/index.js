import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "../input_field";
import { onlyUnique, CaptureNavigationButtons } from "../functions";

export default function CaptureInit() {
  let dispatch = useDispatch();
  let capture_index = useSelector((state) => state.capture_index);
  let all_capture_values = useSelector((state) => state.enter_data.captures);
  let capture_values = all_capture_values[capture_index];
  let effort_values = useSelector((state) => state.enter_data.capture_effort);
  let effort_nets = effort_values.nets.map((net) => net.net_number);
  let acc_code = useSelector((state) => state.initial_data.capture_variables);
  let band_sizes = useSelector((state) =>
    state.initial_data.bands.map((string) => string.size).filter(onlyUnique)
  );
  const banders = useSelector((state) =>
    state.initial_data.banders.map((bander) => bander.code)
  );

  let [checkFields, setCheckFields] = useState({});

  let thisCheck = (name, value) => {
    setCheckFields((preCheck) => {
      return { ...preCheck, [name]: value };
    });
  };

  let [invalidForm, setInvalidForm] = useState(false);

  let checkForm = () => {
    let invalidSum = Object.keys(checkFields).reduce((sum, key) => {
      return sum + Number(checkFields[key]);
    }, 0);

    let formInvalid = invalidSum > 0 ? true : false;
    setInvalidForm(formInvalid);
  };

  useEffect(() => {
    checkForm();
  }, [checkFields, checkForm]);

  let filter_band = (bandi) =>
    capture_values.capture_code === "R" ? bandi.used : !bandi.used;

  let used_bands = all_capture_values.map((cap) => cap.band_number);

  const all_bands = useSelector((state) => state.initial_data.bands);
  let pre_band_options = all_bands
    .filter((band) => band.size === capture_values.band_size)
    .map((band) =>
      band.bands
        // .filter(
        //   (bandi) =>
        //     filter_band(bandi) && used_bands.indexOf(bandi.band_number) < 0
        // )
        .map((bandi) => bandi.band_number)
        .sort((a, b) => a - b)
    );

  const band_options = pre_band_options.reduce(
    (cont, val) => [...cont, ...val],
    []
  );
  let capture_codes = acc_code
    .filter((value) => value.name === "band_code")[0]
    .options.map((vals) => vals.value_oama);

  let species_table = useSelector((state) => state.initial_data.spp);
  let species_options = species_table.map((spp) => {
    return {
      id: spp.spp_id,
      code: spp.sci_code,
      sci_name: spp.genus + " " + spp.species,
    };
  });
  let [species_entered, setSppEntered] = useState(() => {
    if (capture_values.spp_id !== "") {
      let species_info = species_table
        .filter((spp) => spp.spp_id === capture_values.spp_id)
        .map((spp) => {
          return {
            id: spp.spp_id,
            code: spp.sci_code,
            sci_name: spp.genus + " " + spp.species,
          };
        });
      return species_info;
    } else {
      return [""];
    }
  });

  let [band_entered, setBandEntered] = useState([capture_values.band_number]);

  const onChangeCap = (e, name) => {
    let new_cap = { ...capture_values, [name]: e.target.value };

    dispatch({
      type: "UPDATE_CAPTURE_VALUE",
      data: new_cap,
      index: capture_index,
    });
  };

  const onChangeSpp = (value) => {
    setSppEntered(value);

    let new_value = value[0] ? value[0].id : "";

    let new_cap = { ...capture_values, spp_id: new_value };

    dispatch({
      type: "UPDATE_CAPTURE_VALUE",
      data: new_cap,
      index: capture_index,
    });
  };

  const onChangeBand = (value) => {
    setBandEntered(value);

    let new_value = value[0] ? value[0] : "";

    let new_cap = { ...capture_values, band_number: new_value };

    dispatch({
      type: "UPDATE_CAPTURE_VALUE",
      data: new_cap,
      index: capture_index,
    });
  };

  const handleSubmit = (event) => {
    const entered_data = JSON.parse(localStorage.getItem("entry_data"));
    let newdata = JSON.stringify({
      ...entered_data,
      captures: all_capture_values,
    });
    localStorage.setItem("entry_data", newdata);
    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-4">
            <TextField
              type="cap_time"
              onChange={(e) => onChangeCap(e, "capture_time")}
              value={capture_values.capture_time}
              form="captures"
              upper_level="base"
              name="capture_time"
              title="Horário de Captura"
              checkFunc={thisCheck}
            ></TextField>
          </div>

          <div className="col-4">
            <TextField
              type="val"
              user_options={banders}
              onChange={(e) => onChangeCap(e, "bander")}
              value={capture_values.bander}
              form="captures"
              upper_level="base"
              name="bander"
              title="Anilhador"
              checkFunc={thisCheck}
            ></TextField>
          </div>

          <div className="col-4">
            <TextField
              type="val"
              user_options={effort_nets}
              onChange={(e) => onChangeCap(e, "net_number")}
              value={capture_values.net_number}
              form="captures"
              upper_level="base"
              name="net_number"
              title="Rede"
              checkFunc={thisCheck}
            ></TextField>
          </div>
        </div>

        <div className="row">
          <div className="col-3">
            <TextField
              type="val"
              user_options={capture_codes}
              onChange={(e) => onChangeCap(e, "capture_code")}
              value={capture_values.capture_code}
              form="captures"
              upper_level="base"
              name="capture_code"
              title="Código de Captura"
              checkFunc={thisCheck}
            ></TextField>
          </div>

          <div className="col-3">
            <TextField
              type="val"
              user_options={band_sizes}
              onChange={(e) => onChangeCap(e, "band_size")}
              value={capture_values.band_size}
              form="captures"
              upper_level="base"
              name="band_size"
              title="Tamanha da Anilha"
              checkFunc={thisCheck}
            ></TextField>
          </div>

          <div className="col-6">
            <TextField
              type="band_number"
              options={band_options}
              onChange={(e, value) => onChangeBand(e, value)}
              selected={band_entered}
              value={band_entered}
              id="b_num"
              form="captures"
              name="band_number"
              title="Número da Anilha"
              checkFunc={thisCheck}
            ></TextField>
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-6">
            <TextField
              value={capture_values.spp_id}
              checkFunc={thisCheck}
              id="spp_name"
              title="Especie"
              type="spp_name"
              form="captures"
              filterBy={["code", "sci_name"]}
              labelKey="code"
              onChange={(e, value) => onChangeSpp(e, value)}
              options={species_options}
              placeholder="Entre o código de 4 letrar ou nome científico"
              selected={species_entered}
              renderMenuItemChildren={(option) => (
                <div>
                  {option.code + " "}
                  <i>{option.sci_name}</i>
                </div>
              )}
            />

            {species_entered.length > 0 ? (
              <>
                <p className="m-0 p-0">
                  {`${species_table
                    .filter((spp) => spp.spp_id == species_entered[0].id)
                    .map((spp) => spp.pt_name)} /     
                                ${species_table
                                  .filter(
                                    (spp) => spp.spp_id == species_entered[0].id
                                  )
                                  .map((spp) => spp.genus + " " + spp.species)}
                                `}
                </p>
              </>
            ) : null}
          </div>
        </div>

        <CaptureNavigationButtons invalidForm={invalidForm} key={invalidForm} />
      </form>
    </>
  );
}
