"use client"
import { Canvas, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Html, useProgress } from '@react-three/drei';


function Loader() {
    const { progress } = useProgress();

    return <Html center>{progress} % loaded</Html>;
}

export { Loader };