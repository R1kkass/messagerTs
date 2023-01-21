import jwtDecode from "jwt-decode"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { asyncNewsAction } from "../../store/news"
import { IToken } from "../../types/IReduce"


const NewsUpdate = ()=>{

    const dispatch = useDispatch()
    const [bol, setBol]  =useState<boolean>()
    const socket = useRef<WebSocket | null>(null)
    const [count, setCount] = useState<number>(0)
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
        
        socket.current.onmessage = ()=>{   
            console.log('message');
             setBol(true)
             setCount(p=>p+1)
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

    const update = ()=>{
        dispatch(asyncNewsAction())
        setBol(false)
    }

    return (
        <>
            {bol ?
             <div className="News__Update" onClick={update}>
              <div>
                Новых новостей {count}
              </div>
                
             </div>
            :
            ''
            }
           
        </>
    )
}

export default NewsUpdate