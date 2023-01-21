import { domen } from "../../Const/Const";
import { FC, useEffect, useState } from "react";
import { IUnitComment } from "./Comment";
import { fetchComment } from "./CommentService";
import { Link } from "react-router-dom";

interface IAll{
    comment: IUnitComment[]
}

const CommentAll:FC<IAll> = ({comment})=>{
    const [widthCom, setWidthCom] = useState<boolean>(false)
    const [comments, setComments] = useState<IUnitComment[]>([])
    const allComment =async ()=>{
        
        const resp = await fetchComment(comment[0]?.feedId)
        setComments(resp)
        setWidthCom(true)
    }

    useEffect(()=>{
        if(comments.length){
            allComment()
        }
    }, [comment])
    
    if(widthCom){
        return (
            <div>
                {comments?.map((comment)=>(
                    <div key={comment.id} className="Comment__unit">
                        <div className="Unit__Img">
                            <img src={`http://${domen}/${comment.user.img}`} alt="" />
                        </div>
                        <div>
                            <div className="Unit__name">
                                <Link to={`/my/${comment.user.id}`}>{comment.user.name}</Link>
                            </div>
                            <div dangerouslySetInnerHTML={{__html: comment.text}} className="Unit__text" />
                        </div>
                        
                    </div>
                ))}
            </div>
        )
    }


    return (
        <div>
            
            {comment?.map((comment)=>(
                <div key={comment.id} className="Comment__unit">
                    <div className="Unit__Img">
                        <img src={`http://${domen}/${comment.user.img}`} alt="" />
                    </div>
                    <div>
                        <div className="Unit__name">
                            <Link to={`/my/${comment.user.id}`}>{comment.user.name}</Link>
                        </div>
                        <div dangerouslySetInnerHTML={{__html: comment.text}} className="Unit__text">
                        </div>
                    </div>
                    
                </div>
            ))}
            {comment.length >= 2 ?  <p className="Comment_ShowAll" onClick={allComment}>Показать всё</p> : ''}
           
        </div>
    )
}

export default CommentAll