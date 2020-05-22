
import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import DataEntry from './components/data_entry';
import setLocalStorage from './store/localstore';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMinusSquare, faPlusSquare, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import './App.css';
import NavBar from './components/navbar';

library.add(faMinusSquare, faPlusSquare, faPlus, faMinus)


function App() {

  useEffect(() => {
    setLocalStorage()
  }, [])

  return (
    <>
      <Provider store={store}>
        
            <NavBar />
            <div className="container-fluid container-all">
          <div className="row align-items-center ml-4 mr-4 h-100 justify-content-center">

            <DataEntry />
          </div>
        </div>
      </Provider>


    </>
  )
}


export default App;