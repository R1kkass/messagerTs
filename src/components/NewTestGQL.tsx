import { useMutation } from "@apollo/client"
import { UPDATE_USER } from "graphQL/mutations/user"
import React, { ChangeEvent, useState } from "react"


const NewsTestGQL = () => {
    const [id, setId] = useState<string>()
    const [role, setRole] = useState<string | null>()

    const [userUp] = useMutation(UPDATE_USER)

    const update = async () => {
        console.log(id,role);
        
        const user = await userUp({
            variables: {
                input: {
                    id: id,
                    role: role
                }
            }
        })
    }

    return (
        <div>
            <input placeholder="id пользователя" onInput={(e: ChangeEvent<HTMLInputElement>) => setId(e.target?.value)} />
            <input placeholder="role" onInput={(event: React.ChangeEvent<HTMLInputElement>) => setRole(event.target?.value)} />
            <button onClick={update}>Обновить</button>
        </div>
    )
}

export default NewsTestGQL