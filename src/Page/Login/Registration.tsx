import React, { FC, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth'
import { Button } from "react-bootstrap";
import { logIn, registration } from "./LoginService";
import Input from "../../components/Input/Input";
import './Login.scss'
import { redirect, useNavigate } from "react-router-dom";
import { tokenAction } from "../../store/token";

export interface ILoginRedux{
    auth: {
        auth: any,
        firebase: any,
        firestore: any
    }
}


const Registration:FC = () => {
    const app  = useSelector((state:ILoginRedux)=>state.auth.firebase)
    document.title = "Регистрация"
    const navigate = useNavigate()
    const password = useRef<HTMLInputElement | null>(null)
    const loginInp = useRef<HTMLInputElement | null>(null)
    const dispatch = useDispatch()
    
    if(localStorage.getItem('token')){
        return (
            <div className="Login">
                <div>
                    
                    <h2>Вы авторизованы</h2>
                </div>
            </div>
        )
    }

    const reg =async ()=>{
        registration(loginInp.current?.value || '', password.current?.value || '')
        .then(()=>{
            navigate('/login')
            dispatch(tokenAction())
        })
        
    }

    return (
        <div className="Login">
            <div>
                
                <h2>Регистрация</h2>
                <input type="text" ref={loginInp} placeholder="Логин"/>
                <input type="password" ref={password} placeholder="Пароль"/>
                <Button onClick={()=>{reg()}}>
                    Регисрация
                </Button>
            </div>
        </div>
    )
}

export default Registration