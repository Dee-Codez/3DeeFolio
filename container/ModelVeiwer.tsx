"use client"

import { useState, useEffect,useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import Model from '@/components/model';
import { useGLTF, useTexture, Center, Decal, Text3D, OrbitControls } from '@react-three/drei';
import Spline from '@splinetool/react-spline';
import { Box3, Vector3 } from 'three';
import { useSpring, animated } from '@react-spring/three';

function InnerComponent() {
  const { viewport: { width, height } } = useThree();
  const { camera, raycaster, mouse } = useThree();
  const textRef = useRef();
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [position, setPosition] = useState([0, 0, 0]);
  const [center, setCenter] = useState(new Vector3());

  const meshRef = useRef();

  useEffect(() => {
    const handleMouseEnter = () => {
      gsap.to(textRef.current.rotation, { x: 0.5, y: 0.5, z: 0.5, duration: 1 });
      gsap.to(textRef.current.position, { x: 1, y: 1, z: 1, duration: 1 });
    };
  
    const handleMouseLeave = () => {
      gsap.to(textRef.current.rotation, { x: 0, y: 0, z: 0, duration: 1 });
      gsap.to(textRef.current.position, { x: 0, y: 0, z: 0, duration: 1 });
    };
  
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
  
    return () => {
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);



  useEffect(() => {
    const handleMouseMove = (event) => {
      const rotationY = ((event.clientX / window.innerWidth) - 0.5) * 0.2;
      const rotationX = ((event.clientY / window.innerHeight) - 0.5) * 0.2; 
       setRotation([rotationX, rotationY, 0]);

       const positionX = ((event.clientX / window.innerWidth) - 0.5) * 0.7;
       const positionY = ((event.clientY / window.innerHeight) - 0.5) * -0.7; 
       setPosition([positionX, positionY, 0]);

    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [rotation]);

  useEffect(() => {
    if (textRef.current) {
      const box = new Box3().setFromObject(textRef.current);
      setCenter(box.getCenter(new Vector3()));
      setPosition(center.toArray());
    }
  }, []);

  useFrame(() => {
    if (textRef.current) {
      textRef.current.position.set(...position);
      textRef.current.position.sub(center);
      textRef.current.rotation.set(...rotation);
    }
  });

  return (
    <mesh ref={meshRef}>
      <Text3D ref={textRef} letterSpacing={-0.06} size={0.5} font="/Inter_Bold.json" color="white" >
          center
        </Text3D>
    </mesh>
  );
}

function ModelViewer() {
  return (
    <div className="h-[100vh] w-full">
      <Canvas style={{ width: '100vw', height: '100vh' }} camera={{ position: [0, 0, 5] }}>
        <InnerComponent />
      </Canvas> 
    </div>
  );
}

export default ModelViewer;