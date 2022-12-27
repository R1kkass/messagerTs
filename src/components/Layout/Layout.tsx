import React,{FC, useEffect, useReducer, useState} from "react"
import { Button } from "react-bootstrap"
import {useAuthState} from 'react-firebase-hooks/auth'
import { useDispatch, useSelector } from "react-redux";
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth'
import './Layout.scss'

export interface IUserReducer {
    auth: {
        auth: any,
        firebase: any,
        firestore: any
    }
}

interface ITake{
    email: string,
    photoURL:string
    
}

const Layout:FC = ()=>{
    const [take,setTake] = useState<ITake>()  
    const auth = useSelector((state: IUserReducer)=>state.auth.auth)
    const app  = useSelector((state: IUserReducer)=>state.auth.firebase)
    const b:any = useAuthState(auth?.getAuth(app))
    console.log(b);
    
    useEffect(()=>{
    setTake(auth?.getAuth(app))
    },[auth]) 

    const login =async ()=>{  
        const provider = new GoogleAuthProvider()
        const get = getAuth(app || '') 
        const {user}:any = await signInWithPopup(get, provider)
        console.log(user); 
    }
     const out =async ()=>{  
        const get = await getAuth(app || '') 
        const user:any = await signOut(get)
        console.log(user);
    }
    
    return(
        <div className="Layout">
            <Button>{b[0]?.email}</Button>
            <img src={b[0]?.photoURL}/>
            <Button onClick = {login}>Вход</Button>
            <Button onClick = {out}>Выход</Button>
        </div>
    )
}

export default Layout