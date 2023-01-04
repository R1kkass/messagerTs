import React,{FC, memo, useCallback, useEffect, useLayoutEffect, useMemo, useReducer, useState} from "react"
import { Button } from "react-bootstrap"
import {useAuthState} from 'react-firebase-hooks/auth'
import { useDispatch, useSelector } from "react-redux";
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth'
import './Layout.scss'
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { check, checkAuth } from "./LayoutService";
import { tokenAction } from "../../store/token";
import { tokens } from "../../Const/Const";

export interface IUserReducer {
    auth: {
        auth: any,
        firebase: any,
        firestore: any 
    }
}

const Layout:FC = ()=>{
    
    const location = useLocation()
    const dispatch =useDispatch()
    const [bol, setBol] = useState(false) 

    const [locs, setLocs] = useState(localStorage.getItem('token') || '')

    const checkHoc = ()=>{
        check()
        .then((e:any)=>{
            setBol(e)
        })
        .catch((e)=>{
            setBol(false)
            console.log(bol);  
        })
        .finally(()=>{
            dispatch(tokenAction())
            console.log(toks);
        })
    }
    
    const toks = useSelector((state:any)=>state.token.token)

    useLayoutEffect(()=>{
        checkHoc()
    },[location])
        

    if(!bol){
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
               <button className="Link" onClick={()=>{localStorage.removeItem('token'); checkHoc()}}>Выйти</button>
            </div>
        </div>
    )
}

export default Layout