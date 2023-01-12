import React, { FC, memo, useState } from "react";
import { useSelector } from "react-redux";
import { IReduceState } from "../../types/IReduce";
import ListChat from "../ListChat/ListChat";
import MainYourComponent from "./MainYourComponent";

interface IUser{
    user:{
        img: string,
        email:string,
        displayName:string,
    }
}

const MainYour:FC<any> = memo(()=>{
    const user = useSelector((state:IReduceState)=>state.mainInfo.mainInfo)

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