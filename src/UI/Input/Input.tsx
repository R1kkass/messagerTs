import React from "react";
import './Input.scss'

const Input = (props: any) =>{
    return(
        <input ref={props?.ref} className="MainInput" {...props} />
    )
}

export default Input