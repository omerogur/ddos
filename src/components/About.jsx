import { ArrowRight } from 'lucide-react';
import { BENEFITS, FEATURES } from '../data/content';
import { ButtonLink, Reveal, Section, SectionHeading } from './ui';

export default function About() {
  return (
    <Section id="about">
      <SectionHeading
        eyebrow="About Ddosphere"
        title="What We"
        highlight="Offer"
        description="Everything you need to run authorized resilience tests, measure the results, and act on them."
      />

      <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={(i % 5) * 0.06} className="h-full">
            <article className="card ring-gradient glow-hover group h-full p-6 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.05]">
              <span className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400/25 to-brand-600/10 text-brand-300 shadow-[inset_0_1px_0_0_rgb(255_255_255/0.1)] ring-1 ring-brand-500/25 transition-all duration-300 group-hover:scale-110 group-hover:text-brand-200">
                <f.icon className="size-5" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.text}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-28 grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading align="left" eyebrow="Benefits" title="Why do you need" highlight="Ddosphere?" />
          <Reveal delay={0.1} className="mt-8">
            <ButtonLink href="#pricing">
              Show Plans <ArrowRight className="size-4" />
            </ButtonLink>
          </Reveal>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.08} className="h-full">
              <article className="card ring-gradient glow-hover relative h-full overflow-hidden p-6 transition-transform duration-300 hover:-translate-y-1.5">
                <span className="absolute -top-5 -right-1 font-display text-8xl font-bold text-white/[0.04]">0{i + 1}</span>
                <span className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-b from-brand-400 to-brand-600 text-white shadow-[0_8px_20px_-6px_rgb(240_106_0/0.6),inset_0_1px_0_0_rgb(255_255_255/0.3)]">
                  <b.icon className="size-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">{b.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{b.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
