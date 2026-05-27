import { Link } from 'react-router';
import { Shield, Award, Building, FileCheck, Globe, CheckCircle, ArrowRight } from 'lucide-react';

const certifications = [
  { icon: Building, title: 'Section 8 Company', reg: 'CIN: U85300CT2020NPL010834', description: 'Registered non-profit under Companies Act 2013, licensed by the Central Government of India.', color: '#0066CC' },
  { icon: FileCheck, title: '80G & 12A Certified', reg: 'Order: AAACI5678PF20214', description: '50% Income tax exemption for donors under 80G. Organizational income tax exemption under 12A.', color: '#FF9A3D' },
  { icon: Shield, title: 'CSR-1 Registered', reg: 'Reg: CSR00014892', description: 'Authorized by Ministry of Corporate Affairs for Corporate Social Responsibility funding partnerships.', color: '#22C55E' },
  { icon: Award, title: 'ISO 9001:2015', reg: 'Quality Management Standard', description: 'International quality certification ensuring highest operational integrity and compliance standards.', color: '#E91E8C' },
  { icon: Globe, title: 'NGO Darpan — NITI Aayog', reg: 'ID: CG/2021/0288673', description: 'Verified national think-tank accreditation aligning with India\'s Sustainable Development Goals.', color: '#0066CC' },
  { icon: CheckCircle, title: 'Founded Sept 23, 2020', reg: 'Headquarters: Bilaspur (CG)', description: 'Led by CEO Govind Shukla, with 9,900+ active changemakers across 28 states.', color: '#FF9A3D' },
];

export default function Certifications() {
  return (
    <section className="relative w-full py-20 lg:py-28 overflow-hidden bg-[#FAF6F0]">
      <div className="side-decoration-left" />
      <div className="side-decoration-right" />

      <div className="section-container relative z-10">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-deep-blue/10 text-deep-blue text-xs font-bold uppercase tracking-wider mb-3">
            <Shield size={14} /> Institutional Transparency & Governance
          </span>
          <h2
            className="font-display font-bold text-dark-navy leading-[1.12] tracking-[-0.01em]"
            style={{ fontSize: 'clamp(36px, 4.5vw, 64px)' }}
          >
            TRUST & STATUTORY CREDENTIALS
          </h2>
          <p className="mt-3 max-w-xl mx-auto font-body text-base text-[#2A2A2A]/70">
            Certified and audited under the highest statutory non-profit standards of the Government of India.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-dark-navy/5 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${cert.color}15`, color: cert.color }}
                  >
                    <Icon size={24} />
                  </div>
                  <h3 className="font-display font-bold text-xl text-dark-navy">
                    {cert.title}
                  </h3>
                  <div className="text-[11px] font-mono font-bold text-deep-blue mt-1">
                    {cert.reg}
                  </div>
                  <p className="mt-3 font-body text-xs sm:text-sm leading-relaxed text-[#2A2A2A]/75">
                    {cert.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/transparency"
            className="px-8 py-3.5 rounded-full font-body font-bold text-xs sm:text-sm bg-dark-navy text-white hover:bg-deep-blue transition-all inline-flex items-center gap-2 shadow-md"
          >
            Inspect Verified Registration Records & Audit Reports <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
