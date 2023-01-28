import { FC, useEffect, useState, useRef } from 'react'
import { GET_ALL_USERS, GET_ONE_USERS } from 'graphQL/query/user'
import { useQuery, useMutation } from "@apollo/client"
import { CREATE_USER, UPDATE_USER } from 'graphQL/mutations/user'
import NewsTestGQL from './NewTestGQL'

interface IUser {
    id: number,
    email: string
}

const TestGraphQL: FC = () => {
    const { data, loading, error } = useQuery(GET_ALL_USERS)


    const [updateUserGL] = useMutation(UPDATE_USER)

    const [user, setUser] = useState<IUser[]>([])
    const nameRef = useRef<HTMLInputElement>(null)
    const lastRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const roleRef = useRef<HTMLInputElement>(null)
    const oneRef = useRef<HTMLInputElement>(null)

    const { data: dataOne, loading: onLoading, error: oneError, refetch } = useQuery(GET_ONE_USERS, {
        variables: {
            id: oneRef.current?.value
        }
    })

    const addUser = async () => {
        const user = await updateUserGL({
            variables: {
                input: {
                    firstName: nameRef.current?.value,
                    lastName: lastRef.current?.value,
                    password: passwordRef.current?.value,
                    email: emailRef.current?.value,
                    role: roleRef.current?.value
                }
            }
        })
    }

    useEffect(() => {
        if (!loading) {
            setUser(data.getAllUser)
        }
    }, [data])

    const getOneUser = async ()=>{
        const a =  await refetch()
        console.log(a);   
    }



    return (
        <div>
            <input ref={nameRef} />
            <input ref={lastRef} />
            <input ref={emailRef} />
            <input ref={passwordRef} />
            <input ref={roleRef} />
            <button onClick={addUser}>Отправить</button>
            <input ref={oneRef} />
            <button onClick={getOneUser}>Получить</button>

            {user?.map((user) => (
                <>
                    {user?.id}
                    {user?.email}
                </>
            ))}
            <hr/>
            <NewsTestGQL/>
        </div>
    )
}

export default TestGraphQL