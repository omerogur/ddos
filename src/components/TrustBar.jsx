import { ShieldCheck } from 'lucide-react';
import { AUTHORIZATION, TRUST } from '../data/content';
import { Reveal } from './ui';

export default function TrustBar() {
  const row = [...TRUST.logos, ...TRUST.logos];

  return (
    <section aria-label="Trust and authorization" className="relative border-y border-white/5 bg-ink-900/40 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="flex items-center justify-center gap-2 text-center text-xs font-medium tracking-[0.18em] text-slate-500 uppercase">
            <ShieldCheck className="size-4 text-brand-400" />
            {TRUST.heading}
          </p>
        </Reveal>

        <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <ul className="marquee-track flex w-max items-center gap-4">
            {row.map((name, i) => (
              <li
                key={`${name}-${i}`}
                aria-hidden={i >= TRUST.logos.length}
                className="flex shrink-0 items-center rounded-xl border border-white/8 bg-white/[0.02] px-6 py-3 font-display text-sm font-semibold tracking-wide text-slate-400"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 flex max-w-3xl items-start justify-center gap-2.5 text-center text-xs leading-relaxed text-slate-500">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand-400/80" />
            <span>{AUTHORIZATION.note}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
