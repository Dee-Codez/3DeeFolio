"use client"

import { useRef,useEffect,useState } from 'react';
import {gsap} from 'gsap';

function ProjectPage() {
    
    const gradientRef = useRef(null);
    const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
        if (gradientRef.current) {
          const componentTop = gradientRef.current.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          const offset = windowHeight * 0.25; // adjust this value to change the position of the line
          const newLineHeight = Math.max(0, windowHeight / 2 - componentTop - offset);
          setLineHeight(newLineHeight);
        }
      };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


    useEffect(() => {
        gsap.to(gradientRef.current, {
            backgroundPosition: '200% 0',
            repeat: -1,
            duration: 10,
          });

    }, [])
    
  return (
    <div
      ref={gradientRef}
      style={{
        backgroundImage: 'linear-gradient(to right, #00032a, #00043f, #00032a)',
        backgroundSize: '200% 100%',
        width: '100vw',
      }}
      className="flex font-neo flex-col min-h-[500vh] items-center"
    >
      <div>
        <div className="mt-20">
          <div className="flex flex-col justify-center items-center gap-10">
            <h1 className="text-7xl">Projects</h1>
            <p className="text-3xl text-center">
              Here are some of my projects in a timeline format
            </p>
            <div className='mt-20'>
                <div className='flex flex-col gap-80'>
                    <div className="relative">
                        <div className="w-12 h-12 border-2 border-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        <div className="w-8 h-8 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        <div style={{ height: `${lineHeight}px` }} className="absolute w-0.5 bg-white top-1/2 left-1/2 transform -translate-x-1/2"></div>
                    </div>
                    <div className="relative">
                        <div className="w-12 h-12 border-2 border-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />

                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ProjectPage };