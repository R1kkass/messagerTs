import ModalWindow from "components/ModalWindow/ModalWindow";
import jwtDecode from "jwt-decode";
import React, { memo, useState } from "react";
import { Button } from "react-bootstrap";
import { domen } from "../../Const/Const";
import {  IToken } from "../../types/IReduce";
import ModalForEdit from "../ModalForEdit/ModalForEdit";
import VisibleWindow from "../VisibleWindow/VisibleWindow";

const MainYourComponent = memo(()=>{
    const [visible,setVisible] = useState(false)
    const user:IToken | null = localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token') || '') : null

    return(
        <div className="Main__info">
                <div className="Info__fixed">
                    <div>
                        <img src={`http://${domen}/${user?.img}`} alt="" />
                        <p>{user?.email}</p>
                        <Button onClick={()=>setVisible(e=>!e)}>Создать чат</Button>
                        <VisibleWindow visible={visible}/>
                        <ModalForEdit user={user}/>
                    </div>
                </div>
            </div>
    )
})

export default MainYourComponent