import ModalWindow from "../../UI/ModalWindow/ModalWindow";
import jwtDecode from "jwt-decode";
import { useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { asyncFeedAction } from "../../Redux/store/feed";
import { asyncNewsAction } from "../../Redux/store/news";
import { IToken } from "../../types/IReduce";
import "./Feed.scss"
import { useParams } from "react-router-dom";

const Feed = ()=>{

    const dispatch =useDispatch()
    const user:IToken = jwtDecode(localStorage.getItem('token') || '')
    const text = useRef<HTMLDivElement>(null)
    const photoRef = useRef<any>(null)

    const formData = new FormData()
  const params = useParams()
    const fetchFeed =async ()=>{
        console.log(photoRef?.current?.files);
        
         formData.append('email', user?.id || '') 
         if(photoRef?.current?.files.length){
            for (let i = 0; i < photoRef?.current?.files.length; i++) {
                formData.append('imgs', photoRef?.current?.files[i])
              }
         }
         
         formData.append('text', text?.current?.textContent || '')
         dispatch(asyncFeedAction(formData))
         formData.delete('email')
         formData.delete('imgs')
         formData.delete('text')
         if(params.id){
          await dispatch(asyncNewsAction(params))
         }else{
          await dispatch(asyncNewsAction())
         }
         
         const message = {
            event: 'newsAdd',
          }
          socket.current?.send(JSON.stringify(message))
    }



    const socket = useRef<WebSocket | null>(null)

    function connect(){
        const user:IToken | null = localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token') || '') : null
        socket.current = new WebSocket("ws://localhost:5001/news")
        
        socket.current.onopen = ()=>{
          const message = {
              event: "connectionNews",
              username: user?.email
            }
            console.log('connect');
            
            socket.current?.send(JSON.stringify(message))
            setInterval(()=>{
    
            },15000)
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
        <ModalWindow nameButton="Создать запись">
            <div className="Feed">
                <label htmlFor="text">Текст записи</label>
                <div className="Feed__contentEditable"
                contentEditable="true" onInput={()=>console.log(text?.current?.textContent)}
                id='text' ref={text} placeholder="Текст записи"/>
                <label htmlFor="file">Прикрепить файл</label>
                <input multiple ref={photoRef} type='file' id="file" accept=".jpg, .png, .jfif, .mp4"/>
                <Button onClick={()=>fetchFeed()}>Отправить</Button>
            </div>
        </ModalWindow>
    )
}

export default Feed