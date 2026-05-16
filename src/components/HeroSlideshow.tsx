import { useState, useEffect, useRef, useCallback } from 'react';

interface Slide {
  id: string;
  image: string;
  fallback: string;
  category: string;
  title: string;
  subtitle: string;
  impactBadge: string;
  icon: string;
}

const SLIDES: Slide[] = [
  {
    id: 'jeev',
    image: 'https://inamigosfoundation.org.in/public/storage/gallery/1743051485.jpg',
    fallback: '/images/slide-1.jpg',
    category: 'Project Jeev · Animal Welfare',
    title: 'Daily Stray Feeding & Veterinary Care',
    subtitle: 'Providing daily meals and first aid for street animals across urban centers',
    impactBadge: '50+ Strays Fed Daily',
    icon: 'pets',
  },
  {
    id: 'bachpanshala',
    image: '/images/slide-2.jpg',
    fallback: '/images/slide-2.jpg',
    category: 'Project BachpanShala · Education',
    title: 'Slum & Village Learning Centers',
    subtitle: 'Free literacy, basic mathematics, stationery kits and holistic mentoring',
    impactBadge: '1,200+ Kids Enrolled',
    icon: 'school',
  },
  {
    id: 'seva',
    image: '/images/slide-4.jpg',
    fallback: '/images/slide-4.jpg',
    category: 'Project Seva · Hunger Relief',
    title: 'Community Food & Ration Distribution',
    subtitle: 'Hot nutritious meals served to daily-wage families and shelter homes',
    impactBadge: '50,000+ Meals Served',
    icon: 'restaurant',
  },
  {
    id: 'prakriti',
    image: '/images/slide-5.jpg',
    fallback: '/images/slide-5.jpg',
    category: 'Project Prakriti · Sustainability',
    title: 'Indigenous Tree Plantation Drives',
    subtitle: 'Planting Peepal, Neem, and Banyan saplings with geotagged survival monitoring',
    impactBadge: '20,000+ Saplings Planted',
    icon: 'forest',
  },
  {
    id: 'youth',
    image: '/images/iaf-gallery-1.jpg',
    fallback: '/images/iaf-gallery-1.jpg',
    category: 'Youth Leadership · Amigos LEVELUP',
    title: '30,000+ Youth Interns Mobilized',
    subtitle: 'Empowering students across 28 states to lead on-ground humanitarian drives',
    impactBadge: '28 States Active',
    icon: 'groups',
  },
];

const AUTO_PLAY_INTERVAL = 4800; // ms

export default function HeroSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
    setProgress(0);
    startTimeRef.current = Date.now();
  };

  // Timer loop for smooth progress bar and auto-advance
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
      return;
    }

    startTimeRef.current = Date.now() - (progress / 100) * AUTO_PLAY_INTERVAL;

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const currentProgress = Math.min(100, (elapsed / AUTO_PLAY_INTERVAL) * 100);
      setProgress(currentProgress);

      if (elapsed >= AUTO_PLAY_INTERVAL) {
        nextSlide();
      } else {
        timerRef.current = requestAnimationFrame(tick);
      }
    };

    timerRef.current = requestAnimationFrame(tick);

    return () => {
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
    };
  }, [isPaused, nextSlide, progress]);

  const activeSlide = SLIDES[currentIndex];

  return (
    <div
      className="relative rounded-3xl overflow-hidden shadow-2xl bg-charcoal group select-none border border-outline-variant/30"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="InAmigos Foundation Field Operations Slideshow"
    >
      {/* Aspect Container */}
      <div className="relative w-full h-80 sm:h-96 lg:h-[480px] overflow-hidden">
        {/* Slides Stack */}
        {SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                onError={(e) => {
                  if (e.currentTarget.src !== slide.fallback) {
                    e.currentTarget.src = slide.fallback;
                  }
                }}
                alt={slide.title}
                className={`w-full h-full object-cover transition-transform ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
                style={{ transitionDuration: '6000ms' }}
              />

              {/* Cinematic Vignette Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-transparent to-transparent opacity-60" />
            </div>
          );
        })}

        {/* Top Header Strip inside Slide: Category & Counter */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          {/* Category Chip */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface/90 backdrop-blur-md text-primary font-label-sm text-xs font-bold shadow-md border border-white/20">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="tracking-wide">{activeSlide.category}</span>
          </div>

          {/* Slide Counter */}
          <div className="px-3 py-1 rounded-full bg-charcoal/70 backdrop-blur-md text-white font-mono text-xs font-bold tracking-wider shadow-md border border-white/10">
            <span>{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="text-white/50 mx-1">/</span>
            <span className="text-white/50">{String(SLIDES.length).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Navigation Arrow Controls (Hover Reveals on Desktop, visible on tap) */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-surface/85 hover:bg-surface text-primary backdrop-blur-md shadow-lg border border-white/20 flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105 cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">chevron_left</span>
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-surface/85 hover:bg-surface text-primary backdrop-blur-md shadow-lg border border-white/20 flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105 cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">chevron_right</span>
        </button>

        {/* Bottom Glassmorphic Caption Card */}
        <div className="absolute bottom-4 left-4 right-4 z-20 bg-surface/90 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl shadow-xl border border-white/30 transition-all duration-300">
          <div className="flex items-center gap-3">
            {/* Icon Bubble */}
            <div className="w-11 h-11 rounded-xl bg-primary-fixed flex items-center justify-center text-primary font-bold shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-2xl">{activeSlide.icon}</span>
            </div>

            {/* Title & Subtitle */}
            <div className="flex flex-col min-w-0 flex-1">
              <h4 className="font-headline-sm text-sm sm:text-base font-bold text-on-surface truncate leading-tight">
                {activeSlide.title}
              </h4>
              <p className="font-body-sm text-xs text-on-surface-variant truncate mt-0.5">
                {activeSlide.subtitle}
              </p>
            </div>

            {/* Impact Metric Badge */}
            <div className="hidden sm:flex flex-col items-end shrink-0 pl-2">
              <span className="px-2.5 py-1 rounded-md bg-secondary-fixed text-on-secondary-fixed font-label-sm text-xs font-extrabold shadow-xs">
                {activeSlide.impactBadge}
              </span>
              <span className="text-[10px] font-bold text-primary tracking-wider uppercase mt-0.5">
                Verified Impact
              </span>
            </div>
          </div>

          {/* Slide Progress & Dot Indicators */}
          <div className="mt-3 pt-2.5 border-t border-outline-variant/30 flex items-center justify-between gap-3">
            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goToSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === currentIndex
                      ? 'w-7 bg-primary'
                      : 'w-2 bg-on-surface-variant/30 hover:bg-on-surface-variant/60'
                  }`}
                />
              ))}
            </div>

            {/* Timer Progress Bar */}
            <div className="flex-1 max-w-[120px] h-1.5 bg-surface-container rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Pause/Play status indicator */}
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="text-[11px] font-semibold text-on-surface-variant hover:text-primary flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">
                {isPaused ? 'play_arrow' : 'pause'}
              </span>
              <span className="hidden sm:inline">{isPaused ? 'Paused' : 'Auto'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
