import React, { memo, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { asyncChatAction, ASYNC_ADD_CHAT } from "../../store/chat";
import { IChats, IReduceState, IUnitChat } from "../../types/IReduce";
import './ListChat.scss'

const ListChat = memo(()=>{
    
    const dispatch = useDispatch()

    const listChat:any = useSelector((state:IReduceState)=>state.chat.chats)

    const fetchs =async ()=>{
        await dispatch(asyncChatAction())
    }

    useLayoutEffect(()=>{
        fetchs()
    },[])
    
    return(
        <div className="ListChat">
            {listChat?.data?.user?.map((list:any)=>(
                <div className="ListChat__block">
                    <Link to = {`/im/${list.idRoom}`}>
                    {list.id}
                    {list.secondUser}
                    </Link>
                </div>
            ))}
        </div>
    )
})

export default ListChat