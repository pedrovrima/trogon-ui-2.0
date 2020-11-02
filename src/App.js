import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "./store";
import DataEntry from "./components/data_entry";
import setLocalStorage from "./controllers/localstore";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMinusSquare,
  faPlusSquare,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import NavBar from "./components/navbar";
import PreEnter from "./components/entry_loader";

library.add(faMinusSquare, faPlusSquare, faPlus, faMinus);

function App() {



    // const [loading,setLoading]=useState(true)
  const [value,setValue]=useState("initial")

  
  store.subscribe(
    ()=>{
      const state=store.getState()
      setValue(state.entry_stage)

      }
  )

  
  

  return (
    <>
      <Provider store={store}>
        <NavBar />
        <div className="container-fluid container-all">
          <div className="row align-items-center ml-4 mr-4 h-100 justify-content-center">
            {value === "initial" ? (
              <PreEnter ></PreEnter>
            ) : (
              <DataEntry entry_stage={value}/>
            )}
          </div>
        </div>
      </Provider>
    </>
  );
            }

export default App;
