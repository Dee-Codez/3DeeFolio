"use client"

import { useState, useEffect,useRef, Suspense,useMemo } from 'react';
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber';
import Model from '@/components/model';
import { useGLTF, useTexture, Center, Decal,Text, Text3D,Plane, Html, OrbitControls, ambientLight, directionalLight, Cylinder } from '@react-three/drei';
import Spline from '@splinetool/react-spline';
import { Box3, Vector3, TextureLoader, CanvasTexture, FontLoader, TorusGeometry, FrontSide, BackSide, RepeatWrapping,RGBAFormat,Clock } from 'three';
import { useSpring, animated } from '@react-spring/three';
import { useHover } from '@use-gesture/react';
import { debounce } from 'lodash';
import { gsap } from 'gsap';
import * as THREE from 'three';

import { Loader } from '@/components/Loader';
import { TextTyper } from '@/components/TextTyper';


function AnimatedLetter({ char, index, nscale }) {
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
    <animated.group key={index} position-x={index * 0.5} {...bind()} rotation={hoverProps.rotation}>
      <Text3D
        size={1}
        font="/helvetiker_bold.typeface.json"
        scale={nscale}
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

  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScale(0.3); // smaller scale for small devices
      } else {
        setScale(0.5); // default scale for larger devices
      }
    };

    window.addEventListener('resize', handleResize);

    // Call the function initially to set the scale based on the initial window size
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (textRef.current) {
      const box = new Box3().setFromObject(textRef.current);
      const center = box.getCenter(new Vector3());
      setCenter(center);
    }
  }, []);

  const meshRef = useRef();
  
  const [springProps, setSpring] = useSpring(() => ({
    rotation: [center.x, center.y, center.z],
    position: [-center.x -1.3, -center.y-0.5, -center.z],
    config: { tension: 150, friction: 20 }, // Adjust these values to change the animation
  }));

  
  useEffect(() => {
    const handleMouseMove = (event) => {
      const rotationY = ((event.clientX / window.innerWidth) - 0.5) * 0.2;
      const rotationX = ((event.clientY / window.innerHeight) - 0.5) * 0.2; 
  
      const positionX = ((event.clientX / window.innerWidth) - 0.5) * 0.7;
      const positionY = ((event.clientY / window.innerHeight) - 0.5) * -0.7; 
  
      setSpring({ rotation: [rotationX, rotationY, 0], position: [positionX-1.3, positionY-0.5, 0] });
    };
  
    const handleMouseOut = () => {
      setSpring({ rotation: [center.x, center.y, center.z], position: [-center.x -1.3, -center.y-0.5, -center.z] });
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
    <Html transform scale={0.5} position={[1.2, 3.5, 0]} >
      <TextTyper/>
    </Html>
      <Text color="white" position={[1.3, 1, 0.5]} scale={scale}  anchorX="center" anchorY="middle">
      I am 
      </Text>
      {text.split('').map((char, index) => (
        <AnimatedLetter key={index} char={char} index={index} nscale={scale} />
      ))}
    </animated.mesh>
    <Text color="white" position={[0, -1.45, 0.5]} scale={0.3}  anchorX="center" anchorY="middle">
      your
    </Text>
    <TextRing nscale={scale}>
      DevOps
    </TextRing>
    <Text color="white" position={[0, -2.45, 0.5]} scale={0.3}  anchorX="center" anchorY="middle">
      guy
    </Text>
    </>
    
  );
}
function ccccc(children, color) {
  const fontSize = 110

  const canvas = document.createElement('canvas')
  canvas.width = 2048
  canvas.height = 2048
  const context = canvas.getContext('2d')

  context.fillStyle = "rgba(0, 0, 0, 0)"
  context.fillRect(0, 0, canvas.width, canvas.height)

  context.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif`
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillStyle = color
  context.fillText("WebDev Backend ML DevOps MLOps", 1024, canvas.height / 2)
  return canvas

}

function TextRing({ children ,nscale}) {

  const texts = children.split('\n');

  const canvas = useMemo(() => {
    return ccccc(texts, "white");
  }, [children]);

  const backCanvas = useMemo(() => {
    return ccccc(texts, "red");
  }, [children]);

  const texture = useRef()
  const texture2 = useRef()

  const [isHovered, setIsHovered] = useState(false);
  const bind = useHover(({ hovering }) => setIsHovered(hovering));
  const offset = useRef(0);

  const targetOffset = useRef(0);

  useFrame(({ clock }) => {
    const speed = isHovered ? 2 : 12; // Slow down rotation when hovered
    const delta = clock.getDelta() * speed;
    targetOffset.current += delta;

    // Use lerp to smooth the transition
    offset.current = THREE.MathUtils.lerp(offset.current, targetOffset.current, 0.01);

    texture.current.offset.x = offset.current;
    texture2.current.offset.x = offset.current;
  });

  const cylArgs = [6, 6, 14, 128, 1, true]

  return (
      <group {...bind()} rotation-y={Math.PI / 4} position={(nscale>0.3)?[0,-2.2,-3]:[0,-2.7,-3] } scale={nscale}>
        {/* <primitive object={target.texture} ref={texture} wrapS={THREE.RepeatWrapping} wrapT={THREE.RepeatWrapping} repeat={[1, 1]} /> */}
        <Cylinder args={cylArgs} side={FrontSide}>
          <meshStandardMaterial transparent attach="material">
            <canvasTexture
              attach="map"
              image={canvas}
              premultiplyAlpha
              ref={texture}
              wrapS={RepeatWrapping}
              wrapT={RepeatWrapping}
              onUpdate={(s) => (s.needsUpdate = true)}
            />
          </meshStandardMaterial>
        </Cylinder>

        <Cylinder args={cylArgs}>
          <meshStandardMaterial attach="material" transparent side={BackSide}>
            <canvasTexture
              attach="map"
              image={backCanvas}
              premultiplyAlpha
              ref={texture2}
              wrapS={RepeatWrapping}
              wrapT={RepeatWrapping}
              onUpdate={(s) => (s.needsUpdate = true)}
            />
          </meshStandardMaterial>
        </Cylinder>
      </group>

  )
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
    <div className="h-[100vh] w-full relative">
      <Canvas style={{ width: '100vw', height: '100vh' }} camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 10, 0]} intensity={1.5} />
        <Suspense fallback={<Loader />}>
          <Plane args={[100, 100]} position={[0, 0, -10]}>
            <meshBasicMaterial attach="material" map={gradientTexture} depthTest={false} />
          </Plane>
          <InnerComponent />
        </Suspense>
      </Canvas> 
      
    </div>
  );
}



export default ModelViewer;