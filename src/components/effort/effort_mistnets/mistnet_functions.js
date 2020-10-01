let changeMists = (value,  mistnets, netnums, dispatch) => {
  const dummyNet = (n) => {
    return {
      net_number: n,
      oc: [{ open: mistnets.open, close: mistnets.close }],
    };
  };
  let i = mistnets.nets.length;
  while (mistnets.nets.length < value) {
    let netnum = netnums[i];
    mistnets.nets.push(dummyNet(netnum));
    i++;
  }

  dispatch({ type: "CREATE_NETS", data: mistnets.nets });
};

let changeTime = (value, mistArray, type,dispatch) => {
  let netss = mistArray.map((net) => {
    let oc = net.oc.map((oc) => {
      return { ...oc, [type]: value };
    });
    return { ...net, oc };
  });
  dispatch({ type: "CREATE_NETS", data: netss });
};

let onChangeNetInfo = (e, type, mistnets,dispatch,netnums) => {
  let new_net_info = { ...mistnets, [type]: e.target.value };
  dispatch({ type: "MIST_INFO", data: new_net_info });
  switch (type) {
    case "total":
      changeMists(e.target.value, mistnets, netnums, dispatch);
      break
    default:
      changeTime(e.target.value, mistnets.nets, type,dispatch);
      break
  }
};

export default {  onChangeNetInfo };
