import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Activity, Globe2, ShieldCheck, Square } from 'lucide-react';

const INITIAL_BARS = [18, 26, 22, 34, 30, 42, 38, 55, 48, 62, 58, 72, 66, 80, 74, 88, 82, 94, 86, 92, 90, 96, 88, 94];
const CITIES = ['Frankfurt', 'Virginia', 'Singapore', 'São Paulo'];
const INITIAL_SHARES = [34, 27, 21, 18];

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const jitter = (v, amount) => v + (Math.random() - 0.5) * amount;

function formatElapsed(total) {
  const h = String(Math.floor(total / 3600)).padStart(2, '0');
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
  const sec = String(total % 60).padStart(2, '0');
  return `${h}:${m}:${sec}`;
}

// Normalizes jittered weights back to whole percentages that sum to 100.
function nextShares(prev) {
  const raw = prev.map((v) => clamp(jitter(v, 4), 8, 45));
  const sum = raw.reduce((a, b) => a + b, 0);
  const rounded = raw.map((v) => Math.round((v / sum) * 100));
  rounded[0] += 100 - rounded.reduce((a, b) => a + b, 0);
  return rounded;
}

function useLiveConsole(active) {
  const [bars, setBars] = useState(INITIAL_BARS);
  const [elapsed, setElapsed] = useState(42 * 60 + 17);
  const [shares, setShares] = useState(INITIAL_SHARES);
  const [score, setScore] = useState(87);

  useEffect(() => {
    if (!active) return undefined;
    const timer = setInterval(() => {
      setElapsed((t) => t + 1);
      setBars((prev) => [...prev.slice(1), Math.round(clamp(jitter(prev[prev.length - 1], 18), 70, 98))]);
      setShares(nextShares);
      setScore((v) => Math.round(clamp(jitter(v, 3), 82, 92)));
    }, 1000);
    return () => clearInterval(timer);
  }, [active]);

  return { bars, elapsed, shares, score, ticking: elapsed !== 42 * 60 + 17 };
}

export default function HeroConsole() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-40px' });
  const reduceMotion = useReducedMotion();
  const { bars, elapsed, shares, score, ticking } = useLiveConsole(inView && !reduceMotion);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
      aria-hidden="true"
    >
      <div className="absolute -inset-6 rounded-[2rem] bg-brand-500/15 blur-3xl" />
      <div className="card ring-gradient relative overflow-hidden bg-ink-900/85 p-5 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-500/15 text-brand-400">
              <Activity className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">Scheduled resilience test</p>
              <p className="truncate text-xs text-slate-500">example.com · 3 geolocations</p>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Live
          </span>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            { label: 'Status', value: 'Running' },
            { label: 'Regions', value: '3' },
            { label: 'Elapsed', value: formatElapsed(elapsed) },
          ].map((m) => (
            <div key={m.label} className="rounded-xl border border-white/6 bg-white/[0.02] p-3">
              <p className="text-[11px] font-medium tracking-wider text-slate-500 uppercase">{m.label}</p>
              <p className="mt-1 font-display text-base font-semibold text-white tabular-nums sm:text-lg">{m.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-white/6 bg-white/[0.02] p-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-slate-400">Traffic volume</span>
            <span className="text-slate-500">last 24 sec</span>
          </div>
          <div className="mt-3 flex h-28 items-end gap-1">
            {bars.map((h, i) => (
              <motion.span
                key={i}
                className="flex-1 rounded-t-sm bg-gradient-to-t from-brand-600/40 to-brand-400"
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: ticking ? 0.8 : 0.6, delay: ticking ? 0 : 0.6 + i * 0.03 }}
              />
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
          <div className="rounded-xl border border-white/6 bg-white/[0.02] p-4">
            <p className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
              <Globe2 className="size-3.5" /> Geolocations
            </p>
            <ul className="mt-3 space-y-2">
              {CITIES.map((city, i) => (
                <li key={city} className="flex items-center gap-3 text-xs">
                  <span className="w-20 shrink-0 truncate text-slate-300">{city}</span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
                    <motion.span
                      className="block h-full rounded-full bg-brand-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${shares[i] * 2.2}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </span>
                  <span className="w-8 shrink-0 text-right text-slate-500 tabular-nums">{shares[i]}%</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-row gap-3 sm:flex-col">
            <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-5 py-3">
              <ShieldCheck className="size-5 text-emerald-400" />
              <p className="mt-1 font-display text-2xl font-bold text-white tabular-nums">{score}</p>
              <p className="text-[11px] text-slate-400">DRR Score</p>
            </div>
            <div className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-red-500/25 bg-red-500/10 px-5 py-3 text-xs font-semibold text-red-400">
              <Square className="size-3 fill-current" /> Stop
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
