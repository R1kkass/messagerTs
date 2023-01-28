import {gql} from '@apollo/client'

export const GET_ALL_USERS = gql`
    query{
        getAllUser{
            id, email
        }
        
    }
`

export const GET_ONE_USERS = gql`
    query getOneUser($id: ID){
        getOneUser(id: $id){
            id, email
        }
    }
`

export const GET_ONE_LIKE = gql`
    query getOneLike($input: LikeInput){
        getOneLike(input: $input){
            id, userId, postId
        }
    }
`

export const GET_ONE_COUNT_LIKE=gql`
    query getAllLike($input: LikeInput){
        getAllLike(input: $input){
            count
        }
    }
`