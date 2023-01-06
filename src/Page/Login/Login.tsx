import React, { FC, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth'
import { Button } from "react-bootstrap";
import { logIn } from "./LoginService";
import Input from "../../components/Input/Input";
import './Login.scss'
import { redirect, useNavigate } from "react-router-dom";
import { tokenAction } from "../../store/token";
import { Formik } from "formik";

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
    
    const log = async (email: string, password:string) =>{
        await logIn(email || '', password || '')
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
            {/* <div>
                
                <h2>Вход</h2>
                <input type="text" ref={loginInp} placeholder="Логин"/>
                <input type="password" ref={password} placeholder="Пароль"/>
                <Button onClick={()=>{log()}}>
                    Вход
                </Button>
            </div> */}
             <div>
         <h2>Вход</h2>
            <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
                const errors:any = {};
                if (!values.email) {
                errors.email = 'Required';
                } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                errors.email = 'Invalid email address';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                log(values.email, values.password)
            }}
            >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
            }) => (
                <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                />
                {errors.email && touched.email && errors.email}
                <br/>
                <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                />
                {errors.password && touched.password && errors.password}
                    <Button type="submit" disabled={isSubmitting}>
                        Вход
                    </Button>
                </form>
            )}
            </Formik>
         </div>
        </div>
    )
}

export default Login