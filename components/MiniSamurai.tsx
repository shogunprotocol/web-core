'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import { Suspense, useRef, useEffect } from 'react';
import * as THREE from 'three';

// Preload the Shadow Samurai model
useGLTF.preload('/3D/Shadow_Samurai_0421124229_texture.glb');

function MiniSamuraiModel() {
  const { scene } = useGLTF('/3D/Shadow_Samurai_0421124229_texture.glb');
  const modelRef = useRef<THREE.Group>(null);

  // Apply lighting and materials
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.material) {
          // Add cyan glow to match the theme
          child.material.emissive = new THREE.Color('#44FBDE');
          child.material.emissiveIntensity = 0.2;

          if (child.material.roughness !== undefined) {
            child.material.roughness = 0.5;
          }
          if (child.material.metalness !== undefined) {
            child.material.metalness = 0.9;
          }
        }
      }
    });
  }, [scene]);

  // Subtle breathing animation
  useFrame((state) => {
    if (modelRef.current) {
      const time = state.clock.elapsedTime;
      const breathingScale = 1 + Math.sin(time * 0.5) * 0.02;
      const breathingY = Math.sin(time * 0.3) * 0.1;

      modelRef.current.scale.setScalar(12 * breathingScale);
      modelRef.current.position.y = -3 + breathingY;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene.clone()}
      scale={12}
      position={[0, -3, 0]}
      rotation={[Math.PI * 0.05, -Math.PI * 0.45, 0]}
    />
  );
}

export default function MiniSamurai() {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{
          position: [0, 0, 20],
          fov: 50,
        }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
        style={{
          background: 'transparent',
          width: '100%',
          height: '100%',
        }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.8} />
        <spotLight
          position={[5, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={1.5}
          color="#44FBDE"
        />
        <spotLight
          position={[-5, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={1.2}
          color="#ffffff"
        />

        <Suspense fallback={null}>
          <MiniSamuraiModel />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}
