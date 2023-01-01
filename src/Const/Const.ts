import jwtDecode from "jwt-decode"

export const URi = "http://localhost:5001/api"

export const tokens = localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token') || '') : null