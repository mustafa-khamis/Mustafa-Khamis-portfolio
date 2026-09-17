import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth <= breakpoint
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [breakpoint]);

  return isMobile;
}

const AnimatedSphere = () => {
  const sphereRef = useRef();
  const isMobile = useIsMobile();

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  // Phones keep the original small, subtle sphere — the larger, bolder
  // version is a desktop-only flourish.
  const scale = isMobile ? 1.15 : 2.3;
  const position = isMobile ? [0, -0.15, -0.6] : [0, -0.1, -0.5];
  const opacity = isMobile ? 0.32 : 0.34;

  return (
    <Sphere ref={sphereRef} args={[1, 64, 64]} scale={scale} position={position}>
      <MeshDistortMaterial
        color="#064a81"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.55}
        metalness={0.05}
        wireframe={true}
        transparent
        opacity={opacity}
      />
    </Sphere>
  );
};

const Particles = ({ count = 500 }) => {
  const mesh = useRef();
  const light = useRef();
  const mouse = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.current.active = true;
    };
    
    const handleMouseLeave = () => {
      mouse.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  // Generate random positions and velocities for particles
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100;
      const factor = Math.random() * 100 + 20;
      const speed = (Math.random() * 0.01 + 0.005) * 0.2; // Slowed down
      const x = Math.random() * 10 - 5;
      const y = Math.random() * 10 - 5;
      const z = Math.random() * 10 - 5;
      temp.push({ time, factor, speed, x, y, z, px: x, py: y, pz: z });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    particles.forEach((particle, i) => {
      let { time, factor, speed, x, y, z } = particle;
      time += speed;
      particle.time = time;
      
      let targetX = x + Math.cos((time / 10) * factor) + (Math.sin(time * 1) * factor) / 10;
      let targetY = y + Math.sin((time / 10) * factor) + (Math.cos(time * 2) * factor) / 10;
      let targetZ = z + Math.cos((time / 10) * factor) + (Math.sin(time * 3) * factor) / 10;

      if (mouse.current.active) {
        const mouseX = mouse.current.x * 6;
        const mouseY = mouse.current.y * 6;
        
        // When mouse is active, particles swarm towards the mouse
        targetX = mouseX + (x * 0.3) + Math.cos((time / 10) * factor) * 0.3;
        targetY = mouseY + (y * 0.3) + Math.sin((time / 10) * factor) * 0.3;
        targetZ = z * 0.3 + Math.sin(time * 3) * 0.3;
      }

      // Smoothly interpolate current position to target position
      particle.px += (targetX - particle.px) * 0.02;
      particle.py += (targetY - particle.py) * 0.02;
      particle.pz += (targetZ - particle.pz) * 0.02;
      
      dummy.position.set(particle.px, particle.py, particle.pz);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <pointLight ref={light} distance={40} intensity={8} color="white" />
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshStandardMaterial color="#064a81" roughness={0.1} />
      </instancedMesh>
    </>
  );
};

export default function HeroCanvas() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#064a81" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#1c5484" />
        <AnimatedSphere />
        {/* <Particles count={300} /> */}
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}
