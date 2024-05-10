'use client'

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useSpring, animated } from 'react-spring';
import { FaAngleDoubleDown } from "react-icons/fa";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Link from 'next/link';
import { Name } from '@/components/Name';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function LandingPage() {

    const gradientRef = useRef(null);
    const fadeInRef = useRef(null);
    const divRef = useRef(null);
    const doubleDownRef = useRef(null);
    const containerRef = useRef(null); // Ref for the container you want to scroll to

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
        
        if (window.innerWidth > 1280) {
          gsap.fromTo("#overlay", {
              scale: 0,
              transformOrigin: "bottom center"
            }, {
              scale: 1,
              scrollTrigger: {
                trigger: "body",
                start: "top+=200 top",
                end: "+=600",
                scrub: true
              }
            });
        }
          gsap.fromTo("#down", {
            bottom: "40px"
          }, {
            bottom: "0px",
            scrollTrigger: {
              trigger: "body",
              start: "top top",
              end: "top+=200 top",
              scrub: true
            }
          });

          if (window.innerWidth > 768 && containerRef.current!=null) { // Only enable the scroll animation if the width of the viewport is greater than 768 pixels
            gsap.to(window, {
              scrollTrigger: {
                trigger: "#scrollTrig", // ID of the container that triggers the scroll
                start: "top top",
                end: "bottom top",
                onEnter: () => gsap.to(window, { scrollTo: containerRef.current, duration: 1 }), // Scroll to the desired container
                scrub: true
              }
            });
          }
          

      }, []);

  return (
    <div ref={gradientRef} style={{ backgroundImage: "linear-gradient(to right, #00032a, #00043f, #00032a)", backgroundSize: '200% 100%', width: '100vw' }} className="flex flex-col min-h-[100vh] items-center justify-center">
      <animated.div  ref={divRef} className="p-10  my-20 w-[90vw] text-center lg:text-left lg:w-[60vw] rounded-2xl font-neo bg-white/5 shadow-xl" style={{ boxShadow: '2px 2px 20px 1px rgba(0, 0, 0, 0.3)', backdropFilter: 'blur(50px)', transform: xy.interpolate((x, y) => `translate3d(${x}px, ${y}px, 0)`) }}>
        <div ref={fadeInRef} id='fadeIn' className="opacity-0 flex flex-col gap-10">
          <p className="text-7xl font-neo ">Hello There</p>
          <div  className="flex flex-col xl:flex-row items-center gap-1">
            <Name/>
            <p id='scrollTrig' className="text-5xl">This Side</p>
          </div>
          <p className="mt-10 text-3xl font-neo">Your go-to guy for all WebDev, Backend, ML, Ops Needs</p>
          <p className="text-3xl font-neo">I am natively from Varanasi, Uttar Pradesh and currently a Pre-Final Year Undergrad at SRMIST, Chennai.</p>
          <p className="text-3xl font-neo">PS: Actively looking out for experience so do <span className='underline'><Link href={"https://mail.google.com/mail/?view=cm&fs=1&to=debampati44@gmail.com"} target='_blank'>contact</Link></span>  me if deemed worthy :).</p>
        </div>
      </animated.div>
        <div ref={doubleDownRef} id='down' className='xl:absolute  xl:bottom-10 font-neo animate-bounce'>
            <div className='flex flex-col items-center gap-2'>
                <p className='text-lg'>Scroll For More</p>
                <FaAngleDoubleDown size={23} />
            </div>
        </div>
        <div className="absolute inset-0 rounded-t-full bg-black/20  backdrop-blur-2xl transform scale-y-0" id="overlay"></div>
        <div ref={containerRef} className='xl:absolute z-30 xl:bottom-0'>{/* Bottom Endpoint For GSAP Scroll */}</div>
    </div>
  );
}

export { LandingPage };