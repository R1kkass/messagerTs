import { reverse } from "dns/promises";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import { IUserReducer } from "../Layout/Layout";

interface IObj{
    user: string,
    id: number,
    event: string,
    text: string
}

interface IMess{
    mesg: any[];
    deleteMessage: (a: number)=>void
}



const BlockMessage = ({mesg, deleteMessage}:IMess)=>{
  const auth = useSelector((state: IUserReducer)=>state.auth.auth)
    const app  = useSelector((state: IUserReducer)=>state.auth.firebase)
  const b:any = useAuthState(auth?.getAuth(app))


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
          <div className={mess.user == b[0]?.email ? "Websocket__messageYou" : "Websocket__message"}>
            <p>Отправитель: {mess.user}</p>
            <p>{mess.text}</p>
            {mess.user == b[0]?.email ? <button onClick={()=>deleteMessage(mess.id)}>Удалить</button> : ''}
          </div>
          }
        </div>
      )}
        </>
    )
}

export default BlockMessage