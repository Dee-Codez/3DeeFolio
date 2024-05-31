'use client'

import { useEffect, useRef, forwardRef,useLayoutEffect,Suspense } from 'react';
import { gsap } from 'gsap';
import { useSpring, animated } from 'react-spring';
import { FaAngleDoubleDown } from "react-icons/fa";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Link from 'next/link';
import { Name } from '@/components/Name';
import Image from 'next/image';
import { PhotoSphere } from '@/components/PhotoSphere';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
type LandingPageProps = {
  darkMode: boolean;
};
const LandingPage = forwardRef(({ darkMode }: LandingPageProps, ref: React.Ref<HTMLDivElement>) => {

  const scrollTrigger = useRef(null);

    const fadeInRef = useRef(null);
    const divRef = useRef(null);
    const doubleDownRef = useRef(null);
    const containerRef = useRef(null); // Ref for the container you want to scroll to
    const btm1Ref = useRef();

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

  useLayoutEffect(() => {
    if ('current' in ref && ref.current) {
      gsap.to(ref.current, {
        backgroundPosition: '200% 0',
        repeat: -1,
        duration: 10,
      });
    }

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

          if (window.innerWidth > 1280 && 'current' in ref && ref.current ) {
            gsap.to(window, {
              scrollTrigger: {
                trigger: ref.current, // ID of the container that triggers the scroll
                start: "bottom bottom-=200",
                end: "bottom top",
                onEnter: () =>{gsap.to(window, { scrollTo: containerRef.current, duration: 1})},
                // onLeaveBack: () =>{gsap.to(window, { scrollTo: ref.current, duration: 1})},
                scrub: true
              }
            });
          }
      }, []);

  return (
    <div ref={ref} style={{  backgroundSize: '200% 100%' }} className="flex w-full bg-cover bg-gradient-to-r dark:from-[#00032a] from-slate-200 dark:via-[#00043f] via-slate-400 dark:to-[#00032a] to-slate-200 relative flex-col min-h-[100vh] items-center justify-center">
      <animated.div  
        ref={divRef} 
        className="p-10  my-20 w-[90vw] text-center lg:text-left lg:w-[60vw] rounded-2xl font-neo bg-black/5 dark:bg-white/5 shadow-xl relative" 
        style={{ 
          boxShadow: '2px 2px 20px 1px rgba(0, 0, 0, 0.3)', 
          backdropFilter: 'blur(50px)', 
          transform: typeof window !== 'undefined' && window.innerWidth > 1280 ? xy.interpolate((x, y) => `translate3d(${x}px, ${y}px, 0)`) : 'none' 
        }}
      >
        <div className='absolute right-5 top-5 z-30 '>
        {typeof window !== 'undefined' && window.innerWidth > 1280 && (
          <Suspense fallback={<div>Loading...</div>}>
            <PhotoSphere/>
          </Suspense>
        )}
          {/* <div className='absolute -bottom-5 -left-40 z-30 '>
            {darkMode ? <Image src="/drag.png" width={300} height={300} alt="3D" className='animate-pulse' /> : 
            <Image src="/drag_dark.png" width={300} height={300} alt="3D" className='animate-pulse' />}
          </div> */}
        </div>
        
        <div ref={fadeInRef} id='fadeIn' className="opacity-0 flex flex-col gap-10">
          <p className="text-7xl font-neo ">Hello There</p>
          <div  className="flex flex-col xl:flex-row items-center gap-1">
            <div className='relative w-fit'>
              <Name dark={darkMode}/>
              {darkMode ? <Image src="/hd_white.png" width={300} height={300} alt="3D" className='absolute animate-pulse hidden xl:inline-block top-28 -right-64' />
              : <Image src="/hd_black.png" width={300} height={300} alt="3D" className='absolute animate-pulse hidden xl:inline-block top-28 -right-64' />
            }
            </div>
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
});

LandingPage.displayName = 'LandingPage';

export { LandingPage };