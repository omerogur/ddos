import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { FAQS } from '../data/content';
import { Reveal, Section, SectionHeading } from './ui';

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <Section id="faq">
      <SectionHeading eyebrow="FAQ" title="Frequently" highlight="Asked Questions" />

      <div className="mx-auto mt-14 max-w-3xl space-y-3">
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={item.q} delay={i * 0.04}>
              <div className={`card ring-gradient overflow-hidden transition-colors ${isOpen ? 'bg-brand-500/[0.05]' : 'hover:bg-white/[0.04]'}`}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-display text-base font-semibold text-white sm:text-lg">{item.q}</span>
                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full border transition-all ${
                        isOpen ? 'rotate-45 border-brand-500 bg-brand-500 text-white' : 'border-white/15 text-slate-400'
                      }`}
                    >
                      <Plus className="size-4" />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-slate-400 sm:text-base">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
