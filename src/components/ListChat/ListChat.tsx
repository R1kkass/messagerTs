import React, { memo, useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { asyncChatAction, ASYNC_ADD_CHAT } from "../../store/chat";
import { IChats, IReduceState, IUnitChat } from "../../types/IReduce";
import './ListChat.scss'

const ListChat = memo(()=>{
    
    const dispatch = useDispatch()
    const socket = useRef<WebSocket | null>(null)
    const listChat:any = useSelector((state:IReduceState)=>state.chat.chats)
    const user = useSelector((state:IReduceState)=>state.token.token)

    const fetchs =async ()=>{
        await dispatch(asyncChatAction())
    }

    useLayoutEffect(()=>{
        fetchs()
    },[])
    
    function connect(){
        socket.current = new WebSocket("ws://localhost:5001/con")
        
        socket.current.onopen = ()=>{
          console.log('messagex');
          const message = {
              event: "connectionChat",
              username: user?.email
            }
            socket.current?.send(JSON.stringify(message))
            console.log('messagex');
            setInterval(()=>{
    
            },15000)
        }
        
    
        socket.current.onmessage = (e)=>{    

            console.log(e.data);
            
        const messagex = JSON.parse(e.data)
          fetchs()
          
        }
        socket.current.onerror = ()=>{
          console.log('ошибка');
          
      }
      socket.current.close = ()=>{
        console.log('Подключение отключено');
    }
      }
    
    useEffect(()=>{
      connect()

      console.log('e');

    },[])

    return(
        <div className="ListChat">
            {listChat?.data?.user?.map((list:any)=>(
                <div className="ListChat__block">
                    <Link to = {`/im/${list.idRoom}`}>
                    {list.id}
                    {list.secondUser}
                    {list.lastMessage}
                    </Link>
                </div>
            ))}
        </div>
    )
})

export default ListChat