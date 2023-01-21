import Comment from "../../components/Comment/Comment";
import MySlider from "../../components/MySlider/MySlider";
import { domen } from "../../Const/Const";
import { FC, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";


const NewsBlockUnit:FC<any> = ({news})=>{
    const { ref, inView } = useInView({
        threshold: 0,
    });

    const [state, setState] = useState<number>(0)

    useEffect(()=>{
        if (inView) {
            setState(1)  
        }
    },[inView])

    

    return (
        <div ref={ref}  className="NewsBlock">
            {state ?
                <>
                <div className="NewsBlock__text">
                    <div className="Text__user">
                        <Link to={`/my/${news?.user?.id}`}>
                            <img src={`http://${domen}/${news?.user?.img}`} alt="" />
                        </Link>
                        <Link to={`/my/${news?.user?.id}`}>
                            <h3>{news?.user?.name}</h3>
                        </Link>
                    </div>
                    <div className="Text__text">{news?.text}</div>
                </div>
                <div className="NewsBlock__content">
                    <div>
                        <MySlider img={news.imgs}/>
                    </div>
                </div>
                <div className="NewsBlock__likes">
                    <Comment comment={news.comments} id={news.id}/>
                </div>
                </>
            : 
            <div style={{width: '500px',
                height: '500px', background: 'none'}}>
            </div>
            }
        </div>
    )
}

export default NewsBlockUnit