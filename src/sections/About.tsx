import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white relative">
      <div className="section-container" ref={contentRef}>
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Text Content */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-charcoal mb-6">
              About InAmigos Foundation
            </h2>
            <div className="space-y-5 text-charcoal/80 font-body text-lg leading-relaxed">
              <p>
                Founded by <strong>Saurav Dey</strong> in 2021, InAmigos Foundation is a Section-8 non-profit organization dedicated to creating sustainable, grassroots impact. What began as a small collective of driven youth has now grown into a massive pan-India movement.
              </p>
              <p>
                Our mission is to foster community-driven solutions in education, animal welfare, women's empowerment, and environmental sustainability. By mobilizing passionate volunteers and partnering with local stakeholders, we aim to bridge gaps and build resilient, self-reliant communities across the nation.
              </p>
            </div>
            
            <div className="mt-8">
              <Link to="/transparency" className="font-body font-bold text-primary hover:text-primary-container transition-colors inline-flex items-center gap-2 text-base sm:text-lg">
                View our transparency & financial reports &rarr;
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="w-full lg:w-1/2">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="/images/iaf-gallery-1.jpg" 
                alt="InAmigos Foundation team" 
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>

        {/* Credentials Row */}
        <div className="mt-16 pt-8 border-t border-charcoal/10">
          <p className="text-xs sm:text-sm font-bold text-charcoal/60 mb-5 uppercase tracking-wider text-center">Accreditations &amp; Registrations</p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {[
              'Section 8 Registered',
              '80G Certified',
              '12A Certified',
              'CSR-1 Approved',
              'NITI Aayog Darpan',
              'ISO 9001:2015'
            ].map((credential, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm sm:text-base font-semibold text-charcoal">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check size={14} className="text-primary" />
                </div>
                {credential}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
