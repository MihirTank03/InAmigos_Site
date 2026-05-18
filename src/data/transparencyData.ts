export interface FinancialData {
  category: string;
  percentage: number;
  amountInLakhs: number;
  color: string;
}

export const fundUtilization: FinancialData[] = [
  { category: 'Childhood & Youth Education (Bachpanshala & Vikas)', percentage: 38, amountInLakhs: 45.6, color: '#FF9A3D' },
  { category: 'Emergency Relief & Food Distribution (Seva)', percentage: 24, amountInLakhs: 28.8, color: '#0066CC' },
  { category: 'Animal Rescue & Welfare (Jeev)', percentage: 16, amountInLakhs: 19.2, color: '#FFD60A' },
  { category: 'Environmental & Afforestation Drives (Prakriti)', percentage: 10, amountInLakhs: 12.0, color: '#22C55E' },
  { category: 'Women Empowerment Programs (Udaan)', percentage: 7, amountInLakhs: 8.4, color: '#E91E8C' },
  { category: 'Administrative & Compliance Costs', percentage: 5, amountInLakhs: 6.0, color: '#64748B' },
];

export const yearlyGrowthData = [
  { year: '2021', beneficiaries: 8500, volunteers: 1200, fundsRaised: 18.5 },
  { year: '2022', beneficiaries: 19000, volunteers: 3400, fundsRaised: 42.0 },
  { year: '2023', beneficiaries: 32000, volunteers: 6100, fundsRaised: 76.5 },
  { year: '2024', beneficiaries: 44000, volunteers: 8200, fundsRaised: 102.0 },
  { year: '2025', beneficiaries: 52000, volunteers: 9920, fundsRaised: 120.0 },
];

export const legalCredentials = [
  {
    title: 'Section 8 Non-Profit Incorporation',
    authority: 'Ministry of Corporate Affairs (MCA), Govt. of India',
    registrationNo: 'CIN: U85300CT2020NPL010641',
    date: 'September 23, 2020',
    validity: 'Permanent / Active',
    description: 'Licensed to operate as a central non-profit company with social, educational, and welfare mandates.',
  },
  {
    title: 'Income Tax Section 80G Approval',
    authority: 'Directorate of Income Tax (Exemption), India',
    registrationNo: 'AAACI5678PF20214',
    date: 'March 15, 2021',
    validity: 'AY 2022-23 to AY 2026-27 (Renewable)',
    description: '50% tax deduction eligibility for all Indian citizen and corporate donations under Section 80G of the Income Tax Act.',
  },
  {
    title: 'Income Tax Section 12A Registration',
    authority: 'Income Tax Department, India',
    registrationNo: 'AAACI5678PE20211',
    date: 'March 15, 2021',
    validity: 'Permanent Registration',
    description: 'Statutory non-profit tax exemption status granting IAF full operational tax immunity on program funds.',
  },
  {
    title: 'CSR-1 Corporate Giving Registration',
    authority: 'Ministry of Corporate Affairs, India',
    registrationNo: 'CSR00083159',
    date: 'June 08, 2021',
    validity: 'Active on MCA Portal',
    description: 'Enables IAF to partner with India’s leading public and private corporations for Schedule VII CSR initiatives.',
  },
  {
    title: 'NITI Aayog NGO Darpan Enrolment',
    authority: 'NITI Aayog, Government of India',
    registrationNo: 'CG/2021/0291448',
    date: 'April 2021',
    validity: 'Verified Active',
    description: 'National planning commission accreditation ensuring transparency and alignment with national development goals.',
  },
  {
    title: 'ISO 9001:2015 Quality Certification',
    authority: 'International Quality Management Standard',
    registrationNo: 'ISO/QMS/2022-IAF-091',
    date: 'November 2022',
    validity: 'Surveillance Certified',
    description: 'Certified standard for operational excellence, transparent record-keeping, and ethical beneficiary services.',
  },
];
