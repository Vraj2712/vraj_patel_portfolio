"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number };

const LIGHT_COLOR = "oklch(0.5 0.16 264";
const DARK_COLOR = "oklch(0.73 0.14 264";
const LINK_DISTANCE = 150;
const SPEED = 0.12;

/**
 * A lightweight, hand-rolled canvas particle network: a handful of slowly
 * drifting nodes connected by lines when close together, reading as a
 * subtle "neural network" texture behind the hero. No video, no library.
 *
 * Only mounted by <HeroBackground> when the visitor does NOT prefer
 * reduced motion, so there is no reduced-motion branch to maintain here.
 * Pauses itself when scrolled out of view or when the tab is hidden.
 */
export function NeuralNetworkCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let nodes: Node[] = [];
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let isDark = document.documentElement.classList.contains("dark");
    let rafId = 0;
    let running = false;

    const seedNodes = () => {
      const area = width * height;
      const count = Math.max(24, Math.min(70, Math.round(area / 22000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedNodes();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const color = isDark ? DARK_COLOR : LIGHT_COLOR;

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < LINK_DISTANCE) {
            const alpha = (1 - dist / LINK_DISTANCE) * 0.35;
            ctx.strokeStyle = `${color} / ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const node of nodes) {
        ctx.fillStyle = `${color} / 0.55)`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      if (!running) return;
      draw();
      rafId = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    resize();
    start();

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    intersectionObserver.observe(canvas);

    const onVisibilityChange = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibilityChange);

    const themeObserver = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains("dark");
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
