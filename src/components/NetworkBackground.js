import React, { useEffect, useRef } from 'react';

const COLORS = ['#7C3AED', '#00F5FF', '#4aa3ff'];

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
  const projectRef = useRef({ x: 0, y: 0, radius: 0, strength: 0, target: 0, color: '#00F5FF' });
  const ripplesRef = useRef([]);
  const rippleCursorRef = useRef({ x: 0, y: 0, time: 0 });

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

    const addRipple = (x, y, strength = 0.55, maxRadius = 200) => {
      const ripples = ripplesRef.current;

      ripples.push({
        x,
        y,
        strength,
        maxRadius,
        born: performance.now(),
        life: 1600 + strength * 520,
        wobble: Math.random() * Math.PI * 2,
      });

      if (ripples.length > 18) ripples.splice(0, ripples.length - 18);
    };

    const onPointerMove = (event) => {
      mouseRef.current.tx = event.clientX;
      mouseRef.current.ty = event.clientY;
      mouseRef.current.active = true;
    };

    const onPointerLeave = () => {
      mouseRef.current.active = false;
    };

    const onPointerDown = (event) => {
      mouseRef.current.tx = event.clientX;
      mouseRef.current.ty = event.clientY;
      addRipple(event.clientX, event.clientY, 1, 260);
    };

    const onProjectActivate = (event) => {
      const detail = event.detail || {};
      projectRef.current = {
        x: detail.x || width / 2,
        y: detail.y || height / 2,
        radius: detail.radius || 220,
        color: detail.color || '#00F5FF',
        strength: projectRef.current.strength,
        target: detail.active ? 1 : 0,
      };
    };

    const drawGrid = (time) => {
      const offset = (time * 0.006) % 64;
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(124,58,237,0.035)';

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

    const updateMagneticElements = (mouse) => {
      const elements = document.querySelectorAll('[data-liquid-magnetic]');

      elements.forEach((element) => {
        if (!mouse.active) {
          element.style.setProperty('--mag-x', '0px');
          element.style.setProperty('--mag-y', '0px');
          return;
        }

        const rect = element.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = mouse.x - cx;
        const dy = mouse.y - cy;
        const dist = Math.hypot(dx, dy);
        const radius = 180; // Increased pull radius for water drop effect

        if (dist > radius) {
          element.style.setProperty('--mag-x', '0px');
          element.style.setProperty('--mag-y', '0px');
          return;
        }

        // Smoother liquid curve for water drop morphing
        const pull = Math.pow(1 - dist / radius, 2) * Math.cos((dist / radius) * Math.PI / 3);
        const strength = 0.12; // Increased pull strength for more dramatic water effect
        element.style.setProperty('--mag-x', `${dx * strength * Math.max(0, pull)}px`);
        element.style.setProperty('--mag-y', `${dy * strength * Math.max(0, pull)}px`);
      });
    };

    const drawWavyRing = (x, y, radius, wobble, amplitude, alpha, lineWidth, color) => {
      const steps = 80;

      ctx.beginPath();
      for (let i = 0; i <= steps; i += 1) {
        const angle = (i / steps) * Math.PI * 2;
        const wave = Math.sin(angle * 5 + wobble) * amplitude + Math.cos(angle * 3 - wobble) * amplitude * 0.45;
        const r = radius + wave;
        const px = x + Math.cos(angle) * r;
        const py = y + Math.sin(angle) * r;

        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = color(alpha);
      ctx.stroke();
    };

    const drawRipples = (time) => {
      const activeRipples = [];

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      ripplesRef.current.forEach((ripple) => {
        const age = (time - ripple.born) / ripple.life;
        if (age >= 1) return;

        activeRipples.push(ripple);

        const easeOut = 1 - Math.pow(1 - age, 3);
        const fade = Math.pow(1 - age, 1.35) * ripple.strength;
        const radius = 12 + easeOut * ripple.maxRadius;
        const wobble = ripple.wobble + time * 0.0022;
        const glow = ctx.createRadialGradient(ripple.x, ripple.y, radius * 0.12, ripple.x, ripple.y, radius * 1.05);

        glow.addColorStop(0, `rgba(0,245,255,${0.04 * fade})`);
        glow.addColorStop(0.48, `rgba(124,58,237,${0.03 * fade})`);
        glow.addColorStop(0.72, `rgba(74,163,255,${0.02 * fade})`);
        glow.addColorStop(1, 'rgba(0,245,255,0)');

        ctx.filter = 'blur(10px)';
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, radius * 1.08, 0, Math.PI * 2);
        ctx.fill();

        ctx.filter = 'blur(2px)';
        drawWavyRing(
          ripple.x,
          ripple.y,
          radius,
          wobble,
          2.4 + ripple.strength * 2.2,
          0.12 * fade,
          1.1 + ripple.strength * 0.8,
          (alpha) => `rgba(0,245,255,${alpha})`
        );
        drawWavyRing(
          ripple.x,
          ripple.y,
          radius * 0.66,
          wobble * 0.8,
          1.8,
          0.055 * fade,
          0.8,
          (alpha) => `rgba(124,58,237,${alpha})`
        );
      });

      ctx.restore();
      ctx.filter = 'none';
      ripplesRef.current = activeRipples;
    };

    const drawGlassDistortion = (time) => {
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      ripplesRef.current.forEach((ripple) => {
        const age = (time - ripple.born) / ripple.life;
        if (age >= 1) return;

        const easeOut = 1 - Math.pow(1 - age, 3);
        const fade = Math.pow(1 - age, 1.45) * ripple.strength;
        const radius = 18 + easeOut * ripple.maxRadius;
        const lensRadius = radius * 0.55;
        const wobbleX = Math.sin(time * 0.002 + ripple.wobble) * 3.5 * fade;
        const wobbleY = Math.cos(time * 0.0017 + ripple.wobble) * 3.5 * fade;

        ctx.save();
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, lensRadius, 0, Math.PI * 2);
        ctx.clip();
        ctx.globalAlpha = 0.08 * fade;
        ctx.filter = 'blur(1.5px)';
        ctx.drawImage(
          canvas,
          (ripple.x - lensRadius * 0.82) * dpr,
          (ripple.y - lensRadius * 0.82) * dpr,
          lensRadius * 1.64 * dpr,
          lensRadius * 1.64 * dpr,
          ripple.x - lensRadius * 0.9 + wobbleX,
          ripple.y - lensRadius * 0.9 + wobbleY,
          lensRadius * 1.8,
          lensRadius * 1.8
        );
        ctx.restore();

        const shine = ctx.createRadialGradient(ripple.x - lensRadius * 0.25, ripple.y - lensRadius * 0.28, 0, ripple.x, ripple.y, lensRadius);
        shine.addColorStop(0, `rgba(230,241,255,${0.028 * fade})`);
        shine.addColorStop(0.55, `rgba(0,245,255,${0.018 * fade})`);
        shine.addColorStop(1, 'rgba(0,245,255,0)');
        ctx.fillStyle = shine;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, lensRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
      ctx.filter = 'none';
      ctx.globalAlpha = 1;
    };

    const draw = (time) => {
      const mouse = mouseRef.current;
      const project = projectRef.current;
      const nodes = nodesRef.current;

      mouse.x += (mouse.tx - mouse.x) * 0.045;
      mouse.y += (mouse.ty - mouse.y) * 0.045;
      project.strength += (project.target - project.strength) * 0.08;
      updateMagneticElements(mouse);

      if (mouse.active) {
        const cursor = rippleCursorRef.current;
        const moved = Math.hypot(mouse.x - cursor.x, mouse.y - cursor.y);
        if (moved > 26 && time - cursor.time > 115) {
          addRipple(mouse.x, mouse.y, 0.3, 200);
          rippleCursorRef.current = { x: mouse.x, y: mouse.y, time };
        }
      }

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#05070A';
      ctx.fillRect(0, 0, width, height);
      drawGrid(time);
      drawGlassDistortion(time);
      drawRipples(time);

      const parallaxX = mouse.active ? (mouse.x / width - 0.5) : 0;
      const parallaxY = mouse.active ? (mouse.y / height - 0.5) : 0;

      nodes.forEach((node) => {
        const idleX = Math.cos(time * node.speed + node.phase) * node.drift;
        const idleY = Math.sin(time * node.speed * 1.25 + node.phase) * node.drift;
        let rippleX = 0;
        let rippleY = 0;

        ripplesRef.current.forEach((ripple) => {
          const age = (time - ripple.born) / ripple.life;
          if (age >= 1) return;

          const radius = 12 + (1 - Math.pow(1 - age, 3)) * ripple.maxRadius;
          const dx = node.x - ripple.x;
          const dy = node.y - ripple.y;
          const dist = Math.hypot(dx, dy) || 1;
          const band = Math.exp(-Math.pow((dist - radius) / 58, 2));
          const force = band * ripple.strength * Math.pow(1 - age, 1.4) * 8;

          rippleX += (dx / dist) * force;
          rippleY += (dy / dist) * force;
        });

        const targetX = node.baseX + idleX + parallaxX * node.depth * 22 + rippleX;
        const targetY = node.baseY + idleY + parallaxY * node.depth * 22 + rippleY;

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
          ctx.strokeStyle = `rgba(0,245,255,${clamp(alpha, 0, 0.36)})`;
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
          ? `rgba(0,245,255,${0.18 + glow * 0.45})`
          : `rgba(124,58,237,${0.22 + glow * 0.42})`;
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      const gradient = ctx.createRadialGradient(width * 0.72, height * 0.22, 0, width * 0.72, height * 0.22, Math.max(width, height) * 0.8);
      gradient.addColorStop(0, 'rgba(0,245,255,0.055)');
      gradient.addColorStop(0.45, 'rgba(124,58,237,0.035)');
      gradient.addColorStop(1, 'rgba(5,7,10,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('project-card-activate', onProjectActivate);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('pointerdown', onPointerDown);
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
