import React,{FC, memo, useEffect, useLayoutEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import './Layout.scss'
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { check, checkAuth } from "./LayoutService";
import { tokenAction } from "../../store/token";
import { tokens } from "../../Const/Const";
import { IReduceState } from "types/IReduce";

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
    const checkHoc = ()=>{
        check()
        .then((e:any)=>{
            setBol(e)
        })
        .catch((e)=>{
            setBol(false) 
        })
        .finally(()=>{
            dispatch(tokenAction())
        })
    }
    
    const toks = useSelector((state:IReduceState)=>state.token.token)

    useEffect(()=>{
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
                <div>
                    <NavLink
                    className={({ isActive }) =>
                    isActive ? 'activeLink' : "Link"}
                    to={`/my/${toks?.id}`}>
                        {toks?.email}
                    </NavLink>
                    <NavLink
                    className={({ isActive }) =>
                    isActive ? 'activeLink' : "Link"}
                    to={`/news`}>
                        Новости
                    </NavLink>
                    <NavLink
                    className={({ isActive }) =>
                    isActive ? 'activeLink' : "Link"}
                    to={`/chat`}>
                        Мессенджер
                    </NavLink>
                </div>
                <div>
                    <button className="Link" onClick={()=>{localStorage.removeItem('token'); checkHoc()}}>Выйти</button>
                </div>
            </div>
        </div>
    )
}


export default Layout