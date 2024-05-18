"use client"
import React,{ useRef,useEffect,useState,useMemo,forwardRef } from 'react';
import {gsap} from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Draggable from 'react-draggable';
import Link from 'next/link';
import Image from 'next/image';
import { FaGithub } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);


const ProjectPageV2 = forwardRef((props, ref) =>{

    const containerRef = useRef(null);
    const [bounds, setBounds] = useState({ left: 0, top: 0, right: 0, bottom: 0 });
    const [zIndexes, setZIndexes] = useState([]);
    const [showImgIndices, setShowImgIndices] = useState([]);

    const btm2Ref = useRef(null);
    const repoLinkRef = useRef(null);
    const liveDemoRef = useRef(null);
    const boundsRef = useRef(null);

    useEffect(() => {
        if (window.innerWidth > 1280) {
            setShowImgIndices([0,1,2,3,4,5,6]);
          } else {
            setShowImgIndices([]);
          }
      }, []);


    const projects = [
        {
            title: 'DeeSharez',
            stack: 'React, SanityCMS, TailwindCSS',
            description: `Started Off With the goated Duo of React and TailwindCSS, following tutorials
            I came up with a Pinterest Clone using SanityCMS.`,
            imgUrl: `/project/deesharez.png`,
            githubUrl: `https://github.com/Dee-Codez/DeeSharez`,
            Url: `https://deesharez.netlify.app/`,
        },
        {
            title: 'SamvidhanAI',
            stack: 'React, Vite, Tailwind, Express, Flask, Langchain',
            description: `This marked my entry into proper Full Stack Development where
            I myself created my own APIs using ExpressJS and Flask while utilizing various frameworks instead 
            of relying on third part CMS.`,
            imgUrl: `/project/samvidhanai.png`,
            githubUrl: `https://github.com/Dee-Codez/SamvidhanAI`,
            Url: `https://samvidhan-ai.vercel.app/`,
        },
        {
            title: 'CMS Invoicer',
            stack: 'React, Vite, Express, PostgreSQL ',
            description: `I started working with Databases at this point of time and fortunately got
            a freelance project where I had to create a proper system for Invoicing.`,
            imgUrl: `/project/lettfaktura.png`,
            githubUrl: `https://github.com/Dee-Codez/Lettfaktura`,
            Url: `https://lettfaktura.vercel.app/`,
        },
        {
            title: 'DocHelp',
            stack: 'React, Vite, FastAPI, AWS S3, Firebase',
            description: `This was also an on-demand project which helped me
            get into the world of AWS. I also got to work with FastAPI which enabled various optimizations.`,
            imgUrl: `/project/dochelp.png`,
            githubUrl: `https://github.com/Dee-Codez/DocHelp`,
            Url: `https://dochelp-dp.vercel.app/`,
        },
        {
            title: 'VeuScribe',
            stack: 'React, Vite, Express, Socket.io, WebRTC',
            description: `Learned a lot of new tech after wokring on this from scratch. From WebSockets to ICE Servers
            and whatnot. This was a great learning experience.`,
            imgUrl: `/project/veuscribe.jpg`,
            githubUrl: `https://github.com/Dee-Codez/VeuScribe`,
            Url: `https://veuscribe.vercel.app/`,
        },
        {
            title: 'READMEasy',
            stack: 'NextJS, Prisma, CockroachDB, Puppeteer',
            description: `Finally joined the swarm of TypeScript and NextJS. This was a project
            I personally wanted to work on and it was great to solve an undermined problem.`,
            imgUrl: `/project/readmeasy.png`,
            githubUrl: `https://github.com/Dee-Codez/READMEasy`,
            Url: `https://readmeasy.vercel.app/`,
        },
        {
            title: '3DeeFolio',
            stack: 'NextJS, ThreeJS, GSAP, Framer Motion',
            description: `And Now we are here. This is my Portfolio Website which I created
        to showcase my projects and skills. I have used a lot of animations and effects to make it look cool.`,
            imgUrl: `/project/3deefolio.png`,
            githubUrl: `https://github.com/Dee-Codez/3DeeFolio`,
            Url: `https://3deefolio.vercel.app/`,
        },
    ];

    const projectRefs = projects.map(() => React.createRef());

    const [zOrders, setZOrders] = useState(projects.map((_, i) => i));

    const [positions, setPositions] = useState(() => {
        return projects.map((_, index) => {
          if (typeof window !== 'undefined' && window.innerWidth > 1024) {
            return {
              x: 0, //x: index % 2 === 0 ? -200 : 200, For When flex-col alternate is needed
              y: 0,
            };
          } else {
            return {
              x: 0,
              y: 0,
            };
          }
        });
      });
    const animate = (element, position) => {
        gsap.to(element, {
            x: position.x + Math.random() * 200 - 100,
            y: position.y + Math.random() * 200 - 100,
            repeat: -1,
            yoyo: true,
            ease: 'none',
            duration: 10,
        });
    };
    useEffect(() => {
        if(ref.current != null) {
            gsap.to(ref.current, {
                backgroundPosition: '200% 0',
                repeat: -1,
                duration: 10,
              });    
        }
        
          if (window.innerWidth > 1280 ) {
            gsap.to(window, {
              scrollTrigger: {
                trigger: "#btm2", // ID of the container that triggers the scroll
                start: "top bottom-=200", //top of the trigger element hits bottom of the viewport
                end: "top top", //end when top of the trigger element hits top of the viewport
                onEnter: () => gsap.to(window, { scrollTo: btm2Ref.current, duration: 1 }),
                scrub: true
              }
            });
          }

        projectRefs.forEach((ref, index) => animate(ref.current, positions[index]));      
    }, []);

  return (
    <div
      ref={ref}
      style={{
        backgroundImage: 'linear-gradient(to right, #00032a, #00043f, #00032a)',
        backgroundSize: '200% 100%',
        width: '100vw',
      }}
      className="flex relative font-neo flex-col min-h-[100vh] items-center"
    >
        <div>
            <div>
                <div className='mt-20 pb-[10vh]'>
                    <div className='flex flex-col'>
                        <p className='text-7xl font-bold text-center'>Projects</p>
                        <div ref={boundsRef} className='mt-20 relative flex justify-center overflow-hidden  flex-wrap items-center gap-10 min-h-[100vh] w-[90vw] xl:w-[80vw]'>
                            {projects.map((project, index) => (
                                <Draggable
                                    key={index}
                                    nodeRef={projectRefs[index]}
                                    position={positions[index]}
                                    bounds="parent"
                                    onStart={() => {
                                        gsap.killTweensOf(projectRefs[index].current);
                                        // Set the z-index on mouse down
                                        const newZOrders = [...zOrders];
                                        newZOrders.splice(newZOrders.indexOf(index), 1); // remove current index
                                        newZOrders.push(index); // add it to the end
                                        setZOrders(newZOrders); // update state
                                    }}
                                    onStop={(e, data) => {
                                        const newPositions = [...positions];
                                        newPositions[index] = { x: data.x, y: data.y };
                                        setPositions(newPositions);
                                        gsap.set(projectRefs[index].current, { x: data.x, y: data.y });
                                        animate(projectRefs[index].current, newPositions[index]);
                                    }}
                                    cancel="#noDrag"
                                    >
                                    <div
                                        ref={projectRefs[index]}
                                        className='bg-white/10 backdrop-blur m-5 font-alien2 w-[80%] xl:w-[30%] p-4 rounded-lg'
                                        style={{ zIndex: zOrders.indexOf(index), boxShadow: '2px 2px 10px 2px rgba(0, 0, 0, 0.3)'}} 
                                        
                                    >
                                        <h1 className='text-3xl font-bold'>{project.title}</h1>
                                        <h2 className='text-xl font-semibold'>{project.stack}</h2>
                                        <p className='text-lg mt-3'>{project.description}</p>
                                        <div className='flex-col flex items-center transition-all duration-200'>
                                            <div id='noDrag' onClick={() => {
                                                if (showImgIndices.includes(index)) {
                                                    setShowImgIndices(showImgIndices.filter(i => i !== index));
                                                } else {
                                                    setShowImgIndices([...showImgIndices, index]);
                                                }
                                            }}
                                            className={`bg-white/20 mt-5 p-2 rounded-md ${showImgIndices.includes(index) ? `hidden` : `scale-100`} hover:bg-white/40 hover:scale-105 transition cursor-pointer`}>
                                                Show Preview
                                            </div>
                                                {showImgIndices.includes(index) && (
                                                    <div id='noDrag' className='relative group my-5'>
                                                        <div className='group-hover:blur-sm transition group-hover:bg-black/20'>
                                                            <Image
                                                            src={project.imgUrl}
                                                            width={450}
                                                            height={300}
                                                            alt='Fetching Image...'
                                                            className='rounded-md'
                                                            />
                                                        </div>
                                                        <div className='absolute transition cursor-pointer top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  flex items-center justify-center opacity-0 group-hover:opacity-100' onClick={() => {
                                                        setShowImgIndices(showImgIndices.filter(i => i !== index));
                                                        }}>
                                                            <p className='bg-black/40  hover:bg-black/80 hover:scale-110 transition p-4 rounded-lg'>Hide Preview</p>
                                                        </div>
                                                    </div>
                                                )}  
                                            </div>
                                            <div className='flex my-5 justify-center gap-10'>
                                                <Link ref={repoLinkRef} id='noDrag' href={project.githubUrl} target='_blank' className='flex gap-2 items-center p-2 bg-white/20 hover:bg-white/40 hover:scale-105 transition rounded-md'>
                                                    <FaGithub /> Repo Link
                                                </Link>
                                                <Link ref={liveDemoRef} id='noDrag' href={project.Url} target='_blank' className='flex gap-2 items-center p-2 bg-white/20 hover:bg-white/40 hover:scale-105 transition rounded-md'>
                                                    <TbWorld /> Live Demo
                                                </Link>
                                            </div>
                                    </div>
                                </Draggable>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <div ref={btm2Ref} id='btm2' className='absolute bottom-0'></div>                        
    </div>
  );
});

ProjectPageV2.displayName = 'ProjectPageV2';

export { ProjectPageV2 };