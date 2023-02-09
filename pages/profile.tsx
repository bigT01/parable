import Layout from "@/Components/Layout";
import Image from "next/image";
import axios from "axios";
import {useLocalStorage} from "@/Components/hooks/useLocalStorage";
import {useEffect, useState} from "react";
import Loading from "@/Components/Loading";
import UpdateProfile from "@/Components/update/UpdateProfile";
import {UseAuth} from "@/Components/context/AuthContext";
import Router from "next/router";

type AuthToken = {
    token ?: string
}

type data = {
    fullName: string,
    email: string,
    about: string,
    _id: string,
    like: number
}

interface post{
    author: string,
    body: string,
    tags: [string],
    user: any,
    _id: string,
}

const Profile = () => {
    const [authToken, setAuthToken] = useLocalStorage<AuthToken>("token", {token:''});
    const [data, setData] = useState<data>({} as data)
    const [posts, setPosts] = useState<any>([]  )
    const [showPage, setShowPage] = useState(false)
    const [update, setUpdate] = useState(false)
    const {Message} = UseAuth()
    console.log(data)
    console.log(posts)

    useEffect(() => {
        if(authToken.token){
            axios.get(`http://185.22.67.92:4444/auth/me`, {headers: {"Authorization": `Bearer ${authToken.token}`}})
                .then(res => {
                    setData(res?.data)
                    setShowPage(true)
                })
                .catch(err => console.log(err))
            axios.get(`$http://185.22.67.92:4444/posts`, {headers: {"Authorization": `Bearer ${authToken.token}`}})
                .then(res => {
                    setPosts(res?.data)
                })
                .catch(err => console.log(err))
        }
    }, [authToken])

    const handleLike = (id: string) =>{
        axios.get(`http://185.22.67.92:4444/postsl/${id}`, {headers: {"Authorization": `Bearer ${authToken.token}`}})
            .then(res => {
                Message(res.status)
            })
            .catch(err => console.log(err))
    }

    const handleDelete = (id: string) =>{
        axios.delete(`http://185.22.67.92:4444/posts/${id}`, {headers: {"Authorization": `Bearer ${authToken.token}`}})
            .then(res => {
                Message(res.status)
            })
            .catch(err => console.log(err))
    }

    const handleUpdate = (id:string) =>{
        Router.push('/update')
        // axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {headers: {"Authorization": `Bearer ${authToken.token}`}})
        //     .then(res => {
        //         Message(res.status)
        //     })
        //     .catch(err => console.log(err))
    }

    return showPage ? (
        <Layout>
            <div className="flex gap-16 items-start justify-between">
                <div className="p-5 bg-indigo-300 box-border rounded-2xl flex w-1/3 flex-col">
                    <div className="flex gap-10 items-center mb-5 ">
                        <div className="" style={{borderRadius: '50%', objectFit: 'cover'}}>
                            <Image src={'/Clipped.png'} alt={'img-avatar'}  width={100} height={100}/>
                        </div>
                        <div className="flex flex-col gap-2.5">
                            <div className="text-white">
                                <p className="text-lg font-bold">Имя: <span className="font-medium">{data?.fullName}</span></p>
                            </div>
                            <div className="text-white">
                                <p className="text-sm font-bold">email: <span className="font-medium">{data?.email}</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-bold text-2xl">Об о мне:</h3>
                        <button className="bg-white p-2 rounded-xl" onClick={() => setUpdate(true)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.8 19.5514H19.8M4.20007 19.5514L8.56606 18.6717C8.79784 18.625 9.01065 18.5109 9.17779 18.3437L18.9515 8.56461C19.4201 8.09576 19.4197 7.33577 18.9508 6.86731L16.8803 4.79923C16.4115 4.33097 15.6519 4.33129 15.1835 4.79995L5.40884 14.58C5.24202 14.7469 5.12812 14.9593 5.08138 15.1906L4.20007 19.5514Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                    {update && <UpdateProfile setUpdate={setUpdate} about={data.about} id={data._id}/>}

                    <p className="text-base text-white">{data?.about}</p>
                </div>

                <div className="flex flex-col gap-4 w-1/2" style={{marginBottom:100}}>
                    {posts.filter((element:post) => element.user._id === data._id).map((filtered:any) => (
                        <div className="flex p-4 bg-gray-400 rounded-2xl box-border flex-col" key={filtered._id}>
                            <div className="flex w-full items-center mb-5 gap-5">
                                <h3 className="text-white text-2xl font-bold mr-auto max-w-2xl">{filtered.author}</h3>
                                <div className="flex gap-2.5 ">
                                    <button className="p-2 bg-white rounded-xl box-border"onClick={() => handleUpdate(filtered._id)} >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.8 19.5514H19.8M4.20007 19.5514L8.56606 18.6717C8.79784 18.625 9.01065 18.5109 9.17779 18.3437L18.9515 8.56461C19.4201 8.09576 19.4197 7.33577 18.9508 6.86731L16.8803 4.79923C16.4115 4.33097 15.6519 4.33129 15.1835 4.79995L5.40884 14.58C5.24202 14.7469 5.12812 14.9593 5.08138 15.1906L4.20007 19.5514Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                    <button className="p-2 bg-red-500 rounded-xl box-border" onClick={() => handleDelete(filtered._id)}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18 6L6 18M18 18L6 6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-end justify-between gap-5">
                                <p className="font-medium text-base text-white">{filtered.body}</p>
                                <button className="p-2 bg-yellow-400 rounded-xl box-border flex cursor-pointer" onClick={() => handleLike(filtered._id)}>
                                    <span className="mr-1.5 text-white">{filtered.like}</span>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.4951 2.71381C11.7017 2.29527 12.2985 2.29527 12.5051 2.71381L15.1791 8.13194C15.2611 8.29814 15.4196 8.41334 15.6031 8.43999L21.5823 9.30883C22.0442 9.37595 22.2286 9.94357 21.8944 10.2694L17.5678 14.4868C17.4351 14.6162 17.3745 14.8026 17.4058 14.9852L18.4272 20.9403C18.5061 21.4004 18.0233 21.7512 17.6101 21.534L12.2621 18.7224C12.0981 18.6361 11.9021 18.6361 11.738 18.7224L6.39002 21.534C5.97689 21.7512 5.49404 21.4004 5.57294 20.9403L6.59432 14.9852C6.62565 14.8026 6.56509 14.6162 6.43236 14.4868L2.10573 10.2694C1.7715 9.94357 1.95594 9.37595 2.41783 9.30883L8.39708 8.43999C8.5805 8.41334 8.73906 8.29814 8.82109 8.13194L11.4951 2.71381Z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </Layout>
    ) : <Loading/>
}





export default Profile