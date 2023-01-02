import React, { FC, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth'
import { Button } from "react-bootstrap";
import { logIn } from "./LoginService";
import Input from "../../components/Input/Input";
import './Login.scss'
import { redirect, useNavigate } from "react-router-dom";
import { tokenAction } from "../../store/token";

export interface ILoginRedux{
    token: {
        token: string,
    }
}


const Login:FC = () => {
    const token:any  = useSelector((state:ILoginRedux)=>state.token.token)
    document.title = "Авторизация"

    const password = useRef<HTMLInputElement | null>(null)
    const loginInp = useRef<HTMLInputElement | null>(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const log = async () =>{
        await logIn(loginInp.current?.value || '', password.current?.value || '')
        await dispatch(tokenAction())
        navigate(`/`)
    }

    if(localStorage.getItem('token')){
        return (
            <div className="Login">
                <div>
                    
                    <h2>Вы авторизованы</h2>
                </div>
            </div>
        )
    }

    return (
        <div className="Login">
            <div>
                
                <h2>Вход</h2>
                <input type="text" ref={loginInp} placeholder="Логин"/>
                <input type="password" ref={password} placeholder="Пароль"/>
                <Button onClick={()=>{log()}}>
                    Вход
                </Button>
            </div>
        </div>
    )
}

export default Login