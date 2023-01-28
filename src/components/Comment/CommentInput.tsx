import jwtDecode from 'jwt-decode';
import { FC, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { asyncNewsAction } from '../../Redux/store/news';
import { IReduceState, IToken } from '../../types/IReduce';
import { addComment } from './CommentService';


const CommentInput:FC<{id: number}> = ({id}) =>{

    const limit = useSelector((state:IReduceState)=>state.limit.limit)
    const [error, setError] = useState<string>('')
    const socket = useRef<WebSocket | null>(null)
    const dispatch = useDispatch()
    const params = useParams()

    const addCommentR =async ()=>{
        const user:IToken = jwtDecode(localStorage.getItem('token') || '')
        if(textRef?.current?.textContent?.length){
            setError('')
            await addComment(id, user.id, textRef?.current?.innerHTML || '')
        }else{
            setError('Ошибка')
        }
        dispatch(asyncNewsAction(params, limit))
        
        const message = {
            event: 'newsAdd',
          }
        socket.current?.send(JSON.stringify(message))
    }
    
    const textRef = useRef<HTMLDivElement>(null) 

    return(
        <div className='Comment__inp'>
            <div className='Comment__input'>
                <div
                    contentEditable="true"
                    id='text' ref={textRef} placeholder="Текст записи"/>
                {error}
            </div>
            <Button onClick = {addCommentR}>Отправить</Button>
        </div>
    )
}

export default CommentInput