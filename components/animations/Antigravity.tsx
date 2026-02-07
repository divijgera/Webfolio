"use client";

import { useRef, useMemo, memo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Seeded random number generator for consistent results
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

interface ParticlesProps {
  count?: number;
  color?: string;
  frameSkip?: number;
}

function Particles({ count = 100, color = "#4285F4", frameSkip = 1 }: ParticlesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);
  const frameRef = useRef(0);

  // Create particle data with seeded random positions (deterministic)
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const homeX = (seededRandom(i * 3) - 0.5) * 14;
      const homeY = (seededRandom(i * 3 + 1) - 0.5) * 10;
      const homeZ = (seededRandom(i * 3 + 2) - 0.5) * 2;
      temp.push({
        home: new THREE.Vector3(homeX, homeY, homeZ),
        position: new THREE.Vector3(homeX, homeY, homeZ),
        offset: new THREE.Vector3(0, 0, 0),
        scale: seededRandom(i * 5) * 0.4 + 0.25,
        phase: seededRandom(i * 7) * Math.PI * 2,
        bobSpeed: 0.3 + seededRandom(i * 11) * 0.2,
        bobAmount: 0.1 + seededRandom(i * 13) * 0.15,
      });
    }
    return temp;
  }, [count]);

  // Track mouse using useEffect (proper side effect handling)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    frameRef.current += 1;
    if (frameSkip > 1 && frameRef.current % frameSkip !== 0) return;
    
    timeRef.current += delta;

    const mouseX = mouseRef.current.x * 7;
    const mouseY = mouseRef.current.y * 5;
    const repelRadius = 2.5;
    const repelRadiusSq = repelRadius * repelRadius;

    particles.forEach((particle, i) => {
      // Gentle bobbing motion around home position
      const bobX = Math.sin(timeRef.current * particle.bobSpeed + particle.phase) * particle.bobAmount;
      const bobY = Math.cos(timeRef.current * particle.bobSpeed * 0.7 + particle.phase) * particle.bobAmount;

      // Check distance from mouse
      const dx = particle.home.x + particle.offset.x - mouseX;
      const dy = particle.home.y + particle.offset.y - mouseY;
      const distSq = dx * dx + dy * dy;

      // Repel from mouse - push the offset (avoid sqrt unless needed)
      if (distSq < repelRadiusSq && distSq > 0.0001) {
        const dist = Math.sqrt(distSq);
        const force = (repelRadius - dist) / repelRadius;
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
      <sphereGeometry args={[0.08, 6, 6]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </instancedMesh>
  );
}

interface AntigravityProps {
  particleCount?: number;
  particleColor?: string;
}

function Antigravity({
  particleCount = 100,
  particleColor = "#4285F4",
}: AntigravityProps) {
  const isLowPower = useMemo(() => {
    if (typeof window === "undefined") return true;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const lowCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    return Boolean(isMobile || lowCores);
  }, []);

  const effectiveCount = useMemo(() => {
    const capped = Math.min(particleCount, 120);
    return isLowPower ? Math.min(80, capped) : capped;
  }, [particleCount, isLowPower]);

  const dpr = useMemo(() => (isLowPower ? [1, 1] : [1, 1.25]), [isLowPower]);

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={dpr}
        style={{ background: "transparent" }}
      >
        <Particles count={effectiveCount} color={particleColor} frameSkip={isLowPower ? 2 : 1} />
      </Canvas>
    </div>
  );
}

export default memo(Antigravity);
