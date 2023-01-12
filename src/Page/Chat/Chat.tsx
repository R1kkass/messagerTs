import ListChat from "../../components/ListChat/ListChat";
import MainYourComponent from "../../components/MainYour/MainYourComponent";
import {FC, memo} from "react";

const Chat:FC = memo(()=>{

    

    return(
        <div className="Main">
            <MainYourComponent />
            <div className="Main__block">
                <ListChat/>
            </div>
        </div>
    )
})

export default Chat
