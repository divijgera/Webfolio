"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticlesProps {
  count?: number;
  color?: string;
}

function Particles({ count = 100, color = "#4285F4" }: ParticlesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  // Create particle data with fixed home positions
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const homeX = (Math.random() - 0.5) * 14;
      const homeY = (Math.random() - 0.5) * 10;
      const homeZ = (Math.random() - 0.5) * 2;
      temp.push({
        home: new THREE.Vector3(homeX, homeY, homeZ),
        position: new THREE.Vector3(homeX, homeY, homeZ),
        offset: new THREE.Vector3(0, 0, 0),
        scale: Math.random() * 0.4 + 0.25,
        phase: Math.random() * Math.PI * 2, // For gentle bobbing
        bobSpeed: 0.3 + Math.random() * 0.2,
        bobAmount: 0.1 + Math.random() * 0.15,
      });
    }
    return temp;
  }, [count]);

  // Track mouse
  useMemo(() => {
    if (typeof window === "undefined") return;
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    
    timeRef.current += delta;

    const mouseX = mouseRef.current.x * 7;
    const mouseY = mouseRef.current.y * 5;

    particles.forEach((particle, i) => {
      // Gentle bobbing motion around home position
      const bobX = Math.sin(timeRef.current * particle.bobSpeed + particle.phase) * particle.bobAmount;
      const bobY = Math.cos(timeRef.current * particle.bobSpeed * 0.7 + particle.phase) * particle.bobAmount;

      // Check distance from mouse
      const dx = particle.home.x + particle.offset.x - mouseX;
      const dy = particle.home.y + particle.offset.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Repel from mouse - push the offset
      if (dist < 2.5 && dist > 0) {
        const force = (2.5 - dist) / 2.5;
        particle.offset.x += (dx / dist) * force * 0.08;
        particle.offset.y += (dy / dist) * force * 0.08;
      }

      // Smoothly return offset to zero (spring back home)
      particle.offset.x *= 0.96;
      particle.offset.y *= 0.96;

      // Final position = home + offset + bobbing
      particle.position.x = particle.home.x + particle.offset.x + bobX;
      particle.position.y = particle.home.y + particle.offset.y + bobY;
      particle.position.z = particle.home.z;

      dummy.position.copy(particle.position);
      dummy.scale.setScalar(particle.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.08, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </instancedMesh>
  );
}

interface AntigravityProps {
  particleCount?: number;
  particleColor?: string;
}

export default function Antigravity({
  particleCount = 100,
  particleColor = "#4285F4",
}: AntigravityProps) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <Particles count={particleCount} color={particleColor} />
      </Canvas>
    </div>
  );
}
