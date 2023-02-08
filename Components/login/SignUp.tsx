import {SubmitHandler, useForm} from "react-hook-form";

type Inputs = {
    email: string,
    name: string
    password: string,
};

const SignUp =() =>{
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

    return(
        <form className="flex flex-col mx-4 mb-3" onSubmit={handleSubmit(onSubmit)}>
            <>
                {errors.email || errors.password || errors.name && <span className="w-full flex justify-center mb-2.5 text-red-500">Обе поля должны заполнены</span>}
                <label className="text-white font-bold text-lg mb-2.5">Email</label>
                <input className="text-black bg-white rounded-2xl px-4 py-2 font-bold text-lg mb-2.5" type="email" {...register("email", { required: true }) } required={true}/>
                <label className="text-white font-bold text-lg mb-2.5">Имя</label>
                <input className="text-black bg-white rounded-2xl px-4 py-2 font-bold text-lg mb-2.5" type="text" {...register("name", { required: true }) } required={true}/>
                <label className="text-white font-bold text-lg mb-2.5">Пароль</label>
                <input className="text-black bg-white rounded-2xl px-4 py-2 font-bold text-lg mb-5"  type="password" {...register("password", { required: true })} required={true}/>
                <button type="submit" className="px-4 py-2 rounded-2xl bg-green-400 text-white font-bold text-xl flex items-center justify-center"> Отправить</button>
            </>
        </form>
    )
}

export default SignUp