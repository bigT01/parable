import Layout from "@/Components/Layout";
import {SubmitHandler, useForm} from "react-hook-form";
import {UseAuth} from "@/Components/context/AuthContext";
import axios from "axios";
import {useLocalStorage} from "@/Components/hooks/useLocalStorage";

type Inputs = {
    author: string,
    body: string
    tags: string,
};
type AuthToken = {
    token ?: string
}


const Add = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const [authToken, setAuthToken] = useLocalStorage<AuthToken>("token", {token:''});
    const { Message, Auth } = UseAuth()

    const onSubmit: SubmitHandler<Inputs> = data => {
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/posts`, data, {
            headers: {"Authorization": `Bearer ${authToken.token}`}
        })
            .then((res) =>{
                Message(res.status)
                Auth(res.data.token)
            })
            .catch(err => Message(err.code))
    };

    return(
        <Layout>
            <div className="w-full bg-indigo-400 p-5 rounded-2xl">
                <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                    <label className="text-white font-bold text-lg mb-2.5" >Автор</label>
                    <input className="text-black bg-white rounded-2xl px-4 py-2 font-bold text-lg mb-2.5" type="text" {...register("author", { required: true }) } required={true}/>
                    <label className="text-white font-bold text-lg mb-2.5" >афоризм</label>
                    <input className="text-black bg-white rounded-2xl px-4 py-2 font-bold text-lg mb-2.5 " type="text"{...register("body", { required: true }) } required={true}/>
                    <label className="text-white font-bold text-lg mb-2.5">тип</label>
                    <input className="text-black bg-white rounded-2xl px-4 py-2 font-bold text-lg mb-10" type="text" {...register("tags", { required: true }) } required={true}/>
                    <button type="submit" className="px-4 py-2 bg-green-400 rounded-2xl w-1/2 mx-auto">За постить</button>
                </form>
            </div>
        </Layout>
    )
}

export default Add