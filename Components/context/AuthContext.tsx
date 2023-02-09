import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import Router from 'next/router'
import {Alert, AlertTitle} from "@mui/material";

type AuthProviderContext = {
    children: ReactNode
}

type AuthToken = {
    token ?: string
}

type AuthContext = {
    Auth: (isAuth?: string | null) => void
    isAuth: boolean,
    Message: (message: number | string) => void
}

const AuthContext = createContext({} as AuthContext)

export const UseAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }: AuthProviderContext) => {
    const [isAuth, setIsAuth] = useState(false)
    const [message, Message] = useState<number | string>('')
    const [isSuccess, setIsSuccess] = useState(false)
    const [authToken, setAuthToken] = useLocalStorage<AuthToken>("token", {token:''});

    useEffect(() => {
        if(authToken.token !== ''){
            setIsAuth(true)
        }
        else{
            setIsAuth(false)
        }
    }, [authToken])

    useEffect(() =>{
        if(message){
            if(message === 200 || message === 201){
                setIsSuccess(true)
            }
            else{
                setIsSuccess(false)
            }
            setTimeout(() => {
                Message('')
            }, 1500)
        }
    }, [message])

    const Auth = (authToken?: string | null, ) => {
        if (authToken){
            setIsAuth(true)
            setAuthToken({token: authToken})
        }
        if (authToken === null){
            setIsAuth(false)
            setAuthToken({token: ""})
        }
    }

    return (
        <AuthContext.Provider
            value={{
                Auth,
                isAuth,
                Message
            }}
        >
            {message && (
                <div className="w-full flex justify-center absolute top-2">
                    <Alert severity={`${isSuccess? "success" : "error"}`}>
                        <AlertTitle>{isSuccess? "Успех": "Ошибка"}</AlertTitle>
                    </Alert>
                </div>
            )}
            {children}
        </AuthContext.Provider>
    )
}
