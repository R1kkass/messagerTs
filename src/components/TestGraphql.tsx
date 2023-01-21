import {FC, useEffect, useState,useRef} from 'react'
import { GET_ALL_USERS } from 'query/user'
import { useQuery, useMutation } from "@apollo/client"
import { CREATE_USER } from 'mutations/user'

interface IUser{
    id: number,
    email: string
} 

const TestGraphQL:FC = () =>{
    const {data, loading, error} = useQuery(GET_ALL_USERS)
    const [newUser] = useMutation(CREATE_USER)

    const [user, setUser] = useState<IUser[]>([]) 
    const nameRef = useRef<HTMLInputElement>(null)
    const lastRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const roleRef = useRef<HTMLInputElement>(null)

    const addUser = async ()=>{
        const user = await newUser({
            variables:{
                input:{
                    firstName: nameRef.current?.value,
                    lastName: lastRef.current?.value,
                    password: passwordRef.current?.value,
                    email: emailRef.current?.value,
                    role: roleRef.current?.value
                }
            }
        })
        console.log(user);
        
    }

    useEffect(()=>{
        if(!loading){
            setUser(data.getAllUser)
        }
    },[data])


    return(
        <div>
            <input ref={nameRef}/>
            <input ref={lastRef}/>
            <input ref={emailRef}/>
            <input ref={passwordRef}/>
            <input ref={roleRef}/>
            <button onClick={addUser}>Отправить</button>

            {user?.map((user)=>(
                <>
                    {user?.id}
                    {user?.email}
                </>
            ))}
        </div>
    )
}

export default TestGraphQL