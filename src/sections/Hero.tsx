import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import {
  Heart,
  Users,
  ShieldCheck,
  Sprout,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface HeroBgSlide {
  image: string;
  tag: string;
  title: string;
  subtitle: string;
  link: string;
}

const HERO_BG_SLIDES: HeroBgSlide[] = [
  {
    image: '/images/slide-4.jpg',
    tag: 'Project BachpanShala',
    title: 'Right to Education for Rural Children',
    subtitle: '15,000+ children equipped with slates, books & weekend learning pods.',
    link: '/projects/bachpanshala',
  },
  {
    image: '/images/slide-1.jpg',
    tag: 'Project Jeev',
    title: 'Daily Stray Animal Welfare & Feeding',
    subtitle: '50+ street dogs nourished daily with winter reflective collars & water bowls.',
    link: '/projects/jeev',
  },
  {
    image: '/images/slide-2.jpg',
    tag: 'Project Seva',
    title: 'Weekly Community Hunger Relief Drives',
    subtitle: '60,000+ freshly prepared nutritious meal packs distributed with dignity.',
    link: '/projects/seva',
  },
  {
    image: '/images/slide-5.jpg',
    tag: 'Project BachpanShala',
    title: 'Empowering Girls with Knowledge & Dignity',
    subtitle: 'Supplementary tuition centers across rural and suburban clusters.',
    link: '/projects/bachpanshala',
  },
  {
    image: '/images/iaf-gallery-7.jpg',
    tag: 'Amigos Volunteer Corp',
    title: 'Youth-Led Community Outreach in Action',
    subtitle: '9,900+ active youth volunteers driving grassroots change across 28 states.',
    link: '/volunteer',
  },
  {
    image: '/images/slide-3.jpg',
    tag: 'Project Prakriti',
    title: 'Native Afforestation & Green Earth',
    subtitle: '20,000+ indigenous saplings planted with 85% verified survival.',
    link: '/projects/prakriti',
  },
];

export default function Hero() {
  const [activeBgIndex, setActiveBgIndex] = useState(0);

  // Background slideshow auto-advances every 6 seconds
  useEffect(() => {
    const bgTimer = setInterval(() => {
      setActiveBgIndex((prev) => (prev + 1) % HERO_BG_SLIDES.length);
    }, 6000);
    return () => clearInterval(bgTimer);
  }, []);

  const currentBg = HERO_BG_SLIDES[activeBgIndex];

  return (
    <section className="relative w-full overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-14 lg:pb-18">

      {/* ── BACKGROUND SLIDESHOW ── fully vivid right half, narrow scrim on left ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {HERO_BG_SLIDES.map((slide, idx) => (
          <div
            key={slide.image}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === activeBgIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              style={{ transitionDuration: '6000ms' }}
              className={`w-full h-full object-cover object-center transform transition-transform ease-out ${
                idx === activeBgIndex ? 'scale-[1.04]' : 'scale-100'
              }`}
            />
          </div>
        ))}

        {/* Narrow left scrim — only covers ~42% of width; right 58% is fully vivid */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, #fcf9f3 0%, #fcf9f3f2 18%, #fcf9f3cc 32%, #fcf9f366 44%, transparent 60%)',
          }}
        />

        {/* Subtle bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#fcf9f3] to-transparent" />
      </div>


      {/* ── LEFT CONTENT COLUMN ── */}
      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="max-w-[560px] lg:max-w-[620px] flex flex-col items-start">

          {/* Top pill badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#eaf4ed]/95 backdrop-blur-sm text-[#0e6644] text-xs sm:text-sm font-bold shadow-sm mb-5 border border-[#c2dfc8]">
            <Sprout size={15} />
            <span>People · Animals · Communities · A Kinder Tomorrow</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-charcoal tracking-tight leading-[1.08] mb-4">
            Uniting Minds<br />
            for{' '}
            <span className="italic text-[#8c6014] relative inline-block font-serif">
              Change
              <svg
                className="absolute left-0 -bottom-2 w-full h-3.5 text-[#2e7d4f]"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,10 Q50,18 100,10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="font-display font-semibold text-lg sm:text-xl lg:text-2xl text-[#0e4d34] mb-3 leading-snug">
            Every small act plants a Forest of Hope.
          </p>

          {/* Subtitle */}
          <p className="font-body text-sm sm:text-[15px] text-charcoal/75 max-w-[420px] mb-8 leading-relaxed">
            Empowering youth, educating rural children, and protecting street
            animals across India — with verified 80G tax-exempt transparency.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-9">
            <Link
              to="/donate"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-white bg-[#0e4d34] hover:bg-[#083523] shadow-lg hover:shadow-xl transition-all text-base sm:text-lg cursor-pointer group"
            >
              <Heart size={20} className="fill-white/20" />
              <span>Donate Now</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/volunteer"
              className="inline-flex items-center gap-2.5 px-6 py-4 rounded-xl font-bold text-charcoal bg-white/95 backdrop-blur-sm border border-charcoal/20 hover:bg-charcoal hover:text-white shadow-md transition-all text-base sm:text-lg cursor-pointer"
            >
              <Users size={20} />
              <span>Become a Volunteer</span>
            </Link>
          </div>

          {/* 4 Micro Credentials */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 w-full max-w-lg pt-5 border-t border-charcoal/15">
            <div className="flex items-center gap-2 text-xs font-semibold text-charcoal/85">
              <ShieldCheck size={18} className="text-[#137547] shrink-0" />
              <span>80G<br /><span className="text-charcoal/60 font-normal">Tax Benefit</span></span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-charcoal/85">
              <Users size={18} className="text-[#137547] shrink-0" />
              <span>Transparent<br /><span className="text-charcoal/60 font-normal">&amp; Accountable</span></span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-charcoal/85">
              <Sprout size={18} className="text-[#137547] shrink-0" />
              <span>Real,<br /><span className="text-charcoal/60 font-normal">On-Ground Impact</span></span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-charcoal/85">
              <Heart size={18} className="text-[#137547] shrink-0" />
              <span>People + Animals<br /><span className="text-charcoal/60 font-normal">Brighter Communities</span></span>
            </div>
          </div>

        </div>
      </div>

      {/* ── FLOATING SLIDE INFO CARD & INTEGRATED CONTROLS (Desktop / Tablet) ── */}
      <div className="absolute bottom-8 right-6 sm:bottom-10 sm:right-8 lg:bottom-12 lg:right-10 z-20 hidden sm:block select-none max-w-[320px] lg:max-w-[350px]">
        <div className="bg-[#071d14]/94 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-white/20 shadow-2xl text-white">
          
          {/* Header with Tag & Slide Counter */}
          <div className="flex items-center justify-between gap-3 mb-2.5 pb-2 border-b border-white/15">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#ffd280] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffd280] animate-pulse" />
              {currentBg.tag}
            </span>
            <span className="text-[11px] font-mono font-bold text-white/90 bg-white/15 px-2 py-0.5 rounded-full">
              0{activeBgIndex + 1} / 0{HERO_BG_SLIDES.length}
            </span>
          </div>

          {/* Title - clickable to initiative */}
          <Link
            to={currentBg.link}
            className="block text-white hover:text-[#ffd280] font-black text-sm sm:text-base leading-snug mb-1.5 transition-colors group cursor-pointer"
          >
            <span>{currentBg.title}</span>
            <span className="inline-block ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#ffd280]">
              →
            </span>
          </Link>

          {/* Subtitle / Description - 100% visible high contrast font */}
          <p className="text-white/95 text-xs sm:text-[13px] leading-relaxed font-medium mb-3.5">
            {currentBg.subtitle}
          </p>

          {/* Integrated Slide Navigation Controls */}
          <div className="flex items-center justify-between pt-2.5 border-t border-white/15">
            <button
              type="button"
              onClick={() => setActiveBgIndex((prev) => (prev - 1 + HERO_BG_SLIDES.length) % HERO_BG_SLIDES.length)}
              className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold"
              aria-label="Previous slide"
            >
              <ChevronLeft size={16} />
              <span>Prev</span>
            </button>

            {/* Slide dots */}
            <div className="flex items-center gap-1.5 px-2">
              {HERO_BG_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveBgIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === activeBgIndex
                      ? 'w-5 bg-[#ffd280]'
                      : 'w-2 bg-white/35 hover:bg-white/70'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setActiveBgIndex((prev) => (prev + 1) % HERO_BG_SLIDES.length)}
              className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold"
              aria-label="Next slide"
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          </div>

        </div>
      </div>

      {/* ── MOBILE SLIDE NAVIGATION (Compact, placed safely above Floating Donate button) ── */}
      <div className="absolute bottom-20 right-6 z-20 sm:hidden flex items-center gap-2 bg-[#071d14]/94 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/25 text-white shadow-lg">
        <button
          type="button"
          onClick={() => setActiveBgIndex((prev) => (prev - 1 + HERO_BG_SLIDES.length) % HERO_BG_SLIDES.length)}
          className="p-1 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="text-xs font-bold font-mono text-white/95">
          0{activeBgIndex + 1} / 0{HERO_BG_SLIDES.length}
        </span>
        <button
          type="button"
          onClick={() => setActiveBgIndex((prev) => (prev + 1) % HERO_BG_SLIDES.length)}
          className="p-1 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight size={16} />
        </button>
      </div>

    </section>
  );
}
