import React, { FC, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import "./ModalWindow.scss"

interface IModalWindow{
    children?: React.ReactNode,
    nameButton: string,
    callback?:()=>void
}

const ModalWindow:FC<IModalWindow> = ({children ,nameButton, callback})=>{

    const [visible,setVisible] = useState(false)

    const nodeRef = useRef<any>()

    function all(){
        setVisible(true)
        if(callback){
            callback()
        }
    }

    return(
    <>
      <Button data-testid='toggle-btn' className="ModalWindow__button" onClick={()=>{all()}}>{nameButton}</Button>
            <CSSTransition nodeRef={nodeRef} in={visible} timeout={500} classNames="my-node" unmountOnExit
        onEnter={() => setVisible(true)}
        onExited={() => setVisible(false)}>            
            <div data-testid='modalTest' className={'ModalWindow'} ref={nodeRef}>
                <div data-testid="modalHidden" className="ModalWindow__window" onClick={()=>setVisible(false)}>
                    
                </div>
                    <div className="ModalWindow__children">
                            {children}
                    </div>
            </div>
        </CSSTransition>
        </>
    )
}

export default ModalWindow