import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {UseAuth} from "@/Components/context/AuthContext";
import {useLocalStorage} from "@/Components/hooks/useLocalStorage";

type UpdateProfileProps = {
    setUpdate: (isUpdate:boolean) => void,
    about: string,
    id: string
}

type AuthToken = {
    token ?: string
}

const UpdateProfile = ({setUpdate, about, id}:UpdateProfileProps) =>{
    const [value, setValue] = useState('')
    const {Message} = UseAuth()
    const [authToken, setAuthToken] = useLocalStorage<AuthToken>("token", {token:''});

    const saveHandler = async () => {
        axios.patch(`http://185.22.67.92:4444/profile/about/${id}`,{
            about: value
        }, {
            headers: {"Authorization": `Bearer ${authToken.token}`}
        }).then(res => {
            Message(res.status)
            setUpdate(false)
        })
            .catch(err => Message(err.code))
    }

    return(
        <div className="fixed z-20 bg-blue-300 w-1/3  rounded-2xl p-5"  style={{transform: "translate(-50%, -50%)", top: "50%", left:"50%"}}>
            <div className="flex items-center gap-2.5 mb-4">
                <textarea className="box-border py-2 px-4 text-lg " style={{height: 80, width: '100%'}} onChange={e => setValue(e.target.value)}>{about}</textarea>
                <button onClick={() =>{setUpdate(false)}} className="bg-white border p-2 absolute box-border" style={{borderRadius: "50%", top: "-25px", right:"-25px"}}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M18 18L6 6" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </button>
            </div>
            <button className="bg-green-500 text-white rounded-2xl flex px-4 py-2 w-full justify-center" onClick={saveHandler}>Обновить</button>
        </div>
    )
}

export default UpdateProfile