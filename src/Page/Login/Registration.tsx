import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { registration } from "./LoginService";
import './Login.scss'
import { useNavigate } from "react-router-dom";
import { tokenAction } from "../../store/token";
import { Formik } from "formik";

export interface ILoginRedux{
    auth: {
        auth: any,
        firebase: any,
        firestore: any
    }
}

const Registration:FC = () => {
    document.title = "Регистрация"
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    if(localStorage.getItem('token')){
        return (
            <div className="Login">
                <div>
                    
                    <h2>Вы авторизованы</h2>
                </div>
            </div>
        )
    }

    const reg =async (email:string, password:string, firstName: string, lastName: string)=>{
        registration(email, password, firstName, lastName)
        .then(()=>{
            navigate('/login')
            dispatch(tokenAction())
        })
        
    }

    return (
        <div className="Login">
            <div>
                <h2>Регистрация</h2>
            <Formik
            initialValues={{ email: '', password: '', lastName: '', firstName: '' }}
            validate={values => {
                const errors:any = {};
                if (!values.email) {
                errors.email = 'Required';
                } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                errors.email = 'Неправильно введён Email';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                reg(values.email, values.password, values.firstName, values.lastName)
            }}
            >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
            }) => (
                <form onSubmit={handleSubmit}>
                <input
                    type="firstName"
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    placeholder="Имя"
                />
                {errors.email && touched.email && errors.email}
                <br/>   
                <input
                    type="lastName"
                    name="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    placeholder="Фамилия"
                />
                {errors.email && touched.email && errors.email}
                <br/>    
                <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="Почта"
                />
                {errors.email && touched.email && errors.email}
                <br/>
                <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="Пароль"
                />
                {errors.password && touched.password && errors.password}
                    <Button type="submit" disabled={isSubmitting}>
                        Вход
                    </Button>
                </form>
            )}
            </Formik>
            </div>
        </div>
    )
}

export default Registration