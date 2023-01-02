import axios from "axios";
import React, { FC, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncChatAction } from "../../store/chat";
import { IReduceState } from "../../types/IReduce";
import './Visible.scss'


interface IProps{
    visible: boolean
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

const VisibleWindow:FC<IProps>= ({visible})=>{

    const user = useSelector((state:IReduceState)=>state.token.token)
    const [list,setList] = useState<any>([])
    
    async function fetchUser(){
        const response:res = await axios.get('http://localhost:5001/api/user/getall')
        setList(response.data.user)
        console.log(response.data.user);
    }

    async function createChat(secondEmail: string) {
        const response:res = await axios.post('http://localhost:5001/api/chat/create',{
            secondEmail: secondEmail,
            email: user.email
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
                <div onClick={()=>createChat(list.email)} className="VisibleMenu__unit">
                    {list.email}
                </div>
            ))}
        </div>
        )
    }
    
    return (
        <>
        </>
    )
}

export default VisibleWindow