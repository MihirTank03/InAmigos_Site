import { useState } from 'react';
import { Link } from 'react-router';
import { toast } from 'sonner';

const initiativeLinks = [
  { label: 'BachpanShala Rural Education', path: '/projects/bachpanshala' },
  { label: 'Project Jeev Animal Welfare', path: '/projects/jeev' },
  { label: 'Amigos LEVELUP Internships', path: '/projects/levelup' },
  { label: 'Project Udaan Women Empowerment', path: '/projects/udaan' },
  { label: 'Project Seva Hunger Relief', path: '/projects/seva' },
  { label: 'Project Prakriti Afforestation', path: '/projects/prakriti' },
  { label: 'Youth Volunteer Corps', path: '/volunteer' },
];

function InstagramIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <defs>
        <radialGradient id="footer-ig-grad" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6.5" fill="url(#footer-ig-grad)" />
      <path
        d="M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2Zm0 7.8A3 3 0 1 1 12 9a3 3 0 0 1 0 6Zm5-8.12a1.12 1.12 0 1 1-2.24 0 1.12 1.12 0 0 1 2.24 0Z"
        fill="#ffffff"
      />
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="#ffffff" strokeWidth="1.6" />
    </svg>
  );
}

function FacebookIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6.5" fill="#1877F2" />
      <path
        d="M14.5 12h2.2l.35-2.5h-2.55V8.1c0-.68.22-1.15 1.25-1.15H17V4.72c-.52-.07-1.35-.12-2.35-.12-2.35 0-3.9 1.4-3.9 4v1.9H8.5V12h2.25v6.5h3.75V12Z"
        fill="#ffffff"
      />
    </svg>
  );
}

function YoutubeIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6.5" fill="#FF0000" />
      <path d="M10 8.5l5.5 3.5-5.5 3.5V8.5Z" fill="#ffffff" />
    </svg>
  );
}

function LinkedinIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6.5" fill="#0A66C2" />
      <path
        d="M7.5 9.2h-2.5V16.5h2.5V9.2ZM6.25 5.8a1.35 1.35 0 1 0 0 2.7 1.35 1.35 0 0 0 0-2.7ZM18.5 12.3c0-2.2-1.2-3.3-2.7-3.3-1.2 0-1.8.7-2.1 1.2V9.2h-2.5v7.3h2.5v-3.9c0-1 .2-2 1.5-2 1.3 0 1.3 1.2 1.3 2.1v3.8h2.5v-4Z"
        fill="#ffffff"
      />
    </svg>
  );
}

function WhatsappIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6.5" fill="#25D366" />
      <path
        d="M17.5 14.8c-.3-.15-1.7-.84-1.97-.93-.26-.1-.45-.15-.64.15-.19.3-.73.93-.9 1.12-.17.2-.34.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.14.3-.34.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.03-.52-.07-.15-.64-1.55-.88-2.12-.23-.56-.47-.48-.64-.49-.17 0-.36-.02-.56-.02-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.88.12.57-.08 1.7-.7 1.95-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.2-.56-.35Z"
        fill="#ffffff"
      />
    </svg>
  );
}

const colorfulSocials = [
  {
    name: 'Instagram',
    component: InstagramIcon,
    href: 'https://www.instagram.com/inamigosfoundation',
    handle: '@inamigosfoundation',
  },
  {
    name: 'Facebook',
    component: FacebookIcon,
    href: 'https://www.facebook.com/InAmigos/',
    handle: 'InAmigos Foundation',
  },
  {
    name: 'YouTube',
    component: YoutubeIcon,
    href: 'https://www.youtube.com/@inamigosfoundation',
    handle: '@inamigosfoundation (28K+)',
  },
  {
    name: 'LinkedIn',
    component: LinkedinIcon,
    href: 'https://in.linkedin.com/company/inamigos-foundation',
    handle: 'InAmigos Foundation',
  },
  {
    name: 'WhatsApp',
    component: WhatsappIcon,
    href: 'https://wa.me/916267309902',
    handle: '+91 626 730 9902',
  },
];

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !/\S+@\S+\.\S+/.test(newsletterEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }
    toast.success('Thank you for subscribing to Compassion Dispatch!');
    setNewsletterEmail('');
  };

  return (
    <footer className="w-full bg-[#081e14] text-white mt-space-xl border-t border-white/10 shadow-[0_-8px_30px_rgba(0,0,0,0.25)]">
      <div className="max-w-[1680px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12">
          {/* Col 1: Brand & Credentials (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                alt="InAmigos Foundation Logo"
                className="h-11 w-11 rounded-full object-contain ring-2 ring-white/20"
                src="/images/iaf-logo.png"
              />
              <div className="flex flex-col">
                <span className="font-display text-xl text-white font-bold leading-tight">
                  InAmigos Foundation (IAF)
                </span>
                <span className="text-xs sm:text-sm text-secondary-fixed-dim font-bold uppercase tracking-wider">
                  Uniting Minds for Change
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Section 8 non-profit organization registered under the Companies Act, 2013. Dedicated to grassroots community development, rural literacy, stray animal welfare, women livelihoods, and nationwide youth leadership.
            </p>

            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1 rounded-full bg-white/10 text-white/95 text-xs font-semibold border border-white/15">
                Section 8 Non-Profit
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-white/95 text-xs font-semibold border border-white/15">
                ISO 9001:2015
              </span>
              <span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold shadow-xs">
                80G &amp; 12A Certified
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-white/95 text-xs font-semibold border border-white/15">
                CSR-1 Registered
              </span>
            </div>
          </div>

          {/* Col 2: Initiatives (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="text-sm sm:text-base text-secondary-fixed-dim uppercase tracking-wider font-bold">
              Our Initiatives
            </h4>
            <div className="flex flex-col gap-2.5 text-sm sm:text-base">
              {initiativeLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="text-white/75 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3: Registered Office & Helpline (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="text-sm sm:text-base text-secondary-fixed-dim uppercase tracking-wider font-bold">
              Registered Office &amp; Helpline
            </h4>
            <div className="flex flex-col gap-3 text-sm sm:text-base text-white/80">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-secondary-fixed-dim text-lg">call</span>
                <span className="font-bold text-white">
                  Toll-Free: 1800-209-4673 / +91 626 730 9902
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-secondary-fixed-dim text-lg">mail</span>
                <a
                  href="mailto:support@inamigosfoundation.org.in"
                  className="hover:text-secondary-fixed-dim transition-colors text-white underline underline-offset-2"
                >
                  support@inamigosfoundation.org.in
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-secondary-fixed-dim text-lg mt-0.5 shrink-0">
                  location_on
                </span>
                <span className="leading-relaxed">
                  Ward No-5 Bajrang Chowk, Post Gram Sipat, Ujwal Nagar, Bilaspur, Chhattisgarh 495555
                </span>
              </div>
            </div>

            <div className="mt-2 p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-xs text-white/60 block uppercase tracking-wider font-bold">
                DARPAN, CIN &amp; CSR ID
              </span>
              <span className="text-sm font-bold text-secondary-fixed-dim block mt-0.5">
                CG/2021/0291448 · CSR00083159
              </span>
              <span className="font-mono text-xs text-white/60 block mt-0.5">
                CIN: U85300CT2020NPL010641
              </span>
            </div>
          </div>

          {/* Col 4: Compassion Dispatch & Colorful Social Logos (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="text-sm sm:text-base text-secondary-fixed-dim uppercase tracking-wider font-bold">
              Compassion Dispatch
            </h4>
            <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
              Stay connected with verified quarterly field updates, shelter drives, and internship calls.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2.5">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 text-sm text-white placeholder:text-white/45 border border-white/15 focus:outline-none focus:ring-1 focus:ring-secondary-fixed-dim"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-primary-container text-white text-sm font-bold hover:bg-primary transition-colors shadow-xs cursor-pointer"
              >
                Join Dispatch
              </button>
            </form>

            {/* Original Colorful Social Logos */}
            <div>
              <span className="text-xs font-semibold text-white/70 uppercase tracking-wider block mb-2">
                Connect With Us
              </span>
              <div className="flex items-center gap-2.5 pt-1">
                {colorfulSocials.map((s) => {
                  const Icon = s.component;
                  return (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl transition-all duration-200 hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/40"
                      aria-label={s.name}
                      title={`${s.name}: ${s.handle}`}
                    >
                      <Icon size={32} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-white/65">
          <span>
            © 2020–2026 InAmigos Foundation. Licensed under Section 8, Companies Act, 2013.
          </span>
          <div className="flex items-center gap-6 font-semibold">
            <Link to="/transparency" className="hover:text-white transition-colors">
              Transparency &amp; 80G
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Grievance Desk
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
