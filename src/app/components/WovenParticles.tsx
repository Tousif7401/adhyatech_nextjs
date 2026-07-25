"use client";

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

/**
 * WovenParticles - Interactive 3D particle system
 * Simple version: Just particles and hover effect
 */
export const WovenParticles = ({
  particleCount = 15000,
  particleSize = 0.015,
  interactionRadius = 2,
  autoRotateSpeed = 0.1,
}: {
  particleCount?: number;
  particleSize?: number;
  interactionRadius?: number;
  autoRotateSpeed?: number;
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const width = container.offsetWidth || 200;
    const height = container.offsetHeight || 200;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // Renderer with transparent background
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Mouse
    const mouse = new THREE.Vector2(0, 0);

    // Particle geometry
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    // Create particles in torus knot formation
    const torusKnot = new THREE.TorusKnotGeometry(0.8, 0.25, 150, 20);

    for (let i = 0; i < particleCount; i++) {
      const vertexIndex = i % torusKnot.attributes.position.count;
      const x = torusKnot.attributes.position.getX(vertexIndex);
      const y = torusKnot.attributes.position.getY(vertexIndex);
      const z = torusKnot.attributes.position.getZ(vertexIndex);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      // White color for all particles
      colors[i * 3] = 1.0; // R
      colors[i * 3 + 1] = 1.0; // G
      colors[i * 3 + 2] = 1.0; // B

      velocities[i * 3] = 0;
      velocities[i * 3 + 1] = 0;
      velocities[i * 3 + 2] = 0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Create circular dot texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.arc(16, 16, 14, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
    }
    const texture = new THREE.CanvasTexture(canvas);

    // Material with circular dots
    const material = new THREE.PointsMaterial({
      size: particleSize,
      vertexColors: true,
      map: texture,
      transparent: true,
      opacity: 1,
      depthWrite: false,
      alphaTest: 0.1,
    });

    const points = new THREE.Points(geometry, material);
    points.position.set(0, 0, -1);
    points.scale.set(1.6, 1.6, 1.6);
    scene.add(points);

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      if (!mountRef.current) return;

      const rect = mountRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    mountRef.current.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', handleMouseMove);

    // Hover effect - reduce opacity on mouse enter
    const handleMouseEnter = () => {
      material.opacity = 0.3;
    };

    const handleMouseLeave = () => {
      material.opacity = 1;
    };

    mountRef.current.addEventListener('mouseenter', handleMouseEnter);
    mountRef.current.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Mouse in world space
      const mouseWorld = new THREE.Vector3(mouse.x * 2, mouse.y * 2, 0);

      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;

        const currentPos = new THREE.Vector3(positions[ix], positions[iy], positions[iz]);
        const originalPos = new THREE.Vector3(originalPositions[ix], originalPositions[iy], originalPositions[iz]);
        const velocity = new THREE.Vector3(velocities[ix], velocities[iy], velocities[iz]);

        // Repel from mouse
        const dist = currentPos.distanceTo(mouseWorld);
        if (dist < interactionRadius) {
          const force = (interactionRadius - dist) * 0.02;
          const direction = new THREE.Vector3()
            .subVectors(currentPos, mouseWorld)
            .normalize();
          velocity.add(direction.multiplyScalar(force));
        }

        // Spring back to original
        const returnForce = new THREE.Vector3()
          .subVectors(originalPos, currentPos)
          .multiplyScalar(0.002);
        velocity.add(returnForce);

        // Damping
        velocity.multiplyScalar(0.92);

        positions[ix] += velocity.x;
        positions[iy] += velocity.y;
        positions[iz] += velocity.z;

        velocities[ix] = velocity.x;
        velocities[iy] = velocity.y;
        velocities[iz] = velocity.z;
      }

      geometry.attributes.position.needsUpdate = true;

      // Auto rotate
      points.rotation.y += autoRotateSpeed * 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (mountRef.current) {
        mountRef.current.removeEventListener('mousemove', handleMouseMove);
        mountRef.current.removeEventListener('mouseenter', handleMouseEnter);
        mountRef.current.removeEventListener('mouseleave', handleMouseLeave);
        if (renderer.domElement && renderer.domElement.parentNode === mountRef.current) {
          mountRef.current.removeChild(renderer.domElement);
        }
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, [particleCount, particleSize, interactionRadius, autoRotateSpeed]);

  return <div ref={mountRef} style={{ position: 'absolute', top: '-450px', left: '360px', width: 'calc(100% - 120px)', height: '100%', zIndex: 0, pointerEvents: 'auto' }} />;
};
