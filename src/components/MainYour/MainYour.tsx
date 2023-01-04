import React, { FC, memo, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { domen } from "../../Const/Const";
import { ITokenTake } from "../../Page/Main/Main";
import { IReduceState } from "../../types/IReduce";
import ListChat from "../ListChat/ListChat";
import ModalForEdit from "../ModalForEdit/ModalForEdit";
import ModalWindow from "../ModalWindow/ModalWindow";
import VisibleWindow from "../VisibleWindow/VisibleWindow";
import MainYourComponent from "./MainYourComponent";

interface IUser{
    user:{
        img: string,
        email:string,
        displayName:string,
    }
}

const MainYour:FC<any> = memo(()=>{

    const [visible, setVisible] = useState<boolean>(false)
    
    const user = useSelector((state:IReduceState)=>state.mainInfo.mainInfo)
    console.log(user?.img);

    return(
        <div className="Main">
            <MainYourComponent />
            <div className="Main__block">
                <ListChat/>
            </div>
        </div>
    )
})

export default MainYour