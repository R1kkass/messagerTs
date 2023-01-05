import React, { memo, useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./Websocket.scss"
import {useParams} from "react-router-dom"
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from "react-redux";
import BlockMessage from "../../components/BlockMessage/BlockMessage";
import Loader from "../../components/Loader/Loader";
import {IStateRedux} from "../../types/IRef"
import { useAuthState } from "react-firebase-hooks/auth";
import { IUserReducer } from "../../components/Layout/Layout";
import jwtDecode from "jwt-decode";
import { IReduceState, IToken } from "../../types/IReduce";
import LeftBlockMain from "../../components/LeftBlockMain/LeftBlockMain";
import MainYourComponent from "../../components/MainYour/MainYourComponent";

let limit = 0

const Websoket =memo(()=> {
    const dispatch = useDispatch()
    const socket = useRef<WebSocket | null>(null)
    const [connected, setConnected] = useState(false)
    const params = useParams()
    const userRef = useRef<HTMLInputElement>(null)
    const [er, setEr] = useState('')
    const [userNameSt, setUserNameSt] = useState('')

    const userToken = useSelector((state:any)=>state.token.token)
    const userTokenHS:any = localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token') || '') : ''
    

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
      
      socket.current.onopen = ()=>{
        
        
          const message = {
            event: "connection",
            username: userTokenHS?.email,
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
        console.log(messagex);
        
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
        username: userToken.email,
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
        id: params.id,
        idDelete: id,
        idRoom: params.id,
        username: userToken.email,
      }
      socket.current?.send(JSON.stringify(message))
    }

    useEffect(()=>{
      connect()
    },[])
    
    const [visible, setVisible] = useState(false)

    function limitFetch(){
      const message = {
        event: 'limit',
        limit: limit,
        id: params.id
      }
      socket.current?.send(JSON.stringify(message))
    }

    if(localStorage.getItem('token')==null){
      return(
        <div>
            <h2>Вы не авторизованы</h2>
      </div>
      )
    }


  return (
    <div className="Websocket__grid">
      <Loader visible={visible}/>
      <MainYourComponent/>
    <div className="Websocket">
      
      
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
    </div>
  )
})

export default Websoket