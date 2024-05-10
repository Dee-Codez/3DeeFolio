'use client'

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useSpring, animated } from 'react-spring';
import { FaAngleDoubleDown } from "react-icons/fa";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Name } from '@/components/Name';

gsap.registerPlugin(ScrollTrigger);

function LandingPage() {

    const gradientRef = useRef(null);
    const fadeInRef = useRef(null);
    const divRef = useRef(null);

  const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }));

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;

      const xPos = (clientX - innerWidth / 2) / 15; // adjust the divisor to control the amount of movement
      const yPos = (clientY - innerHeight / 2) / 15; // adjust the divisor to control the amount of movement

      set({ xy: [xPos, yPos] });
    };

    const resetAnimation = () => {
      set({ xy: [0, 0] });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', resetAnimation);
    window.addEventListener('blur', resetAnimation);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', resetAnimation);
      window.removeEventListener('blur', resetAnimation);
    };
  }, [set]);

    useEffect(() => {
        gsap.to(gradientRef.current, {
          backgroundPosition: '200% 0',
          repeat: -1,
          duration: 10,
        });
    
        gsap.fromTo(fadeInRef.current, {
            opacity: 0,
          }, {
            opacity: 1,
            duration: 1,
          });

        const children = gsap.utils.toArray('#fadeIn > *');
        const evenChildren = children.filter((_, i) => i % 2 === 0);
        const oddChildren = children.filter((_, i) => i % 2 !== 0);

        gsap.fromTo(evenChildren, {
            x: '-30%',
        }, {
            x: '0%',
            duration: 1,
            delay: 0,
        });
        
        gsap.fromTo(oddChildren, {
            x: '30%',
        }, {
            x: '0%',
            duration: 1,
            delay: 0,
        });

        gsap.fromTo("#overlay", {
            height: "0",
          }, {
            height: "50vh",
            scrollTrigger: {
              trigger: "body",
              start: "top top",
              end: "bottom bottom",
              scrub: true
            }
          });
      }, []);

  return (
    <div ref={gradientRef} style={{ backgroundImage: "linear-gradient(to right, #00032a, #00043f, #00032a)", backgroundSize: '200% 100%', width: '100vw', height: '100vh' }} className="flex flex-col items-center justify-center">
      <animated.div  ref={divRef} className="p-10 w-[60vw] rounded-2xl font-neo bg-white/5 shadow-xl" style={{ boxShadow: '2px 2px 20px 1px rgba(0, 0, 0, 0.3)', backdropFilter: 'blur(50px)', transform: xy.interpolate((x, y) => `translate3d(${x}px, ${y}px, 0)`) }}>
        <div ref={fadeInRef} id='fadeIn' className="opacity-0 flex flex-col gap-10">
          <p className="text-7xl font-neo">Hello There</p>
          <div className="flex items-center gap-5">
            <Name/>
            <p className="text-5xl">This Side</p>
          </div>
          <p className="text-3xl font-neo">Your go-to guy for all WebDev, ML, Ops Needs</p>
          <p className="text-3xl font-neo">I am natively from Varanasi, Uttar Pradesh and currently a Sophomore At SRMIST, Chennai.</p>
        </div>
      </animated.div>
        <div className='absolute bottom-10 font-neo animate-bounce'>
            <div className='flex flex-col items-center gap-2'>
                <p className='text-lg'>Scroll For More</p>
                <FaAngleDoubleDown size={23} />
            </div>
        </div>
        <div className="absolute bottom-0 left-1/2 transform translate-x-[-50%] w-full h-0 bg-black/30 rounded-full" id="overlay"></div>
    </div>
  );
}

export { LandingPage };