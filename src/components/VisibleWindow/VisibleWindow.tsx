import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { FC, memo, useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { asyncChatAction } from "../../store/chat";
import { IReduceState, IToken } from "../../types/IReduce";
import './Visible.scss'


interface IProps{
    visible: boolean,
}

interface IList{
    id: number,
    email:string,
    role: string
}

type res={
    data:{
        user:IList
    }
}

const VisibleWindow:FC<IProps>= memo(({visible})=>{

    const user = useSelector((state:IReduceState)=> state.token.token)
    const [list,setList] = useState<any>([])
    
    async function fetchUser(){
        const response:res = await axios.get('http://localhost:5001/api/user/getall')
        setList(response.data.user)
    }

    async function createChat(secondEmail: string) {
        const response:res = await axios.post('http://localhost:5001/api/chat/create',{
            secondEmail: secondEmail,
            email: user?.email
        })   
    }

    const dispatch = useDispatch()

    useMemo(()=>{
        dispatch(asyncChatAction())
    },[])

    useEffect(()=>{
        fetchUser()
    },[])
    

    if(visible){
        return(
        <div className="VisibleMenu">
            {list.map((list:IList)=>(
                <>
                {list?.email!==user?.email ? 
                <div key={list.id} data-testid="visble" onClick={()=>createChat(list.email)} className="VisibleMenu__unit">
                {list.email}
            </div>
            : 
            ''    
        }
            </>
                
            ))}
            Загрузить
        </div>
        )
    }
    
    return (
        <>
        </>
    )
})

export default VisibleWindow