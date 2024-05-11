"use client"

import React,{ useRef,useEffect,useState } from 'react';
import {gsap} from 'gsap';

function ResumePage() {

    const gradientRef = useRef(null);

    useEffect(() => {
        gsap.to(gradientRef.current, {
            backgroundPosition: '-200% 0',
            repeat: -1,
            duration: 10,
          });
    }, []);

  return (
    <div
      ref={gradientRef}
      style={{
        backgroundImage: 'linear-gradient(to right, #00032a, #00043f, #00032a)',
        backgroundSize: '200% 100%',
        width: '100vw',
      }}
      className="flex font-neo flex-col min-h-[100vh] items-center"
    >

    </div>
  );
}

export { ResumePage };