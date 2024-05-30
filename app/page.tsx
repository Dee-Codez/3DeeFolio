"use client"

import {useState, useEffect,Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingTyper } from '@/components/LoadingTyper';

export default function Home() {
  const router = useRouter();
   const [dark, setDark] = useState(true);

  useEffect(() => {
    router.prefetch('/home');

    const res = localStorage.getItem('theme');
    setDark(res === 'dark');

    const timer = setTimeout(() => {
      sessionStorage.setItem('isNavigated', 'true');
      router.push('/home');
    }, 2000); // navigate after 5 seconds

    return () => clearTimeout(timer); // cleanup timer if component unmounts
  }, [router]);

  return (
    <div className={`w-[100vw] h-[100vh] ${dark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="flex justify-center items-center h-full">
        <div className="text-center">
          <Suspense fallback={<h1 className="text-5xl font-bold ">Loading...</h1>}>
            <LoadingTyper/>
          </Suspense>
        </div>
      </div>
    </div>
  );
}