import axios from "axios";
import { domen, URi } from "../../Const/Const";
import jwtDecode from "jwt-decode";
import React, { memo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { chatAction } from "../../store/chat";
import { IReduceState, IUnitChat } from "../../types/IReduce";
import './ListChat.scss'

interface IListChat{
    data:{
        user: IList[]
    }
}

interface IList{
    secondUser: string,
    userCreator: string,
    user:string,
    lastUser: string,
    idRoom:string,
    lastMessage:string
}

const ListChat = memo(()=>{
    
    const dispatch = useDispatch()
    const socket = useRef<WebSocket | null>(null)
    const listChat:IListChat = useSelector((state:IReduceState)=>state.chat.chats)

   

 const user:any =localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token') || '') : localStorage.getItem('token')    
 async function fetchChat(){
        let tokensMain: any = jwtDecode(localStorage.getItem('token') || '')
        const response = await axios.get(`${URi}/chat/getall?email=${tokensMain.email}`)
        await dispatch(chatAction(response))
        
        return response
    }


    useEffect(()=>{
        fetchChat()
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
            fetchChat()
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

    if(!localStorage.getItem('token')){
        return(
            <div>Не авторизован</div>
        )
    }

    return(
        <div  className="ListChat">
            {listChat?.data?.user?.map((list:any)=>(
                <div data-testid="ListChat" className="ListChat__block">
                    <Link to = {`/im/${list?.idRoom}`}>
                    {list?.secondUser!==user?.email ? 
                    <>
                        <img className="Img__Creator" 
                            src={`http://${domen}/${list?.secondUser}.jpg`}
                            alt={list?.user}/>
                            <div>
                            <div className="ListChat__secondUser">{list?.secondUser}</div>
                            <div className="ListChat__img">
                                <img
                                className="Img__lastUser"
                                src={`http://${domen}/${list?.lastUser}.jpg`}
                                alt="" />
                                <div>{list?.lastMessage}</div>
                            </div>
                        </div>
                    </>
                    :
                    <>
                    <img className="Img__Creator" 
                    src={`http://${domen}/${list?.userCreator}.jpg`}
                    alt={list?.user}/>
                    <div>
                        <div className="ListChat__secondUser">{list?.userCreator}</div>
                        <div className="ListChat__img" >
                            <img
                            className="Img__lastUser" 
                            src={`http://${domen}/${list?.lastUser}.jpg`} 
                            alt=""
                            />
                            <div>{list?.lastMessage}</div>
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