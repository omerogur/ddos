import { ArrowRight, Check, Crown } from 'lucide-react';
import { PLANS } from '../data/content';
import { ButtonLink, Reveal, Section, SectionHeading } from './ui';

export default function Pricing() {
  return (
    <Section id="pricing">
      <SectionHeading eyebrow="Pricing" title="Package Pricing" highlight="for Ddosphere" />

      <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-3">
        {PLANS.map((plan, i) => (
          <Reveal key={plan.name} delay={i * 0.1} className="h-full">
            <div className={`relative h-full ${plan.featured ? 'lg:-translate-y-4' : ''}`}>
              {plan.featured && (
                <span className="absolute -top-3.5 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-gradient-to-b from-brand-400 to-brand-600 px-3.5 py-1 text-xs font-semibold text-white shadow-[0_6px_16px_-4px_rgb(240_106_0/0.7)]">
                  <Crown className="size-3.5" /> Most Popular
                </span>
              )}
              <article
                className={`relative flex h-full flex-col overflow-hidden rounded-3xl p-8 ${
                  plan.featured
                    ? 'bg-gradient-to-b from-brand-500/25 via-ink-800 to-ink-900 shadow-[0_30px_60px_-20px_rgb(240_106_0/0.4)] ring-1 ring-brand-500/60'
                    : 'card ring-gradient glow-hover transition-transform duration-300 hover:-translate-y-1.5'
                }`}
              >
                {plan.featured && <span className="aurora -top-16 right-0 size-40 bg-brand-500/30" />}
                <h3 className="relative font-display text-sm font-semibold tracking-[0.22em] text-brand-300 uppercase">{plan.name}</h3>
              <p className="relative mt-5 flex items-baseline gap-1.5">
                <span className="font-display text-5xl font-bold tracking-tight text-white">${plan.price.toLocaleString('en-US')}</span>
                <span className="text-sm text-slate-500">/ package</span>
              </p>
              <div className="relative my-7 h-px bg-gradient-to-r from-white/15 to-transparent" />
              <ul className="relative flex-1 space-y-3.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-slate-300">
                    <span
                      className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${
                        plan.featured ? 'bg-brand-500 text-white' : 'bg-brand-500/15 text-brand-300'
                      }`}
                    >
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
                <ButtonLink href="#contact" variant={plan.featured ? 'primary' : 'ghost'} className="relative mt-8 w-full">
                  Get In Touch <ArrowRight className="size-4" />
                </ButtonLink>
              </article>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
