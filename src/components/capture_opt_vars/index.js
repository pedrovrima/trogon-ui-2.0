import React from "react";
import {Modal} from "react-bootstrap"


export default function VarModal(props) {
  
    return (
    
<Modal show={props.modalState} onHide={()=>props.setModal(false)}>    
<Modal.Header closeButton >
          <Modal.Title>Variáveis Extras</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {props.captureVars.map((capVar)=>{
            return(
                <button className="btn btn-primary m-2" onClick={()=>props.addVariable(capVar.name)}>
                    {capVar.portuguese_label}
                </button>
            )

        })}


        </Modal.Body>
    

    </Modal>
  );
}
