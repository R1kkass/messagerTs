import { Interface } from "readline"

export interface IReduceState{
    token:{
        token:{
            email:string,
            role:string,
            img: string,
            displayName:string,
            id: string
        },  
    },
    chat:{
        chats: IChats
    },
    mainInfo:{
        mainInfo: IMainInfo
    }
    
}

export interface IToken{
    email: string,
    role: string,
    img:string
}

export interface IUnitChat{
    user:{
    id:string,
    userCreator: string,
    secondUser: string
    }
}

export interface IChats{
    data: IUnitChat
}

interface IMainInfo{
    email:string,
    img:string,
    date: string
}
