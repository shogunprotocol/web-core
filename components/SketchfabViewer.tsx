'use client';

import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  useGLTF,
  Environment,
  useProgress,
  Html,
} from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Preload the models
useGLTF.preload('/Shadow_Samurai_0421124229_texture.glb');
useGLTF.preload('/Silent_Sentinel_0421125104_texture.glb');

function Model({
  position,
  rotation,
  modelPath,
  scale = 2,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  modelPath: string;
  scale?: number;
}) {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef<THREE.Group>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Apply lighting and materials
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Enhance existing materials rather than replacing
        if (child.material) {
          // Add some emissive glow to existing materials
          child.material.emissive = new THREE.Color('#44FBDE');
          // child.material.emissive = new THREE.Color('white');
          child.material.emissiveIntensity = 0.15;

          // Adjust material properties for better look
          if (child.material.roughness !== undefined) {
            child.material.roughness = 0.6;
          }
          if (child.material.metalness !== undefined) {
            child.material.metalness = 0.8;
          }
        }
      }
    });
  }, [scene]);

  // Set rotation
  useEffect(() => {
    if (modelRef.current) {
      if (isMobile) {
        // For mobile - adjust rotation to make them face each other more directly
        // Check if this is left or right model based on X position
        if (position[0] < 0) {
          // Left model (Shadow Samurai)
          modelRef.current.rotation.x = Math.PI * 0.05;
          modelRef.current.rotation.y = Math.PI * 0.3; // Turn more toward center
          modelRef.current.rotation.z = 0;
        } else {
          // Right model (Silent Sentinel)
          modelRef.current.rotation.x = Math.PI * 0.05;
          modelRef.current.rotation.y = -Math.PI * 0.5; // Turn more toward center
          modelRef.current.rotation.z = 0;
        }
      } else {
        // Desktop - use original rotation
        modelRef.current.rotation.x = rotation[0];
        modelRef.current.rotation.y = rotation[1];
        modelRef.current.rotation.z = rotation[2];
      }
    }
  }, [rotation, isMobile, position]);

  // Calculate mobile-adjusted position and scale
  const mobilePosition: [number, number, number] = isMobile
    ? [position[0] * 0.4, position[1], position[2]] // Move models more toward center on mobile
    : position;

  const mobileScale = isMobile ? scale * 0.8 : scale; // Make models smaller on mobile

  return (
    <primitive
      ref={modelRef}
      object={scene.clone()}
      scale={mobileScale}
      position={mobilePosition}
    />
  );
}

// Loading component for 3D models
function ModelLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-[#44FBDE] bg-black/80 p-4 rounded-md">
        Loading models: {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

export default function SketchfabViewer() {
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{
          position: [0, 0, isMobile ? 30 : 25],
          fov: isMobile ? 40 : 30,
        }}
        gl={{
          alpha: true,
          antialias: true,
          preserveDrawingBuffer: true,
          powerPreference: 'high-performance',
        }}
        style={{
          background: 'transparent',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        dpr={[1, 2]} // Optimize for different pixel ratios
      >
        {/* Removed background color to make it transparent */}
        <ambientLight intensity={1.5} />
        <spotLight
          position={[10, 5, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1.5}
        />
        <spotLight
          position={[-10, 5, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1.2}
          color="#44FBDE"
        />
        <Suspense fallback={<ModelLoader />}>
          {/* Left Model - Shadow Samurai */}
          <Model
            position={[-9, -3, 0]}
            rotation={[Math.PI * 0.05, Math.PI * 0.35, 0]}
            modelPath="/Shadow_Samurai_0421124229_texture.glb"
            scale={10}
          />

          {/* Right Model - Silent Sentinel */}
          <Model
            position={[9, -3, 0]}
            rotation={[Math.PI * 0.05, -Math.PI * 0.55, 0]}
            modelPath="/Silent_Sentinel_0421125104_texture.glb"
            scale={10}
          />

          <Environment preset="studio" />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}
