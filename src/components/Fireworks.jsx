import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

const COLORS = ['#ffcf5a', '#ff8fb1', '#8fd3ff', '#b8ff9e', '#ffffff', '#ff9f5a', '#d7a6ff'];

// 背景星星 + 煙火。父元件用 ref 呼叫 start(x, y) / stop()
const Fireworks = forwardRef(function Fireworks({ containerRef }, ref) {
  const starsRef = useRef(null);
  const fxRef = useRef(null);
  const engine = useRef({ W: 0, H: 0, stars: [], particles: [], rockets: [], launching: false });

  const reduce = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function burst(x, y) {
    const e = engine.current;
    const c1 = COLORS[Math.random() * COLORS.length | 0];
    const c2 = COLORS[Math.random() * COLORS.length | 0];
    const n = reduce ? 30 : 70 + Math.random() * 40 | 0;
    const speed = 2.5 + Math.random() * 2.5;
    for (let i = 0; i < n; i++) {
      const a = Math.PI * 2 * i / n + Math.random() * 0.1;
      const s = speed * (0.6 + Math.random() * 0.5);
      e.particles.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1,
        decay: 0.009 + Math.random() * 0.01, c: Math.random() < 0.7 ? c1 : c2, r: 1.6 + Math.random() * 1.4 });
    }
  }

  function launch() {
    const e = engine.current;
    const x = e.W * (0.12 + Math.random() * 0.76);
    const ty = e.H * (0.12 + Math.random() * 0.35);
    e.rockets.push({ x, y: e.H, vy: -Math.sqrt(2 * 0.12 * (e.H - ty)), ty });
  }

  useImperativeHandle(ref, () => ({
    start(x, y) {
      burst(x, y); burst(x, y);
      for (let i = 0; i < 4; i++) setTimeout(launch, i * 180);
      engine.current.launching = true;
    },
    stop() { engine.current.launching = false; },
  }));

  useEffect(() => {
    const e = engine.current;
    const ctx = fxRef.current.getContext('2d');
    const sctx = starsRef.current.getContext('2d');
    let raf = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      e.W = containerRef.current.clientWidth;
      e.H = containerRef.current.clientHeight;
      for (const c of [fxRef.current, starsRef.current]) { c.width = e.W * dpr; c.height = e.H * dpr; }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      e.stars = Array.from({ length: Math.round(e.W * e.H / 5000) }, () => ({
        x: Math.random() * e.W, y: Math.random() * e.H * 0.8, r: Math.random() * 1.4 + 0.3, p: Math.random() * 6.28 }));
    }

    function frame(t) {
      const { W, H } = e;
      sctx.clearRect(0, 0, W, H);
      for (const s of e.stars) {
        sctx.fillStyle = `rgba(255,246,234,${reduce ? 0.7 : 0.45 + 0.45 * Math.sin(t / 700 + s.p)})`;
        sctx.beginPath(); sctx.arc(s.x, s.y, s.r, 0, 6.283); sctx.fill();
      }

      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,0.22)';
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';

      if (e.launching && Math.random() < (reduce ? 0.02 : 0.06)) launch();

      for (let i = e.rockets.length - 1; i >= 0; i--) {
        const r = e.rockets[i];
        r.y += r.vy; r.vy += 0.12;
        ctx.fillStyle = '#ffe9b0';
        ctx.beginPath(); ctx.arc(r.x, r.y, 2.2, 0, 6.283); ctx.fill();
        if (r.vy >= 0 || r.y <= r.ty) { burst(r.x, r.y); e.rockets.splice(i, 1); }
      }
      for (let i = e.particles.length - 1; i >= 0; i--) {
        const p = e.particles[i];
        p.x += p.vx; p.y += p.vy; p.vx *= 0.985; p.vy = p.vy * 0.985 + 0.045; p.life -= p.decay;
        if (p.life <= 0) { e.particles.splice(i, 1); continue; }
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.c;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <>
      <canvas className="stars" ref={starsRef} />
      <canvas id="fx" ref={fxRef} />
    </>
  );
});

export default Fireworks;
