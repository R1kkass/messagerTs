import React, { FC, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import "./ModalWindow.scss"

interface IModalWindow{
    children?: React.ReactNode
}

const ModalWindow:FC<IModalWindow> = ({children})=>{

    const [visible,setVisible] = useState(false)

    const nodeRef = useRef<any>()

    
    return(
    <>
      <Button className="ModalWindow__button" onClick={()=>setVisible(true)}>Изменить аватар</Button>
            <CSSTransition nodeRef={nodeRef} in={visible} timeout={500} classNames="my-node" unmountOnExit
        onEnter={() => setVisible(true)}
        onExited={() => setVisible(false)}>            
            <div className={'ModalWindow'} ref={nodeRef}>
                <div className="ModalWindow__window" onClick={()=>setVisible(false)}>
                    
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