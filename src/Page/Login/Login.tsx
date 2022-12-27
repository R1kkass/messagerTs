import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth'
import { Button } from "react-bootstrap";

export interface ILoginRedux{
    auth: {
        auth: any,
        firebase: any,
        firestore: any
    }
}


const Login:FC = () => {
    const app  = useSelector((state:ILoginRedux)=>state.auth.firebase)
    
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
    

    return (
        <div>
            <Button onClick = {login}>Вход</Button>
            <Button onClick = {out}>Выход</Button>
        </div>
    )
}

export default Login