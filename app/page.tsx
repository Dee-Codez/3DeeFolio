import Image from "next/image";
import ModelVeiwer from "@/container/ModelVeiwer";
import { Hero } from "@/container/Hero";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <Hero />
      <ModelVeiwer />
    </main>
  );
}
