import React,{FC, memo, useCallback, useEffect, useMemo, useReducer, useState} from "react"
import { Button } from "react-bootstrap"
import {useAuthState} from 'react-firebase-hooks/auth'
import { useDispatch, useSelector } from "react-redux";
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth'
import './Layout.scss'
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { check, checkAuth } from "./LayoutService";
import { tokenAction } from "../../store/token";

export interface IUserReducer {
    auth: {
        auth: any,
        firebase: any,
        firestore: any
    }
}

const Layout:FC = memo(()=>{
    const toks = useSelector((state:any)=>state.token.token)
    console.log(toks);
    const [tok, setTok] = useState(toks)
    const token: any= toks 
    const location = useLocation()
    const dispatch =useDispatch()
    

    useEffect(()=>{
        check()
        .finally(()=>{
            setTok(localStorage.getItem('token'))
        })
        dispatch(tokenAction())
    },[location, tok])



    if(!tok){
    return(
    <div className="Layout">
        
        <div className="Layout__fixed">
        <NavLink  
            className={({ isActive }) =>
            isActive ? 'activeLink' : "Link"}
            to="/login">
            Вход
        </NavLink>
        <NavLink  
            className={({ isActive }) =>
            isActive ? 'activeLink' : "Link"}
            to="/registration">
            Регистрация
        </NavLink>
        </div>
    </div> 
    )}

    return(
        <div className="Layout">
            <div className="Layout__fixed">
                <NavLink
                className={({ isActive }) =>
                isActive ? 'activeLink' : "Link"}
                to={`/my/${toks?.id}`}>
                    {toks?.email}
                </NavLink>
               <button className="Link" onClick={()=>{localStorage.removeItem('token');setTok(null); check()}}>Выйти</button>
            </div>
        </div>
    )
})

export default Layout