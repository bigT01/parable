import {ReactNode, useEffect, useState} from "react";
import Link from "next/link";
import LoginComponent from "@/Components/login/LoginComponent";
import {UseAuth} from "@/Components/context/AuthContext";
import {Button} from "@mui/material";


type LayoutProps = {
    children: ReactNode
}

const Layout = ({children, ...rest}:LayoutProps) => {
    const { isAuth, Auth } = UseAuth()
    const [isRegister, setIsRegister] = useState(false)
    const [isClicked, setIsClicked] = useState(false)

    useEffect(() =>{
        if(isAuth){
            setIsClicked(false)
        }
    }, [isAuth])
    
    const handleLogout = () => {
        Auth(null)
    }

    return(
        <div className="flex justify-center items-start decoration-black min-h-screen max-w-7xl mx-auto w-full">
            <div {...rest} className="max-w-7xl mx-auto relative w-full box-border">
                <div className="max-w-7xl mx-auto relative w-full">
                    <div className="py-6 px-4 mb-16 w-full">
                        <nav>
                            <ul className="flex items-center">
                                <li className="mr-auto">
                                    <Link href='/' className="font-bold text-2xl">Parable</Link>
                                </li>
                                <li className="flex items-center mr-2.5">
                                    <button>
                                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.4951 2.71381C11.7017 2.29527 12.2985 2.29527 12.5051 2.71381L15.1791 8.13194C15.2611 8.29814 15.4196 8.41334 15.6031 8.43999L21.5823 9.30883C22.0442 9.37595 22.2286 9.94357 21.8944 10.2694L17.5678 14.4868C17.4351 14.6162 17.3745 14.8026 17.4058 14.9852L18.4272 20.9403C18.5061 21.4004 18.0233 21.7512 17.6101 21.534L12.2621 18.7224C12.0981 18.6361 11.9021 18.6361 11.738 18.7224L6.39002 21.534C5.97689 21.7512 5.49404 21.4004 5.57294 20.9403L6.59432 14.9852C6.62565 14.8026 6.56509 14.6162 6.43236 14.4868L2.10573 10.2694C1.7715 9.94357 1.95594 9.37595 2.41783 9.30883L8.39708 8.43999C8.5805 8.41334 8.73906 8.29814 8.82109 8.13194L11.4951 2.71381Z" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                </li>
                                {isAuth ? (
                                    <>
                                        <li className="flex items-center mr-2.5">
                                            <Button variant="contained" color="error" onClick={handleLogout}>
                                                Выйти
                                            </Button>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="flex items-center mr-2.5">
                                            <button className="rounded-2xl flex px-4 py-2 bg-blue-500 text-white cursor-pointer" onClick={() => {
                                                setIsRegister(true)
                                                setIsClicked(true)
                                            }}>
                                                <p className="text-base ">Регистрироваться</p>
                                            </button>
                                        </li>
                                        <li className="flex items-center">
                                            <button className="rounded-2xl flex px-4 py-2 bg-blue-100 text-black cursor-pointer" onClick={() => {
                                                setIsRegister(false)
                                                setIsClicked(true)
                                            }}>
                                                <p className="text-base">Войти</p>
                                            </button>
                                        </li>
                                    </>
                                )}

                            </ul>
                        </nav>
                    </div>
                </div>
                {isClicked && <LoginComponent isRegister={isRegister} setIsClicked={setIsClicked}/>}
                {children}

                {isAuth && (
                    <div className="bg-blue-500 fixed bottom-0  max-w-6xl w-full rounded-t-3xl box-border flex items-center" style={{height: 80, transform: "translate(-50%, 0)", left: '50%'}}>
                        <div className="mx-auto max-w-4xl w-full flex justify-between">
                            <Link href="/profile" className="box-border p-3 rounded-2xl bg-white">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.23773 19.5C4.56314 17.2892 7.46801 15.7762 12 15.7762C16.532 15.7762 19.4369 17.2892 20.7623 19.5M15.6 8.1C15.6 10.0882 13.9882 11.7 12 11.7C10.0118 11.7 8.40001 10.0882 8.40001 8.1C8.40001 6.11177 10.0118 4.5 12 4.5C13.9882 4.5 15.6 6.11177 15.6 8.1Z" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </Link>
                            <Link href="/search" className="box-border p-3 rounded-2xl bg-white">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.9268 17.0401L20.4 20.4001M19.28 11.4401C19.28 15.77 15.7699 19.2801 11.44 19.2801C7.11006 19.2801 3.59998 15.77 3.59998 11.4401C3.59998 7.11019 7.11006 3.6001 11.44 3.6001C15.7699 3.6001 19.28 7.11019 19.28 11.4401Z" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </Link>
                            <Link href="/add" className="box-border p-3 rounded-2xl bg-white">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 4.7998L12 19.1998M19.2 11.9998L4.79999 11.9998" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </Link>
                            <Link href="/popular" className="box-border p-3 rounded-2xl bg-white">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.40002 2.3999V21.5999H21.6M7.20002 14.4L11.4 10.2L14.4 13.2L19.8001 7.7999" stroke="black" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </Link>
                            <Link href="/popular" className="box-border p-3 rounded-2xl bg-white">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.60005 11.1876L11.4 12.9876L15.0001 9.38763M4.80005 5.78763L10.3901 2.99261C11.4036 2.48586 12.5965 2.48586 13.61 2.99261L19.2001 5.78763C19.2001 5.78763 19.2001 11.0436 19.2001 13.8156C19.2001 16.5876 16.6377 18.4588 12 21.3876C7.36245 18.4588 4.80005 15.9876 4.80005 13.8156V5.78763Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Layout