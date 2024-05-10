import Image from "next/image";
import { Hero } from "@/container/Hero";
import dynamic from 'next/dynamic';
import { AboutPage } from "@/container/AboutPage";
import AnimatedCursor from "react-animated-cursor"
import { LandingPage } from "@/container/LandingPage";
import { TimelinePage } from "@/container/TimelinePage";
import { ProjectPage } from "@/container/ProjectPage";

export default function Home() {

  const ModelViewer = dynamic(
    () => import('@/container/ModelVeiwer'),
    { ssr: false }
  );
  
  return (
    <main className="flex flex-col items-center ">
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
      <div></div>
      <AboutPage/>
      <div></div>
      <ProjectPage/>
    </main>
  );
}
