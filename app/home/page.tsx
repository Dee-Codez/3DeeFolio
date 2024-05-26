"use client"

import Image from "next/image";
import { Hero } from "@/container/Hero";
import dynamic from 'next/dynamic';
import AnimatedCursor from "react-animated-cursor"
import {useState, useRef,useEffect,useLayoutEffect,lazy,Suspense } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CiMenuKebab } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { FaDownload } from "react-icons/fa6";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { useGSAP } from '@gsap/react';

import {loading} from "@/app/home/loading";
import { LandingPage } from "@/container/LandingPage";
import { AboutPage } from "@/container/AboutPage";
import { TimelinePage } from "@/container/TimelinePage";
import { ProjectPage } from "@/container/ProjectPage";
import { ProjectPageV2 } from "@/container/ProjectPageV2";
import { ResumePage } from "@/container/ResumePage";
import { ContactPage } from "@/container/ContactPage";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {

  const ModelViewer = dynamic(
    () => import('@/container/ModelVeiwer'),
    { ssr: false }
  );

  // const LandingPage = lazy(() => import('@/container/LandingPage').then((mod) => ({ default: mod.LandingPage })));

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

  const [darkMode, setDarkMode] = useState(true);

  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  
  const pages = ["About", "Skills", "Projects", "Resume", "Contact"];
  const redIndex = [MainRef,skillMainRef,projectMainRef,resMainRef,contactMainRef]

  const handleNav = (idx) => {
    setCurrPage(idx);
    if (redIndex[idx].current) {
      let lastScrollPosition = window.pageYOffset;
      const targetTop = redIndex[idx].current.offsetTop;
      const animation = gsap.to(window, { 
        scrollTo: targetTop, 
        duration: 1,
        overwrite: "auto",
        onUpdate: () => {
          if (window.pageYOffset < targetTop) {
            if (window.pageYOffset === lastScrollPosition) {
              if (timeoutId.current) {
                clearTimeout(timeoutId.current);
              }
              timeoutId.current = setTimeout(() => {
                animation.kill();
              }, 1000);
            } else {
              if (timeoutId.current) {
                clearTimeout(timeoutId.current);
              }
              animation.invalidate().restart();
            }
            lastScrollPosition = window.pageYOffset;
          }
        }
      });
    }
  }

  useLayoutEffect(() => {
    let lastProgress = 0;

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

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    setDarkMode(newDarkMode);
  };

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

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setDarkMode(savedTheme === 'dark');
  }, []);

  return (
    <Suspense fallback={<loading />}>
    <main className={`flex flex-col text-black items-center ${darkMode ? 'dark text-white' : ''}`}>
      <div ref={sliderRef} className="w-full fixed top-0 z-50">
        <div id="horLine" ref={horLineRef} className="h-[6px] bg-black/20 dark:bg-white/20 w-fit"></div>
        <p id="followText" ref={textRef} className="relative mt-3 opacity-0 p-2 bg-black/20 dark:bg-white/20 w-fit rounded-full backdrop-blur-xl font-neo font-extrabold">Landing Page</p>
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
        <LandingPage ref={MainRef} theme={darkMode} />
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
        className="fixed bottom-32 right-16 w-[50vw] xl:w-[12vw] rounded-lg bg-black/10 dark:bg-white/10 shadow-xl shadow-black/20 backdrop-blur-xl transition-all duration-300 ease-in-out"
        style={{ transform: menuOpen ? 'translateY(0)' : 'translateY(100%)', opacity: menuOpen ? 1 : 0}}
      >
        <div className="flex items-center justify-between mx-2">
            <div className="flex gap-3">
                <Link href="https://github.com/Dee-Codez" target='_blank'>
                  {darkMode ? (
                    <Image src="/icons/github-white.svg" width={20} height={20}  alt="3DeeFolio"/>
                  ) : (
                    <Image src="/icons/github-dark.svg" width={20} height={20}  alt="3DeeFolio"/>
                  )
                  }
                </Link>
                <Link href="https://www.linkedin.com/in/debampati/" target='_blank'>
                  {darkMode ? (
                    <Image src="/icons/linkedin-white.svg" width={20} height={20}  alt="3DeeFolio"/>
                  ) : (
                    <Image src="/icons/linkedin-dark.svg" width={20} height={20}  alt="3DeeFolio"/>
                  )
                  }
                </Link>
            </div>
            <a href="/Debam Resume.pdf" download  className="m-2 bg-black/20 dark:bg-white/20 flex gap-2 p-2 rounded-md cursor-pointer dark:hover:bg-white/30 hover:bg-black/30 transition items-center ">
              <FaDownload />
              <p className="font-neo text-sm">Resume</p>
            </a>
            <div>
            <button
              className={`p-2 rounded-full ${darkMode ? 'bg-white' : 'bg-black'}`}
              onClick={() => toggleDarkMode()}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <MdOutlineLightMode className="w-6 h-6 text-black" />
              ) : (
                <MdDarkMode className="w-6 h-6 text-white" />
              )}
            </button>
            </div>
        </div>
        {pages.map((page, index) => (   
        <div 
          key={index}
          className={`py-2 px-5 cursor-pointer flex w-full ${currPage === index ? 'text-sky-700 dark:text-cyan-400' : ''}`}
          onClick={() => handleNav(index)}
        >
          <div className="flex w-full items-center text-right ">
            {currPage === index && (
              <div className="h-3 w-3 bg-sky-600 dark:bg-cyan-400 rounded-full mr-2"></div>
            )}
            <p className="text-right font-neo font-semibold text-xl w-full">{page}</p>  
          </div>
        </div>
      ))}
      </div>
    </main>
    </Suspense>

  );
}
