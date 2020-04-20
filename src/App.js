
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import DataEntry from './components/data_entry';


function App() {
  return (
    
    <Provider store={store}>
      <DataEntry />
    </Provider>
  );
}


export default App;