import { domen } from "Const/Const";
import { reverse } from "dns/promises";
import React, { memo, useEffect, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import { IReduceState } from "types/IReduce";
import { IUserReducer } from "../Layout/Layout";

interface IObj{
    user: string,
    id: number,
    event: string,
    text: string,
    img: string
}

interface IMess{
    mesg: IObj[];
    deleteMessage: (a: number)=>void
}



const BlockMessage = memo(({mesg, deleteMessage}:IMess)=>{
  const socket = useRef<WebSocket | null>(null)
  const auth = useSelector((state: IUserReducer)=>state.auth.auth)
    const app  = useSelector((state: IUserReducer)=>state.auth.firebase)
  const user = useSelector((state: IReduceState)=> state.token.token)

  return(
        <>
        {mesg?.map((mess: IObj)=>
        <div key={mess.id}>
          {mess.event=="connection" 
          ?
          <div>
          {mess.user} подключился к чату
          </div>
          :
          <div className={mess.user == user?.email ? "Websocket__messageYou" : "Websocket__message"}>
            <p>Отправитель: {mess.user}</p>
            <p>{mess.text}</p>
            {mess.user == user?.email ? <button onClick={()=>deleteMessage(mess.id)}>Удалить</button> : ''}
            <img className="Websocket__img" src={`http://${domen}/${mess?.user}.jpg`} alt={mess?.user} />
          </div>
          }
        </div>
      )}
        </>
    )
})

export default BlockMessage