"use client"

import Image from "next/image";
import { Hero } from "@/container/Hero";
import dynamic from 'next/dynamic';
import { AboutPage } from "@/container/AboutPage";
import AnimatedCursor from "react-animated-cursor"
import { useRef,useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { LandingPage } from "@/container/LandingPage";
import { TimelinePage } from "@/container/TimelinePage";
import { ProjectPage } from "@/container/ProjectPage";
import { ProjectPageV2 } from "@/container/ProjectPageV2";
import { ResumePage } from "@/container/ResumePage";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {

  const ModelViewer = dynamic(
    () => import('@/container/ModelVeiwer'),
    { ssr: false }
  );

  const sliderRef = useRef(null);
  const horLineRef = useRef(null);

  const landingPageRef = useRef(null);
  const aboutPageRef = useRef(null);
  const projectPageRef = useRef(null);
  const resumePageRef = useRef(null);

  useEffect(() => {
    const totalHeight = landingPageRef.current.offsetHeight + aboutPageRef.current.offsetHeight + projectPageRef.current.offsetHeight + resumePageRef.current.offsetHeight;
  
    gsap.to(horLineRef.current, {
      scrollTrigger: {
        trigger: landingPageRef.current,
        start: 'top top',
        end: () => `top+=${aboutPageRef.current.offsetTop}px`,
        scrub: true,
        onUpdate: self => gsap.to(horLineRef.current, { width: `${(landingPageRef.current.offsetHeight / totalHeight) * self.progress * 100}%` }),
      },
    });
  
    gsap.to(horLineRef.current, {
      scrollTrigger: {
        trigger: aboutPageRef.current,
        start: 'top top',
        end: () => `top+=${projectPageRef.current.offsetTop}px`,
        scrub: true,
        onUpdate: self => gsap.to(horLineRef.current, { width: `${((landingPageRef.current.offsetHeight + aboutPageRef.current.offsetHeight) / totalHeight) * self.progress * 100}%` }),
      },
    });

    gsap.to(horLineRef.current, {
      scrollTrigger: {
        trigger: aboutPageRef.current,
        start: 'top top',
        end: () => `top+=${resumePageRef.current.offsetTop}px`,
        scrub: true,
        onUpdate: self => gsap.to(horLineRef.current, { width: `${((landingPageRef.current.offsetHeight + aboutPageRef.current.offsetHeight + projectPageRef.current.offsetHeight) / totalHeight) * self.progress * 100}%` }),
      },
    });
  
    // Repeat for other sections
  }, []);
  return (
    <main className="flex flex-col items-center ">
      <div ref={sliderRef} className="w-full fixed top-0 z-50">
        <div id="horLine" ref={horLineRef} className="h-[6px] bg-white/20 w-10"></div>
        <div className="flex justify-between">
        <div>LandingPage</div>
        <div>AboutPage</div>
        <div>ProjectPageV2</div>
        <div>ResumePage</div>
        </div>
        
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
      <LandingPage/>
      <div ref={landingPageRef}></div>
      <AboutPage/>
      <div  ref={aboutPageRef}></div>
      <ProjectPageV2/>
      <div ref={projectPageRef}></div>
      <ResumePage/>
      <div ref={resumePageRef}></div>
      
    </main>
  );
}
