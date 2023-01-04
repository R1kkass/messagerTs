import jwtDecode from "jwt-decode"

interface ITokens{
    id: string,
    email: string,
    img: string
}

export const URi = "http://localhost:5001/api"

export const tokens:any = localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token') || '') : null

export const domen = "localhost:5001"