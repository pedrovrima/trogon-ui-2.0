
import store from '../../store';


const addField=(name)=>{
    let state = store.getState()
    let thisCapture = state.enter_data.captures[state.capture_index]

    for (let i=0;i<thisCapture.variables.length;i++){
        if(thisCapture.variables[i].name===name){
            thisCapture.variables[i].a_value.push("")
        }

    }

console.log(name,thisCapture)
    store.dispatch(
      {
        type: "UPDATE_CAPTURE_VALUE",
        data: thisCapture,
        index: state.capture_index
    }
    )
}

export default {addField};