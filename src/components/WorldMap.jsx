import { useEffect, useRef } from 'react';
import LAND from '../data/land.json';

// City hubs [name, lon, lat] — drawn as glowing nodes.
const HUBS = [
  ['Los Angeles', -118, 34], ['San Francisco', -122, 37.7], ['Chicago', -87.6, 41.9],
  ['New York', -74, 40.7], ['Toronto', -79.4, 43.7], ['Mexico City', -99.1, 19.4],
  ['Miami', -80.2, 25.8], ['Denver', -105, 39.7], ['Vancouver', -123, 49.2],
  ['Bogotá', -74, 4.7], ['Lima', -77, -12], ['São Paulo', -46.6, -23.5], ['Buenos Aires', -58.4, -34.6],
  ['London', -0.1, 51.5], ['Paris', 2.3, 48.9], ['Frankfurt', 8.7, 50.1], ['Madrid', -3.7, 40.4],
  ['Rome', 12.5, 41.9], ['Stockholm', 18, 59.3], ['Moscow', 37.6, 55.7], ['Amsterdam', 4.9, 52.4],
  ['Lagos', 3.4, 6.5], ['Cairo', 31.2, 30], ['Johannesburg', 28, -26.2], ['Nairobi', 36.8, -1.3],
  ['Istanbul', 29, 41], ['Dubai', 55.3, 25.3], ['Tehran', 51.4, 35.7],
  ['Mumbai', 72.9, 19.1], ['Delhi', 77.2, 28.6], ['Singapore', 103.8, 1.4], ['Bangkok', 100.5, 13.7],
  ['Hong Kong', 114.2, 22.3], ['Beijing', 116.4, 39.9], ['Shanghai', 121.5, 31.2],
  ['Tokyo', 139.7, 35.7], ['Seoul', 127, 37.5], ['Sydney', 151.2, -33.9], ['Perth', 115.9, -31.9],
];

// Curated routes [srcIdx, dstIdx] converging on a few targets.
const ROUTES = [
  [3, 15], [0, 15], [35, 15], [11, 15], [22, 15], [19, 15], [16, 15], [1, 3],
  [37, 26], [30, 26], [28, 26], [23, 26], [25, 26], [32, 35], [36, 30], [33, 30],
  [6, 3], [13, 3], [12, 3], [5, 3], [10, 11], [24, 26],
];
const TARGETS = [15, 26, 3, 30, 35];

export default function WorldMap() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const parent = canvas.parentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const landCv = document.createElement('canvas');
    const lctx = landCv.getContext('2d');

    let W = 0;
    let H = 0;
    let dpr = 1;
    let scale = 1;
    let offX = 0;
    let offY = 0;
    let hubs = [];
    let routes = [];
    let raf = 0;
    let running = false;
    let last = 0;
    let clock = 0;
    let ripples = [];

    // Equirectangular projection, map fitted to width and centred.
    const px = (lon) => offX + (lon + 180) * scale;
    const py = (lat) => offY + (90 - lat) * scale;
    const bez = (p0, c, p1, t) => {
      const u = 1 - t;
      return {
        x: u * u * p0.x + 2 * u * t * c.x + t * t * p1.x,
        y: u * u * p0.y + 2 * u * t * c.y + t * t * p1.y,
      };
    };

    // Unwrap a ring's longitudes so antimeridian crossings stay continuous.
    const unwrap = (ring) => {
      const out = [];
      let prev = ring[0][0];
      let acc = prev;
      out.push([acc, ring[0][1]]);
      for (let i = 1; i < ring.length; i++) {
        let d = ring[i][0] - prev;
        if (d > 180) d -= 360;
        else if (d < -180) d += 360;
        acc += d;
        prev = ring[i][0];
        out.push([acc, ring[i][1]]);
      }
      return out;
    };

    const drawLand = () => {
      lctx.setTransform(1, 0, 0, 1, 0, 0);
      lctx.clearRect(0, 0, landCv.width, landCv.height);
      lctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const polys = [];
      for (const f of LAND.features) {
        const g = f.geometry;
        if (!g) continue;
        if (g.type === 'Polygon') polys.push(g.coordinates);
        else if (g.type === 'MultiPolygon') for (const p of g.coordinates) polys.push(p);
      }

      for (const poly of polys) {
        const rings = poly.map(unwrap);
        // Draw at -360, 0, +360 so wrapped continents show on both edges (canvas clips).
        for (const shift of [-360, 0, 360]) {
          lctx.beginPath();
          for (const ring of rings) {
            for (let i = 0; i < ring.length; i++) {
              const x = px(ring[i][0] + shift);
              const y = py(ring[i][1]);
              if (i === 0) lctx.moveTo(x, y);
              else lctx.lineTo(x, y);
            }
            lctx.closePath();
          }
          lctx.fillStyle = '#181c22';
          lctx.fill('evenodd');
          lctx.lineWidth = 0.6;
          lctx.strokeStyle = 'rgba(120,140,160,0.14)';
          lctx.stroke();
        }
      }
    };

    const setup = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = parent.clientWidth;
      H = parent.clientHeight;
      scale = W / 360;
      offX = 0;
      offY = (H - 180 * scale) / 2;
      for (const cv of [canvas, landCv]) {
        cv.width = W * dpr;
        cv.height = H * dpr;
      }
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      hubs = HUBS.map(([name, lon, lat], i) => ({ name, x: px(lon), y: py(lat), target: TARGETS.includes(i) }));
      routes = ROUTES.map(([a, b], i) => {
        const p0 = hubs[a];
        const p1 = hubs[b];
        const mid = { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 };
        const d = Math.hypot(p1.x - p0.x, p1.y - p0.y);
        let nx = -(p1.y - p0.y) / d;
        let ny = (p1.x - p0.x) / d;
        if (ny > 0) { nx = -nx; ny = -ny; }
        const lift = d * 0.16 + 10;
        return {
          p0,
          p1,
          c: { x: mid.x + nx * lift, y: mid.y + ny * lift },
          dur: 2.4 + Math.random() * 1.8,
          gap: 0.6 + Math.random() * 2,
          t: -(i * 0.12 + Math.random() * 0.9),
          hit: false,
        };
      });
      drawLand();
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(landCv, 0, 0, W, H);

      // Faint route wires.
      ctx.globalCompositeOperation = 'lighter';
      ctx.lineCap = 'round';
      for (const r of routes) {
        ctx.beginPath();
        ctx.moveTo(r.p0.x, r.p0.y);
        ctx.quadraticCurveTo(r.c.x, r.c.y, r.p1.x, r.p1.y);
        ctx.strokeStyle = 'rgba(255,150,50,0.10)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Slow travelling light with a streaking tail.
      const TAIL = 34;
      const TAIL_LEN = 0.32;
      for (const r of routes) {
        if (r.t < 0 || r.t > 1) continue;
        for (let i = 0; i < TAIL; i++) {
          const tt = r.t - (i / TAIL) * TAIL_LEN;
          if (tt < 0) break;
          const p = bez(r.p0, r.c, r.p1, tt);
          const k = 1 - i / TAIL;
          ctx.globalAlpha = k * k * 0.9;
          ctx.fillStyle = `rgba(255,${180 + Math.round(50 * k)},${95 + Math.round(60 * k)},1)`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 0.7 + 2.4 * k, 0, Math.PI * 2);
          ctx.fill();
        }
        const head = bez(r.p0, r.c, r.p1, r.t);
        const hg = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 12);
        hg.addColorStop(0, 'rgba(255,250,232,1)');
        hg.addColorStop(0.35, 'rgba(255,190,100,0.55)');
        hg.addColorStop(1, 'rgba(255,138,0,0)');
        ctx.globalAlpha = 1;
        ctx.fillStyle = hg;
        ctx.beginPath();
        ctx.arc(head.x, head.y, 12, 0, Math.PI * 2);
        ctx.fill();
      }

      // Impact ripples where light arrives.
      for (const rp of ripples) {
        const e = rp.age;
        const rad = 2 + e * 20;
        ctx.globalAlpha = (1 - e) * 0.7;
        ctx.strokeStyle = 'rgba(255,205,140,1)';
        ctx.lineWidth = 1.4 * (1 - e) + 0.4;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rad, 0, Math.PI * 2);
        ctx.stroke();
      }

      // City nodes: glowing white dots (targets brighter + pulse).
      for (const h of hubs) {
        const R = h.target ? 14 : 7;
        const pulse = h.target ? 0.5 + 0.5 * Math.sin(clock * 1.6 + h.x) : 0.5;
        const g = ctx.createRadialGradient(h.x, h.y, 0, h.x, h.y, R);
        g.addColorStop(0, `rgba(255,225,180,${(h.target ? 0.28 : 0.16) * (0.6 + 0.4 * pulse)})`);
        g.addColorStop(1, 'rgba(255,170,80,0)');
        ctx.globalAlpha = 1;
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(h.x, h.y, R, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = h.target ? 'rgba(255,248,235,1)' : 'rgba(255,235,210,0.85)';
        ctx.beginPath();
        ctx.arc(h.x, h.y, h.target ? 2.4 : 1.7, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    };

    const frame = (now) => {
      if (!running) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      clock += dt;
      for (const r of routes) {
        r.t += dt / r.dur;
        if (r.t >= 1 && !r.hit) {
          r.hit = true;
          ripples.push({ x: r.p1.x, y: r.p1.y, age: 0 });
        }
        if (r.t > 1 + r.gap / r.dur) {
          r.t = -(Math.random() * 1.2) / r.dur;
          r.hit = false;
        }
      }
      for (const rp of ripples) rp.age += dt / 0.85;
      ripples = ripples.filter((rp) => rp.age < 1);
      draw();
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || reduce) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    setup();
    if (reduce) {
      for (const r of routes) r.t = 0.6;
      draw();
    } else {
      start();
    }

    const ro = new ResizeObserver(() => setup());
    ro.observe(parent);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0 });
    io.observe(canvas);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
