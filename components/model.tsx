"use client"

import { useState, useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { gsap } from 'gsap';

const Model = () => {
    const ref = useRef();
    const { scene } = useThree();
    
    const [model, setModel] = useState(null);
    useEffect(() => {
      const loader = new GLTFLoader();
      loader.load('/comp.gltf', (gltf) => {
        const object = gltf.scene;
        object.traverse((node) => {
          if (node.isMesh) {
            node.material = new MeshStandardMaterial({
              color: new Color(0xFFFFFF), // set color to white
            });
          }
        });
        scene.add(object);
        setModel(object);

        // Start the GSAP animation
        gsap.to(object.rotation, {
          y: "+=2*Math.PI", // rotate the model 360 degrees
          duration: 50, // the duration of the animation in seconds
          repeat: -1, // repeat the animation indefinitely
          ease: "none", // linear animation
        });
      });
    }, [scene]);
  
    return model ? <primitive object={model} /> : null;
};

export default Model;