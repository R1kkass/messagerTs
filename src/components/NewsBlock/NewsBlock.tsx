
import { FC, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { asyncNewsAction } from "../../Redux/store/news";
import { INews, IReduceState } from "../../types/IReduce";
import './NewsBlock.scss'
import NewsBlockUnit from "./NewsBlockUnit";
import NewsRef from "./NewsRef";

let limit = 10

const NewsBlock:FC<{params?:{id:string}}> = ()=>{

    const dispatch = useDispatch()
    const paramsT = useParams()
    const location = useLocation()
    const news:INews = useSelector((state: IReduceState)=>state.news.news)
    
    useEffect ( ()=>{
        console.log(paramsT);
        dispatch(asyncNewsAction(paramsT, limit))
    },[paramsT])

    return(
        <>
            {news?.rows?.map((news)=>(
                <>
                <NewsBlockUnit key={news.id} news={news}/>
                </>
            ))}
            <NewsRef/>
        </>
       
    )
}

export default NewsBlock