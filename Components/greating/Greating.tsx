import Image from "next/image";
import Link from "next/link";

const Greating = ({setIsPopUp}:any) => {
    return(
        <div className="flex flex-col items-center justify-center z-20 p-10 rounded-2xl " style={{transform: 'translate(-50%, -50%)', left:'50%', top:"50%", position:'fixed', backgroundColor:"rgb(59, 130, 246)", padding: 50, color: '#ffffff', minWidth: '33%'}}>
            <Image src='assets/settings.svg' alt='icon-settings' width={500} height={500} className="relative left-2 mb-10"/>
            <h1 className="font-bold text-3xl">Пожалуйста проидите опрос</h1>
            <p className="mb-12">это займет 1-2 минуты</p>
            <div className="flex justify-between w-full">
                <button className="rounded-2xl px-4 py-2 bg-red-400" style={{backgroundColor:'rgb(243, 113, 113)',}} onClick={() => {setIsPopUp(false)}}>закрыть</button>
                <Link href={'https://docs.google.com/forms/d/1qPsavZ_Tyg4o2FB5ld0hCmnSg37OjVJ80ivturyyy1c/edit'} className="rounded-2xl px-4 py-2" style={{backgroundColor:'rgb(74, 222, 128)'}}>Проити опрос</Link>
            </div>
        </div>
    )
}

export default Greating