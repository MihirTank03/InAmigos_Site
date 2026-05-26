import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { toast } from 'sonner';
import {
  User,
  Mail,
  Phone,
  Briefcase,
  MapPin,
  Building2,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Users,
  Heart,
  Sprout,
  CheckCircle2,
  Award,
  BookOpen,
  Utensils,
  PawPrint,
} from 'lucide-react';
import { initiatives } from '../data/initiativesData';
import { api } from '../services/api';

const SKILLS_LIST = [
  'Teaching & Tutoring',
  'Content Writing & Media',
  'Graphic Design & Video',
  'Animal Care & First Aid',
  'On-Ground Field Operations',
  'Social Media Outreach',
  'Event Management',
  'Tech & Web Support',
];

const STATES = [
  'Chhattisgarh',
  'Maharashtra',
  'Delhi NCR',
  'Karnataka',
  'Uttar Pradesh',
  'West Bengal',
  'Madhya Pradesh',
  'Rajasthan',
  'Gujarat',
  'Tamil Nadu',
  'Other State/UT',
];

const OCCUPATIONS = [
  'College Student',
  'Working Professional',
  'Teacher / Educator',
  'Healthcare Professional',
  'Freelancer / Consultant',
  'Retired / Senior Citizen',
  'Other',
];

const PHONE_REGEX = /^[6-9]\d{9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function VolunteerPage() {
  const [searchParams] = useSearchParams();
  const initialCause = searchParams.get('cause') || 'bachpanshala';

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1: Profile
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [occupation, setOccupation] = useState('College Student');
  const [state, setState] = useState('Chhattisgarh');
  const [city, setCity] = useState('');
  const [agreed, setAgreed] = useState(false);

  // Step 2: Skills
  const [preferredInitiative, setPreferredInitiative] = useState(
    initiatives.find((i) => i.id === initialCause)?.title || 'Project Bachpanshala'
  );
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    'Teaching & Tutoring',
    'On-Ground Field Operations',
  ]);
  const [availabilityHours, setAvailabilityHours] = useState('Weekends Only (3-4 hrs)');
  const [workPreference, setWorkPreference] = useState<'hybrid' | 'field' | 'remote'>('hybrid');

  // Step 3: Motivation
  const [motivation, setMotivation] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [volunteerId, setVolunteerId] = useState<string | null>(null);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 3) {
      newErrors.name = 'Full name must be at least 3 characters';
    }
    if (/\d/.test(fullName)) {
      newErrors.name = 'Name should not contain numbers';
    }
    if (!email.trim() || !EMAIL_REGEX.test(email.trim())) {
      newErrors.email = 'Enter a valid email address';
    }
    const cleanPhone = phone.replace(/\s+/g, '').replace(/^\+91/, '');
    if (!PHONE_REGEX.test(cleanPhone)) {
      newErrors.phone = 'Enter a valid 10-digit Indian mobile number';
    }
    if (!city.trim()) {
      newErrors.city = 'Please enter your city';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    if (selectedSkills.length === 0) {
      toast.error('Please select at least one skill or interest area.');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      if (validateStep2()) setStep(3);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep1()) {
      setStep(1);
      return;
    }
    if (!validateStep2()) {
      setStep(2);
      return;
    }

    const finalMotivation =
      motivation.trim().length >= 15
        ? motivation.trim()
        : `Passionate about serving communities and contributing to ${preferredInitiative} through InAmigos Foundation.`;

    setIsSubmitting(true);

    try {
      const cleanPhone = phone.replace(/\s+/g, '').replace(/^\+91/, '');
      const res = await api.submitVolunteer({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: cleanPhone,
        state,
        city: city.trim(),
        occupation,
        preferredInitiative,
        skills: selectedSkills,
        availabilityHours,
        workPreference,
        motivation: finalMotivation,
      });

      if (res.success && res.data) {
        setVolunteerId(res.data.id);
        toast.success(`Application submitted! Your Volunteer ID is ${res.data.id}`);
      } else {
        toast.error(res.error || 'Failed to submit application. Please try again.');
      }
    } catch {
      toast.error('A network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (volunteerId) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-[#fcf9f3]">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-charcoal/10 text-center space-y-6">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={36} />
            </div>

            <p className="text-xs font-bold text-primary uppercase tracking-widest">
              Application Verified &amp; Recorded
            </p>

            <h1 className="font-display font-bold text-3xl sm:text-4xl text-charcoal">
              Welcome to the IAF Family, {fullName}!
            </h1>

            <p className="text-base text-charcoal/75 leading-relaxed">
              Your volunteer application for{' '}
              <strong className="text-charcoal font-semibold">{preferredInitiative}</strong> has been received. Our chapter coordinator in {city || state} will contact you via WhatsApp shortly.
            </p>

            <div className="p-5 rounded-2xl bg-[#f4f8f5] border border-primary/15 text-left space-y-2.5 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-charcoal/60">Volunteer ID</span>
                <span className="font-mono font-bold text-primary text-base">{volunteerId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-charcoal/60">Email</span>
                <span className="font-medium text-charcoal">{email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-charcoal/60">Location</span>
                <span className="text-charcoal">{city}, {state}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-charcoal/60">Initiative</span>
                <span className="text-charcoal font-medium">{preferredInitiative}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={() => {
                  setVolunteerId(null);
                  setStep(1);
                }}
                className="px-6 py-3 rounded-xl border border-charcoal/20 text-charcoal font-bold text-sm hover:bg-charcoal hover:text-white transition-all cursor-pointer"
              >
                Submit Another Application
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f4ec] relative overflow-hidden">
      {/* Subtle leaf/organic background decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-0">
        {/* Top-center large leaf SVG */}
        <svg className="absolute top-16 left-1/3 opacity-20 w-48 h-48" viewBox="0 0 200 200" fill="none">
          <path d="M100 10 C60 40, 20 80, 30 140 C40 180, 80 190, 100 190 C120 190, 160 180, 170 140 C180 80, 140 40, 100 10Z" fill="#a8c5a0" />
        </svg>
        <svg className="absolute top-8 right-1/4 opacity-15 w-32 h-32 rotate-45" viewBox="0 0 200 200" fill="none">
          <path d="M100 10 C60 40, 20 80, 30 140 C40 180, 80 190, 100 190 C120 190, 160 180, 170 140 C180 80, 140 40, 100 10Z" fill="#c8d8a0" />
        </svg>
        {/* Top left small orange accent */}
        <div className="absolute top-36 left-56 w-8 h-8 rounded-full bg-amber-300/30" />
        <div className="absolute top-64 left-40 w-4 h-4 rounded-full bg-amber-400/20" />
      </div>

      {/* ===== 3-COLUMN GRID ===== */}
      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-0 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* ===================== LEFT COLUMN ===================== */}
          <div className="lg:col-span-3 flex flex-col pt-2">

            {/* Handwritten stacked words (top-left, italic teal) */}
            <div className="mb-4 select-none">
              <div className="font-serif italic text-[#3d8b6b] leading-snug text-[17px] sm:text-[19px] tracking-wide">
                <div>People</div>
                <div>Communities</div>
                <div>Animals</div>
                <div>A Kinder Tomorrow</div>
              </div>
              {/* Small heart annotation */}
              <span className="text-[#3d8b6b] text-lg ml-28 -mt-1 inline-block select-none">♡</span>
            </div>

            {/* Main headline: "Volunteer Today for a Better Tomorrow" */}
            <h1 className="font-display font-black leading-[1.05] mb-5">
              <span className="text-4xl sm:text-5xl text-charcoal block">
                <span className="italic">V</span>olunteer
              </span>
              <span className="text-4xl sm:text-5xl text-charcoal block">Today</span>
              <span className="text-4xl sm:text-5xl text-charcoal block">for a <em className="not-italic text-[#0e6644] italic font-black">Better</em></span>
              <span className="text-4xl sm:text-5xl text-[#c8851a] italic font-black block">Tomorrow</span>
            </h1>

            {/* Description */}
            <p className="text-sm text-charcoal/70 leading-relaxed mb-7 max-w-[260px]">
              Be a part of a community that works for education, nutrition and equal opportunities for every child.
            </p>

            {/* 3 Feature Items */}
            <div className="space-y-4 w-full mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#d4ece0] text-[#0e6644] flex items-center justify-center shrink-0">
                  <Users size={18} />
                </div>
                <div>
                  <div className="font-bold text-sm text-charcoal leading-tight">Join 9,900+</div>
                  <div className="text-xs text-charcoal/60">volunteers across India</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#fce8e8] text-[#c0392b] flex items-center justify-center shrink-0">
                  <Heart size={18} />
                </div>
                <div>
                  <div className="font-bold text-sm text-charcoal leading-tight">Make a real impact</div>
                  <div className="text-xs text-charcoal/60">in local communities</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#dbeaf6] text-[#2471a3] flex items-center justify-center shrink-0">
                  <Sprout size={18} />
                </div>
                <div>
                  <div className="font-bold text-sm text-charcoal leading-tight">Learn, Grow, Give Back</div>
                  <div className="text-xs text-charcoal/60">with meaningful experiences</div>
                </div>
              </div>
            </div>

            {/* Bottom photo section with community annotation */}
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/images/iaf-gallery-7.jpg"
                alt="InAmigos volunteers with community"
                className="w-full h-[200px] sm:h-[240px] object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a3220]/75 via-[#0a3220]/20 to-transparent" />
              {/* "Small Actions Big Change" scripted annotation */}
              <div className="absolute top-3 right-3 text-right pointer-events-none select-none">
                <div className="font-serif italic text-white/90 text-sm leading-tight drop-shadow">
                  Small<br />Actions<br />Big Change
                </div>
                <span className="text-amber-300 text-xs">✦</span>
              </div>
              {/* Bottom text */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="font-serif italic text-white text-lg leading-tight drop-shadow-lg">
                  Good<br />People<br />Brighter<br />Communities
                </div>
                <Heart size={14} className="text-white/80 mt-1" />
              </div>
            </div>
          </div>

          {/* ===================== CENTER COLUMN: Form Card ===================== */}
          <div className="lg:col-span-6 relative">
            {/* "Together We Can ♡" floating top-right of the form */}
            <div className="absolute -top-6 right-4 z-20 pointer-events-none select-none hidden lg:block">
              <div className="font-serif italic text-[#0e6644] text-xl leading-tight rotate-[-6deg] drop-shadow-sm">
                Together<br />&nbsp;&nbsp;We Can ♡
              </div>
            </div>

            {/* Form card with theme-matching warm ivory surface & crisp border */}
            <div className="bg-[#fffdf9] rounded-3xl shadow-[0_22px_65px_-12px_rgba(14,77,52,0.16)] border-2 border-[#0e4d34]/20 p-6 sm:p-8">

              {/* Leaf decoration top */}
              <div className="flex justify-center mb-1">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <path d="M18 2 C10 10, 2 20, 6 30 C8 34, 14 36, 18 36 C22 36, 28 34, 30 30 C34 20, 26 10, 18 2Z" fill="#a8d5b5" opacity="0.7"/>
                </svg>
              </div>

              {/* Header */}
              <div className="text-center mb-5">
                <span className="text-[10px] sm:text-xs font-black text-[#0e4d34] tracking-widest uppercase">
                  ✦ JOIN 9,900+ VOLUNTEERS ACROSS INDIA
                </span>
                <h2 className="font-display font-black text-2xl sm:text-[32px] text-[#0f172a] mt-1 leading-tight">
                  <span className="italic">Volunteer</span> Application
                </h2>
                <p className="font-serif italic text-xs sm:text-sm text-charcoal/75 mt-1 font-medium">
                  &ldquo;Real change happens when caring people take action.&rdquo;
                </p>
              </div>

              {/* Stepper */}
              <div className="flex items-center justify-center max-w-xs mx-auto mb-5 px-2">
                {/* Step 1 */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step === 1
                        ? 'bg-[#0e4d34] text-white shadow-md ring-2 ring-[#0e4d34]/20'
                        : step > 1
                        ? 'bg-[#0e4d34] text-white'
                        : 'border-2 border-charcoal/20 text-charcoal/60 bg-white'
                    }`}
                  >
                    1
                  </div>
                  <span className={`text-[11px] font-bold mt-1 ${step === 1 ? 'text-[#0f172a]' : 'text-charcoal/50'}`}>
                    Profile
                  </span>
                </div>
                <div className={`flex-1 h-[2px] mx-2 -mt-4 transition-colors ${step >= 2 ? 'bg-[#0e4d34]' : 'bg-charcoal/15'}`} />
                {/* Step 2 */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step === 2
                        ? 'bg-[#0e4d34] text-white shadow-md ring-2 ring-[#0e4d34]/20'
                        : step > 2
                        ? 'bg-[#0e4d34] text-white'
                        : 'border-2 border-charcoal/20 text-charcoal/60 bg-white'
                    }`}
                  >
                    2
                  </div>
                  <span className={`text-[11px] font-bold mt-1 ${step === 2 ? 'text-[#0f172a]' : 'text-charcoal/50'}`}>
                    Skills
                  </span>
                </div>
                <div className={`flex-1 h-[2px] mx-2 -mt-4 transition-colors ${step >= 3 ? 'bg-[#0e4d34]' : 'bg-charcoal/15'}`} />
                {/* Step 3 */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step === 3
                        ? 'bg-[#0e4d34] text-white shadow-md ring-2 ring-[#0e4d34]/20'
                        : 'border-2 border-charcoal/20 text-charcoal/60 bg-white'
                    }`}
                  >
                    3
                  </div>
                  <span className={`text-[11px] font-bold mt-1 ${step === 3 ? 'text-[#0f172a]' : 'text-charcoal/50'}`}>
                    Motivation
                  </span>
                </div>
              </div>

              {/* Why Volunteer box */}
              <div className="bg-[#eaf4ed] border-2 border-[#c2dfc8] rounded-2xl p-4 flex items-start gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-[#0e4d34]/15 text-[#0e4d34] flex items-center justify-center shrink-0 mt-0.5">
                  <Sprout size={18} />
                </div>
                <div>
                  <div className="text-sm font-black text-[#0f172a]">Why Volunteer?</div>
                  <div className="text-xs text-charcoal/80 mt-0.5 leading-relaxed font-medium">
                    You can help us educate children, support communities, and build a more equal tomorrow.
                    Your time and skills can create lasting change.
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="space-y-4">
                    {/* Personal Information Header with shield on right */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-[#0f172a] font-bold text-sm">
                        <User size={16} className="text-[#0e4d34]" />
                        <span>Personal Information</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-charcoal/70 font-semibold">
                        <ShieldCheck size={14} className="text-[#0e4d34]" />
                        <span>Your information is safe with us</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-[#0f172a] mb-1">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0e4d34]" />
                          <input
                            type="text"
                            required
                            placeholder="Your full name"
                            value={fullName}
                            onChange={(e) => {
                              setFullName(e.target.value);
                              setErrors((prev) => ({ ...prev, name: '' }));
                            }}
                            className={`w-full pl-9 pr-3 py-3 rounded-xl border-2 text-sm font-medium text-[#0f172a] focus:ring-2 outline-none bg-white shadow-xs ${
                              errors.name ? 'border-red-400 focus:ring-red-200' : 'border-[#0e4d34]/25 focus:border-[#0e4d34] focus:ring-[#0e4d34]/20'
                            }`}
                          />
                        </div>
                        {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-[#0f172a] mb-1">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0e4d34]" />
                          <input
                            type="email"
                            required
                            placeholder="you@email.com"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setErrors((prev) => ({ ...prev, email: '' }));
                            }}
                            className={`w-full pl-9 pr-3 py-3 rounded-xl border-2 text-sm font-medium text-[#0f172a] focus:ring-2 outline-none bg-white shadow-xs ${
                              errors.email ? 'border-red-400 focus:ring-red-200' : 'border-[#0e4d34]/25 focus:border-[#0e4d34] focus:ring-[#0e4d34]/20'
                            }`}
                          />
                        </div>
                        {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {/* Mobile Number */}
                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-[#0f172a] mb-1">
                          WhatsApp Mobile Number *
                        </label>
                        <div className="relative">
                          <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0e4d34]" />
                          <input
                            type="tel"
                            required
                            placeholder="10-digit mobile number"
                            value={phone}
                            onChange={(e) => {
                              setPhone(e.target.value);
                              setErrors((prev) => ({ ...prev, phone: '' }));
                            }}
                            className={`w-full pl-9 pr-3 py-3 rounded-xl border-2 text-sm font-medium text-[#0f172a] focus:ring-2 outline-none bg-white shadow-xs ${
                              errors.phone ? 'border-red-400 focus:ring-red-200' : 'border-[#0e4d34]/25 focus:border-[#0e4d34] focus:ring-[#0e4d34]/20'
                            }`}
                          />
                        </div>
                        {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
                      </div>

                      {/* Occupation */}
                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-[#0f172a] mb-1">
                          Occupation *
                        </label>
                        <div className="relative">
                          <Briefcase size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0e4d34]" />
                          <select
                            value={occupation}
                            onChange={(e) => setOccupation(e.target.value)}
                            className="w-full pl-9 pr-3 py-3 rounded-xl border-2 border-[#0e4d34]/25 text-sm font-semibold text-[#0f172a] focus:border-[#0e4d34] focus:ring-2 focus:ring-[#0e4d34]/20 outline-none bg-white shadow-xs appearance-none"
                          >
                            {OCCUPATIONS.map((occ) => (
                              <option key={occ} value={occ}>{occ}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {/* State */}
                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-[#0f172a] mb-1">
                          State *
                        </label>
                        <div className="relative">
                          <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0e4d34]" />
                          <select
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className="w-full pl-9 pr-3 py-3 rounded-xl border-2 border-[#0e4d34]/25 text-sm font-semibold text-[#0f172a] focus:border-[#0e4d34] focus:ring-2 focus:ring-[#0e4d34]/20 outline-none bg-white shadow-xs appearance-none"
                          >
                            {STATES.map((st) => (
                              <option key={st} value={st}>{st}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* City */}
                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-[#0f172a] mb-1">
                          City *
                        </label>
                        <div className="relative">
                          <Building2 size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0e4d34]" />
                          <input
                            type="text"
                            required
                            placeholder="Your city"
                            value={city}
                            onChange={(e) => {
                              setCity(e.target.value);
                              setErrors((prev) => ({ ...prev, city: '' }));
                            }}
                            className={`w-full pl-9 pr-3 py-3 rounded-xl border-2 text-sm font-medium text-[#0f172a] focus:ring-2 outline-none bg-white shadow-xs ${
                              errors.city ? 'border-red-400 focus:ring-red-200' : 'border-[#0e4d34]/25 focus:border-[#0e4d34] focus:ring-[#0e4d34]/20'
                            }`}
                          />
                        </div>
                        {errors.city && <p className="text-red-600 text-xs mt-1">{errors.city}</p>}
                      </div>
                    </div>

                    {/* Checkbox + Next button row */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3">
                      <label className="flex items-start gap-2.5 cursor-pointer flex-1">
                        <input
                          type="checkbox"
                          checked={agreed}
                          onChange={(e) => setAgreed(e.target.checked)}
                          className="mt-0.5 w-4 h-4 rounded accent-[#0e4d34] border-charcoal/30 shrink-0 cursor-pointer"
                        />
                        <span className="text-xs text-[#0f172a] font-medium leading-relaxed">
                          I agree to volunteer with InAmigos Foundation and allow my information to be used for volunteer coordination only.
                        </span>
                      </label>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="shrink-0 px-8 py-3.5 rounded-xl bg-[#0e4d34] hover:bg-[#083523] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <span>Next</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5">
                    <div className="flex items-center gap-2 text-[#0f172a] font-bold text-sm mb-3">
                      <Award size={16} className="text-[#0e4d34]" />
                      <span>Skills &amp; Preferred Initiative</span>
                    </div>

                    {/* Preferred Initiative */}
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-[#0f172a] mb-1.5">
                        Select Initiative to Support *
                      </label>
                      <select
                        value={preferredInitiative}
                        onChange={(e) => setPreferredInitiative(e.target.value)}
                        className="w-full p-3.5 rounded-xl border-2 border-[#0e4d34]/25 text-sm font-semibold text-[#0f172a] focus:border-[#0e4d34] focus:ring-2 focus:ring-[#0e4d34]/20 outline-none bg-white shadow-xs"
                      >
                        {initiatives.map((init) => (
                          <option key={init.id} value={init.title}>
                            {init.title} ({init.category})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Skills Pills */}
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-[#0f172a] mb-2">
                        Your Skills &amp; Areas of Interest *
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {SKILLS_LIST.map((skill) => {
                          const isSelected = selectedSkills.includes(skill);
                          return (
                            <button
                              key={skill}
                              type="button"
                              onClick={() => toggleSkill(skill)}
                              className={`px-3.5 py-2 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-[#0e4d34] text-white border-[#0e4d34] shadow-xs'
                                  : 'bg-white hover:bg-[#eef5f0] border-[#0e4d34]/20 text-[#0f172a]'
                              }`}
                            >
                              {skill}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Availability */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-[#0f172a] mb-1.5">
                          Weekly Availability
                        </label>
                        <select
                          value={availabilityHours}
                          onChange={(e) => setAvailabilityHours(e.target.value)}
                          className="w-full p-3.5 rounded-xl border-2 border-[#0e4d34]/25 text-sm font-semibold text-[#0f172a] focus:border-[#0e4d34] outline-none bg-white shadow-xs"
                        >
                          <option>Weekends Only (3-4 hrs)</option>
                          <option>4-6 hours / week</option>
                          <option>8-10 hours / week</option>
                          <option>Full-time Fellowship</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-[#0f172a] mb-1.5">
                          Work Preference
                        </label>
                        <div className="grid grid-cols-3 gap-1.5">
                          {(['hybrid', 'field', 'remote'] as const).map((pref) => (
                            <button
                              key={pref}
                              type="button"
                              onClick={() => setWorkPreference(pref)}
                              className={`py-3 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer border-2 ${
                                workPreference === pref
                                  ? 'bg-[#0e4d34] text-white border-[#0e4d34] shadow-xs'
                                  : 'bg-white border-[#0e4d34]/20 text-[#0f172a] hover:bg-[#f0f4f1]'
                              }`}
                            >
                              {pref}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Nav buttons */}
                    <div className="flex items-center justify-between pt-3">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-6 py-3 rounded-xl border-2 border-charcoal/20 text-[#0f172a] font-bold text-sm hover:bg-[#eef5f0] transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <ArrowLeft size={15} /> Back
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="px-8 py-3.5 rounded-xl bg-[#0e4d34] hover:bg-[#083523] text-white font-bold text-sm shadow-md flex items-center gap-2 cursor-pointer"
                      >
                        <span>Next</span>
                        <ArrowRight size={15} />
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[#0f172a] font-bold text-sm mb-3">
                      <Heart size={16} className="text-[#0e4d34]" />
                      <span>Your Motivation &amp; Commitment</span>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-[#0f172a] mb-1.5">
                        Why do you want to volunteer with InAmigos Foundation? *
                      </label>
                      <textarea
                        rows={4}
                        value={motivation}
                        onChange={(e) => setMotivation(e.target.value)}
                        placeholder="Share a few words on what inspires you to serve, any prior experience, or what you hope to achieve..."
                        className="w-full p-3.5 rounded-xl border-2 border-[#0e4d34]/25 text-sm font-medium text-[#0f172a] focus:border-[#0e4d34] focus:ring-2 focus:ring-[#0e4d34]/20 outline-none bg-white shadow-xs resize-none"
                      />
                    </div>

                    <div className="p-4 rounded-xl bg-[#eaf4ed] border-2 border-[#c2dfc8] text-xs text-[#0f172a] space-y-1">
                      <div className="font-bold text-[#0e4d34]">InAmigos Volunteer Pledge:</div>
                      <p className="font-medium text-charcoal/80">I commit to serving with empathy, integrity, and dedication toward grassroots empowerment.</p>
                    </div>

                    {/* Nav buttons */}
                    <div className="flex items-center justify-between pt-3">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-6 py-3 rounded-xl border-2 border-charcoal/20 text-[#0f172a] font-bold text-sm hover:bg-[#eef5f0] transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <ArrowLeft size={15} /> Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3.5 rounded-xl bg-[#0e4d34] hover:bg-[#083523] text-white font-bold text-sm shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Application</span>
                            <ArrowRight size={15} />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Bottom quote banner */}
            <div className="mt-6 text-center pb-8">
              <p className="font-serif italic text-base sm:text-lg text-charcoal/75">
                &ldquo;Change begins with people who care.&rdquo;
              </p>
              <span className="text-sm font-semibold text-charcoal/50 block mt-1">— InAmigos Foundation</span>
            </div>
          </div>

          {/* ===================== RIGHT COLUMN ===================== */}
          <div className="lg:col-span-3 flex flex-col gap-5 pt-2">

            {/* Photo card with "Real People Real Impact" badge */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-charcoal/10 group">
              {/* "Real People Real Impact" sticky note badge top-right */}
              <div className="absolute top-3 right-3 z-10 bg-[#fef3c7] border border-amber-200 rounded-xl px-3 py-2 text-center shadow-sm rotate-[2deg]">
                <div className="text-[10px] font-black text-amber-800 leading-tight">Real People</div>
                <div className="text-[10px] font-black text-amber-800 leading-tight">Real Impact</div>
                <Heart size={10} className="text-amber-600 mx-auto mt-0.5" />
              </div>

              <img
                src="/images/iaf-gallery-7.jpg"
                alt="InAmigos Foundation volunteers with community children"
                className="w-full h-[200px] object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/15 pointer-events-none" />

              {/* "Together We Can ♡" overlay */}
              <div className="absolute top-4 left-4 pointer-events-none select-none">
                <div className="font-serif italic text-white/90 text-sm leading-tight drop-shadow">
                  Together<br />&nbsp;We Can ♡
                </div>
              </div>
            </div>

            {/* Dark teal quote card */}
            <div className="bg-[#0e4d34] rounded-2xl p-5 text-white shadow-lg">
              <p className="text-sm font-medium leading-relaxed italic">
                &ldquo;Volunteers turn compassion into action.&rdquo;
              </p>
            </div>

            {/* What Our Volunteers Do */}
            <div>
              <h3 className="font-bold text-base text-charcoal mb-3">What Our Volunteers Do</h3>
              <div className="space-y-3">
                {/* Support Education */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#d4ece0] text-[#0e4d34] flex items-center justify-center shrink-0">
                    <BookOpen size={16} />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-charcoal">Support Education</div>
                    <div className="text-xs text-charcoal/55">Help children access quality learning</div>
                  </div>
                </div>

                {/* Nutrition & Health */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#fdeee9] text-[#c45d3e] flex items-center justify-center shrink-0">
                    <Utensils size={16} />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-charcoal">Nutrition &amp; Health</div>
                    <div className="text-xs text-charcoal/55">Distribute meals and health kits</div>
                  </div>
                </div>

                {/* Animal Welfare */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#dbeaf6] text-[#2471a3] flex items-center justify-center shrink-0">
                    <PawPrint size={16} />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-charcoal">Animal Welfare</div>
                    <div className="text-xs text-charcoal/55">Care for and protect street animals</div>
                  </div>
                </div>

                {/* Community Outreach */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#ede9f8] text-[#6c52b8] flex items-center justify-center shrink-0">
                    <Users size={16} />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-charcoal">Community Outreach</div>
                    <div className="text-xs text-charcoal/55">Work on ground for stronger communities</div>
                  </div>
                </div>
              </div>
            </div>

            {/* "Be the Change" green box */}
            <div className="bg-[#eef7f2] border border-[#c0dfc8] rounded-2xl p-5 relative overflow-hidden">
              {/* Decorative tree icons */}
              <div className="absolute bottom-2 right-3 flex items-end gap-1 opacity-40 pointer-events-none select-none">
                <svg width="18" height="24" viewBox="0 0 18 24" fill="none">
                  <path d="M9 2 C6 6,2 10,3 15 C4 19,7 21,9 21 C11 21,14 19,15 15 C16 10,12 6,9 2Z" fill="#0e4d34"/>
                  <rect x="8" y="20" width="2" height="4" fill="#0e4d34"/>
                </svg>
                <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
                  <path d="M7 2 C5 5,2 8,3 12 C4 15,6 17,7 17 C8 17,10 15,11 12 C12 8,9 5,7 2Z" fill="#0e4d34" opacity="0.6"/>
                  <rect x="6" y="16" width="2" height="4" fill="#0e4d34" opacity="0.6"/>
                </svg>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#0e4d34]/10 text-[#0e4d34] flex items-center justify-center shrink-0">
                  <Sprout size={16} />
                </div>
                <div>
                  <div className="font-bold text-base text-charcoal flex items-center gap-2">
                    Be the Change
                    <Heart size={13} className="text-[#0e4d34]" />
                  </div>
                  <p className="text-xs text-charcoal/65 mt-1 leading-relaxed">
                    A kinder, more equal tomorrow is possible — with people like you.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
