import Image from "next/image";
import { Hero } from "@/container/Hero";
import dynamic from 'next/dynamic';
import { AboutPage } from "@/container/AboutPage";

export default function Home() {

  const ModelViewer = dynamic(
    () => import('@/container/ModelVeiwer'),
    { ssr: false }
  );
  return (
    <main className="flex flex-col items-center justify-between">
      <Hero />
      <ModelViewer />
      <AboutPage/>
    </main>
  );
}
