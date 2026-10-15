import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const NirvanaPhoenix: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.z = 8.2;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const emblem = new THREE.Group();
    scene.add(emblem);
    const texture = new THREE.TextureLoader().load('/nirvana-phoenix.png', (loaded) => {
      loaded.colorSpace = THREE.SRGBColorSpace;
      loaded.generateMipmaps = true;
      loaded.minFilter = THREE.LinearMipmapLinearFilter;
      loaded.magFilter = THREE.LinearFilter;
      loaded.anisotropy = renderer.capabilities.getMaxAnisotropy();
      loaded.needsUpdate = true;
      const image = loaded.image as HTMLImageElement;
      const aspect = image.width / image.height;
      const height = 4.15;
      const width = height * aspect;

      // Keep the mark intentionally slim: one luminous face and one matching
      // back face. MeshBasicMaterial keeps both sides equally bright regardless
      // of camera direction, unlike the old stack whose rear turned dark.
      const face = new THREE.Mesh(
        new THREE.PlaneGeometry(width, height),
        new THREE.MeshBasicMaterial({
          map: loaded,
          color: 0xffb467,
          transparent: true,
          opacity: 0.98,
          depthWrite: false,
          side: THREE.FrontSide,
          blending: THREE.AdditiveBlending,
          toneMapped: false,
        })
      );
      const backGlow = new THREE.Mesh(
        new THREE.PlaneGeometry(width, height),
        new THREE.MeshBasicMaterial({
          map: loaded,
          color: 0xffb467,
          transparent: true,
          opacity: 0.98,
          depthWrite: false,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
          toneMapped: false,
        })
      );
      backGlow.position.z = -0.032;
      face.position.z = 0.004;
      emblem.add(backGlow, face);
      emblem.position.y = 0.25;
      renderer.render(scene, camera);
    });

    let dragging = false;
    let moved = false;
    let suppressClick = false;
    let lastX = 0;
    let lastY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let frameId = 0;
    let isVisible = false;
    const onPointerDown = (event: PointerEvent) => {
      dragging = true;
      moved = false;
      lastX = event.clientX;
      lastY = event.clientY;
      velocityX = 0;
      velocityY = 0;
      mount.setPointerCapture(event.pointerId);
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      const deltaX = event.clientX - lastX;
      const deltaY = event.clientY - lastY;
      if (Math.abs(deltaX) + Math.abs(deltaY) > 1) moved = true;
      velocityY = deltaX * 0.008;
      velocityX = deltaY * 0.008;
      emblem.rotation.y += velocityY;
      emblem.rotation.x += velocityX;
      lastX = event.clientX;
      lastY = event.clientY;
    };
    const onPointerUp = (event: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      if (mount.hasPointerCapture(event.pointerId)) mount.releasePointerCapture(event.pointerId);
      if (moved) {
        suppressClick = true;
        window.setTimeout(() => { suppressClick = false; }, 100);
      }
    };
    const onClick = (event: MouseEvent) => {
      if (!suppressClick) return;
      event.preventDefault();
      event.stopPropagation();
    };
    mount.addEventListener('pointerdown', onPointerDown);
    mount.addEventListener('pointermove', onPointerMove);
    mount.addEventListener('pointerup', onPointerUp);
    mount.addEventListener('pointercancel', onPointerUp);
    mount.addEventListener('click', onClick);

    const resizeObserver = new ResizeObserver(() => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    resizeObserver.observe(mount);

    const animate = () => {
      if (!isVisible) return;
      frameId = window.requestAnimationFrame(animate);
      if (!dragging) {
        emblem.rotation.x += velocityX;
        emblem.rotation.y += velocityY + 0.0065;
        velocityX *= 0.94;
        velocityY *= 0.94;
      }
      renderer.render(scene, camera);
    };
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !frameId) frameId = window.requestAnimationFrame(animate);
      if (!isVisible && frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }
    });
    visibilityObserver.observe(mount);

    return () => {
      window.cancelAnimationFrame(frameId);
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      mount.removeEventListener('pointerdown', onPointerDown);
      mount.removeEventListener('pointermove', onPointerMove);
      mount.removeEventListener('pointerup', onPointerUp);
      mount.removeEventListener('pointercancel', onPointerUp);
      mount.removeEventListener('click', onClick);
      texture.dispose();
      emblem.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
          else object.material.dispose();
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-10 cursor-grab touch-pan-y active:cursor-grabbing" aria-label="Drag to rotate the three-dimensional phoenix emblem for NIRVANA 2026" />;
};

