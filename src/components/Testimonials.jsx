import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/content';
import { Reveal, Section, SectionHeading } from './ui';

export default function Testimonials() {
  return (
    <Section id="testimonials" className="border-t border-white/5 bg-ink-900/40">
      <SectionHeading eyebrow="Testimonials" title="What Teams" highlight="Say" />

      <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-2">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1} className="h-full">
            <figure className="card ring-gradient glow-hover relative flex h-full flex-col p-8 transition-transform duration-300 hover:-translate-y-1.5">
              <Quote className="size-8 text-brand-500/40" />
              <blockquote className="mt-5 flex-1 text-base leading-relaxed text-slate-200">“{t.quote}”</blockquote>
              <figcaption className="mt-6 border-t border-white/8 pt-5">
                <span className="block font-display font-semibold text-white">{t.name}</span>
                <span className="block text-sm text-slate-500">{t.role}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
