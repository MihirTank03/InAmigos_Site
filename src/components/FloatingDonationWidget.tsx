import { Link } from 'react-router';
import { Heart } from 'lucide-react';

export default function FloatingDonationWidget() {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Link
        to="/donate"
        className="px-5 py-3 bg-[#0e4d34] hover:bg-[#083523] text-white font-bold text-sm rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 border border-white/20 group cursor-pointer"
      >
        <Heart size={18} className="fill-white/25 text-white group-hover:scale-110 transition-transform" />
        <span>Donate 80G</span>
      </Link>
    </div>
  );
}

