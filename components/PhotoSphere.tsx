import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function PhotoSphere() {
  const mountRef = useRef(null);
  const meshesRef = useRef([]); // Store the meshes in a ref

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true }); // Make the background transparent
    const light = new THREE.AmbientLight(0xffffff); // soft white light
    scene.add(light);
    


    if (window.innerWidth > 1600) {
        // For large screens
        renderer.setSize(window.innerWidth * 0.3, window.innerHeight * 0.4);
      } else {
        // For small screens
        renderer.setSize(window.innerWidth * 0.2, window.innerHeight * 0.4);
      }    mount.appendChild(renderer.domElement);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableZoom = false;
      controls.update();

    const textureLoader = new THREE.TextureLoader();

    const images = ['/img1.jpg', '/img2.jpg', '/img3.jpg','/img4.jpg','/img5.jpg','/img6.jpg']; // Add more image paths as needed

    images.forEach((image, index) => {
        const geometry = new THREE.PlaneGeometry(200, 200, 1, 1); // Use PlaneGeometry for flat circles
      
        textureLoader.load(image, (texture) => {
            const material = new THREE.MeshPhongMaterial({ map: texture, side: THREE.DoubleSide }); // Use MeshPhongMaterial
            const mesh = new THREE.Mesh(geometry, material);
          
            // Position the mesh on the surface of a larger sphere
            const radius = 250; // Radius of the larger sphere
            const phi = Math.acos(-1 + (2 * index) / images.length); // Latitude
            const theta = Math.sqrt(images.length * Math.PI) * phi; // Longitude
            mesh.position.setFromSphericalCoords(radius, phi, theta);
            mesh.lookAt(new THREE.Vector3(0, 0, 0)); // Make the mesh look at the center of the larger sphere
          
            scene.add(mesh);
            meshesRef.current.push(mesh); // Add the mesh to the meshes ref
          });
      });
    camera.position.z = 500; // Adjust the camera position as needed

    let isRotating = true; // Add this line before the animate function
    document.addEventListener('mousedown', () => {
    isRotating = false;
    });

    document.addEventListener('mouseup', () => {
    isRotating = true;
    });

    const animate = function () {
        requestAnimationFrame(animate);
      
        if (isRotating) {
          scene.rotation.x += Math.random() * 0.01;
          scene.rotation.y += Math.random() * 0.01;
          scene.rotation.z += Math.random() * 0.01;
        }
      
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

  return <div ref={mountRef} />; // Set the size of the div that contains the canvas
}

export { PhotoSphere };