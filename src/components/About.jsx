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

      {/* Benefits — set apart as a distinct framed panel to break the card-on-card rhythm */}
      <Reveal className="mt-32">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-brand-600/12 via-ink-900 to-ink-950 p-8 sm:p-12 lg:p-14">
          <div className="grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_65%)]" />
          <span className="aurora -top-24 right-0 size-80 bg-brand-500/15" />

          <div className="relative grid items-center gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                align="left"
                eyebrow="Benefits"
                title="Why do you need"
                highlight="Ddosphere?"
                description="Beyond running tests — Ddosphere turns every simulation into insight your teams can act on."
              />
              <Reveal delay={0.1} className="mt-8">
                <ButtonLink href="#pricing">
                  Show Plans <ArrowRight className="size-4" />
                </ButtonLink>
              </Reveal>
            </div>

            <dl className="grid gap-x-10 gap-y-12 lg:col-span-7 sm:grid-cols-2">
              {BENEFITS.map((b, i) => (
                <Reveal key={b.title} delay={i * 0.08}>
                  <div className="group relative">
                    <span className="pointer-events-none absolute -top-5 right-0 font-display text-7xl font-bold text-white/[0.05]">
                      0{i + 1}
                    </span>
                    <dt>
                      <span className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-b from-brand-400 to-brand-600 text-white shadow-[0_8px_20px_-6px_rgb(240_106_0/0.6),inset_0_1px_0_0_rgb(255_255_255/0.3)] transition-transform duration-300 group-hover:-translate-y-1">
                        <b.icon className="size-6" />
                      </span>
                      <h3 className="mt-5 font-display text-lg font-semibold text-white">{b.title}</h3>
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-slate-400">{b.text}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
