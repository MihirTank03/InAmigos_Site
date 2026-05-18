import { useParams, Link, Navigate } from 'react-router';
import { initiatives } from '../data/initiativesData';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Heart,
  Target,
  Sparkles,
  Share2,
  ShieldCheck,
  Globe2,
  Users,
} from 'lucide-react';
import { toast } from 'sonner';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();

  const project = initiatives.find((p) => p.slug === id || p.id === id);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: project.title,
          text: project.tagline,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Campaign link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-24 bg-[#fcf9f3]">
      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-8 lg:px-12">
        {/* Top Breadcrumb / Back Link */}
        <div className="mb-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-charcoal/15 text-charcoal font-bold text-sm hover:border-[#0e4d34] hover:text-[#0e4d34] transition-all shadow-2xs"
          >
            <ArrowLeft size={16} />
            <span>Back to All Initiatives</span>
          </Link>
        </div>

        {/* Main Grid: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Project Narrative & Detail (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Banner Image Card */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl border-2 border-[#0e4d34]/15">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-charcoal/5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-5 left-5">
                  <span
                    className="px-4 py-1.5 rounded-full text-xs font-black text-white shadow-lg uppercase tracking-wider"
                    style={{ backgroundColor: project.color }}
                  >
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 lg:p-10">
                <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-charcoal tracking-tight leading-tight">
                  {project.title}
                </h1>
                <p className="text-base sm:text-lg font-bold text-[#b86200] italic mt-2.5">
                  "{project.tagline}"
                </p>

                {/* Quick Metric Highlights Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6 pt-6 border-t border-charcoal/10">
                  <div className="bg-[#fcf9f3] rounded-2xl p-3.5 border border-charcoal/10">
                    <div className="text-[11px] font-bold text-charcoal/60 uppercase tracking-wider">
                      Delivered Impact
                    </div>
                    <div className="font-display font-black text-xl sm:text-2xl text-[#0e4d34] mt-0.5">
                      {project.impactNumber}
                    </div>
                    <div className="text-xs text-charcoal/75 font-medium">
                      {project.impactLabel}
                    </div>
                  </div>

                  <div className="bg-[#fcf9f3] rounded-2xl p-3.5 border border-charcoal/10">
                    <div className="text-[11px] font-bold text-charcoal/60 uppercase tracking-wider">
                      Tax Deduction
                    </div>
                    <div className="font-display font-black text-xl sm:text-2xl text-[#0e4d34] mt-0.5">
                      50%
                    </div>
                    <div className="text-xs text-charcoal/75 font-medium">
                      Section 80G Benefit
                    </div>
                  </div>

                  <div className="bg-[#fcf9f3] rounded-2xl p-3.5 border border-charcoal/10">
                    <div className="text-[11px] font-bold text-charcoal/60 uppercase tracking-wider">
                      Deployment
                    </div>
                    <div className="font-display font-black text-xl sm:text-2xl text-[#0e4d34] mt-0.5">
                      100%
                    </div>
                    <div className="text-xs text-charcoal/75 font-medium">
                      Direct Field Operations
                    </div>
                  </div>
                </div>

                {/* Narrative Description */}
                <div className="prose prose-lg max-w-none text-charcoal/85 font-body leading-relaxed text-base sm:text-lg">
                  <p>{project.fullDescription}</p>
                </div>

                {/* SDG Goals */}
                <div className="mt-8 pt-6 border-t border-charcoal/10 flex flex-wrap gap-2.5 items-center">
                  <span className="text-xs font-black uppercase tracking-wider text-charcoal/70 mr-2 flex items-center gap-1.5">
                    <Globe2 size={15} className="text-[#0e4d34]" /> UN SDG Alignment:
                  </span>
                  {project.sdgGoals.map((sdg, i) => (
                    <span
                      key={i}
                      className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#f4f9f5] text-[#0e4d34] border border-[#c2dfc8] shadow-2xs"
                    >
                      {sdg}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Objectives Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-md border-2 border-[#0e4d34]/15">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-2xl bg-[#eaf4ed] text-[#0e4d34] flex items-center justify-center shrink-0">
                  <Target size={22} />
                </div>
                <div>
                  <h3 className="font-display font-black text-2xl text-charcoal">
                    Core Objectives &amp; Strategy
                  </h3>
                  <p className="text-xs text-charcoal/65 mt-0.5">
                    Measurable on-ground execution framework
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {project.objectives.map((obj, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-[#fcf9f3] border border-charcoal/10"
                  >
                    <CheckCircle2
                      size={18}
                      className="text-[#0e6644] shrink-0 mt-0.5"
                    />
                    <span className="text-sm font-semibold text-charcoal/85 leading-relaxed">
                      {obj}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Achievements */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-md border-2 border-[#0e4d34]/15">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-2xl bg-[#fff8eb] text-[#d97706] flex items-center justify-center shrink-0">
                  <Sparkles size={22} />
                </div>
                <div>
                  <h3 className="font-display font-black text-2xl text-charcoal">
                    Verified Ground Impact
                  </h3>
                  <p className="text-xs text-charcoal/65 mt-0.5">
                    Delivered results authenticated by IAF audits
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {project.keyAchievements.map((ach, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#fcf9f3] border border-charcoal/10"
                  >
                    <div
                      className="w-3 h-3 rounded-full shrink-0 ring-4 ring-white"
                      style={{ backgroundColor: project.color }}
                    />
                    <p className="text-sm sm:text-base font-bold text-charcoal">
                      {ach}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Support & Action Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-6 sticky top-28">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#0e4d34]/20">
              {/* Header with Share Button */}
              <div className="flex items-center justify-between pb-4 border-b border-charcoal/10">
                <span className="text-xs font-black uppercase tracking-wider text-[#0e4d34]">
                  Initiative Support Desk
                </span>
                <button
                  type="button"
                  onClick={handleShare}
                  className="p-2 rounded-xl hover:bg-[#f4f9f5] text-charcoal/75 hover:text-[#0e4d34] transition-colors cursor-pointer border border-charcoal/10"
                  title="Share Campaign"
                >
                  <Share2 size={17} />
                </button>
              </div>

              {/* Impact Spotlight Card */}
              <div className="my-6 p-5 rounded-2xl bg-gradient-to-br from-[#0e4d34] to-[#082a1c] text-white shadow-md relative overflow-hidden">
                <div className="text-[10px] font-black uppercase tracking-widest text-[#ffd280] mb-1">
                  Impact Delivered
                </div>
                <div className="font-display font-black text-3xl sm:text-4xl text-white">
                  {project.impactNumber}
                </div>
                <div className="text-xs text-white/90 font-medium mt-1 leading-relaxed">
                  {project.impactLabel} supported &amp; empowered across India.
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3">
                {/* Primary Support Button */}
                <Link
                  to={`/donate?cause=${encodeURIComponent(project.title)}`}
                  className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-bold text-white bg-[#0e4d34] hover:bg-[#083523] shadow-lg hover:shadow-xl transition-all text-base sm:text-lg group cursor-pointer"
                >
                  <Heart size={20} className="fill-white/20 group-hover:scale-110 transition-transform" />
                  <span>Support This Cause</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Volunteer Button */}
                <Link
                  to={`/volunteer?cause=${encodeURIComponent(project.id)}`}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-charcoal bg-white border-2 border-charcoal/20 hover:bg-charcoal hover:text-white transition-all shadow-2xs text-sm cursor-pointer"
                >
                  <Users size={18} />
                  <span>Volunteer for {project.title}</span>
                </Link>
              </div>

              {/* 80G Tax Badge */}
              <div className="mt-6 pt-5 border-t border-charcoal/10 space-y-3">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#f4f9f5] border border-[#c2e0cc]">
                  <ShieldCheck size={22} className="text-[#0e6644] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-xs text-[#0e4d34] block">
                      50% Section 80G Tax Deductible
                    </span>
                    <span className="text-[11px] text-charcoal/70 leading-relaxed block mt-0.5">
                      All donations are eligible for income tax deduction. Instant verified digital receipt generated upon contribution.
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-charcoal/70 px-1 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Verified Grassroots Relief
                  </span>
                  <span className="text-[#0e4d34]">Govt Section 8</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
