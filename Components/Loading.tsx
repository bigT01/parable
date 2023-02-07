import Image from "next/image";
import {useEffect, useState} from "react";

const Loading = () => {
    const [isEnding, setIsEnding] = useState(false)

    useEffect(() =>{
        setTimeout(() =>{
            setIsEnding(true)
        }, 2000)
    }, [])

    return(
        <div className={`flex justify-center items-center flex-col h-full ani-opasity ${isEnding ? 'animate-opa' : null}`}>
            <Image className="mb-16" src="/assets/management.svg" alt="icon-management" width={600} height={600}/>
            <div className="loader" />
        </div>
    )
}

export default Loading