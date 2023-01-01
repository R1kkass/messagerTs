import { Interface } from "readline"

export interface IReduceState{
    token:{
        token:{
            email:string,
            role:string
        },  
    },
    chat:{
        chats: IChats
    }
    
}

export interface IToken{
    email: string,
    role: string
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


