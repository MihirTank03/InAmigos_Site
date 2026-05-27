import { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Clock, X } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '../services/api';

interface Event {
  id: string;
  title: string;
  initiative: string;
  date: string;
  time: string;
  location: string;
  state: string;
  capacity: number;
  registered_count: number;
  image: string;
  description: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpPhone, setRsvpPhone] = useState('');
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const res = await api.getEvents();
      if (res.success && res.data) {
        setEvents(res.data);
      } else {
        toast.error(res.error || 'Failed to fetch events');
      }
    } catch {
      toast.error('An error occurred while fetching events');
    } finally {
      setIsLoading(false);
    }
  };

  const validateRsvp = () => {
    const newErrors: { name?: string; phone?: string } = {};
    if (rsvpName.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters.';
    }
    const cleanPhone = rsvpPhone.replace(/^(\+91|91|\s+)/g, '').replace(/\s+/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      newErrors.phone = 'Please enter a valid Indian mobile number.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;
    if (!validateRsvp()) return;

    setIsSubmitting(true);
    const cleanPhone = rsvpPhone.replace(/^(\+91|91|\s+)/g, '').replace(/\s+/g, '');
    
    try {
      const res = await api.rsvpEvent(selectedEvent.id, rsvpName.trim(), cleanPhone);
      if (res.success) {
        setRsvpSuccess(true);
        toast.success(`You have successfully RSVP'd for ${selectedEvent.title}!`);
        // Refresh events to show updated count
        fetchEvents();
      } else {
        toast.error(res.error || 'Failed to RSVP');
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
            Upcoming Campaigns
          </h1>
          <p className="mt-3 font-body text-base text-charcoal/70">
            Join local Amigos on the ground for weekend food distributions, teaching camps, tree plantations, and stray rescue operations.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-10 text-charcoal/60">Loading events...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((ev) => {
              const seatsLeft = Math.max(0, ev.capacity - ev.registered_count);
              return (
                <div
                  key={ev.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-card border border-soft-gray flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative aspect-[16/9] overflow-hidden bg-soft-gray">
                      {ev.image && (
                        <img
                          src={ev.image}
                          alt={ev.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute top-4 left-4 bg-charcoal/90 backdrop-blur-md rounded-full px-3.5 py-1 text-xs font-bold text-warm-white shadow-sm">
                        {ev.initiative}
                      </div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md rounded-full px-3 py-1 text-[11px] font-bold text-charcoal shadow-sm">
                        {seatsLeft} Slots Available
                      </div>
                    </div>

                    <div className="p-6 sm:p-8">
                      <h3 className="font-display font-bold text-2xl text-charcoal">
                        {ev.title}
                      </h3>
                      <p className="mt-3 text-xs sm:text-sm text-charcoal/75 leading-relaxed">
                        {ev.description}
                      </p>

                      <div className="mt-6 pt-5 border-t border-soft-gray space-y-2 text-xs font-medium text-charcoal/80">
                        <div className="flex items-center gap-2">
                          <Calendar size={15} className="text-terracotta flex-shrink-0" />
                          <span>{ev.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={15} className="text-sage flex-shrink-0" />
                          <span>{ev.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={15} className="text-charcoal flex-shrink-0" />
                          <span>{ev.location}, {ev.state}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 sm:px-8 pb-6 pt-0 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-charcoal/60">
                      <Users size={14} />
                      <span>{ev.registered_count} Volunteers Enrolled</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedEvent(ev);
                        setRsvpSuccess(false);
                        setRsvpName('');
                        setRsvpPhone('');
                        setErrors({});
                      }}
                      className="btn-primary py-2.5 px-6 text-xs font-bold shadow-sm"
                    >
                      RSVP
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => !isSubmitting && setSelectedEvent(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedEvent(null)}
              disabled={isSubmitting}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-warm-white text-charcoal/50 hover:text-charcoal disabled:opacity-50"
            >
              <X size={18} />
            </button>

            {rsvpSuccess ? (
              <div className="text-center py-6">
                <h3 className="font-display font-bold text-2xl text-charcoal">
                  Confirmed, {rsvpName}!
                </h3>
                <p className="text-xs sm:text-sm text-charcoal/70 mt-2">
                  See you at <strong>{selectedEvent.title}</strong> on <strong>{selectedEvent.date}</strong>.
                </p>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="btn-primary px-8 py-2.5 text-xs font-bold mt-6"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-4">
                <div className="pr-6">
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-charcoal mt-1">
                    {selectedEvent.title}
                  </h3>
                  <p className="text-xs text-charcoal/60 mt-1">
                    {selectedEvent.date} · {selectedEvent.time}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-charcoal/70 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Aryan Gupta"
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      className="w-full p-2.5 bg-white rounded-xl border border-soft-gray text-sm text-charcoal focus:border-terracotta focus:ring-1 focus:ring-terracotta"
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal/70 mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={rsvpPhone}
                      onChange={(e) => setRsvpPhone(e.target.value)}
                      className="w-full p-2.5 bg-white rounded-xl border border-soft-gray text-sm text-charcoal focus:border-terracotta focus:ring-1 focus:ring-terracotta"
                    />
                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-3 text-xs font-bold mt-4 shadow-md flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Confirming...' : 'Confirm Registration'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
