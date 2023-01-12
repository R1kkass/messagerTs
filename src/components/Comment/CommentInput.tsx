import jwtDecode from 'jwt-decode';
import { FC, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { asyncNewsAction } from '../../store/news';
import { IToken } from '../../types/IReduce';
import { addComment } from './CommentService';


const CommentInput:FC<{id: number}> = ({id}) =>{

    const [error, setError] = useState<string>('')
    
    const dispatch = useDispatch()

    const addCommentR =async ()=>{
        const user:IToken = jwtDecode(localStorage.getItem('token') || '')
        if(textRef?.current?.textContent?.length){
            setError('')
            await addComment(id, user.id, textRef?.current?.textContent || '')
        }else{
            setError('Ошибка')
        }
        await dispatch(asyncNewsAction())
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