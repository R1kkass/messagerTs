import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./Websocket.scss"
import {useParams} from "react-router-dom"
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from "react-redux";
import BlockMessage from "./components/BlockMessage/BlockMessage";
import Loader from "./components/Loader/Loader";
import {IStateRedux} from "./types/IRef"
import { useAuthState } from "react-firebase-hooks/auth";
import { IUserReducer } from "./components/Layout/Layout";

let limit = 0

const Websoket =()=> {
   const auth = useSelector((state: IUserReducer)=>state.auth.auth)
    const app  = useSelector((state: IUserReducer)=>state.auth.firebase)
    const b = useAuthState(auth?.getAuth(app))
    const dispatch = useDispatch()
    const socket = useRef<WebSocket | null>(null)
    const [connected, setConnected] = useState(false)
    const params = useParams()
    const userRef = useRef<HTMLInputElement>(null)
    const [er, setEr] = useState('')
    const [userNameSt, setUserNameSt] = useState('')
    
    useEffect(()=>{
      connect()
    },[])

    const { ref, inView, entry } = useInView({
      threshold: 0,
    })
    

    useEffect(()=>{
      limit=limit+10
      if(inView && Number(count)>limit){
        limitFetch()
      }
    },[inView])


    function connect(){
      socket.current = new WebSocket("ws://localhost:5001/con")
      console.log('f');
      
      socket.current.onopen = ()=>{
          const message = {
            event: "connection",
            username: localStorage.getItem('user'),
            id: params.id,
            limit: limit
          }
          socket.current?.send(JSON.stringify(message))
          setConnected(true);
          setInterval(()=>{

          },15000)
      }
      

      socket.current.onmessage = (e)=>{
        const messagex = JSON.parse(e.data)
        dispatch({type: 'SEND', action: messagex.rows})
        dispatch({type: 'COUNT', action: messagex.count})
        setVisible(false)
      }
      socket.current.onerror = ()=>{
        setConnected(false);
        setEr("Нет соединения")
        
    }
    socket.current.close = ()=>{
      console.log('Подключение отключено');
  }
    }
    const textRef = useRef<HTMLTextAreaElement | any>()
    const mesg:any = useSelector<IStateRedux>((state) => state.messages.messages)
    const count = useSelector<IStateRedux, string>((state) => state.messages.count)
    const options:object = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
    function sendMessage(){
      setVisible(true)
      const message = {
        event: 'message',
        limit: limit,
        text: textRef.current?.value || '',
        username: b[0]?.email,
        date: new Date().toLocaleDateString('RU', options) + " " + new Date().toLocaleTimeString(),
        id: params.id
      }
      socket.current?.send(JSON.stringify(message))
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      textRef.current.value = ""
    }

    function deleteMessage(id: number){
      setVisible(true)
      const message = {
        event: 'delete',
        limit: limit,
        idDelete: id,
        id: params.id,
        user: localStorage.getItem('user'),
      }
      socket.current?.send(JSON.stringify(message))
    }

    
    const [visible, setVisible] = useState(false)

    function limitFetch(){
      const message = {
        event: 'limit',
        limit: limit,
        id: params.id
      }
      socket.current?.send(JSON.stringify(message))
    }

    if(b[1]){
      return(
        <div>
            <input onChange={(e)=>setUserNameSt(e.target.value)} placeholder="login"/>
            <br/>
            <input ref={userRef} placeholder="id комнаты" />
            <br/>
            <button onClick={()=>{localStorage.setItem('user', userNameSt); connect();}}>
              Войти
            </button>
            {er}
      </div>
      )
    }


  return (
    <div className="Websocket">
      <Loader visible={visible}/>
      <div>
      <br/>
        <div className="Websocket__textarea">
            <div>
            <textarea ref={textRef} placeholder="Введите сообщение"/>
            <br />
            <button onClick={sendMessage}>Отправить</button>
        </div>
      </div>
      <div className="Websocket__conteiner">
        <BlockMessage deleteMessage={deleteMessage} mesg = {mesg}/>
      </div>
        <div ref={ref}>
          <h2>Загрузка...</h2>
        </div>
      </div>
    </div>
  )
}

export default Websoket