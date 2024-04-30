"use client"

import { useState, useEffect,useRef } from 'react';
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber';
import Model from '@/components/model';
import { useGLTF, useTexture, Center, Decal,Text, Text3D,Plane, OrbitControls, ambientLight, directionalLight } from '@react-three/drei';
import Spline from '@splinetool/react-spline';
import { Box3, Vector3, TextureLoader, CanvasTexture } from 'three';
import { useSpring, animated } from '@react-spring/three';
import { useHover } from '@use-gesture/react';
import { debounce } from 'lodash';
import { gsap } from 'gsap';

function AnimatedLetter({ char, index }) {
  const [hoverProps, api] = useSpring(() => ({ 
    scale: [1, 1, 1], 
    rotation: [0, 0, 0],
    config: { mass: 1, tension: 170, friction: 26 } 
  }));

  const handleHover = debounce(({ hovering }) => {
    const randomNumber = Math.floor(Math.random() * 3);
    const zeroArr = [0, 0, 0];
    zeroArr[randomNumber] = Math.PI*2;
    api.start({ 
      rotation: hovering ? zeroArr : [0, 0, 0]
    });
  }, 50);  // Delay in milliseconds

  const bind = useHover(handleHover);

  return (
    <animated.group key={index} position-x={index * 0.6} {...bind()} rotation={hoverProps.rotation}>
      <Text3D
        size={0.6}
        font="/helvetiker_bold.typeface.json"
      >
        {char}
        <meshBasicMaterial color={"#abb2bf"} />
        <meshNormalMaterial />
      </Text3D>
    </animated.group>
  );
}

function InnerComponent() {
  const { viewport: { width, height } } = useThree();
  const { camera, raycaster, mouse } = useThree();
  const textRef = useRef();
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [position, setPosition] = useState([0, 0, 0]);
  const [center, setCenter] = useState(new Vector3());

  useEffect(() => {
    if (textRef.current) {
      const box = new Box3().setFromObject(textRef.current);
      const center = box.getCenter(new Vector3());
      setCenter(center);
      console.log(center);
    }
  }, []);

  useEffect(() => {
    gsap.from(textRef.current.position, {
      duration: 0.6,
      y: -5,
      ease: 'power3.out',
    });
  }, []);

  const meshRef = useRef();

  
  const [springProps, setSpring] = useSpring(() => ({
    rotation: [center.x, center.y, center.z],
    position: [-center.x -1.5, -center.y, -center.z],
    config: { tension: 150, friction: 20 }, // Adjust these values to change the animation
  }));

  
  useEffect(() => {
    const handleMouseMove = (event) => {
      const rotationY = ((event.clientX / window.innerWidth) - 0.5) * 0.2;
      const rotationX = ((event.clientY / window.innerHeight) - 0.5) * 0.2; 
  
      const positionX = ((event.clientX / window.innerWidth) - 0.5) * 0.7;
      const positionY = ((event.clientY / window.innerHeight) - 0.5) * -0.7; 
  
      setSpring({ rotation: [rotationX, rotationY, 0], position: [positionX-1.5, positionY, 0] });
    };
  
    const handleMouseOut = () => {
      setSpring({ rotation: [center.x, center.y, center.z], position: [-center.x -1.5, -center.y, -center.z] });
    };
  
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);
  
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [setSpring]);


  
  useFrame(() => {
    if (textRef.current) {
      textRef.current.position.set(...springProps.position.get());
      textRef.current.rotation.set(...springProps.rotation.get());
    }
  });

  const text = 'Debam';

  return (
    <>
    
    <animated.mesh ref={textRef} {...springProps}>
      <Text color="white" position={[1.5, 1.5, 0.5]} scale={0.5}  anchorX="center" anchorY="middle">
        Hello World, I am 
      </Text>
      {text.split('').map((char, index) => (
        <AnimatedLetter key={index} char={char} index={index} />
      ))}
    </animated.mesh>
    </>
    
  );
}

function ModelViewer() {
  const gradient = document.createElement('canvas');
  const context = gradient.getContext('2d');

  gradient.width = 1;
  gradient.height = 256;

  const grd = context?.createLinearGradient(0, 0, 0, 256);
  grd?.addColorStop(1, '#001d64');
  grd?.addColorStop(0, 'black');

  context.fillStyle = grd;
  context.fillRect(0, 0, 1, 256);

  const gradientTexture = new CanvasTexture(gradient);

  return (
    <div className="h-[100vh] w-full">
      <Canvas style={{ width: '100vw', height: '100vh' }} camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 10, 0]} intensity={1.5} />
      <Plane args={[100, 100]} position={[0, 0, -10]}>
          <meshBasicMaterial attach="material" map={gradientTexture} depthTest={false} />
        </Plane>
      <InnerComponent />
      </Canvas> 
    </div>
  );
}



export default ModelViewer;