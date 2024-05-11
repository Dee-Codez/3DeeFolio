"use client"
import React,{ useRef,useEffect,useState } from 'react';
import {gsap} from 'gsap';
import Draggable from 'react-draggable';
import Link from 'next/link';

function ProjectPageV2() {

    const gradientRef = useRef(null);
    const containerRef = useRef(null);
    const [bounds, setBounds] = useState({ left: 0, top: 0, right: 0, bottom: 0 });

    useEffect(() => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setBounds({ left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom });
        }
    }, []);

    const projects = [
        {
            title: 'Project 1',
            description: 'This is project 1',
            // Add more properties as needed
        },
        {
            title: 'Project 2',
            description: 'This is project 2',
            // Add more properties as needed
        },
        // Add more projects as needed
    ];

    const projectRefs = projects.map(() => React.createRef());
    const [positions, setPositions] = useState(projects.map(() => ({ x: 0, y: 0 })));
    const animate = (element, position) => {
        gsap.to(element, {
            x: position.x + Math.random() * 200 - 100,
            y: position.y + Math.random() * 200 - 100,
            repeat: -1,
            yoyo: true,
            ease: 'none',
            duration: 5,
        });
    };
    useEffect(() => {
        gsap.to(gradientRef.current, {
            backgroundPosition: '200% 0',
            repeat: -1,
            duration: 10,
          });

        projectRefs.forEach((ref, index) => animate(ref.current, positions[index]));      
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
            <div>
                <div className='mt-20'>
                    <div   className='flex flex-col'>
                        <p className='text-7xl font-bold text-center'>Projects</p>
                        <div className='mt-20 border min-h-[100vh] w-[80vw]'>
                            {projects.map((project, index) => (
                                <Draggable
                                key={index}
                                nodeRef={projectRefs[index]}
                                position={positions[index]}
                                onStart={() => gsap.killTweensOf(projectRefs[index].current)}
                                onStop={(e, data) => {
                                    const newPositions = [...positions];
                                    newPositions[index] = { x: data.x, y: data.y };
                                    setPositions(newPositions);
                                    gsap.set(projectRefs[index].current, { x: data.x, y: data.y });
                                    animate(projectRefs[index].current, newPositions[index]);
                                }}
                            >
                                    <div ref={projectRefs[index]} className='bg-white/10 font-alien2 w-[20%] p-4 rounded-lg shadow-lg'>
                                            <h1 className='text-2xl font-bold'>{project.title}</h1>
                                            <p className='text-sm'>{project.description}</p>
                                            <Link href='/project/[id]' as={`/project/${index}`}>
                                                Click Here
                                            </Link>

                                        </div>
                                    </Draggable>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  );
}

export { ProjectPageV2 };