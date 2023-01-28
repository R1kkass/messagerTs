import { FC } from 'react';
import CommentInput from './CommentInput';
import './Comment.scss'
import CommentAll from './CommentAll';

export interface IComment{
    id: number,
    comment: IUnitComment[]
}

export interface IUnitComment{
    id: string,
    text: string,
    name: string,
    img: string,
    feedId: number,
    user:{
        id: number
        name: string,
        img: string,
    }
}

const Comment:FC<IComment> = ({id, comment}) =>{

    return(
        <>
            <CommentAll comment={comment}/>
            <CommentInput id={id}/>

        </>
    )
}

export default Comment