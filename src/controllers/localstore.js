import axios from 'axios';
import store from '../store';




const setLocalStorage = async function (key, value) {
    // let dispatch=store.dispatch();

    let basicStructure = {
        first: 0,
        lastUpdate: "Jan 11, 1991",
      
    }




    let firstEntrance = localStorage.getItem("first")

    if (firstEntrance === null) {
        Object.keys(basicStructure).map(function (key) {
            localStorage.setItem(key, basicStructure[key])
            return (null)
        })
    }


    let lastUp = new Date(localStorage.getItem("lastUpdate"))

    let res = await axios.get("http://localhost:3332/updater", { params: { data: lastUp } })
    let newData = Object.keys(res.data).map((key) => {
        let data = res.data[key]
        if (data !== null) {
            return (data )
        } else{return null}
    })



    const convertArrayToObject = (array, key) => {
        const initialValue = {};
        return array.reduce((obj, item) => {
            if (item !== null) {
                return ({

                    ...obj,
                    ...item
                });
            } else {
                return (null)
            }
        }, initialValue);
    };



    let newStore = convertArrayToObject(
        newData,
        'key',
    );


    if (newStore !== null) {
        localStorage.setItem("registerData", JSON.stringify({ ...newStore }))
        localStorage.setItem("lastUpdate", new Date())
        // dispatch({ type: 'LOCAL_STORAGE_DATA', data: newStore })
    } else {
        console.log("all up to date")
    }
    return(newStore)


}
        





export default setLocalStorage;