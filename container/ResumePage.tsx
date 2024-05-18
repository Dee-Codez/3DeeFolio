"use client"

import React,{ useRef,useEffect,useState,forwardRef } from 'react';
import {gsap} from 'gsap';
import Image from 'next/image';

const ResumePage = forwardRef((props, ref) => {

    const btm3Ref = useRef(null);

    const [dwldText, setDwldText] = useState("Download PDF");
    const [copyText, setCopyText] = useState("Copy Link");
 
    useEffect(() => {
        gsap.to(ref.current, {
            backgroundPosition: '-200% 0',
            repeat: -1,
            duration: 10,
          });

          if (window.innerWidth > 1280 ) {
            gsap.to(window, {
              scrollTrigger: {
                trigger: "#btm3", // ID of the container that triggers the scroll
                start: "top bottom-=200", //top of the trigger element hits bottom of the viewport
                end: "top top", //end when top of the trigger element hits top of the viewport
                onEnter: () => gsap.to(window, { scrollTo: btm3Ref.current, duration: 1 }),
                scrub: true
              }
            });
          }
    }, []);

    const onDwld = async () => {
      setDwldText("Downloading...");
      setTimeout(() => {
        setDwldText("Download PDF");
      }, 2000);
    }

    const onCopy = async () => {
      try {
        setCopyText("Copied");
        await navigator.clipboard.writeText('https://drive.google.com/file/d/1S5wAYC7FmqSGm1MzrwLGUyQdSGc4DdX0/view?usp=sharing');
        setTimeout(() => {
          setCopyText("Copy Link");
        }, 1000);
      } catch (error) {
        console.error('Failed to copy text: ', error);
      }
    }

  return (
    <div
      ref={ref}
      style={{
        backgroundImage: 'linear-gradient(to right, #00032a, #00043f, #00032a)',
        backgroundSize: '200% 100%',
        width: '100vw',
      }}
      className="flex font-neo flex-col min-h-[100vh] relative  items-center"
    >
        <div>
            <div>
                <div className='mt-20 '>
                  <div className='flex flex-col'>
                    <p className='text-center text-7xl font-bold'>Resume</p>
                    <div className='mt-20 flex gap-10 justify-center'>
                    <a onClick={onDwld} href='/Debam Resume.pdf' download>
                      <div  className='p-2 bg-white/20 hover:bg-white/40 hover:scale-105 transition rounded-md w-fit '>
                          <p>{dwldText}</p>
                      </div>
                    </a>
                        <div onClick={onCopy} className='cursor-pointer p-2 bg-white/20 hover:bg-white/40 hover:scale-105 transition rounded-md w-fit'>
                            <p>{copyText}</p>
                        </div>
                    </div>
                    <div className='my-20  mx-5 overflow-hidden' >
                      <Image
                        src='/Debam Resume.jpg'
                        width={800}
                        height={1132}
                        alt='Fetching PDF...'
                      />
                      
                    </div>
                  </div>
                </div>
            </div>
        </div>
        <div id='btm3' ref={btm3Ref} className='absolute bottom-0'></div>
    </div>
  );
});

ResumePage.displayName = 'ResumePage';

export { ResumePage };