import { INewsBlockUnit } from "components/NewsBlock/NewsBlockUnit"

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
    },
    news:{
        news: INews,
        likes: INewsBlockUnit[],
        comment: any[]
    },
    sub:{
        sub: ISub[],
        ur: IUr[]
    },
    limit:{
        limit: number
    }
}

export interface ISub{
    id: string,
    userId: string,
    user:{
        id: string,
        email: string,
        name: string,
        img: string
    }
}

export interface IUr{
    id: string,
    userId: string,
    user:string,
    'user.id': string,
    'user.name': string,
    'user.img': string
}

export interface INews{
    rows:[{
        id: string,
        userid: number,
        text: string,
        imgs:[{
            id: number,
            feedId: number,
            fileName: string
        }],
        user: INewsUser,
        name: string,
        likes: [{
            feedId: number,
            count: number
        }]
    }],
    count: number,
    
    
} 

export interface INewsUser{
    id: number,
    email: string,
    role: string,
    img: string,
    name: string
}

export interface INewsImgs{
    id: number,
    feedId: number,
    fileName: string
}

export interface IToken{
    id: string,
    email: string,
    role: string,
    img:string,
    name: string
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
