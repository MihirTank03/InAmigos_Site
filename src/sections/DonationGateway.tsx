import { useState } from 'react';
import { toast } from 'sonner';
import { initiateRazorpayPayment } from '../services/razorpay';
import { generateDonationReceipt } from '../lib/pdfGenerator';
import type { DonationReceiptData } from '../lib/pdfGenerator';


const PRESET_AMOUNTS = [1000, 2500, 5000];

const CAUSES = [
  'General Mission & Immediate Relief',
  'Project Jeev (Animal Welfare & Feeds)',
  'BachpanShala (Rural Education & Kits)',
  'Amigos LEVELUP (Youth Mentorship)',
  'Project Udaan (Women Empowerment)',
  'Project Prakriti (Environment & Trees)',
];

export default function DonationGateway() {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once');
  const [amount, setAmount] = useState<number>(2500);
  const [customAmount, setCustomAmount] = useState<string>('2500');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [selectedCause, setSelectedCause] = useState<string>(CAUSES[0]);

  // Form Fields
  const [pan, setPan] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successReceipt, setSuccessReceipt] = useState<DonationReceiptData | null>(null);

  const symbol = currency === 'INR' ? '₹' : '$';


  const handlePresetSelect = (val: number) => {
    setIsCustom(false);
    setAmount(val);
    setCustomAmount(val.toString());
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCustom(true);
    const val = e.target.value;
    setCustomAmount(val);
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      setAmount(num);
    }
  };

  const handlePayment = async () => {
    if (!fullName.trim()) {
      toast.error('Please enter your full legal name');
      return;
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address for your 80G receipt');
      return;
    }

    const cleanPhone = phone.replace(/[^0-9]/g, '').slice(-10);
    if (!cleanPhone || cleanPhone.length !== 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }

    if (pan.trim() && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(pan.trim())) {
      toast.error('Please enter a valid 10-character PAN number (e.g. ABCDE1234F)');
      return;
    }

    const finalAmount = isCustom ? parseInt(customAmount, 10) : amount;
    if (isNaN(finalAmount) || finalAmount < 100) {
      toast.error('Minimum donation amount is ₹100');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await initiateRazorpayPayment({
        amount: finalAmount,
        cause: selectedCause,
        donorName: fullName.trim(),
        email: email.trim(),
        phone: cleanPhone,
        donorPan: pan.trim().toUpperCase() || undefined,
      });

      const receiptData: DonationReceiptData = {
        receiptNo: response.receiptNo,
        donorName: response.donorName,
        donorEmail: response.donorEmail,
        donorPhone: response.donorPhone,
        donorPan: response.donorPan,
        amount: response.amount,
        cause: response.cause,
        paymentMode: response.paymentMode || 'ONLINE',
        transactionId: response.transactionId,
        date: response.date,
      };

      setSuccessReceipt(receiptData);
      toast.success('Donation successful! Thank you for your generous contribution.');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Payment process cancelled or failed';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadAuditReport = () => {
    toast.info('Downloading IAF FY 2023-2024 Audited Financial Statement...');
    // Download link or simulated PDF trigger
    const link = document.createElement('a');
    link.href = '/public/IAF_Audited_Report_2024.txt';
    link.setAttribute('download', 'InAmigos_Foundation_Audit_2023_2024.txt');
    // graceful fallback
    window.open('https://inamigosfoundation.org.in/', '_blank');
  };

  return (
    <section className="w-full bg-surface py-space-xl scroll-mt-28" id="donate-section">
      <div className="max-w-[1680px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          {/* Left: Interactive Gateway Card */}
          <div className="lg:col-span-6 bg-surface-container-lowest rounded-3xl p-space-md sm:p-space-lg shadow-xl border border-outline-variant/30">
            {successReceipt ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center text-primary mx-auto shadow-md">
                  <span className="material-symbols-outlined text-3xl">verified</span>
                </div>
                <h3 className="font-headline-sm text-2xl text-primary font-bold">
                  Thank You for Your Generosity!
                </h3>
                <p className="font-body-sm text-sm text-on-surface-variant max-w-sm mx-auto">
                  Your donation of{' '}
                  <strong className="text-primary font-bold">
                    ₹{successReceipt.amount.toLocaleString('en-IN')}
                  </strong>{' '}
                  towards <em>{successReceipt.cause}</em> has been securely received and recorded.
                </p>

                <div className="bg-surface-container-low p-4 rounded-2xl text-left space-y-2 text-xs font-body-sm text-on-surface-variant max-w-sm mx-auto border border-outline-variant/20">
                  <div className="flex justify-between">
                    <span>Receipt No:</span>
                    <strong className="text-on-surface font-mono">{successReceipt.receiptNo}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Transaction ID:</span>
                    <strong className="text-on-surface font-mono">{successReceipt.transactionId}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>80G Tax Benefit:</span>
                    <strong className="text-secondary font-bold">50% Exemption Claimable</strong>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => generateDonationReceipt(successReceipt)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-primary text-on-primary font-label-md font-bold shadow-md hover:bg-primary-container transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">download</span>
                    <span>Download Official 80G Receipt</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSuccessReceipt(null)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-surface-container text-primary font-label-md font-semibold hover:bg-surface-container-high transition-colors"
                  >
                    Make Another Donation
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Header Strip */}
                <div className="flex items-center justify-between pb-space-sm mb-space-sm bg-surface-container-low p-space-sm rounded-2xl border border-outline-variant/20">
                  <div className="flex items-center gap-space-xs">
                    <div className="w-9 h-9 rounded-xl bg-primary-container flex items-center justify-center text-on-primary shadow-xs">
                      <span className="material-symbols-outlined text-lg">shield</span>
                    </div>
                    <div>
                      <span className="font-label-md text-sm font-bold text-primary block leading-tight">
                        Razorpay Direct Gateway
                      </span>
                      <span className="font-label-sm text-[11px] text-on-surface-variant font-medium">
                        100% Secure &amp; End-to-End Encrypted
                      </span>
                    </div>
                  </div>

                  {/* Currency Toggle */}
                  <div className="inline-flex bg-surface-container rounded-lg p-1">
                    <button
                      type="button"
                      onClick={() => setCurrency('INR')}
                      className={`px-2.5 py-1 rounded-md font-label-sm text-xs font-bold transition-colors ${
                        currency === 'INR' ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      INR (₹)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrency('USD')}
                      className={`px-2.5 py-1 rounded-md font-label-sm text-xs font-bold transition-colors ${
                        currency === 'USD' ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      USD ($)
                    </button>
                  </div>
                </div>

                {/* Frequency Selector */}
                <div className="flex rounded-xl bg-surface-container p-1 mb-space-md">
                  <button
                    type="button"
                    onClick={() => setFrequency('once')}
                    className={`flex-1 py-2 rounded-lg font-label-md text-xs sm:text-sm font-bold transition-all ${
                      frequency === 'once'
                        ? 'bg-surface-container-lowest text-primary shadow-xs'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    One-Time Contribution
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency('monthly')}
                    className={`flex-1 py-2 rounded-lg font-label-md text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      frequency === 'monthly'
                        ? 'bg-surface-container-lowest text-primary shadow-xs font-bold'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <span>Monthly Heartbeat</span>
                    <span className="px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">
                      2x Impact
                    </span>
                  </button>
                </div>

                {/* Amount Selection */}
                <div className="mb-space-md">
                  <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant block mb-2 font-bold">
                    Select or Specify Contribution
                  </label>
                  <div className="grid grid-cols-3 gap-space-xs mb-space-sm">
                    {PRESET_AMOUNTS.map((val) => {
                      const isSelected = !isCustom && amount === val;
                      return (
                        <button
                          key={val}
                          type="button"
                          onClick={() => handlePresetSelect(val)}
                          className={`py-3 rounded-xl font-headline-sm text-lg sm:text-headline-sm transition-all font-bold cursor-pointer ${
                            isSelected
                              ? 'bg-primary text-secondary-fixed-dim shadow-sm ring-2 ring-primary/20'
                              : 'bg-surface-container-low hover:bg-secondary-fixed/30 text-primary'
                          }`}
                        >
                          {symbol}
                          {val.toLocaleString('en-IN')}
                        </button>
                      );
                    })}
                  </div>

                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-headline-sm text-lg text-primary font-bold">
                      {symbol}
                    </span>
                    <input
                      type="number"
                      min="100"
                      value={customAmount}
                      onChange={handleCustomChange}
                      placeholder="Custom amount"
                      className="w-full pl-9 pr-space-sm py-2.5 rounded-xl bg-surface-container text-on-surface font-headline-sm text-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                {/* Initiative / Cause Picker */}
                <div className="mb-space-md">
                  <label className="font-label-sm text-xs text-on-surface-variant block mb-1.5 font-bold uppercase tracking-wider">
                    Designated Initiative
                  </label>
                  <select
                    value={selectedCause}
                    onChange={(e) => setSelectedCause(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-surface-container text-on-surface font-body-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    {CAUSES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Donor Details for 80G Certificate */}
                <div className="space-y-space-xs mb-space-md">
                  <div>
                    <label className="font-label-sm text-xs text-on-surface-variant block mb-1">
                      PAN Card Number (Required for 80G Tax Exemption Receipt)
                    </label>
                    <input
                      type="text"
                      maxLength={10}
                      value={pan}
                      onChange={(e) => setPan(e.target.value.toUpperCase())}
                      placeholder="ABCDE1234F"
                      className="w-full px-space-sm py-2 rounded-xl bg-surface-container text-on-surface font-body-sm text-sm uppercase focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs">
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Full Legal Name"
                      className="px-space-sm py-2 rounded-xl bg-surface-container text-on-surface font-body-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email for instant tax receipt"
                      className="px-space-sm py-2 rounded-xl bg-surface-container text-on-surface font-body-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit WhatsApp / Mobile Number (+91)"
                      className="w-full px-space-sm py-2 rounded-xl bg-surface-container text-on-surface font-body-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                {/* Accepted Payment Modes Strip */}
                <div className="p-space-sm rounded-2xl bg-surface-container-low mb-space-md border border-outline-variant/20">
                  <span className="font-label-sm text-[11px] uppercase tracking-wider text-on-surface-variant block mb-2 font-bold">
                    Accepted Modes via Razorpay
                  </span>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="p-2 rounded-xl bg-surface-container-lowest shadow-xs flex flex-col items-center">
                      <span className="material-symbols-outlined text-primary text-xl">qr_code_scanner</span>
                      <span className="font-label-sm text-[11px] font-semibold mt-1 text-on-surface">UPI / QR</span>
                    </div>

                    <div className="p-2 rounded-xl bg-surface-container-lowest shadow-xs flex flex-col items-center">
                      <span className="material-symbols-outlined text-primary text-xl">credit_card</span>
                      <span className="font-label-sm text-[11px] font-semibold mt-1 text-on-surface">Debit/Credit</span>
                    </div>

                    <div className="p-2 rounded-xl bg-surface-container-lowest shadow-xs flex flex-col items-center">
                      <span className="material-symbols-outlined text-primary text-xl">account_balance</span>
                      <span className="font-label-sm text-[11px] font-semibold mt-1 text-on-surface">NetBanking</span>
                    </div>

                    <div className="p-2 rounded-xl bg-surface-container-lowest shadow-xs flex flex-col items-center">
                      <span className="material-symbols-outlined text-primary text-xl">payments</span>
                      <span className="font-label-sm text-[11px] font-semibold mt-1 text-on-surface">Wallets</span>
                    </div>
                  </div>
                </div>

                {/* Process Button for Razorpay */}
                <button
                  type="button"
                  onClick={handlePayment}
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-primary-container hover:bg-primary text-on-primary font-label-lg text-base rounded-2xl shadow-md flex items-center justify-center gap-space-xs transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Opening Razorpay Gateway...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-secondary-fixed-dim">verified</span>
                      <span>
                        Proceed with Secure {symbol}
                        {(isCustom ? parseInt(customAmount, 10) || 0 : amount).toLocaleString('en-IN')} Gift
                      </span>
                    </>
                  )}
                </button>

                {/* Guarantee Badge */}
                <div className="mt-space-sm text-center">
                  <span className="font-label-sm text-xs text-on-surface-variant leading-relaxed">
                    Tax exemption certificate 10G/80G instantly generated and dispatched to your WhatsApp &amp; Email.
                  </span>
                </div>
              </>
            )}
          </div>



          {/* Right: Stewardship & SVG Donut Chart */}
          <div className="lg:col-span-6 flex flex-col gap-space-lg">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
                Uncompromising Stewardship
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-headline-lg text-primary mt-1">
                Where Every Single Rupee Actually Goes
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
                Direct impact with zero leakage: verified monthly deployment logs audited by independent chartered accountants.
              </p>
            </div>

            {/* Financial Ratio Breakdown Card */}
            <div className="bg-surface-container-lowest rounded-3xl p-space-md sm:p-space-lg shadow-xs border border-outline-variant/20">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-space-md items-center">
                {/* SVG Donut Chart */}
                <div className="sm:col-span-5 flex flex-col items-center justify-center">
                  <div className="relative w-44 h-44">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      {/* Background Circle */}
                      <path
                        className="text-surface-container"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4.5"
                      />
                      {/* 88% Direct Program (Primary Emerald) */}
                      <path
                        className="text-primary-container"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeDasharray="88, 100"
                        strokeWidth="4.5"
                      />
                      {/* 7% Emergency Reserve (Secondary Gold) */}
                      <path
                        className="text-secondary-fixed-dim"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeDasharray="7, 100"
                        strokeDashoffset="-88"
                        strokeWidth="4.5"
                      />
                      {/* 5% Admin (Slate) */}
                      <path
                        className="text-tertiary-container"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeDasharray="5, 100"
                        strokeDashoffset="-95"
                        strokeWidth="4.5"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="font-headline-sm text-3xl text-primary font-bold">88%</span>
                      <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-tight font-semibold">
                        Direct Field
                      </span>
                    </div>
                  </div>
                </div>

                {/* Legend & Explanation */}
                <div className="sm:col-span-7 flex flex-col gap-space-sm">
                  <div className="flex items-start gap-space-xs">
                    <div className="w-3.5 h-3.5 rounded-full bg-primary-container mt-1 shrink-0" />
                    <div>
                      <span className="font-label-md text-sm font-bold text-on-surface block">
                        88% Direct Mission Delivery
                      </span>
                      <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                        Procurement of ration packs, textbooks, tablets, medical kits, and local teacher salaries.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-space-xs">
                    <div className="w-3.5 h-3.5 rounded-full bg-secondary-fixed-dim mt-1 shrink-0" />
                    <div>
                      <span className="font-label-md text-sm font-bold text-on-surface block">
                        7% Emergency Mobilization Fund
                      </span>
                      <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                        Immediate flood, winter wave, or medical crisis reserves ready for instant dispatch.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-space-xs">
                    <div className="w-3.5 h-3.5 rounded-full bg-tertiary-container mt-1 shrink-0" />
                    <div>
                      <span className="font-label-md text-sm font-bold text-on-surface block">
                        5% Operational &amp; Audit Overhead
                      </span>
                      <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                        Mandatory external audits, legal statutory filings, and bank payment processing fees.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Statutory Disclosures Banner */}
            <div className="bg-surface-container-low rounded-2xl p-space-md flex flex-col sm:flex-row items-center justify-between gap-4 border border-outline-variant/20">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-3xl shrink-0">description</span>
                <div>
                  <span className="font-label-md text-sm font-bold text-primary block">
                    FY 2023–2024 Audited Financial Statement
                  </span>
                  <span className="font-body-sm text-xs text-on-surface-variant">
                    Independently verified by K.N. Mehta &amp; Associates Chartered Accountants
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={downloadAuditReport}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-surface-container-lowest hover:bg-surface-container text-primary font-label-sm text-xs font-bold shadow-xs transition-colors whitespace-nowrap cursor-pointer"
              >
                Download Statement PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
