import React, { memo, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import { IUserReducer } from "../../components/Layout/Layout";
import * as auth from 'firebase/auth'
import { IGoogle } from "../../types/IGoogle";
import './Main.scss'
import { Link, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { FetchOneUser } from "./MainService";
import { IReduceState } from "../../types/IReduce";
import MainYour from "../../components/MainYour/MainYour";

export interface IUser{
    img: string,
    email: string,
    displayName: string
}

interface ITokenTake{
    email:string
}


const Main = memo(()=>{
    
    const params: any = useParams()
    const token:ITokenTake = useSelector((state:IReduceState)=>state.token.token)

    const  func =async ()=>{
        const res:any = await FetchOneUser(params.id)
        setUser(res) 
    }

    useEffect(()=>{
        func()
    },[])

    const [user, setUser] = useState<IUser>()
    console.log(user);
    
    if(token?.email==user?.email){
        return(
            <MainYour user={user}/>
        )
    }

    if(localStorage.getItem('token')){
    return(
        <div className="Main">
            <div className="Main__info">
                <div>
                    <img src={user?.img} alt="" />
                    <p>{user?.email}</p>
                    <p>{user?.displayName}</p>

                </div>
            </div>
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