import Layout from "@/Components/Layout";
import Image from "next/image";
import {useState} from "react";

const Politics = ({posts}: any) =>{
    let [data, setData] = useState([])


    return(
        <Layout>
            <div className="flex justify-center items-start decoration-black min-h-screen max-w-7xl mx-auto">
                <>
                    <div className="flex flex-col w-full ">
                        <h1 className="font-bold text-3xl mb-12">Все афоризмы от политиков</h1>

                        <div className="grid gap-4 grid-cols-3 ">
                            {data.map((element: any) => (
                                <div className="flex flex-col items-center p-6 gap-16 items-center bg-indigo-100 w-full rounded-2xl hover-ani"
                                     key={element.id}>
                                    <Image src={element.img} alt="icon-plan" width={220} height={220}/>
                                    <div className="flex flex-col gap-5 w-full">
                                        <p className="text-neutral-600 text-x">{element.body}</p>
                                        <h3 className="font-bold text-lg">{element.author}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </>
            </div>
        </Layout>
    )
}



export default Politics


export async function getServerSideProps() {
    try {
        const res = await fetch(`https://parable.vercel.app/data.json`);
        const data = await res.json();

        return {
            props: {
                posts: data.posts
            }
        };
    } catch (error) {
        // console.error(error);
        return {
            props: {}
        };
    }
}
