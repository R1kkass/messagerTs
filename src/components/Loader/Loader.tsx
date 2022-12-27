import React from "react";
import './Loader.scss'

type TLoad = {
    visible: boolean
}

const Loader = ({visible}:TLoad)=>{
    return(
        <>
        {visible
        ?
        <div className="lds-ring">
        <div className="nado">
        <div className="lds-rings">
        </div>
        <div className="lds-rings">
        </div>
        <div className="lds-rings">
        </div>
        <div className="lds-rings">
        </div>
        </div>
        </div>
        :
        ''
        }
        </>
    )   
}

export default Loader