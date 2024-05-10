"use client"

import { useRef,useEffect } from 'react';
import {gsap} from 'gsap';

function ProjectPage() {
    
    const gradientRef = useRef(null);

    useEffect(() => {
        gsap.to(gradientRef.current, {
            backgroundPosition: '200% 0',
            repeat: -1,
            duration: 10,
          });

    }, [])
    
  return (
    <div ref={gradientRef} style={{ backgroundImage: "linear-gradient(to right, #00032a, #00043f, #00032a)", backgroundSize: '200% 100%', width: '100vw'}} className="flex font-neo flex-col min-h-[100vh] items-center">
        <div>
            <div className='mt-20'>
                <div className='flex flex-col justify-center items-center gap-10'>
                    <h1 className='text-7xl'>Projects</h1>
                    <p className='text-3xl text-center'>Here are some of my projects in a timeline format</p>
                </div>
            </div>
        </div>
    </div>
  );
}

export { ProjectPage };