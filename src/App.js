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



  const [loading,setLoading]=useState(true)

  useEffect(() => { 
    setLocalStorage()
      .then((data) => {
        console.log(data);
        if (data) {
          store.dispatch({ type: "LOCAL_SETTER", data: { ...data } });
        }
        setLoading(false)
        console.log("loade")
      }
      
      )
      
  }, []);


  let [stage, setStage] = useState("inital");
  return (
    <>
      <Provider store={store}>
        <NavBar />
        <div className="container-fluid container-all">
          <div className="row align-items-center ml-4 mr-4 h-100 justify-content-center">
            {stage === "inital" ? (
              <PreEnter disabled={loading} setStage={setStage}></PreEnter>
            ) : (
              <DataEntry entry_stage={stage}/>
            )}
          </div>
        </div>
      </Provider>
    </>
  );
}

export default App;
