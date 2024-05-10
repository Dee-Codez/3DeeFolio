'use client'

import { useState, useRef, Suspense } from 'react';
import { Text3D } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { a as threeA, useSpring, config } from '@react-spring/three';
import { MeshNormalMaterial } from 'three';

function LoadName() {
  return (
    <div>
      Loading Name Model..
    </div>
  );
}

function Name() {
  const [hovered, setHovered] = useState(null);
  const [rotationAxis, setRotationAxis] = useState([0, 0, 1]); // default rotation axis is z-axis
  const letters = "Debam".split('');
  const hoverTimeout = useRef(null);

  const normalMaterial = new MeshNormalMaterial(); // Create a new MeshNormalMaterial


  const handlePointerOver = (i) => {
    hoverTimeout.current = setTimeout(() => {
      setHovered(i);
      setRotationAxis([Math.random(), Math.random(), Math.random()]); // set a random rotation axis
    }, 80); // delay of 200ms
  };

  const handlePointerOut = () => {
    clearTimeout(hoverTimeout.current);
    setHovered(null);
  };

  return (
    <div style={{ width: 'fit-content', height: 'fit-content' }}>
      <Suspense fallback={<LoadName/>}>
      <Canvas>
        
        {letters.map((letter, i) => {
          const { rotation } = useSpring({
            rotation: hovered === i ? rotationAxis.map(axis => axis * Math.PI / 2) : [0, 0, 0],
            config: config.slow,
          });

          return (
            <threeA.mesh
              key={i}
              position={(i==0)?[-7.3,-1,0]:[(i - letters.length / 2) * 2.5-0.5, -1, 0]} // adjust position based on index
              onPointerOver={() => handlePointerOver(i)}
              onPointerOut={handlePointerOut}
              rotation={rotation} // use the animated rotation value
            >
              <Text3D
                size={3}
                font="/helvetiker_bold.typeface.json"
                material={normalMaterial}
              >
                {letter}
              </Text3D>
            </threeA.mesh>
          );
        })}
        
      </Canvas>
      </Suspense>
    </div>
  );
}


export { Name };