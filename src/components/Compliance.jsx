import { COMPLIANCE } from '../data/content';
import { Reveal, Section, SectionHeading } from './ui';

export default function Compliance() {
  return (
    <Section id="compliance" className="border-t border-white/5">
      <SectionHeading
        eyebrow="Safety & Compliance"
        title="Built for"
        highlight="Authorized Testing"
        description="Ddosphere is a controlled platform. Every test is scoped, permissioned, and reversible — so security and legal teams can sign off with confidence."
      />

      <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {COMPLIANCE.map((c, i) => (
          <Reveal key={c.title} delay={(i % 4) * 0.06} className="h-full">
            <article className="card ring-gradient glow-hover group h-full p-6 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.05]">
              <span className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400/25 to-brand-600/10 text-brand-300 shadow-[inset_0_1px_0_0_rgb(255_255_255/0.1)] ring-1 ring-brand-500/25 transition-all duration-300 group-hover:scale-110 group-hover:text-brand-200">
                <c.icon className="size-5" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-white">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{c.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
