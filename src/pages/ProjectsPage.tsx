import { Link } from 'react-router';
import { initiatives, type Initiative } from '../data/initiativesData';
import { Heart, Users, Sparkles, ArrowUpRight } from 'lucide-react';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#fcf9f3]">
      {/* Hero Header */}
      <section className="max-w-[1400px] w-full mx-auto px-4 sm:px-8 lg:px-12 text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs sm:text-sm uppercase tracking-wider mb-4 border border-primary/15">
          <Sparkles size={16} /> 6 Active National Campaigns
        </div>
        
        <h1 className="font-display font-bold text-charcoal tracking-tight leading-tight text-4xl sm:text-5xl lg:text-6xl">
          Our Key Initiatives
        </h1>
        
        <p className="mt-5 max-w-3xl mx-auto font-body text-base sm:text-lg lg:text-xl text-charcoal/75 leading-relaxed">
          From rural education and women empowerment to animal welfare, environmental preservation, and hunger relief — explore how InAmigos Foundation drives grassroot transformation across India.
        </p>
      </section>

      {/* Projects Grid */}
      <section className="max-w-[1400px] w-full mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {initiatives.map((project: Initiative) => {
            return (
              <div
                key={project.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-charcoal/10 group hover:-translate-y-1"
              >
                {/* Image with Category Tag */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-bold text-white shadow-md bg-primary/90 backdrop-blur-xs">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="font-display font-bold text-2xl sm:text-3xl text-charcoal group-hover:text-primary transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-sm font-semibold text-primary/90 italic mt-1.5">
                      {project.tagline}
                    </p>
                    <p className="mt-3.5 text-sm sm:text-base text-charcoal/75 leading-relaxed line-clamp-3">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Impact Metric & Actions */}
                  <div className="mt-8 pt-6 border-t border-charcoal/10">
                    <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-[#f4f8f5] border border-[#d2eadc] text-xs font-semibold">
                      <span className="flex items-center gap-1.5 text-[#137547]">
                        <Users size={15} />
                        <span>{project.impactNumber} {project.impactLabel}</span>
                      </span>
                      <span className="text-xs font-bold text-[#b86200] bg-[#fff8eb] px-2 py-0.5 rounded-md border border-[#ffe0b2]">
                        80G Benefit
                      </span>
                    </div>

                    {/* Action Links */}
                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <Link
                        to={`/projects/${project.slug}`}
                        className="py-3 px-4 rounded-xl text-center font-body text-sm font-bold border border-primary/25 text-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-1"
                      >
                        <span>Learn More</span>
                        <ArrowUpRight size={15} />
                      </Link>
                      
                      <Link
                        to={`/donate?cause=${encodeURIComponent(project.title)}`}
                        className="py-3 px-4 rounded-xl text-center font-body text-sm font-bold bg-[#0e4d34] hover:bg-[#083523] text-white transition-all flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg"
                      >
                        <Heart size={15} className="fill-white/20" />
                        <span>Support</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
