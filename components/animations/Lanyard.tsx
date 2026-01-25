"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Physics constants
const DAMPING = 0.96;
const ROPE_LENGTH = 3;
const SEGMENTS = 15;

interface RopePointData {
  px: number; py: number; pz: number;
  ox: number; oy: number; oz: number;
  locked: boolean;
}

interface LanyardRopeProps {
  pointsData: RopePointData[];
  color: string;
}

function LanyardRope({ pointsData, color }: LanyardRopeProps) {
  const tubeRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!tubeRef.current || pointsData.length < 2) return;

    const curvePoints = pointsData.map((p) => new THREE.Vector3(p.px, p.py, p.pz));
    const curve = new THREE.CatmullRomCurve3(curvePoints);
    const tubeGeometry = new THREE.TubeGeometry(curve, 20, 0.06, 8, false);
    tubeRef.current.geometry.dispose();
    tubeRef.current.geometry = tubeGeometry;
  });

  return (
    <mesh ref={tubeRef}>
      <tubeGeometry args={[new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -1, 0)]), 20, 0.06, 8, false]} />
      <meshStandardMaterial color={color} roughness={0.3} emissive={color} emissiveIntensity={0.15} />
    </mesh>
  );
}

interface BadgeProps {
  px: number; py: number; pz: number;
  rotZ: number;
  company: "microsoft" | "amazon";
}

function Badge({ px, py, pz, rotZ, company }: BadgeProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.set(px, py, pz);
      groupRef.current.rotation.z = rotZ;
    }
  });

  // Brighter company colors
  const msBlue = "#00b4ff";
  const amzOrange = "#ff9900";

  return (
    <group ref={groupRef}>
      {/* Card base - slightly tinted for each company */}
      <mesh castShadow>
        <boxGeometry args={[1.8, 2.4, 0.08]} />
        <meshStandardMaterial 
          color={company === "microsoft" ? "#f8fbff" : "#fffaf5"} 
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      {/* Company color strip at top - brighter */}
      <mesh position={[0, 0.95, 0.045]}>
        <boxGeometry args={[1.8, 0.5, 0.01]} />
        <meshStandardMaterial 
          color={company === "microsoft" ? msBlue : amzOrange}
          emissive={company === "microsoft" ? msBlue : amzOrange}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Metal clip */}
      <mesh position={[0, 1.25, 0]}>
        <boxGeometry args={[0.4, 0.15, 0.1]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Large Company Logo - centered and prominent */}
      {company === "microsoft" ? (
        <group position={[0, 0.25, 0.045]}>
          {/* Microsoft 4-color logo - larger */}
          <mesh position={[-0.22, 0.22, 0]}><boxGeometry args={[0.38, 0.38, 0.01]} /><meshStandardMaterial color="#f35325" emissive="#f35325" emissiveIntensity={0.2} /></mesh>
          <mesh position={[0.22, 0.22, 0]}><boxGeometry args={[0.38, 0.38, 0.01]} /><meshStandardMaterial color="#81bc06" emissive="#81bc06" emissiveIntensity={0.2} /></mesh>
          <mesh position={[-0.22, -0.22, 0]}><boxGeometry args={[0.38, 0.38, 0.01]} /><meshStandardMaterial color="#05a6f0" emissive="#05a6f0" emissiveIntensity={0.2} /></mesh>
          <mesh position={[0.22, -0.22, 0]}><boxGeometry args={[0.38, 0.38, 0.01]} /><meshStandardMaterial color="#ffba08" emissive="#ffba08" emissiveIntensity={0.2} /></mesh>
        </group>
      ) : (
        <group position={[0, 0.25, 0.06]}>
          {/* Amazon logo - "amazon" text bar with smile */}
          <mesh position={[0, 0.1, 0.01]}>
            <boxGeometry args={[1.0, 0.35, 0.02]} />
            <meshStandardMaterial color="#232f3e" emissive="#4a5568" emissiveIntensity={0.5} />
          </mesh>
          {/* Amazon smile arrow - bright orange */}
          <mesh position={[0.15, -0.15, 0.02]}>
            <boxGeometry args={[0.7, 0.14, 0.03]} />
            <meshStandardMaterial color="#ff9900" emissive="#ff9900" emissiveIntensity={0.8} />
          </mesh>
          {/* Arrow tip */}
          <mesh position={[0.55, -0.06, 0.02]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.18, 0.18, 0.03]} />
            <meshStandardMaterial color="#ff9900" emissive="#ff9900" emissiveIntensity={0.8} />
          </mesh>
        </group>
      )}

      {/* Employee badge style - photo area */}
      <mesh position={[0, -0.55, 0.045]}>
        <boxGeometry args={[1.0, 1.0, 0.01]} />
        <meshStandardMaterial color="#e0e5ea" />
      </mesh>

      {/* Name bar */}
      <mesh position={[0, -1.0, 0.035]}>
        <boxGeometry args={[1.2, 0.15, 0.01]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </group>
  );
}

function createInitialPoints(): RopePointData[] {
  const points: RopePointData[] = [];
  const segmentLength = ROPE_LENGTH / SEGMENTS;
  for (let i = 0; i <= SEGMENTS; i++) {
    const y = 3 - i * segmentLength;
    points.push({ px: 0, py: y, pz: 0, ox: 0, oy: y, oz: 0, locked: i === 0 });
  }
  return points;
}

interface LanyardSceneProps {
  company: "microsoft" | "amazon";
  gravity?: [number, number, number];
  mouseData: { x: number; y: number; isInside: boolean };
}

function LanyardScene({ company, gravity = [0, -40, 0], mouseData }: LanyardSceneProps) {
  const [pointsData, setPointsData] = useState<RopePointData[]>(createInitialPoints);
  const anchorTarget = useRef({ x: 0, y: 3 });

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.02);
    const gx = gravity[0], gy = gravity[1], gz = gravity[2];

    // Update anchor target based on mouse position (only if inside)
    if (mouseData.isInside) {
      anchorTarget.current.x = mouseData.x;
      anchorTarget.current.y = mouseData.y;
    } else {
      // Return to center when mouse leaves
      anchorTarget.current.x += (0 - anchorTarget.current.x) * 0.02;
      anchorTarget.current.y += (3 - anchorTarget.current.y) * 0.02;
    }

    setPointsData(prev => {
      const points = prev.map(p => ({ ...p }));

      // Verlet integration
      points.forEach((p) => {
        if (p.locked) {
          p.px += (anchorTarget.current.x - p.px) * 0.1;
          p.py += (Math.max(anchorTarget.current.y, 1) - p.py) * 0.1;
          p.ox = p.px; p.oy = p.py;
          return;
        }

        const vx = (p.px - p.ox) * DAMPING + gx * dt * dt;
        const vy = (p.py - p.oy) * DAMPING + gy * dt * dt;
        const vz = (p.pz - p.oz) * DAMPING + gz * dt * dt;

        p.ox = p.px; p.oy = p.py; p.oz = p.pz;
        p.px += vx; p.py += vy; p.pz += vz;
      });

      // Constraints
      const segLen = ROPE_LENGTH / SEGMENTS;
      for (let iter = 0; iter < 8; iter++) {
        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i], p2 = points[i + 1];
          const dx = p2.px - p1.px, dy = p2.py - p1.py, dz = p2.pz - p1.pz;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist === 0) continue;
          const diff = (dist - segLen) / dist / 2;
          const cx = dx * diff, cy = dy * diff, cz = dz * diff;
          if (!p1.locked) { p1.px += cx; p1.py += cy; p1.pz += cz; }
          if (!p2.locked) { p2.px -= cx; p2.py -= cy; p2.pz -= cz; }
        }
      }

      return points;
    });
  });

  const lastPoint = pointsData[pointsData.length - 1];
  const secondLast = pointsData[pointsData.length - 2];

  let rotZ = 0;
  if (lastPoint && secondLast) {
    const dx = lastPoint.px - secondLast.px;
    const dy = lastPoint.py - secondLast.py;
    rotZ = Math.atan2(dx, -dy) * 0.5;
  }

  const ropeColor = company === "microsoft" ? "#00d4ff" : "#ffaa00";

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
      <pointLight position={[-5, 5, 5]} intensity={0.7} />
      <pointLight position={[0, -3, 3]} intensity={0.4} color={ropeColor} />
      <LanyardRope pointsData={pointsData} color={ropeColor} />
      <Badge px={lastPoint?.px || 0} py={lastPoint?.py || 0} pz={lastPoint?.pz || 0} rotZ={rotZ} company={company} />
    </>
  );
}

interface LanyardProps {
  company: "microsoft" | "amazon";
  position?: [number, number, number];
  gravity?: [number, number, number];
}

export default function Lanyard({ company, position = [0, 0, 12], gravity = [0, -40, 0] }: LanyardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseData, setMouseData] = useState({ x: 0, y: 3, isInside: false });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const isInside = (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      );

      if (isInside) {
        // Convert to normalized coordinates relative to container
        const x = ((e.clientX - rect.left) / rect.width * 2 - 1) * 4;
        const y = (-((e.clientY - rect.top) / rect.height * 2 - 1)) * 3 + 2;
        setMouseData({ x, y: Math.max(y, 1), isInside: true });
      } else {
        setMouseData(prev => ({ ...prev, isInside: false }));
      }
    };

    const handleMouseLeave = () => {
      setMouseData(prev => ({ ...prev, isInside: false }));
    };

    window.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[450px] cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position, fov: 30 }} dpr={[1, 1.5]} style={{ background: "transparent" }}>
        <LanyardScene company={company} gravity={gravity} mouseData={mouseData} />
      </Canvas>
    </div>
  );
}
