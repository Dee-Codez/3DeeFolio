'use client'

import { useState, useRef } from 'react';
import { Text3D } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { a as threeA, useSpring, config } from '@react-spring/three';
import { MeshNormalMaterial } from 'three';
import * as THREE from 'three';

const Letter = ({darktheme, letter, index, letters }) => {
  
  const [hovered, setHovered] = useState(null);
  const [rotationAxis, setRotationAxis] = useState([0, 0, 1]); // default rotation axis is z-axis

  const { rotation: animatedRotation } = useSpring({
    rotation: hovered === index ? rotationAxis.map(axis => axis * 2 * Math.PI) : [0, 0, 0],
    config: config.slow,
  });
  const rotation = animatedRotation as unknown as [number, number, number];


  const hoverTimeout = useRef(null);

  const handlePointerOver = (i) => {
    hoverTimeout.current = setTimeout(() => {
      setHovered(i);
  
      // Choose a random axis
      const axis = Math.floor(Math.random() * 3);
      // Create a unit vector along the chosen axis
      const rotationAxis = [0, 0, 0];
      rotationAxis[axis] = 1;
      setRotationAxis(rotationAxis);
    }, 80);
  };

  const handlePointerOut = () => {
    clearTimeout(hoverTimeout.current);
    setHovered(null);
  };

  return (
    <threeA.mesh
      key={index}
      position={index === 0 ? [-7.3, -1, 0] : [(index - letters.length / 2) * 2.5 - 0.5, -1, 0]}
      onPointerOver={() => handlePointerOver(index)}
      onPointerOut={handlePointerOut}
      rotation={rotation}
    >
      <Text3D size={3} font="/helvetiker_bold.typeface.json">
        {letter}
        {darktheme ? (<meshNormalMaterial attach="material"/>) : (<meshBasicMaterial attach="material" color="#383b40" />)}
      </Text3D>
    </threeA.mesh>
  );
};

function Name({dark}) {
  const letters = "Debam".split('');  

  return (
    <div style={{ width: 'fit-content', height: 'fit-content' }}>
    <Canvas>
      {letters.map((letter, i) => (
        <Letter darktheme={dark} key={i} letter={letter} index={i} letters={letters} />
      ))}
    </Canvas>
  </div>
  );
}


export { Name };