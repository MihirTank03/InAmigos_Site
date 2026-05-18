import { useState } from 'react';
import { Link } from 'react-router';
import {
  BookOpen,
  PawPrint,
  Utensils,
  Sprout,
  Users,
  Award,
  ArrowRight,
  Heart,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

interface CauseItem {
  id: string;
  category: 'all' | 'education' | 'animals' | 'hunger' | 'environment' | 'youth';
  categoryLabel: string;
  categoryBadgeClass: string;
  title: string;
  desc: string;
  impactStat: string;
  image: string;
  raised: number;
  goal: number;
  donorsCount: number;
  link: string;
  donateCause: string;
  icon: typeof BookOpen;
}

const CAUSES: CauseItem[] = [
  {
    id: 'bachpanshala',
    category: 'education',
    categoryLabel: 'Education & Literacy',
    categoryBadgeClass: 'bg-[#eaf4ed] text-[#137547] border-[#d0e8d9]',
    title: 'Project BachpanShala',
    desc: 'Setting up joyful weekend learning pods, distributing stationary kits, school bags, and teaching foundational literacy to rural and slum children.',
    impactStat: '15,000+ Children Educated · 30+ Learning Pods',
    image: '/images/slide-4.jpg',
    raised: 1240000,
    goal: 1500000,
    donorsCount: 342,
    link: '/projects/bachpanshala',
    donateCause: 'Project BachpanShala',
    icon: BookOpen,
  },
  {
    id: 'jeev',
    category: 'animals',
    categoryLabel: 'Animal Welfare',
    categoryBadgeClass: 'bg-[#fff5e6] text-[#b26b00] border-[#ffe2b3]',
    title: 'Project Jeev',
    desc: 'Daily street dog feeding drives, anti-rabies vaccination, reflective safety collars, emergency first-aid, and summer earthen water bowl installations.',
    impactStat: '50+ Strays Fed Daily · 200+ Water Bowls Setup',
    image: '/images/slide-1.jpg',
    raised: 890000,
    goal: 1000000,
    donorsCount: 418,
    link: '/projects/jeev',
    donateCause: 'Project Jeev',
    icon: PawPrint,
  },
  {
    id: 'seva',
    category: 'hunger',
    categoryLabel: 'Hunger Relief',
    categoryBadgeClass: 'bg-[#fef0ee] text-[#c0392b] border-[#fcd9d5]',
    title: 'Project Seva',
    desc: 'Preparing and serving freshly cooked nutritious meals and dry ration packs to hospital attendants, migrant daily-wage workers, and homeless families.',
    impactStat: '60,000+ Fresh Meals Served · Weekly Drives',
    image: '/images/slide-2.jpg',
    raised: 1650000,
    goal: 2000000,
    donorsCount: 529,
    link: '/projects/seva',
    donateCause: 'Project Seva',
    icon: Utensils,
  },
  {
    id: 'prakriti',
    category: 'environment',
    categoryLabel: 'Environment & Earth',
    categoryBadgeClass: 'bg-[#eef8f0] text-[#1e824c] border-[#d3ebd7]',
    title: 'Project Prakriti',
    desc: 'Native tree plantation drives (Neem, Peepal, Jamun), mini urban green belts, seed ball dispersal, and regular organic sapling care with local youth.',
    impactStat: '20,000+ Native Saplings Planted · 85% Survival',
    image: '/images/slide-3.jpg',
    raised: 620000,
    goal: 800000,
    donorsCount: 194,
    link: '/projects/prakriti',
    donateCause: 'Project Prakriti',
    icon: Sprout,
  },
  {
    id: 'udaan',
    category: 'youth',
    categoryLabel: 'Women Empowerment',
    categoryBadgeClass: 'bg-[#f8f0fc] text-[#8e44ad] border-[#ebd3f7]',
    title: 'Project Udaan',
    desc: 'Vocational tailoring, handicraft production training, financial literacy workshops, and micro-entrepreneurship assistance for rural women.',
    impactStat: '900+ Rural Women Upskilled · Self-Help Groups',
    image: '/images/iaf-gallery-7.jpg',
    raised: 780000,
    goal: 1000000,
    donorsCount: 215,
    link: '/projects/udaan',
    donateCause: 'Project Udaan',
    icon: Award,
  },
  {
    id: 'levelup',
    category: 'youth',
    categoryLabel: 'Youth Leadership',
    categoryBadgeClass: 'bg-[#eef4ff] text-[#2471a3] border-[#d4e4fd]',
    title: 'Amigos LEVELUP',
    desc: 'Mobilizing college students through verified social impact internships, on-ground field campaigns, civic sensitization, and youth leadership training.',
    impactStat: '9,900+ Volunteers Guided · 28 States Covered',
    image: '/images/iaf-gallery-6.jpg',
    raised: 510000,
    goal: 600000,
    donorsCount: 312,
    link: '/volunteer',
    donateCause: 'Amigos LEVELUP',
    icon: Users,
  },
];

const CATEGORY_TABS = [
  { key: 'all', label: 'All Causes (6)' },
  { key: 'education', label: 'Children & Education' },
  { key: 'animals', label: 'Animal Welfare' },
  { key: 'hunger', label: 'Hunger Relief' },
  { key: 'environment', label: 'Environment' },
  { key: 'youth', label: 'Women & Youth' },
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredCauses =
    activeTab === 'all'
      ? CAUSES
      : CAUSES.filter((c) => c.category === activeTab);

  return (
    <section className="w-full bg-[#fbf8f2]/90 py-20 lg:py-28 scroll-mt-28 relative overflow-hidden" id="projects">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#eef7f2]/70 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#fff6ea]/60 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eaf4ed] text-[#137547] text-xs font-bold mb-3 border border-[#d0e8d9]">
              <Sprout size={14} />
              <span>OUR ACTIVE CAUSES · GRASSROOTS MISSIONS</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-charcoal tracking-tight leading-[1.15]">
              Building a Kinder, <br />
              <span className="text-[#0e4d34]">More Equal Tomorrow</span>
            </h2>
            <p className="text-sm sm:text-base text-charcoal/75 mt-3 leading-relaxed">
              We focus on high-impact on-ground missions where every rupee directly transforms lives. All donations are 100% transparent and eligible for Section 80G tax deductions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-charcoal bg-white border border-charcoal/20 hover:bg-charcoal hover:text-white transition-all shadow-2xs"
            >
              <span>View All Field Projects</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.key
                  ? 'bg-[#0e4d34] text-white shadow-md'
                  : 'bg-white text-charcoal/75 border border-charcoal/15 hover:bg-[#eef5f0] hover:text-charcoal'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 6 Detailed Cause Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredCauses.map((cause) => {
            const Icon = cause.icon;

            return (
              <div
                key={cause.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between border border-charcoal/10 group hover:-translate-y-1.5"
              >
                <div>
                  {/* Photo with Overlay Category Tag */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-charcoal/5">
                    <img
                      src={cause.image}
                      alt={cause.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />
                    
                    {/* Category pill */}
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-xs ${cause.categoryBadgeClass}`}>
                        <Icon size={13} />
                        <span>{cause.categoryLabel}</span>
                      </span>
                    </div>

                    {/* Donors count pill */}
                    <div className="absolute bottom-3 right-3 bg-black/60 text-white backdrop-blur-xs px-2.5 py-1 rounded-lg text-[11px] font-bold">
                      {cause.donorsCount} Donors Pledged
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <h3 className="font-display font-bold text-xl text-charcoal group-hover:text-[#0e4d34] transition-colors mb-2">
                      {cause.title}
                    </h3>

                    {/* Verified Impact Stat Ribbon */}
                    <div className="flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-[#f4f8f5] border border-[#d2eadc] text-[#137547] text-xs font-semibold mb-3">
                      <CheckCircle2 size={14} className="shrink-0" />
                      <span className="truncate">{cause.impactStat}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed min-h-[48px]">
                      {cause.desc}
                    </p>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="px-6 pb-6 pt-1 flex items-center justify-between gap-3 border-t border-charcoal/5">
                  <Link
                    to={cause.link}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-charcoal/80 hover:text-[#0e4d34] transition-colors group/link"
                  >
                    <span>Learn More</span>
                    <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    to={`/donate?cause=${encodeURIComponent(cause.donateCause)}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#0e4d34] hover:bg-[#083523] shadow-xs hover:shadow-md transition-all cursor-pointer"
                  >
                    <Heart size={14} className="fill-white/20" />
                    <span>Support</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Transparency & Assurance Strip */}
        <div className="mt-12 bg-white rounded-2xl p-4 sm:p-5 border border-charcoal/10 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#eaf4ed] text-[#137547] flex items-center justify-center shrink-0">
              <TrendingUp size={20} />
            </div>
            <div className="text-xs sm:text-sm text-charcoal/80">
              <strong className="text-charcoal font-bold">100% Direct Field Allocation:</strong> 88% goes directly to on-ground beneficiaries, verified by quarterly public audit disclosures.
            </div>
          </div>

          <Link
            to="/transparency"
            className="text-xs sm:text-sm font-bold text-[#137547] hover:underline whitespace-nowrap"
          >
            View Transparency &amp; Tax Certifications &rarr;
          </Link>
        </div>

      </div>
    </section>
  );
}
