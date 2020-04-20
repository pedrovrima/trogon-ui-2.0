import axios from 'axios';



const setLocalStorage = function (key, value) {
    let basicStructure = {
        first: 0,
        lastUpdate: "Jan 11, 1991",

    }

    let firstEntrance = localStorage.getItem("first")

    if (firstEntrance === null) {
        Object.keys(basicStructure).map(function (key) {
            localStorage.setItem(key, basicStructure[key])
            return(null)
        })
    }


    let lastUp = new Date(localStorage.getItem("lastUpdate"))
    axios.get("http://localhost:3332/updater", { params: { data: lastUp } })
        .then((res) => {
            let newData = res.data.map((data) => {
                if (data !== null) {
                    let key = Object.keys(data)[0]
                    return ({ key: key, value: data[key] })
                } else { return (null) }
            })

            const convertArrayToObject = (array, key) => {
                const initialValue = {};
                return array.reduce((obj, item) => {
                    if (item !== null) {
                        return ({

                            ...obj,
                            [item[key]]: item.value,
                        });
                    }else{
                        return(null)
                    }
                }, initialValue);
            };

            let newStore = convertArrayToObject(
                newData,
                'key',
            );

            if (newStore !== undefined) {
                localStorage.setItem("registerData", JSON.stringify({ ...newStore }))
                localStorage.setItem("lastUpdate", new Date())
            } else {
                console.log("all up to date")
            }


        }
        )



}

export default setLocalStorage;