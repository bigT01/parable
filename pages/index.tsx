import Head from 'next/head'
import Greating from "@/Components/greating/Greating";
import {useEffect, useState} from "react";
import Loading from "@/Components/Loading";
import Image from "next/image";
import Link from "next/link";


export default function Home({posts}:any) {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isSearch, setIsSearch] = useState(false)
    const [randomPost, setRandomPost] = useState<number>(0)
    const [politics, setPolitics] = useState<number>(0)
    const [writers, setWriters] = useState<number>(0)
    const [businessman, setBusinessman] = useState<number>(0)
    const [isPoliticsAdded, setIsPoliticsAdded] = useState(false)
    const [reversedPosts, setReversedPosts] = useState([])
    const [isPopUp, setIsPopUp] = useState(false)



    useEffect(() => {
        if(posts){
            setRandomPost(Math.floor((Math.random() * posts.length) ))
            if(!isPoliticsAdded){
                posts.filter((element: any) => element.type.filter((subType: any) => subType === 'политик'? setPolitics(oldState => oldState+1): null) )
                posts.filter((element: any) => element.type.filter((subType: any) => subType === 'писатель'? setWriters(oldState => oldState+1): null) )
                posts.filter((element: any) => element.type.filter((subType: any) => subType === 'бизнесмен'? setBusinessman(oldState => oldState+1): null) )
                setIsPoliticsAdded(true)
                // setPolitics(oldState => Math.floor(oldState / 2))
                // for(let i = (posts.length-1); i <= (posts.length-4); i--f){
                //     reversedPosts.push(posts[i])
                // }
            }
        }
    }, [posts])

    useEffect(() => {
        setTimeout(() =>{
            setIsLoading(false)
        }, 3000)
        // setTimeout(() =>{
        //     setIsPopUp(false)
        // }, 8000)
    }, [])

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className="flex justify-center items-start decoration-black min-h-screen max-w-7xl mx-auto">
                {isLoading ? <Loading/> : (
                    <>
                        {isPopUp && <Greating/>}
                        <div className="flex flex-col w-full ">
                            <div className="py-6 px-4 mb-16 w-full">
                                <nav>
                                    <ul className="flex items-center">
                                        <li className="mr-auto">
                                            <h3 className="font-bold text-2xl">Parable</h3>
                                        </li>
                                        <li className="flex items-center mr-2.5">
                                            <div className={`searching flex items-center gap-1 h-full ${isSearch? "active-search" : null}`}>
                                                <button onClick={() => setIsSearch(oldState => !oldState)} className="w-fit cursor-pointer">
                                                    {!isSearch ? (
                                                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M16.9268 17.0401L20.4 20.4001M19.28 11.4401C19.28 15.77 15.7699 19.2801 11.44 19.2801C7.11006 19.2801 3.59998 15.77 3.59998 11.4401C3.59998 7.11019 7.11006 3.6001 11.44 3.6001C15.7699 3.6001 19.28 7.11019 19.28 11.4401Z"
                                                                    stroke="black" strokeWidth="2" stroke-linecap="round"/>
                                                            </svg>):
                                                        (
                                                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M18 6L6 18M18 18L6 6" stroke="black" strokeWidth="2" stroke-linecap="round"/>
                                                            </svg>
                                                        )
                                                    }
                                                </button>
                                                <input type="text" className={`search_input ${isSearch? "active-search" : null}`}/>
                                            </div>
                                        </li>
                                        <li className="flex items-center">
                                            <button>
                                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11.4951 2.71381C11.7017 2.29527 12.2985 2.29527 12.5051 2.71381L15.1791 8.13194C15.2611 8.29814 15.4196 8.41334 15.6031 8.43999L21.5823 9.30883C22.0442 9.37595 22.2286 9.94357 21.8944 10.2694L17.5678 14.4868C17.4351 14.6162 17.3745 14.8026 17.4058 14.9852L18.4272 20.9403C18.5061 21.4004 18.0233 21.7512 17.6101 21.534L12.2621 18.7224C12.0981 18.6361 11.9021 18.6361 11.738 18.7224L6.39002 21.534C5.97689 21.7512 5.49404 21.4004 5.57294 20.9403L6.59432 14.9852C6.62565 14.8026 6.56509 14.6162 6.43236 14.4868L2.10573 10.2694C1.7715 9.94357 1.95594 9.37595 2.41783 9.30883L8.39708 8.43999C8.5805 8.41334 8.73906 8.29814 8.82109 8.13194L11.4951 2.71381Z" stroke="black" strokeWidth="2" stroke-linejoin="round"/>
                                                </svg>
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <h1 className="font-bold text-3xl mb-5">Притча на день 👋</h1>
                            <div className="w-full p-6 flex gap-16 items-center bg-indigo-100 rounded-2xl mb-24">
                                <div className="flex-col flex justify-between h-full w-1/2">
                                    <q className="text-neutral-600 mb-10 text-xl"> {posts[randomPost]?.body} </q>
                                    <h3 className="font-bold text-2xl">{posts[randomPost]?.author}</h3>
                                </div>
                                <div className="flex justify-end w-1/2">
                                    <Image  src={posts[randomPost]?.img} alt={`img-${posts[randomPost]?.img}`} width={500} height={500}/>
                                </div>
                            </div>
                            <div className="flex w-full justify-between items-center mb-5">
                                <h1 className="font-bold text-3xl ">Каталоги</h1>
                                <Link href='/catalogs'>
                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12.4754 6.11708C12.1218 5.6928 11.4913 5.63548 11.067 5.98904C10.6427 6.3426 10.5854 6.97317 10.9389 7.39745L12.4754 6.11708ZM15.2427 10.9999L16.0109 11.6401C16.32 11.2693 16.32 10.7306 16.0109 10.3597L15.2427 10.9999ZM10.9389 14.6024C10.5854 15.0267 10.6427 15.6573 11.067 16.0108C11.4913 16.3644 12.1218 16.3071 12.4754 15.8828L10.9389 14.6024ZM6.75739 9.99993C6.2051 9.99993 5.75739 10.4476 5.75739 10.9999C5.75739 11.5522 6.2051 11.9999 6.75738 11.9999L6.75739 9.99993ZM10.9389 7.39745L14.4745 11.6401L16.0109 10.3597L12.4754 6.11708L10.9389 7.39745ZM14.4745 10.3597L10.9389 14.6024L12.4754 15.8828L16.0109 11.6401L14.4745 10.3597ZM15.2427 9.99993L6.75739 9.99993L6.75738 11.9999L15.2427 11.9999L15.2427 9.99993ZM17.0811 4.91878C20.4396 8.27729 20.4396 13.7225 17.0811 17.081L18.4954 18.4952C22.6349 14.3557 22.6349 7.64413 18.4954 3.50457L17.0811 4.91878ZM17.0811 17.081C13.7226 20.4395 8.27741 20.4395 4.91891 17.081L3.50469 18.4952C7.64425 22.6348 14.3558 22.6348 18.4954 18.4952L17.0811 17.081ZM4.91891 17.081C1.5604 13.7225 1.5604 8.27729 4.91891 4.91878L3.50469 3.50457C-0.634865 7.64413 -0.634865 14.3557 3.50469 18.4952L4.91891 17.081ZM4.91891 4.91878C8.27741 1.56028 13.7226 1.56028 17.0811 4.91878L18.4954 3.50457C14.3558 -0.634987 7.64425 -0.634987 3.50469 3.50457L4.91891 4.91878Z"
                                            fill="black"/>
                                    </svg>
                                </Link>
                            </div>
                            <div className="flex gap-5 mb-24">
                                <div className="flex p-6 gap-16 items-center bg-indigo-100 w-1/3 rounded-2xl">
                                    <div className="flex flex-col gap-5 w-1/2">
                                        <h3 className="font-bold text-lg">Притча от политиков</h3>
                                        <p className="text-neutral-600 text-xl">{politics} притчь</p>
                                    </div>
                                    <Image src="/assets/piano.svg" alt="icon-piano" width={220} height={220}/>
                                </div>
                                <div className="flex p-6 gap-16 items-center bg-indigo-100 w-1/3 rounded-2xl">
                                    <div className="flex flex-col gap-5 w-1/2">
                                        <h3 className="font-bold text-lg">Притча от бизнесменов</h3>
                                        <p className="text-neutral-600 text-xl">{businessman} притчь</p>
                                    </div>
                                    <Image src="/assets/plan.svg" alt="icon-plan" width={220} height={220}/>
                                </div>
                                <div className="flex p-6 gap-16 items-center bg-indigo-100 w-1/3 rounded-2xl">
                                    <div className="flex flex-col gap-5 w-1/2">
                                        <h3 className="font-bold text-lg">Притча от писателей</h3>
                                        <p className="text-neutral-600 text-xl">{writers} притчь</p>
                                    </div>
                                    <Image src="/assets/search.svg" alt="icon-piano" width={220} height={220}/>
                                </div>
                            </div>
                            <div className="flex w-full justify-between items-center mb-5">
                                <h1 className="font-bold text-3xl ">Недавно добавленные</h1>
                                <Link href='/all'>
                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12.4754 6.11708C12.1218 5.6928 11.4913 5.63548 11.067 5.98904C10.6427 6.3426 10.5854 6.97317 10.9389 7.39745L12.4754 6.11708ZM15.2427 10.9999L16.0109 11.6401C16.32 11.2693 16.32 10.7306 16.0109 10.3597L15.2427 10.9999ZM10.9389 14.6024C10.5854 15.0267 10.6427 15.6573 11.067 16.0108C11.4913 16.3644 12.1218 16.3071 12.4754 15.8828L10.9389 14.6024ZM6.75739 9.99993C6.2051 9.99993 5.75739 10.4476 5.75739 10.9999C5.75739 11.5522 6.2051 11.9999 6.75738 11.9999L6.75739 9.99993ZM10.9389 7.39745L14.4745 11.6401L16.0109 10.3597L12.4754 6.11708L10.9389 7.39745ZM14.4745 10.3597L10.9389 14.6024L12.4754 15.8828L16.0109 11.6401L14.4745 10.3597ZM15.2427 9.99993L6.75739 9.99993L6.75738 11.9999L15.2427 11.9999L15.2427 9.99993ZM17.0811 4.91878C20.4396 8.27729 20.4396 13.7225 17.0811 17.081L18.4954 18.4952C22.6349 14.3557 22.6349 7.64413 18.4954 3.50457L17.0811 4.91878ZM17.0811 17.081C13.7226 20.4395 8.27741 20.4395 4.91891 17.081L3.50469 18.4952C7.64425 22.6348 14.3558 22.6348 18.4954 18.4952L17.0811 17.081ZM4.91891 17.081C1.5604 13.7225 1.5604 8.27729 4.91891 4.91878L3.50469 3.50457C-0.634865 7.64413 -0.634865 14.3557 3.50469 18.4952L4.91891 17.081ZM4.91891 4.91878C8.27741 1.56028 13.7226 1.56028 17.0811 4.91878L18.4954 3.50457C14.3558 -0.634987 7.64425 -0.634987 3.50469 3.50457L4.91891 4.91878Z"
                                            fill="black"/>
                                    </svg>
                                </Link>
                            </div>
                            {/*<div className="flex gap-5 mb-24 flex-wrap justify-between max-w-6xl mx-auto">*/}
                            {/*    {reversedPosts?.map((element: any, key) => (<div key={key} className="flex p-6 gap-16 items-center bg-indigo-100 w-1/3  rounded-2xl basis-1/3">*/}
                            {/*        <div className="flex flex-col gap-5 w-1/2">*/}
                            {/*            <h3 className="font-bold text-lg">{element.author}</h3>*/}
                            {/*        </div>*/}
                            {/*        <Image src={element?.img} alt={`icon-${element?.img}`} width={200} height={200}/>*/}
                            {/*    </div>))}*/}


                            {/*</div>*/}
                        </div>
                    </>
                )}
            </div>
        </>
    )


}

export async function getServerSideProps(){
    try {
        const res = await fetch(`http://localhost:3000/data.json`);
        const data = await res.json();

        return {
            props: {
                posts: data.posts
            }
        };
    } catch (error) {
        console.error(error);
        return {
            props: {}
        };
    }
}
