import { useState } from 'react';
import { Link } from 'react-router';
import { toast } from 'sonner';
import {
  ShieldCheck,
  FileCheck,
  PieChart as PieIcon,
  TrendingUp,
  ChevronDown,
  Award,
  Download,
  Building2,
  CheckCircle2,
  ArrowRight,
  Heart,
  Copy,
  Sparkles,
  Calculator,
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts';
import { fundUtilization, yearlyGrowthData, legalCredentials } from '../data/transparencyData';

// Theme-aligned colors for Fund Utilization
const THEME_CHART_COLORS = [
  '#0e4d34', // Primary Forest Green
  '#2e7d4f', // Sage Green
  '#d4820a', // Warm Amber/Gold
  '#c0392b', // Terracotta
  '#2471a3', // Soft Ocean Blue
  '#64748b', // Slate Gray
];

const AUDIT_DOCUMENTS = [
  {
    title: 'FY 2023-24 Audited Financial Statements',
    type: 'Statutory Audit Report',
    period: 'April 2023 – March 2024',
    auditor: 'M/s Agrawal & Associates, Chartered Accountants',
    fileSize: '1.8 MB (PDF)',
  },
  {
    title: 'Form 10B Income Tax Audit Report',
    type: 'Income Tax Statutory Filing',
    period: 'Assessment Year 2024-25',
    auditor: 'Directorate of Income Tax (Exemptions)',
    fileSize: '840 KB (PDF)',
  },
  {
    title: 'NITI Aayog NGO Darpan Annual Progress Return',
    type: 'Government Annual Census',
    period: 'Enrolment ID: CG/2021/0291448',
    auditor: 'NITI Aayog, Govt. of India',
    fileSize: '1.2 MB (PDF)',
  },
  {
    title: 'Ministry of Corporate Affairs CSR-1 Annual Filing',
    type: 'CSR Compliance Disclosure',
    period: 'Registration No: CSR00083159',
    auditor: 'Ministry of Corporate Affairs, Govt. of India',
    fileSize: '950 KB (PDF)',
  },
];

const FAQS = [
  {
    q: 'How does Section 80G tax exemption work for Indian donors?',
    a: 'Under Section 80G of the Indian Income Tax Act 1961, 50% of your total donation amount is fully deductible from your taxable gross total income. For example, if you donate ₹10,000 and are in the 30% tax slab, you save ₹1,500 in taxes. IAF automatically issues an official 80G-compliant receipt containing our unique registration approval number AAACI5678PF20214.',
  },
  {
    q: 'What proportion of my contribution directly reaches beneficiaries?',
    a: 'Over 95% of all funds received are deployed directly across grassroots field missions (BachpanShala rural learning pods, Jeev stray animal feeding & clinics, Seva hunger relief drives, and Prakriti native afforestation). Less than 5% is utilized for statutory audit fees, payment gateway costs, and essential administrative governance.',
  },
  {
    q: 'Is InAmigos Foundation verified on the Government of India NITI Aayog portal?',
    a: 'Yes, InAmigos Foundation is registered and verified on the official NITI Aayog NGO Darpan portal under unique Government ID: CG/2021/0291448. All annual progress returns are submitted in compliance with federal guidelines.',
  },
  {
    q: 'Can Indian & multinational corporations partner under CSR mandates?',
    a: 'Yes. IAF is registered with the Ministry of Corporate Affairs under Form CSR-1 (Registration No: CSR00083159). We are authorized to execute corporate CSR partnerships under Schedule VII of the Companies Act 2013 with quarterly impact documentation.',
  },
  {
    q: 'When and how will I receive my 80G Tax Exemption certificate?',
    a: 'Your digital 80G tax receipt is generated instantly upon successful online payment on our secure portal. You can download the signed PDF immediately or access the copy sent automatically to your registered email address.',
  },
];

export default function TransparencyPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [calcAmount, setCalcAmount] = useState<number>(5000);

  const eligibleDeduction = Math.floor(calcAmount * 0.5);
  const estimatedTaxSaved = Math.floor(eligibleDeduction * 0.3); // 30% slab
  const effectiveCost = calcAmount - estimatedTaxSaved;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#fcf9f3]">
      <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-6 lg:px-10">

        {/* ── 1. HERO HEADER WITH VERIFICATION BADGES ── */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#eaf4ed] text-[#0e6644] font-bold text-xs uppercase tracking-wider mb-4 border border-[#c2dfc8] shadow-xs">
            <ShieldCheck size={16} />
            <span>Statutory Compliance · Government Verified Non-Profit</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-charcoal tracking-tight leading-[1.1]">
            Transparency, Governance &amp; <span className="text-[#0e6644]">80G Tax Exemption</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-charcoal/75 leading-relaxed">
            Every rupee contributed to InAmigos Foundation is accounted for with 100% public disclosure, regular statutory audits, and full legal compliance under the Government of India.
          </p>

          {/* 4 Trust Seals Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mt-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-4 border border-[#0e4d34]/15 shadow-sm text-center">
              <div className="w-10 h-10 rounded-full bg-[#eaf4ed] text-[#0e6644] flex items-center justify-center mx-auto mb-2">
                <ShieldCheck size={20} />
              </div>
              <div className="font-bold text-sm text-charcoal">50% Tax Deduction</div>
              <div className="text-xs text-charcoal/60 mt-0.5">Section 80G Certified</div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-[#0e4d34]/15 shadow-sm text-center">
              <div className="w-10 h-10 rounded-full bg-[#eaf4ed] text-[#0e6644] flex items-center justify-center mx-auto mb-2">
                <Building2 size={20} />
              </div>
              <div className="font-bold text-sm text-charcoal">NITI Aayog Darpan</div>
              <div className="text-xs text-charcoal/60 mt-0.5">ID: CG/2021/0291448</div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-[#0e4d34]/15 shadow-sm text-center">
              <div className="w-10 h-10 rounded-full bg-[#eaf4ed] text-[#0e6644] flex items-center justify-center mx-auto mb-2">
                <Award size={20} />
              </div>
              <div className="font-bold text-sm text-charcoal">MCA CSR-1 Agency</div>
              <div className="text-xs text-charcoal/60 mt-0.5">CSR00083159</div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-[#0e4d34]/15 shadow-sm text-center">
              <div className="w-10 h-10 rounded-full bg-[#eaf4ed] text-[#0e6644] flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 size={20} />
              </div>
              <div className="font-bold text-sm text-charcoal">ISO 9001:2015</div>
              <div className="text-xs text-charcoal/60 mt-0.5">Quality Audited</div>
            </div>
          </div>
        </div>

        {/* ── 2. INTERACTIVE 80G TAX EXEMPTION CALCULATOR ── */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-[#0e4d34]/20 mb-16 relative overflow-hidden">
          {/* Subtle background leaves */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#eaf4ed]/50 rounded-full blur-3xl pointer-events-none -z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Col: Calculator Inputs */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eaf4ed] text-[#0e6644] text-xs font-bold border border-[#c2dfc8]">
                <Calculator size={14} />
                <span>Interactive 80G Tax Savings Calculator</span>
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-charcoal">
                How Much Tax Can You Save with InAmigos?
              </h2>
              <p className="text-sm text-charcoal/70 leading-relaxed">
                As a registered Section 8 non-profit with 80G tax exemption, 50% of your donation is deductible from your taxable income under the Indian Income Tax Act.
              </p>

              {/* Amount Presets */}
              <div>
                <label className="block text-xs font-bold text-charcoal/80 uppercase tracking-wider mb-2">
                  Select or Enter Contribution Amount
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-3">
                  {[2500, 5000, 10000, 25000, 50000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setCalcAmount(amt)}
                      className={`py-2 px-1 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                        calcAmount === amt
                          ? 'bg-[#0e4d34] text-white border-[#0e4d34] shadow-sm'
                          : 'bg-[#faf9f6] text-charcoal hover:bg-[#eef5f0] border-charcoal/15'
                      }`}
                    >
                      ₹{amt.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/50 font-bold text-base">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="100"
                    step="500"
                    value={calcAmount}
                    onChange={(e) => setCalcAmount(Math.max(100, Number(e.target.value)))}
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-charcoal/20 bg-[#fbfdfb] text-base font-bold text-charcoal focus:border-[#0e4d34] focus:ring-2 focus:ring-[#0e4d34]/15 outline-none shadow-inner"
                  />
                </div>
              </div>

              {/* How it works 3 steps */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-charcoal/10">
                <div className="text-xs">
                  <span className="w-5 h-5 rounded-full bg-[#0e4d34] text-white font-bold inline-flex items-center justify-center text-[10px] mb-1">
                    1
                  </span>
                  <div className="font-bold text-charcoal">Donate Online</div>
                  <div className="text-charcoal/60 mt-0.5">Provide PAN &amp; name as per official ID</div>
                </div>
                <div className="text-xs">
                  <span className="w-5 h-5 rounded-full bg-[#0e4d34] text-white font-bold inline-flex items-center justify-center text-[10px] mb-1">
                    2
                  </span>
                  <div className="font-bold text-charcoal">Instant 80G PDF</div>
                  <div className="text-charcoal/60 mt-0.5">Signed receipt generated immediately</div>
                </div>
                <div className="text-xs">
                  <span className="w-5 h-5 rounded-full bg-[#0e4d34] text-white font-bold inline-flex items-center justify-center text-[10px] mb-1">
                    3
                  </span>
                  <div className="font-bold text-charcoal">Claim in ITR</div>
                  <div className="text-charcoal/60 mt-0.5">Quote IAF PAN in your annual return</div>
                </div>
              </div>
            </div>

            {/* Right Col: Instant Breakdown Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#072d1e] via-[#0e4d34] to-[#115539] text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-[#23704d]">
              <span className="text-xs font-bold text-[#ffd280] uppercase tracking-wider block mb-1">
                Your Tax Deduction Summary
              </span>
              <div className="font-display font-black text-3xl sm:text-4xl text-white mb-6">
                ₹{calcAmount.toLocaleString('en-IN')}{' '}
                <span className="text-sm font-normal text-white/70">donation</span>
              </div>

              <div className="space-y-3.5 pb-6 border-b border-white/15 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Section 80G Eligible Deduction (50%)</span>
                  <span className="font-bold text-[#ffd280] font-mono text-base">
                    ₹{eligibleDeduction.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Estimated Income Tax Saved (30% slab)</span>
                  <span className="font-bold text-[#46d691] font-mono text-base">
                    ~ ₹{estimatedTaxSaved.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-white/10">
                  <span className="font-bold text-white">Effective Cost of Your Impact</span>
                  <span className="font-bold text-white font-mono text-lg">
                    ₹{effectiveCost.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  to={`/donate?amount=${calcAmount}`}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#ffd280] hover:bg-[#ffc65c] text-[#0e4d34] font-bold text-sm text-center shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Heart size={16} />
                  <span>Donate ₹{calcAmount.toLocaleString('en-IN')} with 80G</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── 3. OFFICIAL STATUTORY ACCREDITATIONS & LICENSES (GENUINE CERTIFICATE CARDS) ── */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eaf4ed] text-[#0e6644] text-xs font-bold mb-2 border border-[#c2dfc8]">
              <FileCheck size={14} />
              <span>Official Government Approvals &amp; Accreditations</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-charcoal">
              Statutory Registrations &amp; Licenses
            </h2>
            <p className="text-sm text-charcoal/70 mt-2">
              All credentials are verified, active, and publicly searchable in central government registries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {legalCredentials.map((cred, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#0e4d34]/15 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  {/* Top Seal / Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#eaf4ed] text-[#0e6644] flex items-center justify-center font-bold">
                      <Award size={24} />
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0e6644] bg-[#eaf4ed] px-2.5 py-1 rounded-full border border-[#c2dfc8]">
                      <CheckCircle2 size={12} />
                      <span>{cred.validity.split('(')[0]}</span>
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-charcoal group-hover:text-[#0e4d34] transition-colors leading-snug">
                    {cred.title}
                  </h3>

                  <p className="text-xs font-semibold text-[#0e6644] mt-1 flex items-center gap-1.5">
                    <Building2 size={13} />
                    <span>{cred.authority}</span>
                  </p>

                  <p className="mt-3 text-xs sm:text-sm text-charcoal/70 leading-relaxed">
                    {cred.description}
                  </p>
                </div>

                {/* Bottom details block */}
                <div className="mt-6 pt-4 border-t border-charcoal/10 space-y-2 text-xs">
                  <div className="flex items-center justify-between bg-[#f8faf9] p-2.5 rounded-xl border border-charcoal/10">
                    <span className="text-charcoal/60 font-medium">Registration No:</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(cred.registrationNo, cred.title)}
                      className="flex items-center gap-1.5 font-mono font-bold text-[#0e4d34] hover:underline cursor-pointer"
                      title="Click to copy registration number"
                    >
                      <span>{cred.registrationNo}</span>
                      <Copy size={12} />
                    </button>
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-charcoal/60 px-1">
                    <span>Issued: {cred.date}</span>
                    <span className="font-semibold text-[#0e4d34]">Verified Central Registry</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 4. FINANCIAL UTILIZATION & IMPACT ANALYTICS (SITE THEME) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Fund Utilization Donut Chart (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#0e4d34]/15 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display font-bold text-2xl text-charcoal flex items-center gap-2">
                  <PieIcon size={22} className="text-[#0e4d34]" />
                  <span>Fund Allocation Breakdown</span>
                </h3>
                <span className="text-xs font-bold px-3 py-1 bg-[#eaf4ed] text-[#0e6644] rounded-full border border-[#c2dfc8]">
                  FY 2024-25 Audited
                </span>
              </div>
              <p className="text-xs sm:text-sm text-charcoal/65 mb-6 leading-relaxed">
                Direct distribution of every ₹100 contributed to InAmigos Foundation. Over 95% goes directly to grassroots community missions.
              </p>
            </div>

            <div className="h-64 sm:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={fundUtilization}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={95}
                    paddingAngle={3}
                    dataKey="percentage"
                    nameKey="category"
                  >
                    {fundUtilization.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={THEME_CHART_COLORS[index % THEME_CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any, name: any) => [`${val}% of Total Funds`, name]}
                    contentStyle={{
                      backgroundColor: '#081e14',
                      color: '#ffffff',
                      borderRadius: '12px',
                      fontSize: '12px',
                      border: '1px solid #23704d',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Custom Legend */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 pt-4 border-t border-charcoal/10 text-xs">
              {fundUtilization.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: THEME_CHART_COLORS[idx % THEME_CHART_COLORS.length] }}
                  />
                  <span className="text-charcoal/80 font-medium truncate">
                    {item.percentage}% {item.category.split('(')[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Growth & Beneficiary Track Record (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#0e4d34]/15 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display font-bold text-2xl text-charcoal flex items-center gap-2">
                  <TrendingUp size={22} className="text-[#0e4d34]" />
                  <span>5-Year Grassroots Impact</span>
                </h3>
                <span className="text-xs font-bold px-3 py-1 bg-[#eaf4ed] text-[#0e6644] rounded-full border border-[#c2dfc8]">
                  52,000+ Lives Reached
                </span>
              </div>
              <p className="text-xs sm:text-sm text-charcoal/65 mb-6 leading-relaxed">
                Year-on-year growth in verified beneficiary outreach and certified youth volunteer mobilization across India.
              </p>
            </div>

            <div className="h-64 sm:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yearlyGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="year" stroke="#334155" fontSize={12} />
                  <YAxis stroke="#334155" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#081e14',
                      color: '#ffffff',
                      borderRadius: '12px',
                      fontSize: '12px',
                      border: '1px solid #23704d',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="beneficiaries" name="Beneficiaries Served" fill="#0e4d34" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="volunteers" name="Enrolled Volunteers" fill="#d4820a" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 pt-4 border-t border-charcoal/10 flex items-center justify-between text-xs text-charcoal/70">
              <span>Audited by Chartered Accountants</span>
              <span className="font-semibold text-[#0e4d34]">ISO 9001:2015 Compliant</span>
            </div>
          </div>
        </div>

        {/* ── 5. AUDITED ANNUAL REPORTS & STATUTORY FILINGS ── */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eaf4ed] text-[#0e6644] text-xs font-bold mb-2 border border-[#c2dfc8]">
              <Download size={14} />
              <span>Public Accountability Disclosures</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-charcoal">
              Audited Financial Disclosures
            </h2>
            <p className="text-sm text-charcoal/70 mt-2">
              Download audited balance sheets, statutory CA filings, and public compliance certificates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {AUDIT_DOCUMENTS.map((doc, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-[#0e4d34]/15 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#eaf4ed] text-[#0e6644] flex items-center justify-center mb-3">
                    <FileCheck size={20} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0e6644] block mb-1">
                    {doc.type}
                  </span>
                  <h4 className="font-display font-bold text-sm text-charcoal leading-snug">
                    {doc.title}
                  </h4>
                  <p className="text-xs text-charcoal/60 mt-1.5">
                    {doc.period}
                  </p>
                  <p className="text-[11px] text-charcoal/50 mt-1">
                    {doc.auditor}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-charcoal/10 flex items-center justify-between">
                  <span className="text-[11px] text-charcoal/50 font-mono">{doc.fileSize}</span>
                  <button
                    type="button"
                    onClick={() => toast.success(`Downloading verified copy of ${doc.title}...`)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0e6644] hover:underline cursor-pointer"
                  >
                    <span>Download</span>
                    <Download size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 6. 80G & GOVERNANCE FAQ ACCORDION ── */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-[#0e4d34]/20">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-[#0e4d34] uppercase tracking-wider block mb-1">
              Clear &amp; Transparent Answers
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-charcoal">
              Frequently Asked Questions on 80G &amp; Compliance
            </h3>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="rounded-2xl border border-charcoal/15 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-4 text-left font-bold text-sm text-charcoal flex items-center justify-between gap-4 hover:bg-[#f4f9f5] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-[#0e4d34] transition-transform duration-200 shrink-0 ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-charcoal/75 leading-relaxed bg-white border-t border-charcoal/10">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-[#0e4d34] hover:bg-[#083523] shadow-lg hover:shadow-xl transition-all text-sm cursor-pointer"
            >
              <Sparkles size={16} />
              <span>Donate with Instant 80G Tax Exemption</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
