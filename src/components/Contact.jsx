import { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { CONTACT, NAV_LINKS } from '../data/content';
import { Reveal } from './ui';

const INFO = [
  { icon: MapPin, label: 'Office', value: CONTACT.office },
  { icon: Phone, label: 'Call Us', value: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/\s/g, '')}` },
  { icon: Mail, label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
];

const FIELD =
  'w-full rounded-xl border border-white/10 bg-ink-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-600 transition-colors focus:border-brand-500/60 focus:ring-2 focus:ring-brand-500/25 focus:outline-none';

function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get('name');
    const company = data.get('company');
    const email = data.get('email');
    const message = data.get('message');
    const subject = encodeURIComponent(`Resilience testing enquiry — ${company || name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nCompany: ${company}\nWork email: ${email}\n\n${message}`,
    );
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-slate-400">
            Full name
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" placeholder="Jane Doe" className={FIELD} />
        </div>
        <div>
          <label htmlFor="company" className="mb-1.5 block text-xs font-medium text-slate-400">
            Company
          </label>
          <input id="company" name="company" type="text" autoComplete="organization" placeholder="Acme Inc." className={FIELD} />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-slate-400">
          Work email
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={FIELD} />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-slate-400">
          What would you like to test?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="Tell us about your infrastructure and the systems you're authorized to test."
          className={`${FIELD} resize-y`}
        />
      </div>
      <button
        type="submit"
        className="group/btn relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-b from-brand-400 to-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_-6px_rgb(240_106_0/0.6),inset_0_1px_0_0_rgb(255_255_255/0.25)] transition-all hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 focus-visible:outline-none"
      >
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
        <span className="relative inline-flex items-center gap-2">
          {sent ? 'Opening your email…' : 'Send message'} <Send className="size-4" />
        </span>
      </button>
      <p aria-live="polite" className="min-h-4 text-xs text-slate-500">
        {sent && 'Your email client should open with the message pre-filled. Prefer to write directly? info@ddosphere.com'}
      </p>
    </form>
  );
}

export default function Contact() {
  return (
    <footer id="contact" className="relative px-4 pt-12 pb-10 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-brand-500/30 bg-gradient-to-br from-brand-600/25 via-ink-800 to-ink-900 p-6 sm:p-10 lg:p-16">
            <div className="grid-bg absolute inset-0 opacity-60 [mask-image:linear-gradient(to_left,black,transparent)]" />
            <div className="absolute -top-24 -right-24 size-72 rounded-full bg-brand-500/30 blur-3xl" />
            <div className="relative grid items-start gap-10 lg:grid-cols-2">
              <div>
                <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Get In <span className="text-gradient">Touch</span>
                </h2>
                <p className="mt-4 text-lg font-medium text-slate-200">{CONTACT.heading}</p>
                <p className="mt-2 text-slate-400">{CONTACT.text}</p>

                <ul className="mt-8 space-y-3">
                  {INFO.map((item) => {
                    const Tag = item.href ? 'a' : 'div';
                    return (
                      <li key={item.label}>
                        <Tag
                          href={item.href}
                          className="flex min-w-0 items-center gap-4 rounded-2xl border border-white/10 bg-ink-950/50 p-4 transition-colors hover:border-brand-500/40"
                        >
                          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-500/15 text-brand-400">
                            <item.icon className="size-5" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-xs text-slate-500">{item.label}</span>
                            <span className="block font-medium break-words text-white">{item.value}</span>
                          </span>
                        </Tag>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-ink-950/50 p-6 sm:p-8">
                <h3 className="font-display text-lg font-semibold text-white">Request a scoped demo</h3>
                <p className="mt-1 text-sm text-slate-400">We’ll reply within one business day.</p>
                <ContactForm />
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 flex flex-col gap-8 border-t border-white/8 pt-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <img src="/logo.png" alt="Ddosphere" className="h-11 w-auto" />
            <p className="mt-4 text-xs leading-relaxed text-slate-500">{CONTACT.tubitak}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-slate-400 transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="mt-10 text-center text-xs text-slate-600">© Ddosphere 2024, All Rights Reserved</p>
      </div>
    </footer>
  );
}
