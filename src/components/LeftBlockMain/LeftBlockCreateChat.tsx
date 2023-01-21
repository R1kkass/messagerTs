import axios from "axios"
import jwtDecode from "jwt-decode"
import { FC, useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { IReduceState, IToken } from "types/IReduce"
import { IListChat } from "../../components/WebSocket/WebSocketUserTop"

type res={
    data:{
        user:IListChat,
        message: boolean,
        response:{
            idRoom:String
        }
    }
}

const LeftBlockCreateChat:FC<{users:string}> = ({users})=>{

    const tok:IToken | null = localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token') || '') : null
    const [bol, setBol] = useState<boolean>(false) 
    const user = useSelector((state:IReduceState) => state.mainInfo.mainInfo)
    async function checkChat(){
        const response:res = await axios.get(`http://localhost:5001/api/chat/getOne?secondUser=${user.email}&email=${tok?.email || ''}`,{headers:{
            'Authorization': `bearer ${localStorage.getItem('token')}`
        }}
    )
        setBol(response.data.message)
    }

    useEffect(()=>{
        checkChat()
    },[user])

    const navigate = useNavigate()
    
    async function createChat() {
        const response:res = await axios.post('http://localhost:5001/api/chat/create',{
            secondEmail: user?.email,
            email: tok?.email || ''
        })
        console.log(response.data.response.idRoom);
        navigate(`/im/${response.data.response.idRoom}`)
        checkChat()
    }

    return(
        <>
        {bol ? <Button onClick={createChat}>Начать чат</Button> : ''}
        </>
    )
} 

export default LeftBlockCreateChat