
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncNewsAction } from "../../store/news";
import { INews, IReduceState } from "../../types/IReduce";
import './NewsBlock.scss'
import NewsBlockUnit from "./NewsBlockUnit";

const NewsBlock:FC<{params?:{id:string}}> = ({params})=>{

    const dispatch = useDispatch()
    
    const news:INews = useSelector((state: IReduceState)=>state.news.news)
   
    useEffect(()=>{
        dispatch(asyncNewsAction(params))
    },[params])

    return(
        <>
            {news?.rows?.map((news)=>(
                <NewsBlockUnit key={news.id} news={news}/>
            ))}
        </>
       
    )
}

export default NewsBlock