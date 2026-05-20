const API_BASE = '/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    const json = await res.json();

    if (!res.ok) {
      return { success: false, error: json.error || `Request failed (${res.status})` };
    }

    return { success: true, data: json };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Network error';
    return { success: false, error: message };
  }
}

export const api = {
  // --- Payment ---
  createOrder(amount: number, cause: string, receipt: string) {
    return request<{ orderId: string; amount: number; currency: string; key_id: string }>(
      '/payment/create-order',
      {
        method: 'POST',
        body: JSON.stringify({ amount, currency: 'INR', receipt, notes: { cause } }),
      }
    );
  },

  verifyPayment(payload: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    donorName: string;
    email: string;
    phone: string;
    donorPan?: string;
    amount: number;
    cause: string;
    mode: string;
  }) {
    return request<{
      receiptNo: string;
      transactionId: string;
      date: string;
      amount: number;
      cause: string;
      donorName: string;
      donorEmail: string;
      donorPhone: string;
      donorPan?: string;
      paymentMode: string;
    }>('/payment/verify', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  recordUpiDonation(payload: {
    donorName: string;
    email: string;
    phone: string;
    donorPan?: string;
    amount: number;
    cause: string;
    utrNumber: string;
  }) {
    return request<{
      receiptNo: string;
      transactionId: string;
      date: string;
      amount: number;
      cause: string;
      donorName: string;
      donorEmail: string;
      donorPhone: string;
      donorPan?: string;
      paymentMode: string;
    }>('/payment/record-upi', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },


  // --- Donations ---
  getDonations() {
    return request<Array<{
      id: string;
      receipt_no: string;
      donor_name: string;
      email: string;
      phone: string;
      donor_pan: string | null;
      amount: number;
      cause: string;
      mode: string;
      transaction_id: string;
      created_at: string;
    }>>('/donations');
  },

  // --- Volunteers ---
  submitVolunteer(data: {
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
  }) {
    return request<{
      id: string;
      full_name: string;
      email: string;
      status: string;
      created_at: string;
    }>('/volunteers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getVolunteers() {
    return request<Array<{
      id: string;
      full_name: string;
      email: string;
      phone: string;
      state: string;
      city: string;
      occupation: string;
      preferred_initiative: string;
      skills: string[];
      availability_hours: string;
      work_preference: string;
      motivation: string;
      status: string;
      created_at: string;
    }>>('/volunteers');
  },

  updateVolunteerStatus(id: string, status: string) {
    return request('/volunteers/' + id, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  // --- Inquiries ---
  submitInquiry(data: {
    name: string;
    email: string;
    phone: string;
    category: string;
    subject: string;
    message: string;
  }) {
    return request<{ id: string; created_at: string }>('/inquiries', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getInquiries() {
    return request<Array<{
      id: string;
      name: string;
      email: string;
      phone: string;
      category: string;
      subject: string;
      message: string;
      status: string;
      created_at: string;
    }>>('/inquiries');
  },

  updateInquiryStatus(id: string, status: string) {
    return request('/inquiries/' + id, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  // --- Events ---
  getEvents() {
    return request<Array<{
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
    }>>('/events');
  },

  rsvpEvent(eventId: string, name: string, phone: string) {
    return request('/events/' + eventId + '/rsvp', {
      method: 'POST',
      body: JSON.stringify({ name, phone }),
    });
  },


  // --- Stats ---
  getStats() {
    return request<{
      totalDonations: number;
      totalAmount: number;
      totalVolunteers: number;
      pendingVolunteers: number;
      totalInquiries: number;
      unreadInquiries: number;
    }>('/stats');
  },
};
