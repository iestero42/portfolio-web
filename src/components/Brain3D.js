import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Brain3D = () => {
  const meshRef = useRef();

  const brainGeometry = useMemo(() => {
    const geometry = new THREE.SphereGeometry(1.5, 16, 16);
    const positionAttribute = geometry.attributes.position;

    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i);
      const z = positionAttribute.getZ(i);

      // Distort the sphere to create brain-like folds
      const distortionFactor = 0.2;
      const noise = new THREE.Vector3(
        Math.sin(x * 4 + y * 3) * distortionFactor,
        Math.sin(y * 4 + z * 3) * distortionFactor,
        Math.sin(z * 4 + x * 3) * distortionFactor
      );

      positionAttribute.setXYZ(i, x + noise.x, y + noise.y, z + noise.z);
    }

    geometry.computeVertexNormals();
    return geometry;
  }, []);

  const retroMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec3 vNormal;
        void main() {
          vec3 retroColor = vec3(0.0, 1.0, 0.0);
          float intensity = dot(vNormal, vec3(0.0, 0.0, 1.0));
          intensity = step(0.5, intensity);
          gl_FragColor = vec4(retroColor * intensity, 1.0);
        }
      `,
      wireframe: true,
    });
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.material.uniforms.time.value += delta;
    }
  });

  return <mesh ref={meshRef} geometry={brainGeometry} material={retroMaterial} />;
};

export default Brain3D;