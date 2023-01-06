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
    user:[{
        secondUser: string,
        userCreator: string,
        user:string,
        lastUser: string,
        idRoom:string,
        lastMessage:string
    }]
}

export interface IChats{
    data: IUnitChat
}

interface IMainInfo{
    email:string,
    img:string,
    date: string
}
