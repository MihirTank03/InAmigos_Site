import { useEffect, useRef, useState } from 'react';
import { Users, GraduationCap, Heart, Award } from 'lucide-react';

function Counter({ target, suffix = '', inView }: { target: number; suffix?: string; inView: boolean }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = Math.max(0, currentTime - startTime);
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.min(target, Math.max(0, Math.floor(eased * target)));

      if (current !== countRef.current) {
        countRef.current = current;
        setCount(current);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Impact() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full relative z-20 px-4 sm:px-6 lg:px-10 my-4 sm:my-6 lg:my-8">
      <div className="max-w-[1440px] w-full mx-auto rounded-3xl bg-gradient-to-r from-[#072a1c] via-[#0e4d34] to-[#0a3824] shadow-[0_25px_60px_-15px_rgba(7,42,28,0.45)] border border-[#23704d] ring-1 ring-white/10 p-6 sm:p-8 lg:p-9 relative overflow-hidden">
        {/* Subtle decorative glow accents */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#46d691]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[#ffd280]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-center relative z-10">
          
          {/* Stat 1: Community */}
          <div className="flex items-center gap-4 lg:pr-6 lg:border-r lg:border-white/10">
            <div className="w-14 h-14 rounded-2xl bg-white/10 text-[#46d691] border border-white/15 flex items-center justify-center shrink-0 shadow-inner">
              <Users size={26} />
            </div>
            <div>
              <div className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-[#ffd280] leading-none tracking-tight">
                <Counter target={126} suffix="K+" inView={inView} />
              </div>
              <div className="text-xs sm:text-sm text-white/85 font-medium mt-1.5 leading-snug">
                Community &amp; Lives Touched
              </div>
            </div>
          </div>

          {/* Stat 2: Interns Guided */}
          <div className="flex items-center gap-4 lg:px-4 lg:border-r lg:border-white/10">
            <div className="w-14 h-14 rounded-2xl bg-white/10 text-[#46d691] border border-white/15 flex items-center justify-center shrink-0 shadow-inner">
              <GraduationCap size={26} />
            </div>
            <div>
              <div className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-[#ffd280] leading-none tracking-tight">
                <Counter target={29} suffix="K+" inView={inView} />
              </div>
              <div className="text-xs sm:text-sm text-white/85 font-medium mt-1.5 leading-snug">
                Interns &amp; Scholars Guided
              </div>
            </div>
          </div>

          {/* Stat 3: Tax Deductible */}
          <div className="flex items-center gap-4 lg:px-4 lg:border-r lg:border-white/10">
            <div className="w-14 h-14 rounded-2xl bg-white/10 text-[#46d691] border border-white/15 flex items-center justify-center shrink-0 shadow-inner">
              <Heart size={26} />
            </div>
            <div>
              <div className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-[#ffd280] leading-none tracking-tight">
                100%
              </div>
              <div className="text-xs sm:text-sm text-white/85 font-medium mt-1.5 leading-snug">
                Tax Deductible (80G Certified)
              </div>
            </div>
          </div>

          {/* Stat 4: ISO Certified */}
          <div className="flex items-center gap-4 lg:pl-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 text-[#46d691] border border-white/15 flex items-center justify-center shrink-0 shadow-inner">
              <Award size={26} />
            </div>
            <div>
              <div className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-[#ffd280] leading-none tracking-tight">
                ISO
              </div>
              <div className="text-xs sm:text-sm text-white/85 font-medium mt-1.5 leading-snug">
                9001 &amp; CSR-1 Certified
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
