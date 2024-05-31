import { useEffect, useRef } from 'react';
import { Mesh, MeshBasicMaterial } from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { extend } from '@react-three/fiber';

type ThreeDTextProps = {
  text: string;
};

extend({TextGeometry})

const ThreeDText: React.FC<ThreeDTextProps> = ({ text }) => {
  
  const font = new FontLoader().load('/helvetiker_bold.typeface.json');

  return (
    <mesh>
      {/* <textGeometry args={["hello", {font: font, size: 80, height: 5}]} /> */}
      <meshBasicMaterial color="white" />
    </mesh>
  );

  
};

export {ThreeDText};