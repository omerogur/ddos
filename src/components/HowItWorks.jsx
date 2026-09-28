import { motion, useReducedMotion } from 'framer-motion';
import { STEPS } from '../data/content';
import { Reveal, Section, SectionHeading } from './ui';

const PULSE_TRANSITION = {
  duration: 4.6,
  times: [0, 0.12, 0.85, 1],
  ease: 'linear',
  repeat: Infinity,
  repeatDelay: 0.7,
};

function StepNode({ icon: Icon, index }) {
  return (
    <span className="relative flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-ink-900 text-brand-300 shadow-[inset_0_1px_0_0_rgb(255_255_255/0.06)] ring-1 ring-brand-500/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-brand-200 group-hover:ring-brand-500/60">
      <span className="pointer-events-none absolute inset-0 rounded-2xl bg-brand-500/0 blur-md transition-colors duration-300 group-hover:bg-brand-500/20" />
      <Icon className="relative size-6" />
      <span className="absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full bg-gradient-to-b from-brand-400 to-brand-600 text-[10px] font-bold text-white ring-2 ring-ink-900">
        {index + 1}
      </span>
    </span>
  );
}

export default function HowItWorks() {
  const reduce = useReducedMotion();

  return (
    <Section id="how-it-works" className="border-y border-white/5 bg-ink-900/50">
      <SectionHeading
        eyebrow="How It Works"
        title="Six simple"
        highlight="steps"
        description="A controlled, repeatable process — every test is authorized, observable, and measurable."
      />

      {/* Desktop: horizontal connected stepper */}
      <div className="relative mt-20 hidden lg:block">
        <div className="absolute top-7 right-[8.33%] left-[8.33%] h-px bg-white/10" />
        <motion.div
          className="absolute top-7 left-[8.33%] h-px w-[83.34%] origin-left bg-gradient-to-r from-brand-600 via-brand-400 to-brand-300"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
        {!reduce && (
          <div className="pointer-events-none absolute top-7 right-[8.33%] left-[8.33%]">
            <motion.span
              className="absolute -top-[5px] size-2.5 rounded-full bg-brand-200 shadow-[0_0_16px_6px_rgb(255_138_0/0.55)]"
              initial={{ left: '0%', opacity: 0 }}
              animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
              transition={PULSE_TRANSITION}
            />
          </div>
        )}
        <ol className="relative grid grid-cols-6">
          {STEPS.map((s, i) => (
            <li key={s.label} className="group flex flex-col items-center px-3 text-center">
              <Reveal delay={0.15 + i * 0.12}>
                <StepNode icon={s.icon} index={i} />
              </Reveal>
              <Reveal delay={0.2 + i * 0.12}>
                <p className="mt-5 text-[11px] font-semibold tracking-[0.2em] text-brand-300/80 uppercase">
                  Step {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-1.5 font-display text-base font-semibold text-white">{s.label}</h3>
                <p className="mx-auto mt-2 max-w-[15rem] text-sm leading-relaxed text-slate-400">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      {/* Mobile / tablet: vertical timeline */}
      <ol className="relative mx-auto mt-14 max-w-md lg:hidden">
        <span className="absolute top-7 bottom-7 left-7 w-px bg-gradient-to-b from-brand-500/50 via-white/10 to-transparent" />
        {!reduce && (
          <div className="pointer-events-none absolute top-7 bottom-7 left-7">
            <motion.span
              className="absolute -left-[4.5px] size-2.5 rounded-full bg-brand-200 shadow-[0_0_16px_6px_rgb(255_138_0/0.55)]"
              initial={{ top: '0%', opacity: 0 }}
              animate={{ top: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
              transition={PULSE_TRANSITION}
            />
          </div>
        )}
        {STEPS.map((s, i) => (
          <li key={s.label} className="group relative flex gap-5 pb-10 last:pb-0">
            <div className="relative z-10 shrink-0">
              <StepNode icon={s.icon} index={i} />
            </div>
            <div className="pt-1.5">
              <p className="text-[11px] font-semibold tracking-[0.2em] text-brand-300/80 uppercase">
                Step {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-1 font-display text-lg font-semibold text-white">{s.label}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
