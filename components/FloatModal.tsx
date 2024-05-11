import React, {useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import { gsap } from 'gsap';

function FloatingWindow({children, position, onStop}) {

    const nodeRef = useRef(null);

    useEffect(() => {
      if (nodeRef.current) {
        gsap.from(nodeRef.current, { opacity: 0, y: -100, duration: 1 });
      }
    }, []);
  
    return (
      <Draggable
        nodeRef={nodeRef}
        position={position}
        onStart={() => gsap.killTweensOf(nodeRef.current)}
        onStop={(e, data) => {
          gsap.set(nodeRef.current, { x: data.x, y: data.y });
          gsap.to(nodeRef.current, { x: data.x, y: data.y, duration: 1 });
          onStop(data);
        }}
      >
        <div ref={nodeRef} style={{ width: 200, height: 200, background: 'lightgray', padding: 20 }}>
          {children}
        </div>
      </Draggable>
    );
  }

export { FloatingWindow };