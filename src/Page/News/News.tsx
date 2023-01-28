import LeftBlockMain from "../../components/LeftBlockMain/LeftBlockMain";
import MainYourComponent from "../../components/MainYour/MainYourComponent";
import NewsBlock from "../../components/NewsBlock/NewsBlock";
import jwtDecode from "jwt-decode";
import { FC, memo, useEffect, useRef } from "react";
import NewsUpdate from "../../components/NewsBlock/NewsUpdate";

const News:FC<{params?: {id: string}}> = memo(({params})=>{

    const user:any = localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token') || '') : localStorage.getItem('token')

    document.title = 'Новости'
    
    if(params?.id!=user?.id && params?.id){
        return(
        <div className="Main">
        
        <LeftBlockMain />
            <div className="Main__block">
                <div>
                    <NewsBlock params={params}/>
                </div>
            </div>
        </div>
    )
    }

    if(params){
        return(
        <div className="Main">
        
        <MainYourComponent />
            <div className="Main__block">
                <div>
                    <NewsBlock params={params}/>
                </div>
            </div>
        </div>
    )
    }

    if(!localStorage.getItem('token')){
        return (
            <div>
                Вы не авторизованы
            </div>
        )
    }

    return(
        <div className="Main">
            
            <MainYourComponent />
            <div className="Main__block">
               <div>
                    <NewsUpdate />
                    <NewsBlock/>
               </div>
            </div>
        </div>
    )
})

export default News