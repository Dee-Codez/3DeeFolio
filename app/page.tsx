"use client"

import Image from "next/image";
import { Hero } from "@/container/Hero";
import dynamic from 'next/dynamic';
import { AboutPage } from "@/container/AboutPage";
import AnimatedCursor from "react-animated-cursor"
import {useState, useRef,useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CiMenuKebab } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

import { LandingPage } from "@/container/LandingPage";
import { TimelinePage } from "@/container/TimelinePage";
import { ProjectPage } from "@/container/ProjectPage";
import { ProjectPageV2 } from "@/container/ProjectPageV2";
import { ResumePage } from "@/container/ResumePage";
import { ContactPage } from "@/container/ContactPage";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {

  const ModelViewer = dynamic(
    () => import('@/container/ModelVeiwer'),
    { ssr: false }
  );

  const [menuOpen, setMenuOpen] = useState(false);
  const [currPage, setCurrPage] = useState(0);

  const sliderRef = useRef(null);
  const horLineRef = useRef(null);
  const textRef = useRef<HTMLElement | null>(null);

  const MainRef = useRef(null);
  const skillMainRef = useRef();
  const projectMainRef = useRef();
  const contactMainRef = useRef();
  const resMainRef = useRef();

  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  
  const pages = ["About", "Skills", "Projects", "Resume", "Contact"];
  const redIndex = [MainRef,skillMainRef,projectMainRef,resMainRef,contactMainRef]

  const handleNav = (idx) =>{
    setCurrPage(idx);
    if (redIndex[idx].current) {
      gsap.to(window, {
        scrollBehavior: 'smooth',
        block: 'start',
        scrollTo: redIndex[idx].current,
        duration: 1,
      });
    }
  }


  useEffect(() => {
    gsap.to(horLineRef.current, {
      scrollTrigger: {
        trigger: MainRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const width = 25 * self.progress;
          gsap.to(horLineRef.current, { width: `${width}vw` });
          if (textRef.current) {
            gsap.to(textRef.current, { left: `calc(${width}vw - 30px)`, opacity: self.progress*3 });
        
            if (self.progress >= 0.9) {
              textRef.current.textContent = 'Skills';
              setCurrPage(1);
            } else {
              textRef.current.textContent = 'About';
              setCurrPage(0);
            }
          }
        },
      },
    });
    gsap.to(horLineRef.current, {
      scrollTrigger: {
        trigger: skillMainRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const width = 25 + (25 * self.progress);
          gsap.to(horLineRef.current, { width: `${width}vw` });
          if(textRef.current){
            gsap.to(textRef.current, { left: `calc(${width}vw - 25px)`,opacity:1});
            if (timeoutId.current) {
              clearTimeout(timeoutId.current);
            }
            timeoutId.current = setTimeout(() => {
              gsap.to(textRef.current, { opacity: 0, duration: 1 });
            }, 1500);
            if (self.progress >= 0.9) {
              textRef.current.textContent = 'Projects';
              setCurrPage(2);
            } else {
              textRef.current.textContent = 'Skills';
              setCurrPage(1);
            }
          }          
        },
      },
    });
    gsap.to(horLineRef.current, {
      scrollTrigger: {
        trigger: projectMainRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const width = 50 + (25 * self.progress);
          gsap.to(horLineRef.current, { width: `${width}vw` });

          if(textRef.current){
            gsap.to(textRef.current, { left: `calc(${width}vw - 40px)`,opacity:1});

            if (timeoutId.current) {
              clearTimeout(timeoutId.current);
            }
            timeoutId.current = setTimeout(() => {
              gsap.to(textRef.current, { opacity: 0, duration: 1 });
            }, 1500);

            if (self.progress >= 0.9) {
              textRef.current.textContent = 'Resume';
              setCurrPage(3);
            } else {
              textRef.current.textContent = 'Projects';
              setCurrPage(2);
            }
          }       
        },
      },
    });

    gsap.to(horLineRef.current, {
      scrollTrigger: {
        trigger: resMainRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const width = 75 + (25 * self.progress);
          gsap.to(horLineRef.current, { width: `${width}vw` });

          if(textRef.current){
            gsap.to(textRef.current, { left: `calc(${width}vw - 40px)`, opacity: 3-self.progress*3});

            if (timeoutId.current) {
              clearTimeout(timeoutId.current);
            }
            timeoutId.current = setTimeout(() => {
              gsap.to(textRef.current, { opacity: 0, duration: 1 });
            }, 1500);

            if (self.progress >= 0.7) {
              textRef.current.textContent = 'Contact';
              setCurrPage(4);
            } else {
              textRef.current.textContent = 'Resume';
              setCurrPage(3);
            }
          }       
        },
      },
    });
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    }
  }, []);

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
  
    if (menuOpen) {
      document.addEventListener('click', closeMenu);
    } else {
      document.removeEventListener('click', closeMenu);
    }
  
    return () => {
      document.removeEventListener('click', closeMenu);
    };
  }, [menuOpen]);

  return (
    <main className="flex flex-col items-center ">
      <div ref={sliderRef} className="w-full fixed top-0 z-50">
        <div id="horLine" ref={horLineRef} className="h-[6px] bg-white/20 w-fit"></div>
        <p id="followText" ref={textRef} className="relative mt-3 opacity-0 p-2 bg-white/20 w-fit rounded-full backdrop-blur-xl font-neo font-extrabold">Landing Page</p>
      </div>
      {/* <AnimatedCursor
        color="255, 255, 255"
        innerSize={16}
        outerSize={60}
        outerScale={3}
        innerScale={2}
        outerStyle={{
          mixBlendMode: 'soft-light',
        }}
      /> */}
      <LandingPage ref={MainRef} />
      <AboutPage ref={skillMainRef} />
      <ProjectPageV2 ref={projectMainRef}/>
      <ResumePage ref={resMainRef}/>
      <ContactPage ref={contactMainRef}/>
      <div className="fixed bottom-5 right-5 xl:bottom-10 xl:right-10 group z-30 p-5 overflow-hidden rounded-full"> 
        <div className="absolute z-10 rounded-full w-14 h-14 flex justify-center items-center ">
          <div className="h-[58px] w-4 animate-spin blur bg-sky-400"></div>
        </div>
        <div 
          className="p-2 z-20 bg-sky-500 group-hover:animation-none cursor-pointer rounded-full relative"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (<RxCross2  size={40} />) : (<CiMenuKebab size={40} />)}
          
        </div>
      </div>
      <div 
        className="fixed bottom-32 right-16 w-[50vw] xl:w-[12vw] rounded-lg bg-white/10 shadow-xl shadow-black/20 backdrop-blur-xl transition-all duration-300 ease-in-out"
        style={{ transform: menuOpen ? 'translateY(0)' : 'translateY(100%)', opacity: menuOpen ? 1 : 0}}
      >
        {pages.map((page, index) => (
        <div 
          key={index}
          className={`p-3 px-5 cursor-pointer flex w-full ${currPage === index ? 'text-cyan-500' : ''}`}
          onClick={() => handleNav(index)}
        >
          <div className="flex w-full items-center text-right ">
            {currPage === index && (
              <div className="h-3 w-3 bg-cyan-400 rounded-full mr-2"></div>
            )}
            <p className="text-right font-neo text-lg w-full">{page}</p>
            
          </div>
          
          
        </div>
      ))}
      </div>
    </main>
  );
}
