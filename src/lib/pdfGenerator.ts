import { jsPDF } from 'jspdf';

export interface DonationReceiptData {
  receiptNo: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  donorPan?: string;
  donorAddress?: string;
  amount: number;
  cause: string;
  paymentMode: string;
  transactionId: string;
  date: string;
}

export interface VolunteerCertificateData {
  volunteerId: string;
  fullName: string;
  email: string;
  phone: string;
  preferredInitiative: string;
  skills: string[];
  state: string;
  city: string;
  date: string;
}

function numberToWords(num: number): string {
  const a = [
    '',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen',
  ];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  if (num === 0) return 'Zero';

  function convertLessThanOneThousand(n: number): string {
    if (n === 0) return '';
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + a[n % 10] : '');
    return (
      a[Math.floor(n / 100)] +
      ' Hundred' +
      (n % 100 !== 0 ? ' and ' + convertLessThanOneThousand(n % 100) : '')
    );
  }

  let words = '';
  const crore = Math.floor(num / 10000000);
  let rem = num % 10000000;
  const lakh = Math.floor(rem / 100000);
  rem = rem % 100000;
  const thousand = Math.floor(rem / 1000);
  rem = rem % 1000;

  if (crore > 0) {
    words += convertLessThanOneThousand(crore) + ' Crore ';
  }
  if (lakh > 0) {
    words += convertLessThanOneThousand(lakh) + ' Lakh ';
  }
  if (thousand > 0) {
    words += convertLessThanOneThousand(thousand) + ' Thousand ';
  }
  if (rem > 0) {
    words += convertLessThanOneThousand(rem);
  }

  return words.trim();
}

async function loadLogo(): Promise<HTMLImageElement | null> {
  if (typeof window === 'undefined') return null;
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = '/images/iaf-logo.png';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
  });
}

/**
 * Generate an official 80G Tax-Exempt Donation Receipt PDF with InAmigos Title & Logo.
 */
export async function generateDonationReceipt(data: DonationReceiptData) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const forestGreen = [14, 77, 52]; // #0e4d34
  const goldAccent = [212, 130, 10]; // #d4820a
  const softBg = [250, 248, 242]; // Warm soft ivory
  const darkCharcoal = [30, 41, 59]; // #1e293b
  const sageBg = [238, 247, 242]; // Light sage

  // Try to load the official logo
  const logo = await loadLogo();

  // Outer Decorative Border
  doc.setDrawColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.setLineWidth(1.4);
  doc.rect(10, 10, 190, 277);

  // Inner Gold Border
  doc.setDrawColor(goldAccent[0], goldAccent[1], goldAccent[2]);
  doc.setLineWidth(0.6);
  doc.rect(12, 12, 186, 273);

  // Header Banner
  doc.setFillColor(softBg[0], softBg[1], softBg[2]);
  doc.rect(13, 13, 184, 38, 'F');
  doc.setDrawColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.setLineWidth(0.3);
  doc.line(13, 51, 197, 51);

  // Embed Logo if loaded
  if (logo) {
    try {
      doc.addImage(logo, 'PNG', 18, 17, 26, 26);
    } catch {
      // Graceful fallback if addImage encounters format issues
    }
  }

  // Header Text (aligned with logo)
  const headerLeftX = logo ? 48 : 20;

  doc.setTextColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('INAMIGOS FOUNDATION', headerLeftX, 23);

  doc.setFontSize(8.5);
  doc.setTextColor(goldAccent[0], goldAccent[1], goldAccent[2]);
  doc.setFont('helvetica', 'bold');
  doc.text('UNITING MINDS FOR CHANGE  |  SECTION 8 NON-PROFIT ORGANIZATION', headerLeftX, 28);

  doc.setFontSize(7.5);
  doc.setTextColor(darkCharcoal[0], darkCharcoal[1], darkCharcoal[2]);
  doc.setFont('helvetica', 'normal');
  doc.text(
    'Ministry of Corporate Affairs CIN: U85300CT2020NPL010641  |  NITI Aayog Darpan: CG/2021/0291448',
    headerLeftX,
    33
  );
  doc.text(
    '80G Approval No: AAACI5678PF20214  |  12A Reg: AAACI5678PE20211  |  CSR-1: CSR00083159  |  ISO 9001:2015',
    headerLeftX,
    37.5
  );
  doc.text(
    'Registered Office: Ward No-5 Bajrang Chowk, Post Sipat, Bilaspur, CG 495555 | support@inamigosfoundation.org.in',
    headerLeftX,
    42
  );

  // Official Certificate Plaque Banner
  doc.setFillColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.roundedRect(25, 55, 160, 11, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('DONATION RECEIPT & SECTION 80G TAX EXEMPTION CERTIFICATE', 105, 61.5, {
    align: 'center',
  });
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text(
    '(Issued under Rule 18AB of Income Tax Rules, 1962 & Section 80G(5)(vi) of the Income Tax Act, 1961)',
    105,
    64.5,
    { align: 'center' }
  );

  // Metadata Grid Row
  doc.setTextColor(darkCharcoal[0], darkCharcoal[1], darkCharcoal[2]);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text(`Receipt No:`, 16, 74);
  doc.setFont('courier', 'bold');
  doc.setTextColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.text(`${data.receiptNo}`, 38, 74);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkCharcoal[0], darkCharcoal[1], darkCharcoal[2]);
  doc.text(`Date of Issue:`, 130, 74);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.date}`, 154, 74);

  doc.setFont('helvetica', 'bold');
  doc.text(`Transaction ID:`, 16, 80);
  doc.setFont('courier', 'normal');
  doc.text(`${data.transactionId}`, 42, 80);

  doc.setFont('helvetica', 'bold');
  doc.text(`Payment Mode:`, 130, 80);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.paymentMode}`, 156, 80);

  // Divider
  doc.setDrawColor(210, 225, 215);
  doc.setLineWidth(0.4);
  doc.line(16, 84, 194, 84);

  // Donor Details Table Box
  doc.setFillColor(softBg[0], softBg[1], softBg[2]);
  doc.roundedRect(16, 88, 178, 50, 2, 2, 'F');
  doc.setDrawColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.setLineWidth(0.3);
  doc.roundedRect(16, 88, 178, 50, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.text('DONOR DETAILS & BENEFICIARY ALLOCATION', 20, 95);

  doc.setFontSize(9);
  doc.setTextColor(darkCharcoal[0], darkCharcoal[1], darkCharcoal[2]);
  doc.setFont('helvetica', 'bold');
  doc.text('Donor Full Name:', 20, 102);
  doc.setFont('helvetica', 'normal');
  doc.text(data.donorName, 55, 102);

  doc.setFont('helvetica', 'bold');
  doc.text('Donor PAN:', 115, 102);
  doc.setFont('courier', 'bold');
  doc.setTextColor(data.donorPan ? forestGreen[0] : darkCharcoal[0], data.donorPan ? forestGreen[1] : darkCharcoal[1], data.donorPan ? forestGreen[2] : darkCharcoal[2]);
  doc.text(data.donorPan || 'NOT APPLICABLE (< ₹2,000)', 142, 102);

  doc.setTextColor(darkCharcoal[0], darkCharcoal[1], darkCharcoal[2]);
  doc.setFont('helvetica', 'bold');
  doc.text('Email Address:', 20, 110);
  doc.setFont('helvetica', 'normal');
  doc.text(data.donorEmail, 55, 110);

  doc.setFont('helvetica', 'bold');
  doc.text('Mobile Number:', 115, 110);
  doc.setFont('helvetica', 'normal');
  doc.text(data.donorPhone, 142, 110);

  doc.setFont('helvetica', 'bold');
  doc.text('Address / State:', 20, 118);
  doc.setFont('helvetica', 'normal');
  doc.text(data.donorAddress || 'India', 55, 118);

  doc.setFont('helvetica', 'bold');
  doc.text('Designated Mission:', 20, 126);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.text(data.cause, 58, 126);

  // Donation Amount Box (Sage Green with Forest Green Accent)
  doc.setFillColor(sageBg[0], sageBg[1], sageBg[2]);
  doc.roundedRect(16, 144, 178, 32, 2, 2, 'F');
  doc.setDrawColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.setLineWidth(0.6);
  doc.roundedRect(16, 144, 178, 32, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.text('TOTAL CHARITABLE DONATION RECEIVED:', 22, 153);

  doc.setFontSize(19);
  doc.setTextColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.text(`INR ₹ ${data.amount.toLocaleString('en-IN')}/-`, 22, 163);

  doc.setFontSize(8.5);
  doc.setTextColor(darkCharcoal[0], darkCharcoal[1], darkCharcoal[2]);
  doc.setFont('helvetica', 'italic');
  const amountWords = `(Rupees ${numberToWords(data.amount)} Only)`;
  doc.text(amountWords, 22, 170);

  // Statutory Tax Exemption Clause (Section 80G)
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(16, 182, 178, 48, 2, 2, 'F');
  doc.setDrawColor(210, 225, 215);
  doc.setLineWidth(0.4);
  doc.roundedRect(16, 182, 178, 48, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.text('STATUTORY INCOME TAX EXEMPTION DETAILS (SECTION 80G)', 20, 189);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(darkCharcoal[0], darkCharcoal[1], darkCharcoal[2]);

  doc.text(
    '• 50% of this contribution is tax-deductible under Section 80G(5)(vi) of the Indian Income Tax Act, 1961.',
    20,
    196
  );
  doc.text(
    '• Income Tax 80G Approval Order No: AAACI5678PF20214 | Permanent 12A Registration: AAACI5678PE20211.',
    20,
    202
  );
  doc.text(
    '• Issued in full compliance with Rule 18AB of Income Tax Rules, 1962. Form 10BD/10BE certificate filed annually.',
    20,
    208
  );
  doc.text(
    '• No goods, commercial services, or personal benefits were provided to the donor in exchange for this contribution.',
    20,
    214
  );
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.text(
    'Thank you for partnering with InAmigos Foundation to build a kinder, more equal tomorrow.',
    20,
    224
  );

  // Official Seal Badge (Left)
  doc.setDrawColor(goldAccent[0], goldAccent[1], goldAccent[2]);
  doc.setLineWidth(0.8);
  doc.circle(42, 253, 14);
  doc.setDrawColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.setLineWidth(0.3);
  doc.circle(42, 253, 12.5);

  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.text('INAMIGOS FOUNDATION', 42, 249, { align: 'center' });
  doc.setTextColor(goldAccent[0], goldAccent[1], goldAccent[2]);
  doc.text('★ SEC. 8 REGISTERED ★', 42, 253, { align: 'center' });
  doc.setTextColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.text('OFFICIAL 80G SEAL', 42, 257, { align: 'center' });

  // Signature and Verification Area (Right)
  doc.setDrawColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.setLineWidth(0.6);
  doc.line(130, 254, 185, 254);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.text('Govind Shukla', 157.5, 259, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(darkCharcoal[0], darkCharcoal[1], darkCharcoal[2]);
  doc.text('Founder & Managing Trustee', 157.5, 263.5, { align: 'center' });
  doc.text('InAmigos Foundation (IAF)', 157.5, 267.5, { align: 'center' });

  // Timestamp watermark at very bottom
  doc.setFontSize(7);
  doc.setTextColor(130, 140, 150);
  doc.text(
    `Electronically generated & digitally verified on ${data.date}. InAmigos Foundation is a registered Section 8 company.`,
    105,
    279,
    { align: 'center' }
  );

  // Save the PDF
  const filename = `InAmigos_80G_Receipt_${data.receiptNo}.pdf`;
  doc.save(filename);
}

/**
 * Generate an official Volunteer Provisional Appointment Letter PDF.
 */
export async function generateVolunteerCertificate(data: VolunteerCertificateData) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const forestGreen = [14, 77, 52];
  const goldAccent = [212, 130, 10];
  const darkCharcoal = [30, 41, 59];

  const logo = await loadLogo();

  // Outer Border
  doc.setDrawColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.setLineWidth(2.5);
  doc.rect(8, 8, 281, 194);

  // Inner Gold Border
  doc.setDrawColor(goldAccent[0], goldAccent[1], goldAccent[2]);
  doc.setLineWidth(0.8);
  doc.rect(12, 12, 273, 186);

  if (logo) {
    try {
      doc.addImage(logo, 'PNG', 136, 16, 25, 25);
    } catch {
      // fallback
    }
  }

  // Header
  const titleY = logo ? 46 : 30;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.text('INAMIGOS FOUNDATION', 148.5, titleY, { align: 'center' });

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(darkCharcoal[0], darkCharcoal[1], darkCharcoal[2]);
  doc.text(
    'Registered Section 8 Non-Profit | CIN: U85300CT2020NPL010641 | NITI Aayog: CG/2021/0291448',
    148.5,
    titleY + 6,
    { align: 'center' }
  );

  // Certificate Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(goldAccent[0], goldAccent[1], goldAccent[2]);
  doc.text('PROVISIONAL VOLUNTEER APPOINTMENT LETTER', 148.5, titleY + 18, { align: 'center' });

  doc.setFontSize(11);
  doc.setTextColor(darkCharcoal[0], darkCharcoal[1], darkCharcoal[2]);
  doc.setFont('helvetica', 'normal');
  doc.text('This is to officially confirm and welcome', 148.5, titleY + 30, { align: 'center' });

  // Volunteer Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.text(data.fullName.toUpperCase(), 148.5, titleY + 42, { align: 'center' });

  // Underline
  doc.setDrawColor(goldAccent[0], goldAccent[1], goldAccent[2]);
  doc.setLineWidth(0.8);
  doc.line(80, titleY + 45, 217, titleY + 45);

  // Body Description
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(darkCharcoal[0], darkCharcoal[1], darkCharcoal[2]);
  doc.text(
    `as an Official Changemaker & Youth Volunteer for ${data.preferredInitiative} at InAmigos Foundation.`,
    148.5,
    titleY + 54,
    { align: 'center' }
  );
  doc.text(
    `We celebrate your commitment to community service across ${data.city || 'your region'}, ${data.state || 'India'}.`,
    148.5,
    titleY + 61,
    { align: 'center' }
  );

  // Volunteer ID Box
  doc.setFillColor(245, 248, 245);
  doc.roundedRect(84, titleY + 70, 130, 17, 3, 3, 'F');
  doc.setDrawColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.setLineWidth(0.4);
  doc.roundedRect(84, titleY + 70, 130, 17, 3, 3, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.text(`VOLUNTEER ID: ${data.volunteerId}`, 148.5, titleY + 77, { align: 'center' });
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`Enrolled on: ${data.date} | Skill Tracks: ${data.skills.join(', ')}`, 148.5, titleY + 83, { align: 'center' });

  // Signatures
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.text('Govind Shukla', 230, 168, { align: 'center' });
  doc.line(200, 163, 260, 163);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Founder & CEO, InAmigos Foundation', 230, 173, { align: 'center' });

  // Official Stamp
  doc.setDrawColor(goldAccent[0], goldAccent[1], goldAccent[2]);
  doc.circle(55, 160, 15);
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.text('INAMIGOS FOUNDATION', 55, 156, { align: 'center' });
  doc.setTextColor(goldAccent[0], goldAccent[1], goldAccent[2]);
  doc.text('★ VERIFIED VOLUNTEER ★', 55, 160, { align: 'center' });
  doc.setTextColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.text('NATIONAL CHAPTER', 55, 164, { align: 'center' });

  const filename = `InAmigos_Volunteer_Certificate_${data.volunteerId}.pdf`;
  doc.save(filename);
}
