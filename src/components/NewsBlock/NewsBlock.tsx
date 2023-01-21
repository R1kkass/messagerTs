
import { FC, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { asyncNewsAction } from "../../store/news";
import { INews, IReduceState } from "../../types/IReduce";
import './NewsBlock.scss'
import NewsBlockUnit from "./NewsBlockUnit";
import NewsRef from "./NewsRef";

let limit = 10

const NewsBlock:FC<{params?:{id:string}}> = ({params})=>{

    const dispatch = useDispatch()
    
    

    const news:INews = useSelector((state: IReduceState)=>state.news.news)
   
    useEffect(()=>{
        dispatch(asyncNewsAction(params, limit))
    },[params])


    return(
        <>
            {news?.rows?.map((news)=>(
                <NewsBlockUnit key={news.id} news={news}/>
            ))}
            <NewsRef/>
        </>
       
    )
}

export default NewsBlock