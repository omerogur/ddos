import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, CalendarClock, Globe2, ShieldCheck, Users } from 'lucide-react';
import { APP_URL, HERO } from '../data/content';
import HeroConsole from './HeroConsole';
import WorldMap from './WorldMap';
import { ButtonLink } from './ui';

const STATS = [
  { icon: Globe2, value: 'Global', label: 'Geolocations' },
  { icon: CalendarClock, value: '24/7', label: 'Scheduling' },
  { icon: Users, value: '∞', label: 'Team members' },
];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden px-4 pt-32 pb-20 sm:px-6 lg:pt-40 lg:pb-28">
      <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_82%,transparent_100%)]">
        <WorldMap />
      </div>
      {/* Scrim: keep the headline readable over the map without hiding continents. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-ink-950/90 via-ink-950/40 to-transparent" />
      <span className="aurora top-[-22%] left-1/2 h-[560px] w-[820px] -translate-x-1/2 bg-brand-600/15" />
      <span className="aurora top-[10%] right-[-6%] h-[380px] w-[380px] bg-brand-500/10" style={{ animationDelay: '4s' }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl leading-[1.05] font-bold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            {HERO.titleTop}
            <br />
            <span className="text-gradient-brand">{HERO.titleBottom}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400"
          >
            {HERO.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <ButtonLink href="#contact" className="px-6 py-3.5">
              Get In Touch <ArrowRight className="size-4" />
            </ButtonLink>
            <ButtonLink href={APP_URL} variant="ghost" className="px-6 py-3.5">
              Explore Platform <ArrowUpRight className="size-4" />
            </ButtonLink>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-12 grid max-w-lg grid-cols-3 gap-3 border-t border-white/8 pt-8"
          >
            {STATS.map((s) => (
              <div key={s.label} className="card ring-gradient min-w-0 p-3.5">
                <dt className="flex items-center gap-1.5 text-xs text-slate-500">
                  <s.icon className="size-3.5 shrink-0 text-brand-400" />
                  <span className="truncate">{s.label}</span>
                </dt>
                <dd className="mt-1.5 font-display text-2xl font-bold text-white">{s.value}</dd>
              </div>
            ))}
          </motion.dl>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-6 flex items-center gap-2 text-xs text-slate-500"
          >
            <ShieldCheck className="size-4 text-brand-400" />
            Supported by the TÜBİTAK TEYDEB Program · Berlin &amp; Istanbul
          </motion.p>
        </div>

        <HeroConsole />
      </div>
    </section>
  );
}
