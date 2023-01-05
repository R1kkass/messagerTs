import { domen } from "Const/Const";
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
          const message = {
              event: "connectionChat",
              username: user?.email
            }
            socket.current?.send(JSON.stringify(message))
            setInterval(()=>{
    
            },15000)
        }
        
        socket.current.onmessage = (e)=>{    
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
    },[])

    return(
        <div className="ListChat">
            {listChat?.data?.user?.map((list:any)=>(
                <div key={list.id} className="ListChat__block">
                    <Link to = {`/im/${list.idRoom}`}>
                    {list.secondUser!==user.email ? 
                    <>
                        <img className="Img__Creator" 
                            src={`http://${domen}/${list?.secondUser}.jpg`}
                            alt={list?.user}/>
                            <div>
                            <div className="ListChat__secondUser">{list.secondUser}</div>
                            <div className="ListChat__img" >
                                <img
                                className="Img__lastUser" 
                                src={`http://${domen}/${list?.lastUser}.jpg`}
                                alt="" />
                                <div>{list.lastMessage}</div>
                            </div>
                        </div>
                    </>
                    :
                    <>
                    <img className="Img__Creator" 
                    src={`http://${domen}/${list?.userCreator}.jpg`}
                    alt={list?.user}/>
                    <div>
                        <div className="ListChat__secondUser">{list.userCreator}</div>
                        <div className="ListChat__img" >
                            <img
                            className="Img__lastUser" 
                            src={`http://${domen}/${list?.lastUser}.jpg`} 
                            alt=""
                            />
                            <div>{list.lastMessage}</div>
                        </div>
                    </div>
                </>
                    }
                    
                    </Link>
                </div>
            ))}
        </div>
    )
})

export default ListChat