import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function PhotoSphere() {
  const mountRef = useRef(null);
  const meshesRef = useRef([]); // Store the meshes in a ref

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true }); // Make the background transparent

    const canvasWidth = 800; // Set the width of the canvas
    const canvasHeight = 600; // Set the height of the canvas

    renderer.setSize(canvasWidth, canvasHeight);
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    const textureLoader = new THREE.TextureLoader();

    const images = ['/img1.jpg', '/img1.jpg', '/img1.jpg']; // Add more image paths as needed

    images.forEach((image, index) => {
      const geometry = new THREE.SphereGeometry(50, 18, 12); // Adjust the radius as needed
      geometry.scale(-1, 1, 1);

      textureLoader.load(image, (texture) => {
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(Math.random() * 500 - 250, Math.random() * 500 - 250, Math.random() * 500 - 250); // Randomly position each sphere within the larger sphere
        scene.add(mesh);
        meshesRef.current.push(mesh); // Add the mesh to the meshes ref
      });
    });

    camera.position.z = 500; // Adjust the camera position as needed

    const animate = function () {
      requestAnimationFrame(animate);
      controls.update();
      meshesRef.current.forEach(mesh => mesh.lookAt(camera.position)); // Make each mesh look at the camera
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      while (mount.firstChild) {
        mount.removeChild(mount.firstChild);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: '800px', height: '600px' }} />; // Set the size of the div that contains the canvas
}

export { PhotoSphere };