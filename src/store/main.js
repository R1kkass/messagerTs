const inialSTate = {
    mainInfo:{},
    date: Date.now()
}

const ADD = 'ADD'
const ASYNC_ADD = 'ASYNC_ADD'

export const mainReducer = (state=inialSTate, action)=>{
    switch (action.type){
        case ADD:
            return {...state, mainInfo: action.mainInfo}
        default:
            return state
    }
}

export const mainAction = (payload)=>({type:ADD, mainInfo: payload, date: Date.now()})
export const mainAsyncAction = (payload) => ({type: ASYNC_ADD})
