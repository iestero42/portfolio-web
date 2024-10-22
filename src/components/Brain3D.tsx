import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Brain3D = () => {
  const meshRef = useRef();

  const brainGeometry = useMemo(() => {
    // Create base geometry with more segments for better detail
    const geometry = new THREE.SphereGeometry(1.5, 32, 32);
    const positionAttribute = geometry.attributes.position;

    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i);
      const z = positionAttribute.getZ(i);

      // Create more pronounced brain-like folds and structures
      const distortionFactor = 0.25;
      
      // Main cerebral hemispheres division
      const hemisphereDivide = Math.abs(x) * 0.3;
      
      // Create sulci (grooves) and gyri (ridges)
      const sulciFreq = 8.0;
      const sulciDepth = 0.15;
      const gyriPattern = Math.sin(x * sulciFreq) * Math.sin(y * sulciFreq) * Math.sin(z * sulciFreq);
      
      // Create brain stem at bottom
      const brainStem = y < -0.5 ? Math.exp(-Math.pow(x, 2) - Math.pow(z, 2)) * 0.5 : 0;
      
      // Combine all deformations
      const noise = new THREE.Vector3(
        Math.sin(x * 4 + y * 3) * distortionFactor + hemisphereDivide,
        Math.sin(y * 4 + z * 3) * distortionFactor + gyriPattern * sulciDepth + brainStem,
        Math.sin(z * 4 + x * 3) * distortionFactor
      );

      positionAttribute.setXYZ(
        i,
        x + noise.x,
        y + noise.y,
        z + noise.z
      );
    }

    geometry.computeVertexNormals();
    return geometry;
  }, []);

  const retroMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        glowColor: { value: new THREE.Color(0.2, 0.8, 0.4) },
        scanLineIntensity: { value: 0.15 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 glowColor;
        uniform float scanLineIntensity;
        
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          // Basic lighting
          vec3 light = normalize(vec3(1.0, 1.0, 1.0));
          float intensity = dot(vNormal, light) * 0.5 + 0.5;
          
          // Retro scan lines
          float scanLine = sin(vPosition.y * 50.0 + time * 2.0) * scanLineIntensity;
          intensity += scanLine;
          
          // Pulsing glow effect
          float pulse = sin(time) * 0.1 + 0.9;
          
          // Edge highlight
          float edge = 1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0));
          edge = smoothstep(0.5, 1.0, edge);
          
          // Combine effects
          vec3 finalColor = glowColor * intensity * pulse;
          finalColor += vec3(1.0, 1.0, 1.0) * edge * 0.3;
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      wireframe: true,
      transparent: true,
    });
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Smooth rotation
      meshRef.current.rotation.y += delta * 0.2;
      // Gentle bobbing motion
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      // Update shader time
      meshRef.current.material.uniforms.time.value += delta;
    }
  });

  return <mesh ref={meshRef} geometry={brainGeometry} material={retroMaterial} />;
};

export default Brain3D;