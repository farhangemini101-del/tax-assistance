import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero3DCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // 3D Objects Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Outer Icosahedron Wireframe (Strategic Structure)
    const icosaGeometry = new THREE.IcosahedronGeometry(2.4, 1);
    const icosaWireframe = new THREE.WireframeGeometry(icosaGeometry);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x3b82f6, // Royal blue
      transparent: true,
      opacity: 0.35,
    });
    const icosaLines = new THREE.LineSegments(icosaWireframe, lineMaterial);
    mainGroup.add(icosaLines);

    // 2. Inner Torus Knot (Financial Systems / Continuous Advisory Flow)
    const torusGeometry = new THREE.TorusKnotGeometry(1.2, 0.28, 100, 16);
    const torusMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      metalness: 0.85,
      roughness: 0.2,
      wireframe: false,
    });
    const torusKnot = new THREE.Mesh(torusGeometry, torusMaterial);
    mainGroup.add(torusKnot);

    // 3. Gold Accent Rings (Prestige / Assurance)
    const ringGeo = new THREE.TorusGeometry(1.9, 0.03, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b, // Amber gold
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0xd97706,
      emissiveIntensity: 0.3,
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.rotation.y = Math.PI / 2.5;
    mainGroup.add(ring2);

    // 4. Floating Particles Constellation (Tax Data & Enterprise Nodes)
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 8;
      positions[i + 2] = (Math.random() - 0.5) * 8;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x60a5fa,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x38bdf8, 3, 50);
    blueLight.position.set(4, 4, 4);
    scene.add(blueLight);

    const goldLight = new THREE.PointLight(0xf59e0b, 3.5, 50);
    goldLight.position.set(-4, -3, 3);
    scene.add(goldLight);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      const rect = currentMount.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 1.5;
      targetY = y * 1.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!currentMount) return;
      const width = currentMount.clientWidth;
      const height = currentMount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse lerp
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Rotations
      mainGroup.rotation.y += 0.005;
      mainGroup.rotation.x += 0.002;
      mainGroup.rotation.y += mouseX * 0.03;
      mainGroup.rotation.x += mouseY * 0.03;

      torusKnot.rotation.z += 0.008;
      icosaLines.rotation.y -= 0.003;
      ring1.rotation.z += 0.006;
      ring2.rotation.x -= 0.005;

      particles.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full min-h-[380px] sm:min-h-[440px] pointer-events-none relative z-10"
      aria-hidden="true"
    />
  );
}
