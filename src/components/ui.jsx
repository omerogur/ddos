import { motion } from 'framer-motion';

export function Reveal({ children, delay = 0, className, y = 24 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-brand-500/25 bg-brand-500/10 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-brand-300 uppercase shadow-[inset_0_1px_0_0_rgb(255_255_255/0.06)] ${className}`}
    >
      <span className="relative flex size-1.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-500 opacity-70" />
        <span className="relative inline-flex size-1.5 rounded-full bg-brand-500" />
      </span>
      {children}
    </span>
  );
}

export function SectionHeading({ eyebrow, title, highlight, description, align = 'center' }) {
  const centered = align === 'center';
  return (
    <Reveal className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-xl'}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.05]">
        {title} <span className="text-gradient-brand">{highlight}</span>
      </h2>
      {description && <p className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg">{description}</p>}
    </Reveal>
  );
}

const VARIANTS = {
  primary:
    'group/btn relative overflow-hidden bg-gradient-to-b from-brand-400 to-brand-600 text-white shadow-[0_8px_24px_-6px_rgb(240_106_0/0.6),inset_0_1px_0_0_rgb(255_255_255/0.25)] hover:shadow-[0_12px_32px_-6px_rgb(240_106_0/0.75),inset_0_1px_0_0_rgb(255_255_255/0.3)] hover:-translate-y-0.5',
  ghost:
    'border border-white/12 bg-white/5 text-white backdrop-blur-sm hover:border-white/25 hover:bg-white/10 hover:-translate-y-0.5',
};

export function ButtonLink({ href, children, variant = 'primary', className = '', ...rest }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 focus-visible:outline-none ${VARIANTS[variant]} ${className}`}
      {...rest}
    >
      {variant === 'primary' && (
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
      )}
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </a>
  );
}

export function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`relative px-4 py-24 sm:px-6 lg:py-32 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
