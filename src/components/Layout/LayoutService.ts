import axios from "axios"
import { useDispatch } from "react-redux"

interface IData{
    data:{
        message: string,
        bol: boolean
    }
}

export function checkAuth(){
    const response = axios.post('http://localhost:5001/api/user/authcheck',{}, {
        headers:{
        Authorization: `bearer ${localStorage.getItem('token') || ''}`
    }}
    )
    .then((res:IData)=>{
        return res.data.bol
    }) 
    
    .catch((e)=>{

    })

    return response
}


export async function check(){
    let a = await checkAuth()
    console.log(a);
    if(!a){
        localStorage.removeItem('token')
    }
    return a
}