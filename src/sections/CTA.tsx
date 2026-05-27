import { Link } from 'react-router';

export default function CTA() {
  return (
    <section className="py-24 bg-sage relative overflow-hidden">
      <div className="section-container relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
          Ready to make a difference?
        </h2>
        <p className="text-white/90 font-body text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Join thousands of changemakers across India. Whether you choose to donate or volunteer, your contribution creates real, lasting impact.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link 
            to="/donate" 
            className="px-8 py-4 bg-terracotta text-white font-body font-bold text-lg rounded-full hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          >
            Donate Now
          </Link>
          <Link 
            to="/volunteer" 
            className="px-8 py-4 bg-transparent border-2 border-white text-white font-body font-bold text-lg rounded-full hover:bg-white hover:text-sage transition-all duration-300"
          >
            Join as Volunteer
          </Link>
        </div>
      </div>
    </section>
  );
}
