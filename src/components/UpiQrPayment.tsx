import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { toast } from 'sonner';
import { Copy, Check, QrCode, ShieldCheck, Loader2 } from 'lucide-react';
import { api } from '../services/api';
import type { DonationReceiptData } from '../lib/pdfGenerator';

interface UpiQrPaymentProps {
  amount: number;
  cause: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  donorPan?: string;
  onSuccess: (receipt: DonationReceiptData) => void;
  onCancel?: () => void;
}

export default function UpiQrPayment({
  amount,
  cause,
  donorName,
  donorEmail,
  donorPhone,
  donorPan,
  onSuccess,
  onCancel,
}: UpiQrPaymentProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [utrNumber, setUtrNumber] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [utrError, setUtrError] = useState<string>('');

  const upiId = 'inamigosfoundation@sbi';
  const payeeName = 'InAmigos Foundation';
  const note = `${cause.slice(0, 30)} Donation`;
  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;

  useEffect(() => {
    let isMounted = true;
    QRCode.toDataURL(upiUrl, {
      width: 280,
      margin: 1,
      color: {
        dark: '#003b22', // primary deep emerald
        light: '#ffffff',
      },
    })
      .then((url) => {
        if (isMounted) setQrCodeUrl(url);
      })
      .catch((err) => {
        console.error('Error generating QR code:', err);
      });

    return () => {
      isMounted = false;
    };
  }, [upiUrl]);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    toast.success('UPI ID copied: ' + upiId);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleVerifyUtr = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUtr = utrNumber.trim();
    if (!cleanUtr || cleanUtr.length < 6) {
      setUtrError('Please enter a valid 12-digit UTR / UPI Reference Number from your payment');
      return;
    }

    setUtrError('');
    setIsVerifying(true);

    try {
      const res = await api.recordUpiDonation({
        donorName: donorName.trim() || 'Anonymous Supporter',
        email: donorEmail.trim(),
        phone: donorPhone.trim(),
        donorPan: donorPan?.trim() || undefined,
        amount,
        cause,
        utrNumber: cleanUtr,
      });

      if (!res.success || !res.data) {
        throw new Error(res.error || 'Failed to record UPI donation');
      }

      toast.success('UPI Payment verified successfully!');
      onSuccess({
        receiptNo: res.data.receiptNo,
        donorName: res.data.donorName,
        donorEmail: res.data.donorEmail,
        donorPhone: res.data.donorPhone,
        donorPan: res.data.donorPan,
        amount: res.data.amount,
        cause: res.data.cause,
        paymentMode: res.data.paymentMode || 'UPI_QR',
        transactionId: res.data.transactionId,
        date: res.data.date,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Verification failed';
      toast.error(msg);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 border border-outline-variant/30 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <QrCode className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-headline-sm text-base font-bold text-primary">
              Scan UPI QR Code to Donate
            </h4>
            <p className="text-xs text-on-surface-variant">
              Google Pay, PhonePe, Paytm, BHIM, Cred &amp; Any UPI App
            </p>
          </div>
        </div>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
          >
            Switch to Gateway
          </button>
        )}
      </div>

      {/* QR Code Container */}
      <div className="mt-4 flex flex-col items-center">
        <div className="relative p-3 bg-white rounded-2xl shadow-md border-2 border-primary/20 flex items-center justify-center">
          {qrCodeUrl ? (
            <img
              src={qrCodeUrl}
              alt="InAmigos Foundation UPI Payment QR Code"
              className="w-56 h-56 rounded-lg object-contain"
            />
          ) : (
            <div className="w-56 h-56 flex items-center justify-center text-on-surface-variant">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {/* Centered Logo Badge */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1.5 shadow-md border border-outline-variant/40">
            <img
              src="/images/iaf-logo.png"
              alt="IAF"
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
        </div>

        {/* Amount Pill */}
        <div className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary font-bold text-sm">
          <span>Amount:</span>
          <span className="font-headline-sm text-base font-extrabold text-primary">
            ₹{amount.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Official VPA / Copy Box */}
        <div className="mt-3.5 w-full max-w-sm flex items-center justify-between p-2.5 rounded-xl bg-surface-container text-xs font-mono text-on-surface border border-outline-variant/20">
          <div className="truncate pr-2">
            <span className="text-on-surface-variant text-[11px] block font-sans">Official UPI ID:</span>
            <span className="font-bold text-primary">{upiId}</span>
          </div>
          <button
            type="button"
            onClick={handleCopyUpi}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container-lowest hover:bg-white text-primary font-sans font-bold shadow-xs transition-colors cursor-pointer text-[11px]"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-secondary" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Supported Apps Badges */}
        <div className="mt-3 flex items-center gap-2 text-[11px] text-on-surface-variant">
          <span className="font-medium">Direct Pay:</span>
          <a
            href={upiUrl}
            className="px-2 py-0.5 rounded bg-surface-container-low hover:bg-surface-container text-primary font-semibold border border-outline-variant/30"
          >
            GPay
          </a>
          <a
            href={upiUrl}
            className="px-2 py-0.5 rounded bg-surface-container-low hover:bg-surface-container text-primary font-semibold border border-outline-variant/30"
          >
            PhonePe
          </a>
          <a
            href={upiUrl}
            className="px-2 py-0.5 rounded bg-surface-container-low hover:bg-surface-container text-primary font-semibold border border-outline-variant/30"
          >
            Paytm
          </a>
          <a
            href={upiUrl}
            className="px-2 py-0.5 rounded bg-surface-container-low hover:bg-surface-container text-primary font-semibold border border-outline-variant/30"
          >
            BHIM
          </a>
        </div>
      </div>

      {/* UTR Verification Form */}
      <form onSubmit={handleVerifyUtr} className="mt-5 pt-4 border-t border-outline-variant/20 space-y-3">
        <div>
          <label className="block text-xs font-bold text-primary mb-1">
            Enter 12-Digit UPI Ref / UTR Number *
          </label>
          <div className="relative">
            <input
              type="text"
              maxLength={20}
              placeholder="e.g. 423819283741 or UPI Transaction ID"
              value={utrNumber}
              onChange={(e) => {
                setUtrNumber(e.target.value.toUpperCase());
                setUtrError('');
              }}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container text-on-surface font-mono text-sm uppercase placeholder:font-sans focus:outline-none focus:ring-2 focus:ring-primary/30 border border-outline-variant/30"
            />
          </div>
          {utrError ? (
            <p className="text-red-600 text-xs mt-1">{utrError}</p>
          ) : (
            <p className="text-[11px] text-on-surface-variant mt-1">
              Found in your UPI app transaction receipt (12 digits for SBI/HDFC/ICICI/Axis/GPay/PhonePe).
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isVerifying || !utrNumber.trim()}
          className="w-full py-3 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-md font-bold shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isVerifying ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Verifying with IAF Ledger...</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4 text-secondary-fixed-dim" />
              <span>Verify &amp; Download 80G Tax Receipt</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
