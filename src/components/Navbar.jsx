import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, BookOpen, Menu, X } from 'lucide-react';
import { APP_URL, NAV_LINKS, USER_GUIDE_URL } from '../data/content';
import { ButtonLink } from './ui';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(Boolean);
    if (!sections.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? 'border-b border-white/8 bg-ink-950/80 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <a href="#home" className="flex shrink-0 items-center" aria-label="Ddosphere home">
          <img src="/logo.png" alt="Ddosphere" className="h-11 w-auto" />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={active === link.href ? 'true' : undefined}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-white/5 hover:text-white ${
                  active === link.href ? 'text-white' : 'text-slate-300'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={USER_GUIDE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              <BookOpen className="size-4" />
              User Guide
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <ButtonLink href={APP_URL} className="hidden py-2.5 sm:inline-flex">
            Explore
            <ArrowUpRight className="size-4" />
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-lg border border-white/10 text-white lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/8 lg:hidden"
          >
            <ul className="space-y-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={USER_GUIDE_URL} target="_blank" rel="noreferrer" className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/5">
                  User Guide
                </a>
              </li>
              <li className="pt-2">
                <ButtonLink href={APP_URL} className="w-full">
                  Explore <ArrowUpRight className="size-4" />
                </ButtonLink>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
