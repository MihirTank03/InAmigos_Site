import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import {
  Menu,
  X,
  ChevronDown,
  Heart,
  ShieldCheck,
  Calendar,
  Award,
  Sparkles,
  Phone,
  GraduationCap,
  PawPrint,
  Utensils,
  Sprout,
  TrendingUp,
  Compass,
  LayoutGrid,
  CheckCircle2,
} from 'lucide-react';

interface NavDropdownItem {
  label: string;
  desc: string;
  path: string;
  icon?: any;
  iconClass?: string;
}

interface NavItem {
  label: string;
  path: string;
  items: NavDropdownItem[];
}

const NAV_MENU: NavItem[] = [
  {
    label: 'Our Mission & Impact',
    path: '/#about',
    items: [
      {
        label: 'About InAmigos Foundation',
        desc: 'Section 8 youth movement founded by Saurav Dey in 2021',
        path: '/#about',
        icon: Compass,
        iconClass:
          'bg-[#eef2ff] text-[#4f46e5] border border-[#c7d2fe] group-hover/sub:bg-[#4f46e5] group-hover/sub:text-white',
      },
      {
        label: 'Transparency & 80G Tax Benefit',
        desc: '50% income tax deduction & certified audits',
        path: '/transparency',
        icon: ShieldCheck,
        iconClass:
          'bg-[#ecfdf5] text-[#059669] border border-[#a7f3d0] group-hover/sub:bg-[#059669] group-hover/sub:text-white',
      },
      {
        label: 'Volunteer Network (9,900+)',
        desc: 'Pan-India presence across 28 states',
        path: '/volunteer',
        icon: Heart,
        iconClass:
          'bg-[#fff1f2] text-[#e11d48] border border-[#fecdd3] group-hover/sub:bg-[#e11d48] group-hover/sub:text-white',
      },
    ],
  },
  {
    label: 'Active Projects',
    path: '/projects',
    items: [
      {
        label: 'Project BachpanShala',
        desc: 'Rural child foundational literacy & school kits',
        path: '/projects/bachpanshala',
        icon: GraduationCap,
        iconClass:
          'bg-[#e0f2fe] text-[#0284c7] border border-[#bae6fd] group-hover/sub:bg-[#0284c7] group-hover/sub:text-white',
      },
      {
        label: 'Project Jeev',
        desc: 'Stray animal daily feeding, water bowls & rescue',
        path: '/projects/jeev',
        icon: PawPrint,
        iconClass:
          'bg-[#fef3c7] text-[#d97706] border border-[#fde68a] group-hover/sub:bg-[#d97706] group-hover/sub:text-white',
      },
      {
        label: 'Project Udaan',
        desc: 'Women livelihood generation & vocational training',
        path: '/projects/udaan',
        icon: Sparkles,
        iconClass:
          'bg-[#f3e8ff] text-[#9333ea] border border-[#e9d5ff] group-hover/sub:bg-[#9333ea] group-hover/sub:text-white',
      },
      {
        label: 'Project Seva',
        desc: 'Street hunger relief & weekly nutritious cooked meals',
        path: '/projects/seva',
        icon: Utensils,
        iconClass:
          'bg-[#ffedd5] text-[#ea580c] border border-[#fed7aa] group-hover/sub:bg-[#ea580c] group-hover/sub:text-white',
      },
      {
        label: 'Project Prakriti',
        desc: 'Indigenous afforestation & biodiversity preservation',
        path: '/projects/prakriti',
        icon: Sprout,
        iconClass:
          'bg-[#e8f5e9] text-[#2e7d32] border border-[#c8e6c9] group-hover/sub:bg-[#2e7d32] group-hover/sub:text-white',
      },
      {
        label: 'Amigos LEVELUP',
        desc: 'Youth internships & practical social impact training',
        path: '/projects/levelup',
        icon: TrendingUp,
        iconClass:
          'bg-[#ccfbf1] text-[#0d9488] border border-[#99f6e4] group-hover/sub:bg-[#0d9488] group-hover/sub:text-white',
      },
      {
        label: 'View All Campaigns →',
        desc: 'Explore all national grassroots initiatives',
        path: '/projects',
        icon: LayoutGrid,
        iconClass:
          'bg-[#fef9c3] text-[#ca8a04] border border-[#fde047] group-hover/sub:bg-[#ca8a04] group-hover/sub:text-white',
      },
    ],
  },
  {
    label: 'Live Progress',
    path: '/events',
    items: [
      {
        label: 'Upcoming Field Drives',
        desc: 'Sunday food distribution & education weekend camps',
        path: '/events',
        icon: Calendar,
        iconClass:
          'bg-[#eff6ff] text-[#2563eb] border border-[#bfdbfe] group-hover/sub:bg-[#2563eb] group-hover/sub:text-white',
      },
      {
        label: 'Register / RSVP for Drive',
        desc: 'Join on-ground relief operations near your city',
        path: '/events',
        icon: CheckCircle2,
        iconClass:
          'bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0] group-hover/sub:bg-[#16a34a] group-hover/sub:text-white',
      },
      {
        label: 'Chapter Milestones',
        desc: 'Real-time counters & grassroots verification',
        path: '/events',
        icon: Award,
        iconClass:
          'bg-[#fffbeb] text-[#d97706] border border-[#fde68a] group-hover/sub:bg-[#d97706] group-hover/sub:text-white',
      },
    ],
  },
  {
    label: 'Transparency & 80G',
    path: '/transparency',
    items: [],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setHoveredMenu(label);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setHoveredMenu(null);
    }, 150);
  };

  const handleLinkClick = (path: string) => {
    setMobileOpen(false);
    setHoveredMenu(null);
    if (path.startsWith('/#')) {
      const targetId = path.replace('/', '');
      if (location.pathname === '/') {
        const el = document.querySelector(targetId);
        if (el) {
          const yOffset = -95;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      } else {
        navigate(path);
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 ${
          scrolled ? 'py-2.5' : 'py-3.5'
        }`}
        style={{
          background: scrolled
            ? 'rgba(235, 248, 240, 0.72)'
            : 'rgba(235, 248, 240, 0.38)',
          backdropFilter: 'blur(22px) saturate(1.5) brightness(1.02)',
          WebkitBackdropFilter: 'blur(22px) saturate(1.5) brightness(1.02)',
          borderBottom: scrolled
            ? '1px solid rgba(14, 77, 52, 0.16)'
            : '1px solid rgba(14, 77, 52, 0.07)',
          boxShadow: scrolled
            ? '0 6px 28px -6px rgba(14, 77, 52, 0.12), 0 1px 0 rgba(255,255,255,0.6) inset'
            : '0 2px 10px -3px rgba(14, 77, 52, 0.05), 0 1px 0 rgba(255,255,255,0.35) inset',
        }}
      >
        <div className="max-w-[1680px] w-full mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
          {/* Brand Lockup (Larger text & logo) */}
          <Link
            to="/"
            className="flex items-center gap-3 group shrink-0"
            onClick={() => setMobileOpen(false)}
          >
            <img
              src="/images/iaf-logo.png"
              alt="InAmigos Foundation Logo"
              className="h-11 w-11 object-contain rounded-full group-hover:scale-105 transition-transform ring-2 ring-primary/20"
            />
            <div className="flex flex-col">
              <span className="font-display text-xl sm:text-2xl text-primary leading-tight font-bold tracking-tight">
                InAmigos Foundation
              </span>
              <span className="text-xs uppercase tracking-wider text-secondary font-bold">
                Uniting Minds for Change
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items - Each with Outline Box and Automatic Hover Dropdown */}
          <nav className="hidden xl:flex items-center gap-2.5">
            {NAV_MENU.map((item) => {
              const isActive =
                item.path === '/'
                  ? location.pathname === '/'
                  : item.path.startsWith('/#')
                  ? false
                  : location.pathname.startsWith(item.path);

              const hasSubmenu = item.items && item.items.length > 0;
              const isDropdownOpen = hasSubmenu && hoveredMenu === item.label;

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hasSubmenu && handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={item.path}
                    onClick={() => handleLinkClick(item.path)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${
                      isActive || isDropdownOpen
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-white text-charcoal border-charcoal/20 hover:border-primary hover:text-primary hover:bg-[#eef5f0]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {hasSubmenu && (
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${
                          isDropdownOpen ? 'rotate-180 text-white' : 'text-charcoal/60'
                        }`}
                      />
                    )}
                  </Link>

                  {/* Automatic Animated Dropdown Menu (only if hasSubmenu) */}
                  {hasSubmenu && (
                    <div
                      className={`absolute top-full left-0 mt-2 ${
                        item.items.length > 4 ? 'w-[480px] grid grid-cols-2' : 'w-80'
                      } bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-charcoal/10 p-3 transition-all duration-200 ease-out z-50 ${
                        isDropdownOpen
                          ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                          : 'opacity-0 translate-y-2 pointer-events-none invisible'
                      }`}
                    >
                      {item.items.map((sub) => {
                        const SubIcon = sub.icon || Sparkles;
                        const iconClass =
                          sub.iconClass ||
                          'bg-[#eef5f0] text-primary border border-primary/20 group-hover/sub:bg-primary group-hover/sub:text-white';
                        return (
                          <Link
                            key={sub.label}
                            to={sub.path}
                            onClick={() => handleLinkClick(sub.path)}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#f0f6f2] transition-colors group/sub"
                          >
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 shadow-2xs transition-colors duration-150 ${iconClass}`}
                            >
                              <SubIcon size={18} />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-charcoal group-hover/sub:text-primary transition-colors">
                                {sub.label}
                              </div>
                              <div className="text-xs text-charcoal/65 leading-tight mt-0.5">
                                {sub.desc}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Action Bar (Larger components and text) */}
          <div className="flex items-center gap-3">
            <a
              href="tel:18002094673"
              className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-full bg-white text-charcoal border border-charcoal/15 hover:border-primary hover:text-primary transition-all text-sm font-bold shadow-xs"
            >
              <Phone size={16} className="text-primary" />
              <span>1800-209-4673</span>
            </a>

            <Link
              to="/volunteer"
              className="hidden md:inline-flex items-center justify-center px-4 py-2.5 text-sm text-primary font-bold bg-white hover:bg-primary hover:text-white rounded-xl transition-all border border-primary/25 shadow-xs"
            >
              Become a Volunteer
            </Link>

            <Link
              to="/donate"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm sm:text-base font-bold text-white bg-primary hover:bg-primary-container rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <Heart size={16} className="fill-white/20" />
              <span>Donate Now</span>
            </Link>

            {/* Mobile Hamburger */}
            <button
              className="xl:hidden p-2.5 rounded-xl bg-white text-charcoal border border-charcoal/15 hover:bg-[#eef5f0] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-4/5 max-w-sm z-[60] bg-[#fcf9f3] shadow-2xl transform transition-transform duration-300 xl:hidden flex flex-col justify-between p-6 pt-20 border-l border-charcoal/15 overflow-y-auto ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          className="absolute top-5 right-5 p-2 rounded-xl bg-white border border-charcoal/15 text-charcoal"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <X size={22} />
        </button>

        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-5 border-b border-charcoal/10">
            <img
              src="/images/iaf-logo.png"
              alt="IAF Logo"
              className="h-11 w-11 rounded-full object-contain ring-2 ring-primary/20"
            />
            <div>
              <span className="font-display font-bold text-xl text-primary block">
                InAmigos Foundation
              </span>
              <span className="text-xs uppercase font-bold text-secondary">
                Section 8 · 80G Certified
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {NAV_MENU.map((item) => (
              <div key={item.label} className="border-b border-charcoal/5 pb-2">
                <Link
                  to={item.path}
                  onClick={() => handleLinkClick(item.path)}
                  className="py-2 px-3 rounded-xl font-display font-bold text-base text-primary block hover:bg-white"
                >
                  {item.label}
                </Link>
                {item.items && item.items.length > 0 && (
                  <div className="pl-2 space-y-1 mt-1">
                    {item.items.map((sub) => {
                      const SubIcon = sub.icon || Sparkles;
                      const iconClass =
                        sub.iconClass ||
                        'bg-[#eef5f0] text-primary border border-primary/20';
                      return (
                        <Link
                          key={sub.label}
                          to={sub.path}
                          onClick={() => handleLinkClick(sub.path)}
                          className="flex items-center gap-2.5 py-1.5 px-2 rounded-lg text-xs font-semibold text-charcoal/80 hover:text-primary hover:bg-white transition-all"
                        >
                          <div
                            className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 shadow-2xs ${iconClass}`}
                          >
                            <SubIcon size={13} />
                          </div>
                          <span>{sub.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pt-2">
            <a
              href="tel:18002094673"
              className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-charcoal/10 text-charcoal"
            >
              <Phone size={20} className="text-primary" />
              <div>
                <span className="text-xs text-charcoal/60 block font-medium">Toll-Free Helpline</span>
                <span className="font-bold text-primary text-sm">1800-209-4673 / 626 730 9902</span>
              </div>
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-charcoal/10 space-y-3">
          <Link
            to="/donate"
            onClick={() => setMobileOpen(false)}
            className="w-full py-3.5 px-4 rounded-xl bg-primary text-white font-bold text-base flex items-center justify-center gap-2 shadow-md"
          >
            <Heart size={18} />
            <span>Donate Now (Instant 80G)</span>
          </Link>
          <Link
            to="/volunteer"
            onClick={() => setMobileOpen(false)}
            className="w-full py-3 rounded-xl font-bold text-sm text-center bg-white text-primary border border-primary/25 block hover:bg-[#eef5f0]"
          >
            Become a Volunteer
          </Link>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[55] xl:hidden backdrop-blur-xs"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
