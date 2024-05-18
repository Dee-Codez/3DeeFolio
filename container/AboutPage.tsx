"use client"

import { useRef, useEffect,forwardRef,useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { ModernImage } from '@/components/ModernImage';
import Link from 'next/link';


gsap.registerPlugin(ScrollTrigger);

const AboutPage = forwardRef((props, ref) => {
  const bgGradient = "linear-gradient(to right, #00032a, #00043f, #00032a)";
  const headingRef = useRef(null);
  const btmRef = useRef(null);
  
  useLayoutEffect(() => {
    if (ref.current) {
      gsap.to(ref.current, {
        backgroundPosition: '-200% 0',
        repeat: -1,
        duration: 10,
      });
    }

    gsap.fromTo(headingRef.current, {
      opacity: 0,
      top: '80px',
    }, {
      opacity: 1,
      top: '40px',
      duration: 1,
      scrollTrigger: {
        trigger: headingRef.current,
        start: 'top 80%',
        end: 'top 50%',
        scrub: true,
      
      }
    }
  );
  if (window.innerWidth > 1280 ) {
    gsap.to(window, {
      scrollTrigger: {
        trigger: ref.current, // ID of the container that triggers the scroll
        start: "bottom bottom-=200", //bottom of the trigger element hits bottom of the viewport
        end: "bottom top", //end when bottom of the trigger element hits top of the viewport
        onEnter: () => gsap.to(window, { scrollTo: btmRef.current, duration: 1 }),
        // onLeaveBack: () => gsap.to(window, { scrollTo: ref.current, duration: 1 }),
        scrub: true
      }
    })
  }
  }, [])


  

  return (
    <div ref={ref} style={{  backgroundSize: '200% 100%' }} className="relative bg-gradient-to-r dark:from-[#00032a] from-slate-200 dark:via-[#00043f] via-slate-400 dark:to-[#00032a] to-slate-200 w-full min-h-[200vh] font-neo">
      <div>
        <div className="flex flex-col justify-center items-center">
          <div ref={headingRef} className=' mt-20'>
            <p className='text-7xl font-bold'>Tech In Me</p>
          </div>
          <div className='flex w-[80%] mt-20'>
            <div className='flex flex-col gap-10 mx-[10%] text-center xl:text-left'>
                <div className='flex items-center gap-4'>
                  <p className='text-3xl font-bold'>Public Profiles : </p>
                  <Link href="https://github.com/Dee-Codez" target='_blank'><ModernImage src='/icons/github.png' alt="Github" txtcn='text-md' width={50} height={50} /></Link>
                  <Link href="https://www.codechef.com/users/debspats" target='_blank'><ModernImage src='/icons/codechef.webp' alt="CodeChef" txtcn='text-sm text-black' width={43} height={43} /></Link>
                  <Link href="https://leetcode.com/u/DeeCodez/" target='_blank'><ModernImage src='/icons/lc.webp' alt="LeetCode" txtcn='text-sm text-black' width={50} height={50} /></Link>
                </div>
                <p className='text-3xl font-bold'>Core Languages : </p>
                <div className='flex scale-90 xl:scale-100 flex-wrap justify-center gap-8 text-3xl'>
                  <div className='flex  flex-col gap-1 items-center'> 
                    <Image src='/icons/c.png' alt="C" width={90} height={90} />
                    <p className=''>C</p>
                    <p>(★★★★☆)</p>
                  </div>
                  <div className='flex flex-col gap-1 items-center'> 
                    <Image src='/icons/c++.png' alt="C++" width={100} height={100} />
                    <p className=''>C++</p>
                    <p>(★★★☆☆)</p>
                  </div>
                  <div className='flex flex-col gap-1 items-center'> 
                    <Image src='/icons/java.webp' alt="Java" width={100} height={100} />
                    <p className=''>Java</p>
                    <p>(★★★★★)</p>
                  </div>
                  <div className='flex flex-col gap-1 items-center'> 
                    <Image src='/icons/python.png' alt="Python" width={100} height={100} />
                    <p className=''>Python</p>
                    <p>(★★★★★)</p>
                  </div>
                  {/* Had To Mention It Considering Its Versitality */}
                  <div className='flex flex-col gap-1 items-center'> 
                    <Image src='/icons/js.webp' alt="Python" width={100} height={100} />
                    <p className=''>Javascript</p>
                    <p>(★★★★★)++</p>
                  </div>
                  <div className='flex flex-col gap-1 items-center'> 
                    <Image src='/icons/dart.webp' alt="Dart" width={100} height={100} />
                    <p className=''>Dart</p>
                    <p>(★★☆☆☆)</p>
                  </div>
                  <div className='flex flex-col gap-1 items-center'> 
                    <Image src='/icons/go.png' alt="GoLang" width={100} height={100} />
                    <p className=''>GoLang</p>
                    <p>(★★☆☆☆)</p>
                  </div>
                </div>
                <p className='text-3xl font-bold mt-10'>Additional Skills : </p>
                <div className='flex flex-col gap-14'>
                  <div className='flex flex-col items-center xl:flex-row'>
                    <p className='text-xl'>Operations: </p>
                    <div className='flex flex-wrap gap-7 scale-90 xl:scale-100 justify-center items-center'>
                      <ModernImage src='/icons/aws.png' txtcn='text-black text-xl' alt="AWS" width={150} height={150} />
                      <ModernImage src='/icons/gcp.png' alt="GCP" width={75} height={75} />
                      <ModernImage src='/icons/azure.png' alt="Azure" width={75} height={75} />
                      <ModernImage src='/icons/cf.png' alt="CloudFlare" width={75} height={75} />
                      <ModernImage src='/icons/docker.png' alt="Docker" width={75} height={75} />
                      <ModernImage src='/icons/k8.png' alt="Kubernetes" width={75} height={75} />
                      <ModernImage src='/icons/jenkins.png' alt="Jenkins" width={75} height={75} />
                    </div>
                  </div>
                  <div className='flex flex-col gap-5 items-center xl:flex-row'>
                      <p className='text-xl'>Version Control, Monitoring: </p>
                      <div className='flex flex-wrap gap-7 scale-90 xl:scale-100 justify-center items-center'>
                        <ModernImage src='/icons/github.png' alt="Github" width={75} height={75} />
                        <ModernImage src='/icons/gitlab.png' alt="Gitlab" width={75} height={75} />
                        <ModernImage src='/icons/nr.png' alt="NewRelic" width={75} height={75} />
                        <ModernImage src='/icons/grafana.png' alt="Grafana" width={75} height={75} />
                        <ModernImage src='/icons/ur.png' alt="Uptime Robot" width={75} height={75} />
                      </div>
                      
                  </div>
                  <div className='flex flex-col gap-5 items-center xl:flex-row'>
                      <p className='text-xl'>Development: </p>
                      <div className='flex flex-wrap gap-7 scale-90 xl:scale-100 justify-center items-center'>
                        <ModernImage src='/icons/ts.webp' alt="Typescript"  width={75} height={75} />
                        <ModernImage src='/icons/react.webp' alt="ReactJS" width={75} height={75} />
                        <ModernImage src='/icons/vite.svg' alt="Vite" width={75} height={75} />
                        <ModernImage src='/icons/next.png' alt="NextJS" cn="bg-white rounded-full" width={75} height={75} />
                        <ModernImage src='/icons/webrtc.png' alt="WebRTC" width={75} txtcn='text-black text-lg' height={75} />
                        <ModernImage src='/icons/sanity.png' alt="SanityCMS" width={75} cn="rounded-xl" height={75} />
                        <ModernImage src='/icons/react-router.svg'  alt="React-Router" width={75} height={75} />
                        <ModernImage src='/icons/threejs.png' txtcn='text-black text-lg' alt="ThreeJS" width={75} height={75} />
                      </div>
                  </div>
                  <div className='flex flex-col gap-5 items-center xl:flex-row'>
                      <p className='text-xl'>Backend: </p>
                      <div className='flex flex-wrap gap-7 scale-90 xl:scale-100 justify-center items-center'>
                        <ModernImage src='/icons/node.png' alt="NodeJS"  width={75} height={75} />
                        <ModernImage src='/icons/flask.png' cn="bg-white rounded-md p-2" alt="Flask" txtcn='text-black text-lg'  width={50} height={50} />
                        <ModernImage src='/icons/django.png' cn="bg-white rounded-xl " alt="Django" txtcn='text-black text-md'  width={75} height={75} />
                        <ModernImage src='/icons/fastapi.png' alt="FastAPI"  width={75}  txtcn='text-black text-lg'  height={75} />
                        <ModernImage src='/icons/postman.png' alt="Postman"  width={75}  height={75} />
                        <ModernImage src='/icons/socketio.png' alt="SocketIO" width={75} cn="bg-white rounded-3xl" txtcn='text-black text-lg' height={75} />
                        <ModernImage src='/icons/trpc.png' alt="tRPC" width={75}  height={75} />
                      </div>
                  </div>
                  <div className='flex flex-col gap-5 items-center xl:flex-row'>
                      <p className='text-xl'>Database Management: </p>
                      <div className='flex flex-wrap gap-7 scale-90 xl:scale-100 justify-center items-center'>
                        <ModernImage src='/icons/mysql.png' alt="MySQL"  width={75}  height={75} txtcn='text-black text-lg' />
                        <ModernImage src='/icons/pg.png' alt="PostgreSQL"  width={75}  height={75}  />
                        <ModernImage src='/icons/mongo.png' alt="MongoDB"  width={75}  height={75}  />
                        <ModernImage src='/icons/redis.png' alt="RedisDB"  width={75}  height={75}  />
                        <ModernImage src='/icons/s3.webp' alt="AWS S3"  txtcn='font-alien text-lg' width={75}  height={75}  />
                        <ModernImage src='/icons/firebase.webp' alt="Firebase"  width={75}  height={75}  />
                        <ModernImage src='/icons/supabase.png' alt="Supabase"  width={75} txtcn='text-black text-lg' height={75}  />
                        <ModernImage src='/icons/prisma.svg' alt="Prisma" cn="bg-white rounded-3xl" txtcn='text-black text-lg' width={75}  height={75}  />
                      </div>
                  </div>
                  <div className='flex flex-col gap-5 items-center xl:flex-row'>
                      <p className='text-xl'>Machine Learning: </p>
                      <div className='flex flex-wrap gap-7 scale-90 xl:scale-100 justify-center items-center'>
                        <ModernImage src='/icons/sck.png' alt="ScikitLearn"  width={75} height={75} />
                        <ModernImage src='/icons/tf.png' alt="TensorFlow"  width={75} height={75} />
                        <ModernImage src='/icons/keras.png' alt="Keras" width={75} height={75} />
                        <ModernImage src='/icons/pytorch.png' alt="PyTorch"  width={75} height={75} />
                        <ModernImage src='/icons/langchain.png' alt="LangChain"  width={75} height={75} />
                        <ModernImage src='/icons/opencv.png' alt="OpenCV"  width={75} height={75} />
                      </div>
                  </div>
                  <div className='flex flex-col gap-5 items-center xl:flex-row'>
                      <p className='text-xl'>Design: </p>
                      <div className='flex flex-wrap gap-7 scale-90 xl:scale-100 justify-center items-center'>
                        <ModernImage src='/icons/tailwind.png' alt="Tailwind" txtcn='text-black text-lg' width={75} height={75} />
                        <ModernImage src='/icons/bs.webp' alt="Bootstrap" width={75} height={75} />
                        <ModernImage src='/icons/sass.png' alt="Sass" width={75} height={75} />
                        <ModernImage src='/icons/gsap.svg' alt="GSAP" txtcn='text-black text-lg' width={75} height={75} />
                        <ModernImage src='/icons/canva.webp' alt="Canva" width={75} height={75} />
                        <ModernImage src='/icons/figma.webp' alt="Figma" width={75} height={75} />
                        <ModernImage src='/icons/ps.webp' alt="Photoshop" width={75} height={75} />
                        <ModernImage src='/icons/illustrator.webp' alt="Illustrator" width={75} height={75} />
                        <ModernImage src='/icons/ae.png' alt="After Effects" width={75} height={75} />
                        <ModernImage src='/icons/pr.png' alt="Premiere Pro" width={75} height={75} />
                      </div>
                  </div>
                </div>
            </div>
          </div>
            <p className='text-2xl text-center mt-20 xl:mt-40 pb-14'>That is it for my skillset. Scroll down for more details on my projects.</p>
        </div>
      </div>
      <div className='absolute bottom-0' ref={btmRef} id='btm'></div>
    </div>
  );
});

AboutPage.displayName = 'AboutPage';
export { AboutPage };