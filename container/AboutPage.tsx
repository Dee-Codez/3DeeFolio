"use client"

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


function AboutPage() {
  const bgGradient = "linear-gradient(to bottom, #00032a, black)";
  const headingRef = useRef(null);
  
  return (
    <div style={{ backgroundImage: bgGradient, width: '100vw', height: '100vh' }}>
      <div>
        <div className="flex flex-col">
          <div ref={headingRef} className='text-7xl border  ml-6'>
            About Me
          </div>
        </div>
      </div>
    </div>
  );
}

export { AboutPage };