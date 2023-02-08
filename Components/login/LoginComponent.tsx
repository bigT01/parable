import {useRef, useState} from "react";
import SignIn from "@/Components/login/SignIn";
import SignUp from "@/Components/login/SignUp";


type LoginProps = {
    isRegister: boolean;
    setIsClicked: (isClick: boolean) => void
}

const LoginComponent = ({isRegister, setIsClicked}: LoginProps) => {
    const ref = useRef(null)
    const [isReg, setIsReg] = useState(!isRegister)


    return (
        <div className="fixed z-20 bg-blue-400 w-1/3 rounded-2xl" ref={ref} style={{transform: "translate(-50%, -50%)", top: "50%", left:"50%"}} >
            <div className="flex justify-between mb-10">
                <button onClick={() => setIsReg(false)} className={`w-1/2 py-4 rounded-br-2xl rounded-tl-2xl ${isReg ? "border-r border-b border-black bg-blue-200" : "text-white"}`}>Регистрироваться</button>
                <button onClick={() => setIsReg(true)} className={`w-1/2 py-4 rounded-tr-2xl rounded-bl-2xl ${!isReg ? "border-r border-l border-black bg-blue-200" : "text-white"}`}>Войти</button>
            </div>
            {!isReg? <SignUp />: <SignIn/>}

            <button onClick={() =>{setIsClicked(false)}} className="bg-white border p-2 absolute box-border" style={{borderRadius: "50%", top: "-25px", right:"-25px"}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M18 18L6 6" stroke="black" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
        </div>
    )
}

export default LoginComponent