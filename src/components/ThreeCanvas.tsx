import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { getDevicePerformanceProfile } from '../utils/devicePerformance';

interface ThreeCanvasProps {
  className?: string;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene & Camera setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 8;

    const performanceProfile = getDevicePerformanceProfile();
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !performanceProfile.isLowEndDevice && !performanceProfile.isCoarsePointer,
      powerPreference: 'low-power',
    });
    renderer.setSize(width, height);
    const compactDevice = performanceProfile.isCoarsePointer || performanceProfile.isLowEndDevice;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, compactDevice ? 1 : 1.5));
    
    // Clear existing canvas children if any
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);
    scene.fog = new THREE.FogExp2(0x000000, 0.045);

    // 1. Core wireframe icosahedron — the "dope" artifact
    const coreGeo = new THREE.IcosahedronGeometry(2.2, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    // Inner glow sphere
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x888888,
      transparent: true,
      opacity: 0.05,
    });
    const glow = new THREE.Mesh(new THREE.IcosahedronGeometry(2.1, 2), glowMat);
    group.add(glow);

    // 2. Orbital rings around the core
    const ringMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.18,
    });
    const rings: THREE.Line[] = [];
    for (let i = 0; i < 3; i++) {
      const pts: THREE.Vector3[] = [];
      const radius = 3.2 + i * 0.7;
      for (let a = 0; a <= 64; a++) {
        const angle = (a / 64) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
      }
      const ringGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const ring = new THREE.Line(ringGeo, ringMat);
      ring.rotation.x = (Math.PI / 2.4) * (i % 2 === 0 ? 1 : -1) + i * 0.3;
      ring.rotation.z = i * 0.5;
      group.add(ring);
      rings.push(ring);
    }

    // 3. Starfield particles
    const starCount = compactDevice ? 160 : 700;
    const sGeo = new THREE.BufferGeometry();
    const sPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      sPos[i] = (Math.random() - 0.5) * 40;
      sPos[i + 1] = (Math.random() - 0.5) * 26;
      sPos[i + 2] = (Math.random() - 0.5) * 30 - 4;
    }
    sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
    const sMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.035,
      transparent: true,
      opacity: 0.6,
    });
    const stars = new THREE.Points(sGeo, sMat);
    scene.add(stars); // independent layer, moves opposite for parallax depth

    // 4. Floating glass shards (planes with subtle shine)
    const shardMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.05,
      side: THREE.DoubleSide,
    });
    const shards: THREE.Mesh[] = [];
    for (let i = 0; i < (compactDevice ? 6 : 14); i++) {
      const shard = new THREE.Mesh(
        new THREE.PlaneGeometry(0.6 + Math.random() * 1.8, 0.6 + Math.random() * 1.8, 1, 1),
        shardMat
      );
      shard.position.set((Math.random() - 0.5) * 18, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 8);
      shard.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      group.add(shard);
      shards.push(shard);
    }

    // Mouse tracking
    let targetX = 0;
    let targetY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!compactDevice) window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Animation Loop
    let animationFrameId = 0;
    let isVisible = false;
    const clock = new THREE.Clock();
    const frameInterval = compactDevice ? 1000 / 30 : 1000 / 45;
    let lastFrameTime = 0;

    const animate = (timestamp: number) => {
      if (!isVisible || document.hidden) {
        animationFrameId = 0;
        return;
      }
      animationFrameId = requestAnimationFrame(animate);
      if (timestamp - lastFrameTime < frameInterval) return;
      lastFrameTime = timestamp;
      const t = clock.getElapsedTime();

      // Core pulses & rotates
      core.rotation.y = t * 0.25;
      core.rotation.x = t * 0.11;
      core.scale.setScalar(1 + Math.sin(t * 1.2) * 0.04);
      glow.rotation.y = -t * 0.18;

      // Rings orbit
      rings.forEach((ring, i) => {
        ring.rotation.y = t * (0.12 + i * 0.07) * (i % 2 === 0 ? 1 : -1);
      });

      // Shards drift & tumble
      shards.forEach((shard, i) => {
        shard.rotation.x += 0.0015 + i * 0.00004;
        shard.rotation.y += 0.001;
        shard.position.y += Math.sin(t * 0.5 + i) * 0.0012;
      });

      // Starfield slow drift (opposite direction for parallax)
      stars.rotation.y = -t * 0.01;

      // Smooth mouse follow with camera parallax
      group.rotation.x += (targetY * 0.18 - group.rotation.x) * 0.04;
      group.rotation.y += (targetX * 0.18 - group.rotation.y) * 0.04;
      camera.position.x += (targetX * 0.6 - camera.position.x) * 0.03;
      camera.position.y += (-targetY * 0.4 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !document.hidden && !animationFrameId) animationFrameId = requestAnimationFrame(animate);
      if (!isVisible && animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      }
    });
    visibilityObserver.observe(container);
    const handleVisibilityChange = () => {
      if (document.hidden && animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      } else if (!document.hidden && isVisible && !animationFrameId) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Resize Handling via ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      visibilityObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (!compactDevice) window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className={className} style={{ width: '100%', height: '100%' }} />;
};
