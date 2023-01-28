import {gql} from "@apollo/client"

export const CREATE_USER = gql`

    mutation createUser($input: UserInput){
        createUser(input: $input){
            id, email
        }
    }

`

export const UPDATE_USER = gql`
    mutation updateUser($input: UserInput){
        updateUser(input: $input){
                id
            }
        }
    `


export const CREATE_LIKE = gql`
    mutation createLike($input: LikeInput){
        createLike(input: $input){
            id
        }
    }
`
export const DELETE_LIKE = gql`
    mutation deleteOneLike($input: LikeInput){
        deleteOneLike(input: $input){
            id
        }
    }
`