import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import {
  Download,
  Loader2,
  Lock,
  ShieldCheck,
  FileText,
  Users,
  CheckCircle2,
  Utensils,
  Heart,
  GraduationCap,
  Sprout,
  ArrowRight,
  ChevronDown,
  Check,
  Award,
  PawPrint,
} from 'lucide-react';
import { generateDonationReceipt } from '../lib/pdfGenerator';
import { initiateRazorpayPayment } from '../services/razorpay';

interface PresetTier {
  amount: number;
  label: string;
  isPopular?: boolean;
}

const PRESET_TIERS: PresetTier[] = [
  { amount: 500, label: 'Feeds 12 meals' },
  { amount: 1000, label: 'Provides 1 kit' },
  { amount: 2500, label: 'Supports 5 kits', isPopular: true },
  { amount: 5000, label: 'Helps 1 classroom' },
  { amount: 10000, label: 'Supports a month' },
  { amount: 25000, label: 'Funds a project' },
];

const CAUSE_OPTIONS = [
  {
    title: 'General IAF Impact Fund',
    category: 'Where Most Needed',
    desc: 'Allocated directly to grassroots emergency relief & core programs',
    icon: Heart,
    color: 'bg-[#eaf4ed] text-[#0e6644] border-[#c2dfc8]',
  },
  {
    title: 'Project BachpanShala',
    category: 'Education & Literacy',
    desc: 'Foundational learning pods & school kits for rural children',
    icon: GraduationCap,
    color: 'bg-[#eaf4ed] text-[#137547] border-[#d0e8d9]',
  },
  {
    title: 'Project Jeev',
    category: 'Animal Welfare',
    desc: 'Daily street animal feeding, water bowls, clinics & rescues',
    icon: PawPrint,
    color: 'bg-[#fff5e6] text-[#b26b00] border-[#ffe2b3]',
  },
  {
    title: 'Project Seva',
    category: 'Hunger Relief',
    desc: 'Hot nutritious meals & ration packs for daily-wage families',
    icon: Utensils,
    color: 'bg-[#fef0ee] text-[#c0392b] border-[#fcd9d5]',
  },
  {
    title: 'Project Prakriti',
    category: 'Environment',
    desc: 'Native tree plantation drives & community green belts',
    icon: Sprout,
    color: 'bg-[#eef8f0] text-[#1e824c] border-[#d3ebd7]',
  },
  {
    title: 'Project Udaan',
    category: 'Women Livelihood',
    desc: 'Vocational tailoring & self-help group entrepreneurship',
    icon: Award,
    color: 'bg-[#f8f0fc] text-[#8e44ad] border-[#ebd3f7]',
  },
  {
    title: 'Amigos LEVELUP',
    category: 'Youth Leadership',
    desc: 'Empowering young college changemakers across 28 states',
    icon: Users,
    color: 'bg-[#eef4ff] text-[#2471a3] border-[#d4e4fd]',
  },
];

// Validation helpers
const PHONE_REGEX = /^[6-9]\d{9}$/;
const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validatePhone(phone: string): string | null {
  const cleaned = phone.replace(/\s+/g, '').replace(/^\+91/, '');
  if (!PHONE_REGEX.test(cleaned)) {
    return 'Enter a valid 10-digit Indian mobile number';
  }
  return null;
}

function validatePan(pan: string): string | null {
  if (!pan.trim()) return null;
  if (!PAN_REGEX.test(pan.trim().toUpperCase())) {
    return 'PAN must be in format: ABCDE1234F';
  }
  return null;
}

function validateEmail(email: string): string | null {
  if (!EMAIL_REGEX.test(email.trim())) {
    return 'Enter a valid email address';
  }
  return null;
}

interface CompletedDonation {
  receiptNo: string;
  transactionId: string;
  date: string;
  amount: number;
  cause: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  donorPan?: string;
  paymentMode: string;
}

export default function DonatePage() {
  const [searchParams] = useSearchParams();
  const initialCause = searchParams.get('cause') || 'General IAF Impact Fund';
  const initialAmount = Number(searchParams.get('amount')) || 2500;

  const [amount, setAmount] = useState<number>(initialAmount);
  const [selectedCause, setSelectedCause] = useState<string>(initialCause);
  const [isCauseDropdownOpen, setIsCauseDropdownOpen] = useState(false);
  const causeDropdownRef = useRef<HTMLDivElement>(null);

  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorPan, setDonorPan] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedDonation, setCompletedDonation] = useState<CompletedDonation | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (causeDropdownRef.current && !causeDropdownRef.current.contains(e.target as Node)) {
        setIsCauseDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Trigger joyful celebratory confetti burst upon successful donation!
  useEffect(() => {
    if (completedDonation) {
      // 1. Center burst
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#0e4d34', '#ffd280', '#2e7d4f', '#ff6b6b', '#3b82f6'],
      });

      // 2. Dual cannon fireworks
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const interval: any = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);

        confetti({
          particleCount: 35,
          angle: 60,
          spread: 55,
          origin: { x: 0.05, y: 0.65 },
          colors: ['#ffd280', '#0e4d34', '#2e7d4f'],
        });
        confetti({
          particleCount: 35,
          angle: 120,
          spread: 55,
          origin: { x: 0.95, y: 0.65 },
          colors: ['#ffd280', '#0e4d34', '#2e7d4f'],
        });
      }, 350);

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [completedDonation]);

  // Impact calculations
  const meals = Math.max(1, Math.floor(amount / 40));
  const kits = Math.max(1, Math.floor(amount / 450));
  const taxBenefit = Math.floor(amount * 0.5);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!donorName.trim() || donorName.trim().length < 3) {
      newErrors.name = 'Full name must be at least 3 characters';
    }
    if (/\d/.test(donorName)) {
      newErrors.name = 'Name should not contain numbers';
    }

    const emailErr = validateEmail(donorEmail);
    if (emailErr) newErrors.email = emailErr;

    const phoneErr = validatePhone(donorPhone);
    if (phoneErr) newErrors.phone = phoneErr;

    const panErr = validatePan(donorPan);
    if (panErr) newErrors.pan = panErr;

    if (amount < 100) {
      newErrors.amount = 'Minimum donation is ₹100';
    }
    if (amount > 1000000) {
      newErrors.amount = 'Maximum donation is ₹10,00,000';
    }

    if (amount > 2000 && !donorPan.trim()) {
      newErrors.pan = 'PAN is required for donations above ₹2,000 (80G compliance)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsProcessing(true);

    try {
      const cleanPhone = donorPhone.replace(/\s+/g, '').replace(/^\+91/, '');

      const result = await initiateRazorpayPayment({
        amount,
        cause: selectedCause,
        donorName: donorName.trim(),
        email: donorEmail.trim(),
        phone: cleanPhone,
        donorPan: donorPan.trim().toUpperCase() || undefined,
      });

      setCompletedDonation(result);
      toast.success('Payment successful! Your donation has been recorded.');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Payment failed';
      if (msg !== 'Payment was cancelled') {
        toast.error(msg);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadReceipt = async () => {
    if (!completedDonation) return;

    // Joyful mini-confetti burst when clicking download
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#0e4d34', '#ffd280', '#2e7d4f', '#ffffff'],
    });

    await generateDonationReceipt(completedDonation);
    toast.success('Official InAmigos 80G Receipt PDF downloaded!');
  };

  const activeCauseObj =
    CAUSE_OPTIONS.find((c) => c.title === selectedCause) || CAUSE_OPTIONS[0];
  const ActiveIcon = activeCauseObj.icon;

  // ── ANIMATIC JOYFUL CELEBRATION SCREEN ──
  if (completedDonation) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-[#fcf9f3] relative overflow-hidden">
        {/* Festive background ambient blurs */}
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-[#ffd280]/20 rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-[#0e4d34]/15 rounded-full blur-3xl pointer-events-none -z-0" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          
          {/* Main Joyful Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-[0_25px_70px_-15px_rgba(14,77,52,0.2)] border-2 border-[#0e4d34]/20 text-center relative overflow-hidden">
            
            {/* Pulsing Joyful Badge */}
            <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#0e4d34] to-[#2e7d4f] animate-ping opacity-25" />
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#0e4d34] to-[#1a774a] text-white flex items-center justify-center shadow-xl ring-4 ring-[#ffd280]/60 relative z-10">
                <Heart size={36} className="fill-white" />
              </div>
            </div>

            {/* Joyful Headline */}
            <h1 className="font-display font-black text-3xl sm:text-5xl text-charcoal tracking-tight leading-[1.15]">
              Thank You, <span className="text-[#0e4d34]">{completedDonation.donorName}</span>! 🌟
            </h1>

            <p className="mt-3 text-base sm:text-lg text-charcoal/80 max-w-xl mx-auto leading-relaxed">
              Your generous gift of{' '}
              <strong className="text-[#0e4d34] font-black text-xl">
                ₹{completedDonation.amount.toLocaleString('en-IN')}
              </strong>{' '}
              to <span className="font-bold text-charcoal">{completedDonation.cause}</span> has been received with boundless joy. 100% is deployed directly to verified grassroots beneficiaries.
            </p>

            {/* Impact Highlights Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 my-8">
              <div className="bg-[#f4f9f5] rounded-2xl p-4 border border-[#c2e0cc] text-center">
                <div className="w-10 h-10 rounded-full bg-[#eaf4ed] text-[#0e6644] flex items-center justify-center mx-auto mb-2">
                  <Utensils size={18} />
                </div>
                <div className="font-display font-black text-2xl text-[#0e4d34]">
                  ~{Math.max(12, Math.floor(completedDonation.amount / 40))}
                </div>
                <div className="text-xs text-charcoal/65 font-medium mt-0.5">
                  Nutritious Meals Funded
                </div>
              </div>

              <div className="bg-[#f4f9f5] rounded-2xl p-4 border border-[#c2e0cc] text-center">
                <div className="w-10 h-10 rounded-full bg-[#eaf4ed] text-[#0e6644] flex items-center justify-center mx-auto mb-2">
                  <ShieldCheck size={18} />
                </div>
                <div className="font-display font-black text-2xl text-[#0e4d34]">
                  50%
                </div>
                <div className="text-xs text-charcoal/65 font-medium mt-0.5">
                  80G Tax Deductible
                </div>
              </div>

              <div className="bg-[#f4f9f5] rounded-2xl p-4 border border-[#c2e0cc] text-center">
                <div className="w-10 h-10 rounded-full bg-[#eaf4ed] text-[#0e6644] flex items-center justify-center mx-auto mb-2">
                  <Users size={18} />
                </div>
                <div className="font-display font-black text-2xl text-[#0e4d34]">
                  100%
                </div>
                <div className="text-xs text-charcoal/65 font-medium mt-0.5">
                  Direct Field Deployment
                </div>
              </div>
            </div>

            {/* Official Certificate Plaque Box */}
            <div className="bg-[#fdfbf7] rounded-2xl p-6 text-left border-2 border-[#d4820a]/30 shadow-inner relative">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-charcoal/10">
                <div className="flex items-center gap-2">
                  <img
                    src="/images/iaf-logo.png"
                    alt="IAF Logo"
                    className="w-8 h-8 rounded-full object-contain ring-1 ring-[#0e4d34]/20"
                  />
                  <div>
                    <span className="font-display font-bold text-sm text-[#0e4d34] block leading-tight">
                      InAmigos Foundation
                    </span>
                    <span className="text-[10px] text-charcoal/60 block">
                      Section 8 · 80G Approval: AAACI5678PF20214
                    </span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0e4d34] bg-[#eaf4ed] px-2.5 py-1 rounded-full border border-[#c2dfc8]">
                  <CheckCircle2 size={13} />
                  <span>Verified 80G Receipt</span>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-charcoal/60 block">Receipt Number</span>
                  <span className="font-mono font-bold text-[#0e4d34] text-sm">
                    {completedDonation.receiptNo}
                  </span>
                </div>
                <div>
                  <span className="text-charcoal/60 block">Transaction ID</span>
                  <span className="font-mono font-bold text-charcoal text-xs">
                    {completedDonation.transactionId}
                  </span>
                </div>
                <div>
                  <span className="text-charcoal/60 block">Date &amp; Payment Mode</span>
                  <span className="font-medium text-charcoal">
                    {completedDonation.date} via {completedDonation.paymentMode}
                  </span>
                </div>
                <div>
                  <span className="text-charcoal/60 block">Donor PAN</span>
                  <span className="font-mono font-bold text-charcoal">
                    {completedDonation.donorPan || 'NOT PROVIDED (Exempted)'}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3.5 justify-center">
              <button
                type="button"
                onClick={handleDownloadReceipt}
                className="flex-1 py-4 px-6 rounded-xl font-bold text-base text-white bg-gradient-to-r from-[#0e4d34] via-[#136141] to-[#0e4d34] hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-lg group"
              >
                <Download size={20} className="group-hover:translate-y-0.5 transition-transform" />
                <span>Download Official 80G Receipt (PDF)</span>
              </button>

              <button
                type="button"
                onClick={() => setCompletedDonation(null)}
                className="py-4 px-6 rounded-xl font-bold text-sm sm:text-base border-2 border-charcoal/20 text-charcoal hover:bg-[#eef5f0] hover:border-[#0e4d34] transition-all cursor-pointer"
              >
                Make Another Donation
              </button>
            </div>

            <p className="mt-6 text-xs text-charcoal/60">
              A permanent digital receipt has been dispatched to <strong>{completedDonation.donorEmail}</strong>.<br />
              Questions or CSR queries? Call our toll-free line: <strong>1800-209-4673</strong>.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── MAIN DONATION PAGE ──
  return (
    <div className="min-h-screen bg-[#f5f4ec] pb-24">

      {/* ===== HERO SECTION: Full-bleed background photo with high-contrast forest scrim & crisp text ===== */}
      <section className="relative w-full pt-0 overflow-hidden" style={{ minHeight: '380px' }}>
        <div className="absolute inset-0 z-0">
          <img
            src="/images/iaf-gallery-4.jpg"
            alt="InAmigos Foundation food distribution"
            className="w-full h-full object-cover object-center"
          />
          {/* Deep dark forest scrim for 100% contrast & legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#03140b]/94 via-[#062416]/88 to-[#03140b]/75" />
          <div className="absolute inset-0 bg-black/25 backdrop-blur-[0.5px]" />
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#f5f4ec] to-transparent" />
        </div>

        <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10 pt-32 pb-20 sm:pt-36 sm:pb-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fcf9f3] text-[#0e4d34] text-xs sm:text-sm font-bold shadow-md mb-5 border border-[#ffd280]/60">
              <span className="w-2 h-2 rounded-full bg-[#0e4d34] animate-pulse" />
              <span>Small Contributions. Big Changes.</span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
              Be the Reason <br />
              for a <span className="text-[#ffd280] drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">Brighter Tomorrow</span>
            </h1>

            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-white/95 leading-relaxed max-w-xl font-medium drop-shadow-sm">
              Your support helps us provide education, nutrition and opportunities
              to underprivileged children. Together, we can build a kinder, more
              equal tomorrow.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#072417]/85 backdrop-blur-md text-white text-xs sm:text-sm font-bold border border-white/30 shadow-md">
                <div className="w-6 h-6 rounded-full bg-[#ffd280]/25 text-[#ffd280] flex items-center justify-center">
                  <GraduationCap size={14} />
                </div>
                <span>Educate Children</span>
              </div>

              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#072417]/85 backdrop-blur-md text-white text-xs sm:text-sm font-bold border border-white/30 shadow-md">
                <div className="w-6 h-6 rounded-full bg-[#ff8a65]/25 text-[#ff8a65] flex items-center justify-center">
                  <Utensils size={14} />
                </div>
                <span>Nutritious Meals</span>
              </div>

              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#072417]/85 backdrop-blur-md text-white text-xs sm:text-sm font-bold border border-white/30 shadow-md">
                <div className="w-6 h-6 rounded-full bg-[#f472b6]/25 text-[#f472b6] flex items-center justify-center">
                  <Heart size={14} />
                </div>
                <span>Empower Communities</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:block absolute right-16 top-36 pointer-events-none select-none">
            <div className="p-4 rounded-2xl bg-[#072417]/75 backdrop-blur-md border border-white/20 shadow-2xl text-center">
              <div className="text-[#ffd280] text-2xl xl:text-3xl font-serif italic drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] rotate-[-4deg] tracking-wide">
                Together<br />&nbsp;&nbsp;We Can ♡
              </div>
              <span className="text-[11px] font-bold text-white/80 uppercase tracking-widest block mt-1">
                Verified 80G Impact
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MAIN DONATION CARD WITH THEME-MATCHING BACKGROUND & HIGH-CONTRAST LABELS ===== */}
      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-8 lg:px-12 mt-0 relative z-10">
        <div className="bg-[#fffdf9] rounded-3xl shadow-[0_25px_60px_-15px_rgba(14,77,52,0.15)] border-2 border-[#0e4d34]/20 p-6 sm:p-8 lg:p-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

            {/* ===== LEFT COLUMN: Form ===== */}
            <div className="lg:col-span-7">
              <p className="text-xs font-black text-[#0e4d34] tracking-widest uppercase mb-1">
                Support a Better Tomorrow
              </p>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-[#0f172a]">
                Make a Donation
              </h2>
              <p className="text-sm text-charcoal/75 mt-1.5 leading-relaxed font-medium">
                All donations are tax-deductible under Section 80G of the Income Tax Act.
              </p>

              {/* ── CUSTOM-STYLED INITIATIVE / CAUSE DROPDOWN MENU ── */}
              <div className="mt-6" ref={causeDropdownRef}>
                <label className="block text-xs sm:text-sm font-bold text-[#0f172a] mb-2">
                  Select Initiative / Cause *
                </label>

                <div className="relative">
                  {/* Dropdown Trigger Button */}
                  <button
                    type="button"
                    onClick={() => setIsCauseDropdownOpen(!isCauseDropdownOpen)}
                    className={`w-full p-3.5 rounded-xl border-2 transition-all flex items-center justify-between text-left cursor-pointer shadow-xs ${
                      isCauseDropdownOpen
                        ? 'border-[#0e4d34] ring-2 ring-[#0e4d34]/20 bg-white'
                        : 'border-[#0e4d34]/25 bg-white hover:border-[#0e4d34]/60'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-[#eaf4ed] text-[#0e6644] flex items-center justify-center shrink-0">
                        <ActiveIcon size={18} />
                      </div>
                      <div className="truncate">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#0f172a] truncate">
                            {activeCauseObj.title}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${activeCauseObj.color}`}>
                            {activeCauseObj.category}
                          </span>
                        </div>
                        <div className="text-xs text-charcoal/65 truncate mt-0.5">
                          {activeCauseObj.desc}
                        </div>
                      </div>
                    </div>

                    <ChevronDown
                      size={18}
                      className={`text-[#0e4d34] shrink-0 ml-2 transition-transform duration-200 ${
                        isCauseDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Dropdown Floating Options Menu */}
                  {isCauseDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border-2 border-[#0e4d34]/20 py-2 z-50 animate-in fade-in zoom-in-95 duration-150 max-h-[340px] overflow-y-auto">
                      {CAUSE_OPTIONS.map((item) => {
                        const ItemIcon = item.icon;
                        const isSelected = selectedCause === item.title;

                        return (
                          <button
                            key={item.title}
                            type="button"
                            onClick={() => {
                              setSelectedCause(item.title);
                              setIsCauseDropdownOpen(false);
                            }}
                            className={`w-full px-4 py-3 text-left transition-colors flex items-center justify-between gap-3 cursor-pointer ${
                              isSelected
                                ? 'bg-[#eaf4ed] border-l-4 border-[#0e4d34]'
                                : 'hover:bg-[#f4f9f5]'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                  isSelected
                                    ? 'bg-[#0e4d34] text-white'
                                    : 'bg-[#eaf4ed] text-[#0e6644]'
                                }`}
                              >
                                <ItemIcon size={16} />
                              </div>
                              <div className="truncate">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-sm text-[#0f172a] truncate">
                                    {item.title}
                                  </span>
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${item.color}`}>
                                    {item.category}
                                  </span>
                                </div>
                                <div className="text-xs text-charcoal/65 truncate mt-0.5">
                                  {item.desc}
                                </div>
                              </div>
                            </div>

                            {isSelected && (
                              <Check size={16} className="text-[#0e4d34] shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Amount Selection */}
              <div className="mt-6">
                <label className="block text-xs sm:text-sm font-bold text-[#0f172a] mb-2">
                  Select Donation Amount *
                </label>

                {/* 6 Preset Cards in a single row */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {PRESET_TIERS.map((tier) => {
                    const isSelected = amount === tier.amount;
                    return (
                      <button
                        key={tier.amount}
                        type="button"
                        onClick={() => {
                          setAmount(tier.amount);
                          setErrors((prev) => ({ ...prev, amount: '' }));
                        }}
                        className={`relative flex flex-col justify-center items-center py-3.5 px-1 rounded-xl text-center transition-all cursor-pointer border-2 ${
                          isSelected
                            ? 'bg-[#0e4d34] text-white border-[#0e4d34] shadow-md ring-2 ring-[#0e4d34]/25 scale-[1.02]'
                            : 'bg-white hover:bg-[#eef5f0] border-[#0e4d34]/20 text-[#0f172a]'
                        }`}
                      >
                        {tier.isPopular && (
                          <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-full bg-[#0e4d34] text-white text-[9px] font-bold shadow-xs whitespace-nowrap">
                            Most Chosen
                          </span>
                        )}
                        <span className="font-display font-black text-sm leading-tight">
                          ₹{tier.amount.toLocaleString('en-IN')}
                        </span>
                        <span
                          className={`text-[10px] mt-0.5 font-semibold leading-tight ${
                            isSelected ? 'text-white/90' : 'text-charcoal/65'
                          }`}
                        >
                          {tier.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Amount Input */}
                <div className="mt-3 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0e4d34] font-black text-lg">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="100"
                    max="1000000"
                    step="100"
                    placeholder="Enter custom amount"
                    value={amount || ''}
                    onChange={(e) => {
                      setAmount(Number(e.target.value));
                      setErrors((prev) => ({ ...prev, amount: '' }));
                    }}
                    className="w-full pl-9 pr-4 py-3.5 bg-white rounded-xl border-2 border-[#0e4d34]/25 text-base font-bold text-[#0f172a] focus:border-[#0e4d34] focus:ring-2 focus:ring-[#0e4d34]/20 outline-none shadow-xs"
                  />
                </div>
                {errors.amount && <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.amount}</p>}
              </div>

              {/* Donor Details Form */}
              <form onSubmit={handleSubmit} className="mt-7 space-y-4 pt-6 border-t-2 border-charcoal/10">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-[#0f172a] text-sm sm:text-base">
                    Your Details (for Official 80G Certificate)
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#0e4d34] font-semibold">
                    <ShieldCheck size={15} />
                    <span>80G Deductible</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-[#0f172a] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      minLength={3}
                      placeholder="As per PAN card"
                      value={donorName}
                      onChange={(e) => {
                        setDonorName(e.target.value);
                        setErrors((prev) => ({ ...prev, name: '' }));
                      }}
                      className={`w-full p-3 bg-white rounded-xl border-2 text-sm font-medium text-[#0f172a] focus:ring-2 outline-none shadow-xs ${
                        errors.name
                          ? 'border-red-400 focus:ring-red-200'
                          : 'border-[#0e4d34]/25 focus:border-[#0e4d34] focus:ring-[#0e4d34]/20'
                      }`}
                    />
                    {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-[#0f172a] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@email.com"
                      value={donorEmail}
                      onChange={(e) => {
                        setDonorEmail(e.target.value);
                        setErrors((prev) => ({ ...prev, email: '' }));
                      }}
                      className={`w-full p-3 bg-white rounded-xl border-2 text-sm font-medium text-[#0f172a] focus:ring-2 outline-none shadow-xs ${
                        errors.email
                          ? 'border-red-400 focus:ring-red-200'
                          : 'border-[#0e4d34]/25 focus:border-[#0e4d34] focus:ring-[#0e4d34]/20'
                      }`}
                    />
                    {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-[#0f172a] mb-1">
                      WhatsApp Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={donorPhone}
                      onChange={(e) => {
                        setDonorPhone(e.target.value);
                        setErrors((prev) => ({ ...prev, phone: '' }));
                      }}
                      className={`w-full p-3 bg-white rounded-xl border-2 text-sm font-medium text-[#0f172a] focus:ring-2 outline-none shadow-xs ${
                        errors.phone
                          ? 'border-red-400 focus:ring-red-200'
                          : 'border-[#0e4d34]/25 focus:border-[#0e4d34] focus:ring-[#0e4d34]/20'
                      }`}
                    />
                    {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-[#0f172a] mb-1">
                      PAN Card {amount > 2000 ? '*' : '(optional for < ₹2,000)'}
                    </label>
                    <input
                      type="text"
                      maxLength={10}
                      placeholder="ABCDE1234F"
                      value={donorPan}
                      onChange={(e) => {
                        setDonorPan(e.target.value.toUpperCase());
                        setErrors((prev) => ({ ...prev, pan: '' }));
                      }}
                      className={`w-full p-3 bg-white rounded-xl border-2 text-sm font-mono uppercase font-bold text-[#0f172a] focus:ring-2 outline-none shadow-xs ${
                        errors.pan
                          ? 'border-red-400 focus:ring-red-200'
                          : 'border-[#0e4d34]/25 focus:border-[#0e4d34] focus:ring-[#0e4d34]/20'
                      }`}
                    />
                    {errors.pan && <p className="text-red-600 text-xs mt-1">{errors.pan}</p>}
                  </div>
                </div>

                {/* Submit CTA Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 px-6 rounded-xl font-bold text-base text-white bg-gradient-to-r from-[#0e4d34] via-[#12583c] to-[#0e4d34] hover:shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        <span>Opening Razorpay Secure Gateway...</span>
                      </>
                    ) : (
                      <>
                        <Lock size={18} />
                        <span>Proceed to Donate ₹{amount.toLocaleString('en-IN')} with Razorpay</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                  <p className="mt-3 text-center text-xs text-charcoal/60 font-semibold">
                    Secured by Razorpay · UPI (GPay, PhonePe, Paytm, QR), Cards &amp; NetBanking · 256-bit SSL
                  </p>
                </div>
              </form>
            </div>

            {/* ===== RIGHT COLUMN: Impact Summary Card ===== */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#eef7f2] to-[#e4f1e8] rounded-2xl p-6 sm:p-7 border-2 border-[#0e4d34]/20 shadow-md flex flex-col gap-5">

              {/* Header */}
              <div className="flex items-center gap-2 text-[#0e4d34] font-black text-base sm:text-lg">
                <Sprout size={22} />
                <h3>Your Contribution Makes an Impact</h3>
              </div>

              {/* White summary card */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#0e4d34]/15 text-center">
                <div className="w-12 h-12 rounded-full bg-[#0e4d34]/10 text-[#0e4d34] flex items-center justify-center mx-auto mb-2">
                  <Heart size={22} className="fill-[#0e4d34]/20" />
                </div>
                <span className="text-xs font-bold text-[#0e4d34] block truncate px-2">
                  {selectedCause}
                </span>
                <div className="font-display font-black text-4xl text-[#0f172a] my-2">
                  ₹{amount.toLocaleString('en-IN')}
                </div>
                <p className="text-sm font-semibold text-charcoal/70">
                  Provides approx. <strong className="text-[#0e4d34] font-black">{meals} meals</strong> to families in need.
                </p>
              </div>

              {/* What Your Donation Helps */}
              <div>
                <span className="text-xs font-black text-[#0e4d34] uppercase tracking-wider block mb-3">
                  What Your Donation Helps
                </span>

                <div className="space-y-2.5">
                  <div className="flex items-center gap-3 bg-white rounded-xl px-3.5 py-3 border border-[#0e4d34]/15 shadow-2xs">
                    <div className="w-9 h-9 rounded-full bg-[#fdeee9] text-[#c45d3e] flex items-center justify-center shrink-0">
                      <Utensils size={16} />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#0f172a]">{kits} educational kits</div>
                      <div className="text-xs text-charcoal/65 font-medium">for underprivileged students</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-white rounded-xl px-3.5 py-3 border border-[#0e4d34]/15 shadow-2xs">
                    <div className="w-9 h-9 rounded-full bg-[#eaf4ed] text-[#2e7d4f] flex items-center justify-center shrink-0">
                      <Users size={16} />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#0f172a]">Supports children</div>
                      <div className="text-xs text-charcoal/65 font-medium">with learning material &amp; resources</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-white rounded-xl px-3.5 py-3 border border-[#0e4d34]/15 shadow-2xs">
                    <div className="w-9 h-9 rounded-full bg-[#fae8eb] text-[#d94862] flex items-center justify-center shrink-0">
                      <Heart size={16} />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#0f172a]">Brings hope</div>
                      <div className="text-xs text-charcoal/65 font-medium">to a brighter, equal future</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 80G Tax Benefit Box */}
              <div className="bg-white border-2 border-[#0e4d34]/20 rounded-xl p-4 flex items-start gap-3 shadow-2xs">
                <ShieldCheck className="text-[#0e4d34] shrink-0 mt-0.5" size={20} />
                <div className="text-xs text-[#0f172a] leading-relaxed">
                  <p className="font-semibold">
                    <strong className="text-[#0e4d34] font-black">50% of your donation (₹{taxBenefit.toLocaleString('en-IN')})</strong> is
                    deductible from taxable income under
                    Section 80G of the Income Tax Act.
                  </p>
                  <p className="mt-1 text-[11px] text-charcoal/65 font-medium">
                    Official 80G certificate PDF generated immediately after payment.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Trust Badges */}
          <div className="mt-10 pt-8 border-t-2 border-charcoal/10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-full bg-[#eaf4ed] text-[#0e6644] flex items-center justify-center font-bold">
                <ShieldCheck size={20} />
              </div>
              <span className="font-bold text-sm text-[#0f172a]">80G Certified</span>
              <span className="text-xs text-charcoal/65">50% Tax Exemption</span>
            </div>

            <div className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-full bg-[#eaf4ed] text-[#0e6644] flex items-center justify-center font-bold">
                <FileText size={20} />
              </div>
              <span className="font-bold text-sm text-[#0f172a]">Transparent &amp; Audited</span>
              <span className="text-xs text-charcoal/65">Quarterly CA Audits</span>
            </div>

            <div className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-full bg-[#eaf4ed] text-[#0e6644] flex items-center justify-center font-bold">
                <Users size={20} />
              </div>
              <span className="font-bold text-sm text-[#0f172a]">NGO Darpan Enrolled</span>
              <span className="text-xs text-charcoal/65">CG/2021/0291448</span>
            </div>

            <div className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-full bg-[#eaf4ed] text-[#0e6644] flex items-center justify-center font-bold">
                <CheckCircle2 size={20} />
              </div>
              <span className="font-bold text-sm text-[#0f172a]">ISO 9001:2015</span>
              <span className="text-xs text-charcoal/65">Quality Assured</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
