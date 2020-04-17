import { createStore } from 'redux';
import { setLocalStorage } from './localstore.js'

const INITIAL_STATE = {
  initial_data:JSON.parse(localStorage.getItem("registerData")),
  data_stage:0,
  enter_data:{
      effort:{
          base:{
              date:"",
          station:"",
          protocol:""},
          mistnets:[],
          eff_params:[],
          banders:[],
          summary:{},
          notes:[]
      },
      capture:[]
  }

};



function pre_store(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'CHANGE_STAGE':
      let new_stage = state.data_stage+action.data
      Object.assign(state,{data_stage:new_stage})
      return(state)
      
    case 'UPDATE_EFFORT':
              
      Object.assign(state.enter_data.effort, {[action.key]:action.data})
      break;
    default:
      return state;
  }
}

const store = createStore(pre_store,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;