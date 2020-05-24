import { createStore } from 'redux';
const INITIAL_STATE = {
  entry_stage: "capture",
  initial_data: {},
  loaded: 0,
  capture_index: 0,
  capture_stage: 1,
  data_stage: 0,
  enter_data: {
    field_invalid: {},
    form_invalid: 1,
    effort: {
      base: {
        date: "",
        station: "",
        protocol: ""
      },
      mistnets: {
        total: "",
        open: "",
        close: "",
        nets: []
      },
      eff_params: [],
      banders: [""],
      summary: { new: NaN, recapture: NaN, unbanded: NaN },
      notes: ""
    },
    captures: []
  }

};



function pre_store(state = INITIAL_STATE, action) {
  let nets = []
  let new_state = {}
  let banders = []

  switch (action.type) {

    case 'UPDATE_CAPTURE_VALUE':
      let new_captures=state.enter_data.captures
      new_captures[action.index]=action.data
      new_state = {...state,enter_data:{...state.enter_data,captures:new_captures}}
      return (new_state)


    case 'ADD_CAPTURE':

      new_state = state.enter_data.captures.push(action.data)
      return (state)
    case 'CHANGE_STAGE':
      let new_stage
      action.data == 0 ?
        new_stage = action.data :
        new_stage = state.data_stage + action.data
      Object.assign(state, { data_stage: new_stage })
      return (state)

    case "LOADER":
      new_state = { ...state, loaded: action.data }
      return (new_state)

    case 'LOCAL_SETTER':
      new_state = { ...state, initial_data: action.data }
      return (new_state)
    case 'NET_NUM':
      nets = state.enter_data.effort.mistnets.nets
      nets[action.i].net_number = action.data
      new_state = {
        ...state, enter_data: {
          ...state.enter_data, effort: {
            ...state.enter_data.effort, mistnets: { ...state.enter_data.effort.mistnets, nets: nets }
          }

        }
      }

      return (new_state)



    case 'NET_TIME':
      nets = state.enter_data.effort.mistnets.nets
      nets[action.i].oc[action.o][action.oc] = action.data
      new_state = {
        ...state, enter_data: {
          ...state.enter_data, effort: {
            ...state.enter_data.effort, mistnets: { ...state.enter_data.effort.mistnets, nets: nets }
          }

        }
      }

      return (new_state)




    case 'ADD_HOUR':
      nets = state.enter_data.effort.mistnets.nets
      nets[action.i].oc.push({ open: "", close: "" })
      new_state = {
        ...state, enter_data: {
          ...state.enter_data, effort: {
            ...state.enter_data.effort, mistnets: { ...state.enter_data.effort.mistnets, nets: nets }
          }

        }
      }

      return (new_state)


    case 'REMOVE_HOUR':
      nets = state.enter_data.effort.mistnets.nets
      nets[action.i].oc = nets[action.i].oc.slice(0, action.o)
      new_state = {
        ...state, enter_data: {
          ...state.enter_data, effort: {
            ...state.enter_data.effort, mistnets: { ...state.enter_data.effort.mistnets, nets: nets }
          }

        }
      }

      return (new_state)



    case 'UPDATE_EFFORT_LEVEL':

      Object.assign(state.enter_data.effort, { [action.key]: action.data })
      return (state)


    case 'BANDER_VALUE':
      banders = state.enter_data.effort.banders

      banders[action.i] = action.data
      return ({ ...state, enter_data: { ...state.enter_data, effort: { ...state.enter_data.effort, banders: banders } } })


    case 'REMOVE_BANDER':
      banders = state.enter_data.effort.banders
      let new_banders = banders.slice(0, (banders.length - 1))
      return ({ ...state, enter_data: { ...state.enter_data, effort: { ...state.enter_data.effort, banders: new_banders } } })



    case 'LOCAL_STORAGE_DATA':

      return ({ ...state, loaded: 1, enter_data: { ...state.enter_data, ...action.data } })


    case 'CREATE_NETS':

      return ({ ...state, enter_data: { ...state.enter_data, effort: { ...state.enter_data.effort, mistnets: { ...state.enter_data.effort.mistnets, nets: action.data } } } })


    case 'NEW_EFFORT_PARAM':

      return ({ ...state, enter_data: { ...state.enter_data, effort: { ...state.enter_data.effort, eff_params: action.data } } })

    case "CAHNGE_CAPTURE_INDEX":

      new_state = { ...state, capture_index:action.data }
      return (new_state);


    case 'EFFORT_PARAM':
      let eff_params = state.enter_data.effort.eff_params
      eff_params[action.i].vals[action.time] = action.data

      return ({ ...state, enter_data: { ...state.enter_data, effort: { ...state.enter_data.effort, eff_params: eff_params } } })


    case 'FORM_VALIDATION':

      Object.assign(state.enter_data.field_invalid, { [action.key]: action.data })

      let n_invalid = Object.keys(state.enter_data.field_invalid).reduce(function (sum, key) {
        return sum + state.enter_data.field_invalid[key];
      }, 0)



      let result = n_invalid > 0 ? 1 : 0
      Object.assign(state.enter_data, { "form_invalid": result })

      return (state)

    case 'CHANGE_ENTRY':

      return ({ ...state, entry_stage: action.data })

    default:
      return state;

  }
}

const store = createStore(pre_store, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;