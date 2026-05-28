# InAmigos Foundation – Campaign & Donation Platform

[![React](https://img.shields.io/badge/React-19.0-61dafb.svg?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff.svg?style=flat&logo=vite)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933.svg?style=flat&logo=node.js)](https://nodejs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e.svg?style=flat&logo=supabase)](https://supabase.com/)
[![Razorpay](https://img.shields.io/badge/Payments-Razorpay-02042b.svg?style=flat&logo=razorpay)](https://razorpay.com/)

A modern, high-transparency, full-stack web application designed for **InAmigos Foundation** (a recognized grassroots social welfare NGO). The platform provides automated crowdfunding campaign discovery, secure multi-mode donations via Razorpay, instant client-side Section 80G tax-exemption PDF receipt generation, self-service volunteer acquisition with verifiable digital ID badges, and an open statutory compliance hub.

---

## ?? Key Functional Modules

### 1. Campaigns & Crowdfunding Module
- **Categorized Social Causes**: Education (*Project Bachpanshala*), Hunger Alleviation (*Project Seva*), Animal Welfare (*Project Jeev*), and Environmental Sustainability (*Project Prakriti*).
- **Dynamic Goal Progress**: Real-time progress bars comparing raised funds against target amounts.
- **Impact Metrics**: Transparent disclosure of total lives impacted, active volunteers, and meals served.

### 2. Donation & Payment Engine
- **Integrated Razorpay Checkout**: Standard popup supporting UPI (GPay, PhonePe, Paytm), Debit/Credit Cards, and NetBanking.
- **HMAC SHA-256 Security**: Server-side cryptographic signature verification preventing payment tampering.
- **Section 80G Compliance**: Mandatory PAN capture for contributions &ge; ?2,000 in accordance with Indian Income Tax rules.
- **Automated Vector PDF Receipts**: Instant client-side PDF receipt generation (jsPDF) with unique receipt numbers and foundation seal.

### 3. Volunteer Onboarding & Digital Badge Module
- **3-Stage Registration Wizard**: Step-by-step form capturing personal information, skill domains, weekly availability, and motivation.
- **Schema Validation**: Real-time Zod schema validation enforcing RFC email formatting and 10-digit Indian phone numbers.
- **Automated Credentialing**: Unique sequential Volunteer ID (IAF-VOL-XXXX) issued upon submission.
- **Instant Digital ID Card**: Client-rendered digital volunteer credential badge with photo preview and direct WhatsApp community access.

### 4. Events & Statutory Transparency Module
- **Community Drives**: Catalog of upcoming ground drives, venue details, and volunteer RSVP capacity management.
- **Statutory Disclosure Center**: Public repository for Form 10AC (80G & 12A), CSR-1 registration, and NGO Darpan filings.
- **Audited Financial Statements**: Transparent fund allocation breakdowns across social programs.
- **Inquiry Helpdesk**: Categorized contact routing for donors, corporate CSR partners, and media.

---

## ??? Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS, Radix UI, Lucide Icons |
| **Backend** | Node.js, Express.js REST APIs, CORS, Helmet |
| **Database** | Supabase Cloud PostgreSQL, SQL Schema & Seed Migrations |
| **Payments** | Razorpay Orders API, Standard Checkout SDK, HMAC SHA-256 Signature Verification |
| **Document Generation** | jsPDF Vector Engine |
| **Validation** | Zod Schema Validation, React Hook Form |

---

## ??? System Architecture

`
+-------------------------------------------------------------+
¦                 Presentation Layer (React 19 SPA)           ¦
¦   • Campaign Hub   • Donation Checkout   • Volunteer Portal ¦
+-------------------------------------------------------------+
                               ¦ HTTP / REST API (JSON)
+------------------------------?------------------------------+
¦             Application Layer (Express.js REST API)         ¦
¦   • Payment Controller   • HMAC Verification  • Volunteers  ¦
+-------------------------------------------------------------+
               ¦ PostgreSQL Queries           ¦ Payment Orders
+--------------?--------------+  +------------?---------------+
¦ Supabase PostgreSQL DB      ¦  ¦ Razorpay Payment Gateway   ¦
+-----------------------------+  +----------------------------+
`

---

## ?? Getting Started

### Prerequisites
- Node.js (v18+ or v20+)
- npm (v9+)

### Installation

1. **Clone the repository:**
   `ash
   git clone https://github.com/MihirTank03/InAmigos_Site.git
   cd InAmigos_Site
   `

2. **Install dependencies:**
   `ash
   npm install
   `

3. **Configure Environment Variables:**
   Copy the example environment file:
   `ash
   cp .env.example .env
   `
   Fill in your Razorpay test API keys and Supabase credentials in .env:
   `env
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   PORT=5000
   `

4. **Run Development Server:**
   `ash
   npm run dev
   `
   - Client runs at: http://localhost:5173
   - Express backend runs at: http://localhost:5000

5. **Build for Production:**
   `ash
   npm run build
   `

---

## ?? Database Schema Overview

The database uses Supabase PostgreSQL with relational integrity:
- **donations**: Ledger storing receipt numbers, donor details, PAN, amount, cause, and transaction IDs.
- **olunteers**: Registry storing applicant profiles, skills arrays, preferred causes, and generated IAF-VOL IDs.
- **events**: Field drives with date, location, venue capacity, and registered attendance counts.
- **inquiries**: Categorized public messages with status tracking.

---

## ????? Author & Internship Context

- **Author**: Mihir Tank
- **Course**: Summer Training (Course Code: 202000701)
- **Institution**: G H Patel College of Engineering & Technology (GCET), CVM University
- **Organization**: InAmigos Foundation
- **Internship Period**: 14 May 2026 – 28 May 2026
