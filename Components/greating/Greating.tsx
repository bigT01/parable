import Image from "next/image";
import Link from "next/link";

const Greating = ({setIsPopUp}:any) => {
    return(
        <div className="flex flex-col items-center justify-center  bg-blue-500 z-20 top-2/4 left-2/4 p-10 rounded-2xl text-white min-w-1/3" style={{transform: 'translate(-50%, -50%)', position:'fixed'}}>
            <Image src='assets/settings.svg' alt='icon-settings' width={500} height={500} className="relative left-2 mb-10"/>
            <h1 className="font-bold text-3xl">Пожалуйста проидите опрос</h1>
            <p className="mb-12">это займет 1-2 минуты</p>
            <div className="flex justify-between w-full">
                <button className="rounded-2xl px-4 py-2 bg-red-400" onClick={() => {setIsPopUp(false)}}>закрыть</button>
                <Link href={'https://docs.google.com/forms/d/1qPsavZ_Tyg4o2FB5ld0hCmnSg37OjVJ80ivturyyy1c/edit'} className="rounded-2xl px-4 py-2 bg-green-400">Проити опрос</Link>
            </div>
        </div>
    )
}

export default Greating