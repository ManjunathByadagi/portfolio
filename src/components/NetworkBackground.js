import React, { useEffect, useRef } from 'react';

const COLORS = ['#8b7fff', '#00e8ff', '#4aa3ff'];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function makeNodes(width, height) {
  const area = width * height;
  const count = clamp(Math.floor(area / 26000), 42, 82);

  return Array.from({ length: count }, (_, i) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    baseX: Math.random() * width,
    baseY: Math.random() * height,
    size: Math.random() * 1.35 + 0.75,
    depth: Math.random() * 0.8 + 0.25,
    phase: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.00045 + 0.00025,
    drift: Math.random() * 12 + 5,
    color: COLORS[i % COLORS.length],
  }));
}

export default function NetworkBackground() {
  const canvasRef = useRef(null);
  const nodesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0, active: false });
  const projectRef = useRef({ x: 0, y: 0, radius: 0, strength: 0, target: 0, color: '#00e8ff' });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    let raf;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = 1;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodesRef.current = makeNodes(width, height);
    };

    const onMouseMove = (event) => {
      mouseRef.current.tx = event.clientX;
      mouseRef.current.ty = event.clientY;
      mouseRef.current.active = true;
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const onProjectActivate = (event) => {
      const detail = event.detail || {};
      projectRef.current = {
        x: detail.x || width / 2,
        y: detail.y || height / 2,
        radius: detail.radius || 220,
        color: detail.color || '#00e8ff',
        strength: projectRef.current.strength,
        target: detail.active ? 1 : 0,
      };
    };

    const drawGrid = (time) => {
      const offset = (time * 0.006) % 64;
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(139,127,255,0.035)';

      for (let x = -64 + offset; x < width + 64; x += 64) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = -64 + offset; y < height + 64; y += 64) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    const draw = (time) => {
      const mouse = mouseRef.current;
      const project = projectRef.current;
      const nodes = nodesRef.current;

      mouse.x += (mouse.tx - mouse.x) * 0.045;
      mouse.y += (mouse.ty - mouse.y) * 0.045;
      project.strength += (project.target - project.strength) * 0.08;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#06060f';
      ctx.fillRect(0, 0, width, height);
      drawGrid(time);

      const parallaxX = mouse.active ? (mouse.x / width - 0.5) : 0;
      const parallaxY = mouse.active ? (mouse.y / height - 0.5) : 0;

      nodes.forEach((node) => {
        const idleX = Math.cos(time * node.speed + node.phase) * node.drift;
        const idleY = Math.sin(time * node.speed * 1.25 + node.phase) * node.drift;
        const targetX = node.baseX + idleX + parallaxX * node.depth * 22;
        const targetY = node.baseY + idleY + parallaxY * node.depth * 22;

        node.x += (targetX - node.x) * 0.035;
        node.y += (targetY - node.y) * 0.035;
      });

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          const maxDist = 150;

          if (dist > maxDist) continue;

          const midX = (a.x + b.x) / 2;
          const midY = (a.y + b.y) / 2;
          const mouseDist = mouse.active ? Math.hypot(midX - mouse.x, midY - mouse.y) : 9999;
          const projectDist = Math.hypot(midX - project.x, midY - project.y);
          const mouseBoost = clamp(1 - mouseDist / 170, 0, 1);
          const projectBoost = clamp(1 - projectDist / project.radius, 0, 1) * project.strength;
          const pulse = 0.72 + Math.sin(time * 0.002 + i) * 0.28;
          const alpha = (0.035 + (1 - dist / maxDist) * 0.11 + mouseBoost * 0.2 + projectBoost * 0.25) * pulse;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.lineWidth = 0.55 + mouseBoost * 0.5 + projectBoost * 0.7;
          ctx.strokeStyle = `rgba(0,232,255,${clamp(alpha, 0, 0.36)})`;
          ctx.stroke();
        }
      }

      nodes.forEach((node, i) => {
        const mouseDist = mouse.active ? Math.hypot(node.x - mouse.x, node.y - mouse.y) : 9999;
        const projectDist = Math.hypot(node.x - project.x, node.y - project.y);
        const mouseBoost = clamp(1 - mouseDist / 145, 0, 1);
        const projectBoost = clamp(1 - projectDist / project.radius, 0, 1) * project.strength;
        const pulse = projectBoost * (0.75 + Math.sin(time * 0.006 + i) * 0.25);
        const radius = node.size + mouseBoost * 2.1 + pulse * 2.6;
        const glow = 0.2 + mouseBoost * 0.5 + projectBoost * 0.55;

        ctx.beginPath();
        ctx.shadowBlur = 8 + glow * 18;
        ctx.shadowColor = projectBoost > mouseBoost ? project.color : node.color;
        ctx.fillStyle = projectBoost > mouseBoost
          ? `rgba(0,232,255,${0.18 + glow * 0.45})`
          : `rgba(139,127,255,${0.22 + glow * 0.42})`;
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      const gradient = ctx.createRadialGradient(width * 0.72, height * 0.22, 0, width * 0.72, height * 0.22, Math.max(width, height) * 0.8);
      gradient.addColorStop(0, 'rgba(0,232,255,0.055)');
      gradient.addColorStop(0.45, 'rgba(139,127,255,0.035)');
      gradient.addColorStop(1, 'rgba(6,6,15,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('project-card-activate', onProjectActivate);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('project-card-activate', onProjectActivate);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
