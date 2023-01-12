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
        news: INews
    }
}

export interface INews{
    rows:[{
        id: string,
        userid: number,
        text: string,
        likes: number,
        imgs:[{
            id: number,
            feedId: number,
            fileName: string
        }],
        user: INewsUser,
        name: string
    }]
    
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
