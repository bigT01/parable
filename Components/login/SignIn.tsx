import {SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {UseAuth} from "@/Components/context/AuthContext";

type Inputs = {
    email: string,
    password: string,
};

const SignIn =() =>{
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const { Message, Auth } = UseAuth()
    const onSubmit: SubmitHandler<Inputs> = async data => {
        axios.post(`http://185.22.67.92:4444/auth/login`, data)
            .then((res) =>{
                Message(res.status)
                Auth(res.data.token)
            })
            .catch(err => Message(err.code))
    };


    
    return(
        <form className="flex flex-col mx-4 mb-3" onSubmit={handleSubmit(onSubmit)}>
            <>
                <label className="text-white font-bold text-lg mb-2.5">Email</label>
                <input className="text-black bg-white rounded-2xl px-4 py-2 font-bold text-lg mb-2.5" type="email" {...register("email", { required: true })} required={true}/>
                <label className="text-white font-bold text-lg mb-2.5">password</label>
                <input className="text-black bg-white rounded-2xl px-4 py-2 font-bold text-lg mb-5"  type="password" {...register("password", { required: true })} required={true}/>
                {errors.email || errors.password && <span>Обе поля должны заполнены</span>}
                <button type="submit" className="px-4 py-2 rounded-2xl bg-green-400 text-white font-bold text-xl flex items-center justify-center"> Отправить</button>
            </>
        </form>
    )
}

export default SignIn