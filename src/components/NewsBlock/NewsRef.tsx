import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { limitAction, limitReducer } from "Redux/store/limit";
import { asyncNewsAction } from "../../Redux/store/news";
import { INews, IReduceState } from "../../types/IReduce";

const NewsRef = () => {

    const news:INews = useSelector((state: IReduceState)=>state.news.news)
    const limit = useSelector((state:IReduceState)=>state.limit.limit)
    const { ref, inView } = useInView({
        threshold: 0,
    });

    const params = useParams()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(limitAction(10))
    },[params])

    useEffect(()=>{
        if(inView && !(news?.count<limit)){
            dispatch(limitAction(limit+10))
            dispatch(asyncNewsAction(params, limit))
        }
    },[inView])

    return (
        <div className="News__Ref" ref={ref}>
            <div>
                Загрузить записи
            </div>
        </div>
    )
}

export default NewsRef