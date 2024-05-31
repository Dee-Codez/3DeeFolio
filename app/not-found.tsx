"use client"

import {useState, useRef,useEffect,useLayoutEffect,Suspense} from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";

export default function NotFound() {

    const router = useRouter();

    const [darkMode,setDarkMode] = useState(true);

    const ref = useRef(null);

    const handleBack = () => {
        router.push("/");
    }

    useLayoutEffect(() => {

        const theme = localStorage.getItem('theme');
        setDarkMode(theme === 'dark');

        if ('current' in ref && ref.current) {
            gsap.to(ref.current, {
              backgroundPosition: '200% 0',
              repeat: -1,
              duration: 10,
            });
          }


    },[]);

    return (
        <div ref={ref} style={{  backgroundSize: '200% 100%' }} className={`flex w-full bg-cover bg-gradient-to-r ${darkMode ? 'from-[#00032a] via-[#00043f] to-[#00032a]' : 'from-slate-200 via-slate-400 to-slate-200'} relative flex-col min-h-[100vh] items-center justify-center`}>
            <div className={`${darkMode ? 'text-white' : 'text-black'} font-neo`}>
                <div className="text-center">
                    <p className="text-4xl">This Is Not A Valid Route</p>
                    <p className="mt-5 text-3xl">Please Go Back</p>
                    <div onClick={handleBack} className="mt-20 mx-5 cursor-pointer text-xl p-5 rounded-xl bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 hover:scale-105 transition flex items-center justify-center gap-5">
                       <IoMdArrowBack/> Return
                    </div>
                </div>
            </div>
        </div>  
    );
}