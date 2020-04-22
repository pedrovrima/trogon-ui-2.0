
import React, { useState, useEffect} from 'react';
import { Provider } from 'react-redux';
import store from './store';
import DataEntry from './components/data_entry';
import setLocalStorage from './store/localstore';


function App() {
  let [up, setUp] = useState(0)
    

const setLocal = async()=>{
   await setLocalStorage()
  setTimeout(setUp(1),2000)}

useEffect(()=> { 
  setLocal()




},[]



)


  return (
 <>
    {up===0? <p>Loading</p>:
   <Provider store={store}>
      <DataEntry />
    </Provider>
  
}
</>
  )
}


export default App;