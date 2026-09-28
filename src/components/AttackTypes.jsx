import { ATTACK_LEVELS, ATTACK_TYPES } from '../data/content';
import { Reveal, Section, SectionHeading } from './ui';

function TypeItem({ item, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="group flex gap-5">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400/25 to-brand-600/10 text-brand-300 shadow-[inset_0_1px_0_0_rgb(255_255_255/0.1)] ring-1 ring-brand-500/25 transition-all duration-300 group-hover:scale-110 group-hover:text-brand-200">
          <item.icon className="size-5" />
        </span>
        <div>
          <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{item.text}</p>
        </div>
      </div>
    </Reveal>
  );
}

function Illustration({ src, alt, className = '' }) {
  return (
    <Reveal className={`relative flex items-center justify-center ${className}`}>
      <div className="absolute aspect-square w-3/4 rounded-full bg-brand-500/15 blur-3xl" />
      <span className="absolute aspect-square w-1/2 rounded-full bg-indigo-500/10 blur-2xl" />
      <img src={src} alt={alt} loading="lazy" className="relative w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]" />
    </Reveal>
  );
}

export default function AttackTypes() {
  const groupA = ATTACK_TYPES.slice(0, 3); // TCP family
  const groupB = ATTACK_TYPES.slice(3); // HTTP / UDP / ICMP

  return (
    <Section id="attack-types" className="border-t border-white/5">
      <SectionHeading
        eyebrow="Attack Types & Levels"
        title="Attack Simulation"
        highlight="Types"
        description="The protocols and vectors we test against — so you can validate your defenses across Layer 3, 4, and 7."
      />

      {/* Block A: TCP family + dashboard illustration */}
      <div className="mt-20 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-9">
          {groupA.map((a, i) => (
            <TypeItem key={a.title} item={a} delay={i * 0.08} />
          ))}
        </div>
        <Illustration src="/iso_dashboard.png" alt="Isometric dashboard illustration" className="mx-auto max-w-sm lg:max-w-md" />
      </div>

      {/* Block B: illustration + application / network layer */}
      <div className="mt-24 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Illustration
          src="/iso_server.png"
          alt="Isometric server infrastructure illustration"
          className="order-last mx-auto max-w-[16rem] lg:order-first lg:max-w-xs"
        />
        <div className="space-y-9">
          {groupB.map((a, i) => (
            <TypeItem key={a.title} item={a} delay={i * 0.08} />
          ))}
        </div>
      </div>

      {/* Attack Levels */}
      <div className="mt-28 grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading
            align="left"
            eyebrow="Attack Levels"
            title={ATTACK_LEVELS.heading}
            highlight={ATTACK_LEVELS.highlight}
            description={ATTACK_LEVELS.description}
          />
        </div>
        <Reveal delay={0.1} className="lg:col-span-8">
          <figure className="ring-gradient mx-auto w-full max-w-xl overflow-hidden rounded-3xl bg-white p-4 shadow-[0_30px_70px_-25px_rgb(0_0_0/0.7)] sm:p-5">
            <img
              src={ATTACK_LEVELS.image}
              alt="Maximal volume per phase: five attack levels with their BPS, PPS, and TPS values, from Level 1 (5 Mbps / 5 K / 500) up to Level 5 (50 Gbps / 20 M / 1 M)."
              className="mx-auto h-auto w-full"
              loading="lazy"
            />
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
