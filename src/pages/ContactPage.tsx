import { useState } from 'react';
import { MapPin, Mail, Phone, Send, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '../services/api';

const INQUIRY_TYPES = [
  { id: 'General', label: 'General Inquiry' },
  { id: 'CSR Partnership', label: 'Corporate CSR Partnership' },
  { id: '80G Receipt Query', label: '80G Tax Receipt Support' },
  { id: 'Emergency Rescue', label: 'Emergency Animal / Food Rescue' },
  { id: 'Media & PR', label: 'Media, Press & Interview' },
] as const;

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState<'General' | 'CSR Partnership' | '80G Receipt Query' | 'Emergency Rescue' | 'Media & PR'>('General');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (name.trim().length < 3 || /\d/.test(name)) {
      newErrors.name = 'Name must be at least 3 characters and contain no numbers.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    const cleanPhone = phone.replace(/^(\+91|91|\s+)/g, '').replace(/\s+/g, '');
    if (phone.trim() && !/^[6-9]\d{9}$/.test(cleanPhone)) {
      newErrors.phone = 'Please enter a valid Indian mobile number.';
    }
    if (subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters.';
    }
    if (message.trim().length < 20) {
      newErrors.message = 'Message must be at least 20 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const cleanPhone = phone.replace(/^(\+91|91|\s+)/g, '').replace(/\s+/g, '');
    
    try {
      const res = await api.submitInquiry({
        name: name.trim(),
        email: email.trim(),
        phone: cleanPhone,
        category,
        subject: subject.trim(),
        message: message.trim(),
      });

      if (res.success) {
        setIsSubmitted(true);
        toast.success('Your message has been received!');
      } else {
        toast.error(res.error || 'Failed to submit inquiry.');
      }
    } catch {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-warm-white">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h1 className="font-display font-bold text-charcoal leading-tight" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
            Contact IAF
          </h1>
          <p className="mt-3 font-body text-base text-charcoal/70">
            Have a question about 80G tax receipts, corporate CSR grants, or volunteer drives in your city? We are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="form-card-surface rounded-3xl p-6 sm:p-8 shadow-xl border border-[#0e4d34]/15 space-y-6">
              <h3 className="font-display font-bold text-2xl text-charcoal">
                National Headquarters
              </h3>

              <div className="space-y-4 text-sm text-charcoal/80">
                <div className="flex items-start gap-3">
                  <MapPin className="text-terracotta flex-shrink-0 mt-1" size={20} />
                  <div>
                    <strong className="block text-charcoal">Registered Office Address:</strong>
                    <span>Ward No. 5, Gram Post, Sipat Ujwal Nagar, Bilaspur, Chhattisgarh 495555, India</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="text-sage flex-shrink-0 mt-1" size={20} />
                  <div>
                    <strong className="block text-charcoal">Official Email:</strong>
                    <a href="mailto:support@inamigosfoundation.org.in" className="text-sage hover:text-terracotta font-semibold">
                      support@inamigosfoundation.org.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="text-sage flex-shrink-0 mt-1" size={20} />
                  <div>
                    <strong className="block text-charcoal">Direct Helpline:</strong>
                    <a href="tel:+916267309902" className="text-charcoal font-bold">
                      +91 626 730 9902
                    </a>
                    <span className="block text-xs text-charcoal/60 mt-0.5">
                      Monday to Saturday, 9:00 AM – 7:00 PM IST
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-card border border-soft-gray text-xs text-charcoal/70 space-y-2">
              <div className="flex justify-between">
                <span>MCA Company CIN:</span>
                <span className="font-mono font-bold text-charcoal">U85300CT2020NPL010641</span>
              </div>
              <div className="flex justify-between">
                <span>NITI Aayog Darpan ID:</span>
                <span className="font-mono font-bold text-charcoal">CG/2021/0291448</span>
              </div>
              <div className="flex justify-between">
                <span>CSR-1 Registration:</span>
                <span className="font-mono font-bold text-charcoal">CSR00083159</span>
              </div>
              <div className="flex justify-between">
                <span>Income Tax 80G Approval:</span>
                <span className="font-mono font-bold text-charcoal">AAACI5678PF20214</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#fffdf9] rounded-3xl p-6 sm:p-10 shadow-[0_22px_65px_-12px_rgba(14,77,52,0.16)] border-2 border-[#0e4d34]/20">
            {isSubmitted ? (
              <div className="text-center py-10 animate-in fade-in zoom-in-95">
                <div className="w-16 h-16 bg-[#eaf4ed] text-[#0e4d34] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="font-display font-black text-2xl text-[#0f172a]">
                  Thank You, {name}!
                </h3>
                <p className="mt-2 text-sm text-charcoal/80 max-w-md mx-auto">
                  Your message regarding <strong>{category}</strong> has been logged into our support queue. A coordinator will email you at <strong>{email}</strong> shortly.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setName('');
                    setEmail('');
                    setPhone('');
                    setSubject('');
                    setMessage('');
                  }}
                  className="mt-6 px-6 py-2.5 rounded-full font-body font-bold text-xs border border-charcoal/20 text-[#0f172a] hover:bg-[#eef5f0]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-display font-black text-2xl text-[#0f172a] mb-4">
                  Send an Inquiry
                </h3>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0f172a] mb-2">
                    Inquiry Topic
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {INQUIRY_TYPES.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setCategory(t.id as any)}
                        className={`p-3 rounded-xl border-2 text-left text-xs font-bold transition-all cursor-pointer ${
                          category === t.id
                            ? 'bg-[#0e4d34] text-white border-[#0e4d34] shadow-sm'
                            : 'bg-white text-[#0f172a] border-[#0e4d34]/20 hover:bg-[#eef5f0]'
                        }`}
                      >
                        <span className="truncate">{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-[#0f172a] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Vikramaditya"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 bg-white rounded-xl border-2 border-[#0e4d34]/25 text-sm font-medium text-[#0f172a] focus:border-[#0e4d34] focus:ring-2 focus:ring-[#0e4d34]/20 outline-none shadow-xs"
                    />
                    {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-[#0f172a] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. vikram@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 bg-white rounded-xl border-2 border-[#0e4d34]/25 text-sm font-medium text-[#0f172a] focus:border-[#0e4d34] focus:ring-2 focus:ring-[#0e4d34]/20 outline-none shadow-xs"
                    />
                    {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-[#0f172a] mb-1">
                      Phone / Mobile Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-3 bg-white rounded-xl border-2 border-[#0e4d34]/25 text-sm font-medium text-[#0f172a] focus:border-[#0e4d34] focus:ring-2 focus:ring-[#0e4d34]/20 outline-none shadow-xs"
                    />
                    {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-[#0f172a] mb-1">
                      Subject *
                    </label>
                    <input
                      type="text"
                      placeholder="Brief headline"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full p-3 bg-white rounded-xl border-2 border-[#0e4d34]/25 text-sm font-medium text-[#0f172a] focus:border-[#0e4d34] focus:ring-2 focus:ring-[#0e4d34]/20 outline-none shadow-xs"
                    />
                    {errors.subject && <p className="text-xs text-red-600 mt-1">{errors.subject}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#0f172a] mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Provide details..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 bg-white rounded-xl border-2 border-[#0e4d34]/25 text-sm font-medium text-[#0f172a] focus:border-[#0e4d34] focus:ring-2 focus:ring-[#0e4d34]/20 outline-none shadow-xs"
                  />
                  {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-3.5 text-sm font-bold flex items-center justify-center gap-2 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send size={16} /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
