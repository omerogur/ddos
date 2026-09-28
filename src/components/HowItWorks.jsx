import { STEPS } from '../data/content';
import { Reveal, Section, SectionHeading } from './ui';

export default function HowItWorks() {
  return (
    <Section id="how-it-works" className="border-y border-white/5 bg-ink-900/50">
      <SectionHeading
        eyebrow="How It Works"
        title="Steps for"
        highlight="Beginning"
        description="Navigating Security Simplified with Ddosphere"
      />

      <ol className="relative mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {STEPS.map((s, i) => (
          <Reveal key={s.label} delay={(i % 3) * 0.08} className="h-full">
            <li className="card ring-gradient glow-hover group relative h-full overflow-hidden p-7 transition-transform duration-300 hover:-translate-y-1.5">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-xl border border-brand-500/25 bg-brand-500/10 text-brand-300 shadow-[inset_0_1px_0_0_rgb(255_255_255/0.08)] transition-all duration-300 group-hover:scale-110 group-hover:border-brand-500/50">
                  <s.icon className="size-5" />
                </span>
                <span className="font-display text-6xl font-bold text-white/[0.05] transition-colors duration-300 group-hover:text-brand-500/25">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <p className="mt-6 text-xs font-semibold tracking-[0.18em] text-brand-300 uppercase">
                Step {i + 1} – {s.label}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold text-white">{s.text}</h3>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
