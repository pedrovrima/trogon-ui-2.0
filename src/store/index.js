import { createStore } from 'redux';
const init_data = localStorage.getItem("registerData")
const INITIAL_STATE = {
  initial_data:JSON.parse(init_data),
  data_stage:0,
  enter_data:{
    field_invalid:{},
    form_invalid:1,
      effort:{
          base:{
              date:"",
          station:"",
          protocol:""},
          mistnets:{
            total:"",
            open:"",
            close:"",
            nets:[]
          },
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
      
    case 'UPDATE_EFFORT_LEVEL':
              
      Object.assign(state.enter_data.effort, {[action.key]:action.data})
      return(state)


      case 'LOCAL_STORAGE_DATA':
              
        return({...state,enter_data:{...state.enter_data,...action.data}})
    

        case 'CREATE_NETS':
              
        return({...state,enter_data:{...state.enter_data,effort:{...state.enter_data.effort,mistnets:{...state.enter_data.effort.mistnets,nets:[1,2]} }}})
    

      case 'FORM_VALIDATION':

      Object.assign(state.enter_data.field_invalid, {[action.key]:action.data})
      
      let n_invalid = Object.keys(state.enter_data.field_invalid).reduce(function (sum, key) {
        return sum + state.enter_data.field_invalid[key];
    }, 0)
  
    

    let result = n_invalid>0?1:0
    Object.assign(state.enter_data, {"form_invalid":result})

      return(state)
        default:
          return state;
      
  }
}

const store = createStore(pre_store,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;