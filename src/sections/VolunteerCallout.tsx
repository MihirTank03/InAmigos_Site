import { useState } from 'react';
import { toast } from 'sonner';
import {
  User,
  Mail,
  Phone,
  Building2,
  Sprout,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Loader2,
  Award,
} from 'lucide-react';
import { api } from '../services/api';

export default function VolunteerCallout() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [initiative, setInitiative] = useState('BachpanShala (Rural Teaching & Kits)');
  const [availability, setAvailability] = useState('Weekends Only (3-4 hrs)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || fullName.trim().length < 3) {
      toast.error('Please enter your full name (at least 3 characters)');
      return;
    }

    const cleanPhone = phone.replace(/[^0-9]/g, '').slice(-10);
    if (!cleanPhone || !/^[6-9]\d{9}$/.test(cleanPhone)) {
      toast.error('Please enter a valid 10-digit Indian mobile number');
      return;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await api.submitVolunteer({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: cleanPhone,
        city: city.trim() || 'Bilaspur',
        state: 'Chhattisgarh',
        occupation: 'Student / Professional',
        preferredInitiative: initiative,
        skills: ['Community Mobilization', 'Field Operations'],
        availabilityHours: availability,
        workPreference: 'hybrid',
        motivation: `Volunteering for ${initiative} to create grassroots impact with InAmigos Foundation.`,
      });

      if (res.success && res.data) {
        setSubmittedId(res.data.id);
        toast.success(`Application received! Your Volunteer ID is ${res.data.id}`);
      } else {
        toast.error(res.error || 'Failed to submit application. Please try again.');
      }
    } catch {
      toast.error('A network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-[#eef5f0]/80 py-20 lg:py-24 scroll-mt-28 relative overflow-hidden" id="volunteer-callout">
      {/* Ambient background blur */}
      <div className="absolute top-0 right-1/3 w-[500px] h-[400px] bg-[#d9ecde]/60 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Section Header - Outside and Above the Form */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-[#0e6644] text-xs font-bold mb-3 border border-[#c2e0cc] shadow-xs">
            <Sprout size={14} />
            <span>Join 9,900+ Volunteers Across India</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-charcoal tracking-tight">
            Volunteer Application
          </h2>
          <p className="font-serif italic text-sm sm:text-base text-charcoal/70 mt-2">
            &ldquo;Real change happens when caring people take action.&rdquo;
          </p>
        </div>

        {/* The Form Card - Crisp solid white background with clean shadow & border */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_-10px_rgba(14,77,52,0.12)] border border-[#0e4d34]/20 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Real InAmigos Volunteer Photo & Testimonial Quote */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              <div className="relative rounded-3xl overflow-hidden shadow-lg border border-charcoal/10 group bg-charcoal/5">
                <img
                  src="/images/iaf-gallery-7.jpg"
                  alt="InAmigos youth volunteers conducting real community food & support drive"
                  className="w-full h-[290px] sm:h-[340px] object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30 pointer-events-none" />
                
                {/* Real Volunteer Mission Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[#137547] text-xs font-bold shadow-sm">
                  <Sprout size={13} />
                  <span>Real On-Ground Field Drive</span>
                </div>

                {/* Bottom Photo Caption */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs font-semibold text-white/90 flex items-center gap-1.5">
                    <Award size={14} className="text-[#ffd280] shrink-0" />
                    <span>InAmigos Youth Volunteers in Action</span>
                  </div>
                  <p className="text-[11px] text-white/80 mt-0.5 leading-snug">
                    Distributing nutritious meals and essential kits to vulnerable families in Bilaspur clusters.
                  </p>
                </div>
              </div>

              {/* Quote Card */}
              <div className="bg-[#f4f9f5] p-5 rounded-2xl border border-[#d2eadc]">
                <p className="font-serif italic text-sm text-charcoal/85 leading-relaxed">
                  &ldquo;Volunteers do not necessarily have the time; they just have the heart.&rdquo;
                </p>
                <span className="text-xs font-bold text-[#0e4d34] block mt-2">
                  &mdash; Elizabeth Andrew
                </span>
              </div>
            </div>

            {/* Right: Quick Volunteer Application Form */}
            <div className="lg:col-span-7">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-charcoal/10">
                <div>
                  <span className="text-xs font-bold text-[#0e4d34] uppercase tracking-wider block">
                    Quick Onboarding (2 mins)
                  </span>
                  <h3 className="font-display font-bold text-xl text-charcoal">
                    Your Details &amp; Preferred Initiative
                  </h3>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-charcoal/60">
                  <ShieldCheck size={15} className="text-[#0e4d34]" />
                  <span>Safe &amp; Confidential</span>
                </div>
              </div>

              {submittedId ? (
                <div className="bg-[#eef7f2] p-8 rounded-2xl text-center space-y-3 border border-[#d2eadc]">
                  <div className="w-12 h-12 rounded-full bg-primary/15 text-primary flex items-center justify-center mx-auto">
                    <CheckCircle2 size={28} />
                  </div>
                  <h4 className="font-display font-bold text-xl text-charcoal">
                    Application Received!
                  </h4>
                  <p className="text-sm text-charcoal/75 max-w-md mx-auto">
                    Your Volunteer Registration ID is{' '}
                    <strong className="text-primary font-mono font-bold text-base">{submittedId}</strong>.
                    Our community coordination team will reach out to you on WhatsApp within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmittedId(null)}
                    className="mt-2 px-5 py-2.5 rounded-xl border border-charcoal/20 text-charcoal font-bold text-xs hover:bg-charcoal hover:text-white transition-all cursor-pointer"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-[#0f172a] mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0e4d34]" />
                        <input
                          type="text"
                          required
                          placeholder="Your full name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full pl-10 pr-3.5 py-3.5 rounded-xl border-2 border-[#0e4d34]/25 bg-white text-sm font-semibold text-[#0f172a] focus:border-[#0e4d34] focus:ring-2 focus:ring-[#0e4d34]/20 outline-none shadow-xs transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-[#0f172a] mb-1">
                        WhatsApp Mobile Number *
                      </label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0e4d34]" />
                        <input
                          type="tel"
                          required
                          placeholder="10-digit mobile number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-10 pr-3.5 py-3.5 rounded-xl border-2 border-[#0e4d34]/25 bg-white text-sm font-semibold text-[#0f172a] focus:border-[#0e4d34] focus:ring-2 focus:ring-[#0e4d34]/20 outline-none shadow-xs transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-[#0f172a] mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0e4d34]" />
                        <input
                          type="email"
                          required
                          placeholder="you@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-3.5 py-3.5 rounded-xl border-2 border-[#0e4d34]/25 bg-white text-sm font-semibold text-[#0f172a] focus:border-[#0e4d34] focus:ring-2 focus:ring-[#0e4d34]/20 outline-none shadow-xs transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-[#0f172a] mb-1">
                        City *
                      </label>
                      <div className="relative">
                        <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0e4d34]" />
                        <input
                          type="text"
                          required
                          placeholder="Your city"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full pl-10 pr-3.5 py-3.5 rounded-xl border-2 border-[#0e4d34]/25 bg-white text-sm font-semibold text-[#0f172a] focus:border-[#0e4d34] focus:ring-2 focus:ring-[#0e4d34]/20 outline-none shadow-xs transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-[#0f172a] mb-1">
                      Preferred Initiative
                    </label>
                    <select
                      value={initiative}
                      onChange={(e) => setInitiative(e.target.value)}
                      className="w-full p-3.5 rounded-xl border-2 border-[#0e4d34]/25 bg-white text-sm font-bold text-[#0f172a] focus:border-[#0e4d34] focus:ring-2 focus:ring-[#0e4d34]/20 outline-none shadow-xs transition-all"
                    >
                      <option>BachpanShala (Rural Teaching &amp; Kits)</option>
                      <option>Project Jeev (Animal Feeding &amp; Care)</option>
                      <option>Amigos LEVELUP (Youth Mentorship &amp; AI)</option>
                      <option>Udaan (Women Empowerment &amp; Livelihoods)</option>
                      <option>Project Seva (Hunger Relief &amp; Ration Drives)</option>
                      <option>Project Prakriti (Environment &amp; Afforestation)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-[#0f172a] mb-1.5">
                      Weekly Availability
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Weekends Only (3-4 hrs)', 'Virtual & Remote', 'On-Ground Relief Reliever'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setAvailability(opt)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer ${
                            availability === opt
                              ? 'bg-[#0e4d34] text-white border-[#0e4d34] shadow-xs'
                              : 'bg-white border-[#0e4d34]/20 text-[#0f172a] hover:bg-[#eef5f0]'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-[#0e4d34] hover:bg-[#083523] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          <span>Submitting Application...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Volunteer Application</span>
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                    <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-charcoal/60">
                      <ShieldCheck size={14} className="text-[#0e4d34]" />
                      <span>Your information is safe and used only for volunteer onboarding.</span>
                    </div>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
