export interface StoredDonation {
  id: string;
  receiptNo: string;
  donorName: string;
  email: string;
  phone: string;
  donorPan?: string;
  amount: number;
  cause: string;
  mode: string;
  transactionId: string;
  date: string;
  createdAt: number;
}

export interface StoredVolunteer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  state: string;
  city: string;
  occupation: string;
  preferredInitiative: string;
  skills: string[];
  availabilityHours: string;
  workPreference: string;
  motivation: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  date: string;
  createdAt: number;
}

export interface StoredInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: 'General' | 'CSR Partnership' | '80G Receipt Query' | 'Emergency Rescue' | 'Media & PR';
  subject: string;
  message: string;
  date: string;
  status: 'Unread' | 'Responded' | 'Archived';
  createdAt: number;
}

export interface StoredEvent {
  id: string;
  title: string;
  initiative: string;
  date: string;
  time: string;
  location: string;
  state: string;
  capacity: number;
  registeredCount: number;
  image: string;
  description: string;
}

const DONATIONS_KEY = 'iaf_donations_v1';
const VOLUNTEERS_KEY = 'iaf_volunteers_v1';
const INQUIRIES_KEY = 'iaf_inquiries_v1';
const EVENTS_KEY = 'iaf_events_v1';

// Initial Mock Seed Data
const DEFAULT_DONATIONS: StoredDonation[] = [
  {
    id: 'd-1',
    receiptNo: 'IAF/2026/48201',
    donorName: 'Sanjay Malhotra',
    email: 'sanjay.m@corp.in',
    phone: '+91 98200 11223',
    donorPan: 'ABCDE1234F',
    amount: 25000,
    cause: 'Project Bachpanshala',
    mode: 'NETBANKING',
    transactionId: 'TXN-BM9021',
    date: '14 Sep 2026',
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'd-2',
    receiptNo: 'IAF/2026/48202',
    donorName: 'Pooja Hegde',
    email: 'pooja.h@gmail.com',
    phone: '+91 97110 33445',
    donorPan: 'PQRST5678G',
    amount: 5000,
    cause: 'Project Jeev',
    mode: 'UPI',
    transactionId: 'TXN-UP8812',
    date: '14 Sep 2026',
    createdAt: Date.now() - 86400000,
  },
  {
    id: 'd-3',
    receiptNo: 'IAF/2026/48203',
    donorName: 'Rajesh Sharma',
    email: 'rajesh.sharma@tcs.com',
    phone: '+91 98300 55667',
    amount: 10000,
    cause: 'Project Seva',
    mode: 'CARD',
    transactionId: 'TXN-CR4410',
    date: '13 Sep 2026',
    createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: 'd-4',
    receiptNo: 'IAF/2026/48204',
    donorName: 'Kavita Sundaram',
    email: 'kavita.s@gmail.com',
    phone: '+91 94440 77889',
    amount: 2500,
    cause: 'Project Udaan',
    mode: 'UPI',
    transactionId: 'TXN-UP1290',
    date: '12 Sep 2026',
    createdAt: Date.now() - 86400000 * 4,
  },
];

const DEFAULT_VOLUNTEERS: StoredVolunteer[] = [
  {
    id: 'IAF-VOL-90214',
    fullName: 'Ananya Deshmukh',
    email: 'ananya.d@gmail.com',
    phone: '+91 98231 44521',
    state: 'Maharashtra',
    city: 'Pune',
    occupation: 'College Student',
    preferredInitiative: 'Project Bachpanshala',
    skills: ['Teaching & Tutoring', 'Content Writing & Journalism'],
    availabilityHours: '4-6 hours/week',
    workPreference: 'hybrid',
    motivation: 'I want to teach underprivileged kids in low-income clusters during weekends.',
    status: 'Pending',
    date: '14 Sep 2026',
    createdAt: Date.now() - 86400000,
  },
  {
    id: 'IAF-VOL-90215',
    fullName: 'Vikramaditya Rathore',
    email: 'vikram.rathore@outlook.com',
    phone: '+91 97412 88910',
    state: 'Rajasthan',
    city: 'Jaipur',
    occupation: 'Working Professional',
    preferredInitiative: 'Project Jeev',
    skills: ['Animal Care & First Aid', 'On-Ground Field Operations'],
    availabilityHours: 'Weekend Drives Only',
    workPreference: 'field',
    motivation: 'Passionate about feeding community strays and rescuing injured animals.',
    status: 'Approved',
    date: '13 Sep 2026',
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'IAF-VOL-90216',
    fullName: 'Meera Nambiar',
    email: 'meera.nambiar@yahoo.com',
    phone: '+91 94471 22345',
    state: 'Kerala',
    city: 'Kochi',
    occupation: 'Freelancer / Entrepreneur',
    preferredInitiative: 'Project Udaan',
    skills: ['Social Media & Digital Marketing', 'Graphic Design & Video Editing'],
    availabilityHours: '6-10 hours/week',
    workPreference: 'remote',
    motivation: 'Empowering women through digital skills and financial literacy.',
    status: 'Approved',
    date: '12 Sep 2026',
    createdAt: Date.now() - 86400000 * 3,
  },
];

const DEFAULT_EVENTS: StoredEvent[] = [
  {
    id: 'ev-1',
    title: 'Sunday Street Food Distribution Drive',
    initiative: 'Project Seva',
    date: 'Sunday, 20 Sep 2026',
    time: '10:00 AM - 01:00 PM',
    location: 'Railway Station & Gandhi Chowk, Bilaspur',
    state: 'Chhattisgarh',
    capacity: 40,
    registeredCount: 28,
    image: '/images/iaf-gallery-5.jpg',
    description: 'Serving 500+ freshly cooked nutritious meals and clean drinking water to daily wage families and destitute elderly individuals.',
  },
  {
    id: 'ev-2',
    title: 'Bachpanshala Weekend Learning & Art Camp',
    initiative: 'Project Bachpanshala',
    date: 'Saturday, 26 Sep 2026',
    time: '03:00 PM - 06:00 PM',
    location: 'Community Hub, Ujwal Nagar, Bilaspur',
    state: 'Chhattisgarh',
    capacity: 30,
    registeredCount: 19,
    image: '/images/slide-2.jpg',
    description: 'Distributing stationary kits, conducting fun English storytelling, basic mathematics workshops, and drawing competitions.',
  },
  {
    id: 'ev-3',
    title: 'Project Jeev Summer Water Bowl Installation',
    initiative: 'Project Jeev',
    date: 'Sunday, 27 Sep 2026',
    time: '07:30 AM - 11:00 AM',
    location: 'Multiple Public Parks, Raipur Chapter',
    state: 'Chhattisgarh',
    capacity: 50,
    registeredCount: 35,
    image: '/images/slide-4.jpg',
    description: 'Setting up 200+ earthen clay water bowls for birds and community stray dogs to protect them from harsh weather conditions.',
  },
  {
    id: 'ev-4',
    title: 'Project Prakriti Monsoon Native Plantation Drive',
    initiative: 'Project Prakriti',
    date: 'Sunday, 04 Oct 2026',
    time: '06:30 AM - 10:00 AM',
    location: 'Botanical Green Belt, Pune Chapter',
    state: 'Maharashtra',
    capacity: 60,
    registeredCount: 42,
    image: '/images/slide-5.jpg',
    description: 'Planting 500 indigenous saplings (Neem, Peepal, Jamun) with geo-tagging and survival monitoring with local schools.',
  },
];

const DEFAULT_INQUIRIES: StoredInquiry[] = [
  {
    id: 'inq-1',
    name: 'Reliance Foundation CSR Desk',
    email: 'csr.partnerships@ril.com',
    phone: '+91 22 3555 4000',
    category: 'CSR Partnership',
    subject: 'Schedule VII Grant Partnership for Project Bachpanshala',
    message: 'We are interested in evaluating InAmigos Foundation for our upcoming CSR funding cycle in eastern India.',
    date: '14 Sep 2026',
    status: 'Unread',
    createdAt: Date.now() - 86400000,
  },
];

// Event listener subscribers
type StorageListener = () => void;
const listeners: Set<StorageListener> = new Set();

function emitChange() {
  listeners.forEach((l) => l());
}

export const storageService = {
  subscribe(listener: StorageListener): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  // --- DONATIONS ---
  getDonations(): StoredDonation[] {
    try {
      const data = localStorage.getItem(DONATIONS_KEY);
      if (!data) {
        localStorage.setItem(DONATIONS_KEY, JSON.stringify(DEFAULT_DONATIONS));
        return DEFAULT_DONATIONS;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_DONATIONS;
    }
  },

  addDonation(donation: Omit<StoredDonation, 'id' | 'createdAt'>): StoredDonation {
    const list = this.getDonations();
    const newRecord: StoredDonation = {
      ...donation,
      id: 'd-' + Math.random().toString(36).substring(2, 9),
      createdAt: Date.now(),
    };
    const updated = [newRecord, ...list];
    try {
      localStorage.setItem(DONATIONS_KEY, JSON.stringify(updated));
    } catch {}
    emitChange();
    return newRecord;
  },

  // --- VOLUNTEERS ---
  getVolunteers(): StoredVolunteer[] {
    try {
      const data = localStorage.getItem(VOLUNTEERS_KEY);
      if (!data) {
        localStorage.setItem(VOLUNTEERS_KEY, JSON.stringify(DEFAULT_VOLUNTEERS));
        return DEFAULT_VOLUNTEERS;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_VOLUNTEERS;
    }
  },

  addVolunteer(vol: Omit<StoredVolunteer, 'id' | 'status' | 'createdAt'>): StoredVolunteer {
    const list = this.getVolunteers();
    const volunteerId = 'IAF-VOL-' + Math.floor(10000 + Math.random() * 90000);
    const newRecord: StoredVolunteer = {
      ...vol,
      id: volunteerId,
      status: 'Pending',
      createdAt: Date.now(),
    };
    const updated = [newRecord, ...list];
    try {
      localStorage.setItem(VOLUNTEERS_KEY, JSON.stringify(updated));
    } catch {}
    emitChange();
    return newRecord;
  },

  updateVolunteerStatus(id: string, status: 'Approved' | 'Rejected' | 'Pending'): boolean {
    const list = this.getVolunteers();
    const updated = list.map((v) => (v.id === id ? { ...v, status } : v));
    try {
      localStorage.setItem(VOLUNTEERS_KEY, JSON.stringify(updated));
    } catch {}
    emitChange();
    return true;
  },

  // --- INQUIRIES ---
  getInquiries(): StoredInquiry[] {
    try {
      const data = localStorage.getItem(INQUIRIES_KEY);
      if (!data) {
        localStorage.setItem(INQUIRIES_KEY, JSON.stringify(DEFAULT_INQUIRIES));
        return DEFAULT_INQUIRIES;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_INQUIRIES;
    }
  },

  addInquiry(inquiry: Omit<StoredInquiry, 'id' | 'status' | 'createdAt'>): StoredInquiry {
    const list = this.getInquiries();
    const newRecord: StoredInquiry = {
      ...inquiry,
      id: 'inq-' + Math.random().toString(36).substring(2, 9),
      status: 'Unread',
      createdAt: Date.now(),
    };
    const updated = [newRecord, ...list];
    try {
      localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
    } catch {}
    emitChange();
    return newRecord;
  },

  updateInquiryStatus(id: string, status: 'Unread' | 'Responded' | 'Archived') {
    const list = this.getInquiries();
    const updated = list.map((item) => (item.id === id ? { ...item, status } : item));
    try {
      localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
    } catch {}
    emitChange();
  },

  // --- EVENTS ---
  getEvents(): StoredEvent[] {
    try {
      const data = localStorage.getItem(EVENTS_KEY);
      if (!data) {
        localStorage.setItem(EVENTS_KEY, JSON.stringify(DEFAULT_EVENTS));
        return DEFAULT_EVENTS;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_EVENTS;
    }
  },

  registerForEvent(eventId: string): boolean {
    const events = this.getEvents();
    const updated = events.map((ev) =>
      ev.id === eventId ? { ...ev, registeredCount: ev.registeredCount + 1 } : ev
    );
    try {
      localStorage.setItem(EVENTS_KEY, JSON.stringify(updated));
    } catch {}
    emitChange();
    return true;
  },

  // --- LIVE TOTALS ---
  getTotalDonationsAmount(): number {
    const list = this.getDonations();
    return list.reduce((sum, item) => sum + item.amount, 0);
  },
};
