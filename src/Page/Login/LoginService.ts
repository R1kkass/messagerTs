import axios from "axios"
import { redirect, useNavigate } from "react-router-dom";
import { URi } from "../../Const/Const";

interface IToken{
    data:{
        token:string
    }
    
}

export function logIn(email:string, password:string){
    
    const response = axios.post(`${URi}/user/login`, {
        password: password,
        email: email
    })
    .then((res:IToken)=>{
        
        localStorage.setItem('token', res.data.token)
    })
    return response
}

export function registration(email:string, password:string){
    
    const response = axios.post(`${URi}/user/registration`, {
        password: password,
        email: email
    })

    return response

}