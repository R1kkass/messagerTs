import React, { memo, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { IUserReducer } from "../../components/Layout/Layout";
import * as auth from 'firebase/auth'
import { IGoogle } from "../../types/IGoogle";
import './Main.scss'
import { Link, useLocation, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { FetchOneUser } from "./MainService";
import { IReduceState } from "../../types/IReduce";
import MainYour from "../../components/MainYour/MainYour";
import { domen, URi } from "../../Const/Const";
import LeftBlockMain from "../../components/LeftBlockMain/LeftBlockMain";
import { mainAction } from "../../store/main";

export interface IUser{
    img: string,
    email: string,
    displayName: string
}
export interface ITokenTake{
    email:string
}


const Main = memo(()=>{
    const location = useLocation()
    const dispatch = useDispatch()
    const params: any = useParams()
    const token:ITokenTake = useSelector((state:IReduceState)=>state.token.token)
    const userss = useSelector((state:IReduceState)=> state.mainInfo.mainInfo)
    const  func =async ()=>{
        const res:any = await FetchOneUser(params.id)
        dispatch(mainAction(res))
    }

    useEffect(()=>{
        func()
    },[location])

    
    if(token?.email==userss?.email){
        return(
            <MainYour user={userss}/>
        )
    }

    if(localStorage.getItem('token')){
    return(
        <div className="Main">
            <LeftBlockMain user={userss}/>
            <div className="Main__block">
                <Link to="/">123</Link>
            </div>
        </div>
    )
    }

    return(
        <div className="UnAuthorization">
            <div>
                <h2>Вы не авторизованы</h2>
                <Link to="/login">Авторизация</Link>
            </div>
        </div>
    )
})

export default Main