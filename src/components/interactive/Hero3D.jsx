import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Icosahedron, MeshDistortMaterial } from '@react-three/drei';

/**
 * Ambient WebGL object that lives behind the hero. It gently bobs (Float),
 * distorts over time (MeshDistortMaterial) and tilts toward the pointer.
 * Rendered low-opacity + blurred via CSS so it reads as depth, not clutter.
 */
function MorphingCrystal({ isDark, reducedMotion }) {
  const meshRef = useRef();

  // Colors tuned to the existing blue / indigo / purple palette.
  const color = isDark ? '#4f46e5' : '#6366f1';
  const emissive = isDark ? '#1e1b4b' : '#a5b4fc';

  useFrame((state, delta) => {
    if (!meshRef.current || reducedMotion) return;
    const { pointer } = state;
    // Smoothly tilt toward the pointer for a parallax-like reaction.
    meshRef.current.rotation.y += delta * 0.15;
    meshRef.current.rotation.x +=
      (pointer.y * 0.4 - meshRef.current.rotation.x) * 0.05;
    meshRef.current.rotation.z +=
      (-pointer.x * 0.4 - meshRef.current.rotation.z) * 0.05;
  });

  return (
    <Float
      speed={reducedMotion ? 0 : 1.4}
      rotationIntensity={reducedMotion ? 0 : 0.6}
      floatIntensity={reducedMotion ? 0 : 1.2}
    >
      <Icosahedron ref={meshRef} args={[1.6, 6]}>
        <MeshDistortMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.4}
          distort={reducedMotion ? 0.2 : 0.45}
          speed={reducedMotion ? 0 : 2.2}
          roughness={0.35}
          metalness={0.5}
        />
      </Icosahedron>
    </Float>
  );
}

export default function Hero3D({ isDark = true }) {
  const reducedMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={reducedMotion ? 'demand' : 'always'}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1.6} />
      <pointLight position={[-5, -5, -2]} intensity={1.4} color="#818cf8" />
      <pointLight position={[5, -3, 4]} intensity={1.0} color="#c084fc" />
      <MorphingCrystal isDark={isDark} reducedMotion={reducedMotion} />
    </Canvas>
  );
}
