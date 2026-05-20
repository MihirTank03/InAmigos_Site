import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { supabase } from './supabaseClient.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config(); // fallback to root .env if present

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

let razorpay;
try {
  const key_id = process.env.RAZORPAY_KEY_ID || 'rzp_test_xxxxxxxxxxxxx';
  const key_secret = process.env.RAZORPAY_KEY_SECRET || 'xxxxxxxxxxxxxxxx';
  razorpay = new Razorpay({ key_id, key_secret });
  console.log(`Razorpay initialized with key: ${key_id ? key_id.substring(0, 12) + '...' : 'none'}`);
} catch (error) {
  console.error("Razorpay initialization error:", error);
}

// Payment Endpoints
app.post('/api/payment/create-order', async (req, res) => {
  try {
    const { amount, currency, receipt, notes } = req.body;
    if (!razorpay) throw new Error("Razorpay not configured on server");
    const options = {
      amount: Math.round(Number(amount) * 100),
      currency: currency || 'INR',
      receipt: String(receipt || `rcpt_${Date.now()}`),
      notes: notes || {},
    };
    const order = await razorpay.orders.create(options);
    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    const errorDetails = error?.error?.description || error.message || 'Failed to create order';
    console.error("Order creation failed:", errorDetails, error);
    res.status(500).json({ error: errorDetails });
  }
});

app.post('/api/payment/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, donorName, email, phone, donorPan, amount, cause, mode } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'xxxxxxxxxxxxxxxx')
      .update(body.toString())
      .digest("hex");
      
    if (expectedSignature === razorpay_signature) {
      const receiptNo = `IAF/${new Date().getFullYear()}/${Math.floor(10000 + Math.random() * 90000)}`;
      const transactionId = `TXN-${(razorpay_payment_id || 'PAY').slice(-6).toUpperCase()}`;
      const formattedDate = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

      try {
        await supabase.from('donations').insert([{
          receipt_no: receiptNo, donor_name: donorName, email, phone, donor_pan: donorPan || null, amount, cause, mode: mode || 'RAZORPAY', razorpay_payment_id, razorpay_order_id, transaction_id: transactionId, status: 'completed'
        }]);
      } catch (dbErr) {
        console.warn("Supabase insert warning (check SUPABASE_URL / tables):", dbErr.message);
      }

      res.json({
        success: true,
        receiptNo,
        transactionId,
        date: formattedDate,
        amount,
        cause,
        donorName,
        donorEmail: email,
        donorPhone: phone,
        donorPan: donorPan || undefined,
        paymentMode: mode || 'RAZORPAY'
      });
    } else {
      res.status(400).json({ success: false, error: 'Invalid payment signature verification' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Direct UPI / QR Code Payment Record
app.post('/api/payment/record-upi', async (req, res) => {
  try {
    const { donorName, email, phone, donorPan, amount, cause, utrNumber } = req.body;

    if (!donorName || donorName.trim().length < 3) {
      return res.status(400).json({ error: 'Valid donor name required (min 3 characters)' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return res.status(400).json({ error: 'Valid email address required' });
    }
    if (!phone) {
      return res.status(400).json({ error: 'Valid mobile number required' });
    }
    if (!utrNumber || utrNumber.trim().length < 6) {
      return res.status(400).json({ error: 'Valid UPI Transaction ID / UTR number required (e.g. 12 digits)' });
    }

    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount < 100) {
      return res.status(400).json({ error: 'Minimum contribution amount is ₹100' });
    }

    const receiptNo = `IAF/${new Date().getFullYear()}/${Math.floor(10000 + Math.random() * 90000)}`;
    const cleanUtr = utrNumber.trim().toUpperCase();
    const transactionId = `UPI-${cleanUtr}`;
    const formattedDate = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

    try {
      await supabase.from('donations').insert([{
        receipt_no: receiptNo,
        donor_name: donorName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        donor_pan: donorPan ? donorPan.trim().toUpperCase() : null,
        amount: numAmount,
        cause: cause || 'General IAF Impact Fund',
        mode: 'UPI_QR',
        razorpay_payment_id: null,
        razorpay_order_id: null,
        transaction_id: transactionId,
        status: 'completed'
      }]);
    } catch (dbErr) {
      console.warn("Supabase UPI donation record warning:", dbErr.message);
    }

    res.json({
      success: true,
      receiptNo,
      transactionId,
      date: formattedDate,
      amount: numAmount,
      cause: cause || 'General IAF Impact Fund',
      donorName: donorName.trim(),
      donorEmail: email.trim(),
      donorPhone: phone.trim(),
      donorPan: donorPan ? donorPan.trim().toUpperCase() : undefined,
      paymentMode: 'UPI (Scan & Pay)'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


// Donations
app.get('/api/donations', async (req, res) => {
  try {
    const { data, error } = await supabase.from('donations').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Volunteers
app.post('/api/volunteers', async (req, res) => {
  try {
    const {
      fullName, full_name, email, phone, state, city, occupation,
      preferred_initiative, preferredInitiative,
      skills,
      availability_hours, availabilityHours,
      work_preference, workPreference,
      motivation
    } = req.body;

    const name = fullName || full_name;
    const initiative = preferred_initiative || preferredInitiative;
    const hours = availability_hours || availabilityHours || '4-6 hours/week';
    const preference = work_preference || workPreference || 'hybrid';

    if (!name || name.length < 3) return res.status(400).json({ error: 'Valid full name required (min 3 characters)' });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) return res.status(400).json({ error: 'Valid email required' });
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phone || !phoneRegex.test(phone)) return res.status(400).json({ error: 'Valid 10-digit Indian phone number required' });
    if (!motivation || motivation.length < 20) return res.status(400).json({ error: 'Motivation must be at least 20 characters' });

    const volunteerId = `IAF-VOL-${Math.floor(10000 + Math.random() * 90000)}`;

    const newVolunteer = {
      id: volunteerId,
      full_name: name,
      email,
      phone,
      state: state || 'Chhattisgarh',
      city: city || '',
      occupation: occupation || 'Student',
      preferred_initiative: initiative || 'Project Bachpanshala',
      skills: Array.isArray(skills) ? skills : [],
      availability_hours: hours,
      work_preference: preference,
      motivation,
      status: 'Pending'
    };

    try {
      const { data, error } = await supabase.from('volunteers').insert([newVolunteer]).select();
      if (!error && data && data[0]) {
        return res.json(data[0]);
      }
    } catch (dbErr) {
      console.warn("Supabase volunteer insert warning:", dbErr.message);
    }

    res.json(newVolunteer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/volunteers', async (req, res) => {
  try {
    const { data, error } = await supabase.from('volunteers').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/volunteers/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    const { data, error } = await supabase.from('volunteers').update({ status }).eq('id', id).select();
    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Inquiries
app.post('/api/inquiries', async (req, res) => {
  try {
    const { name, email, phone, category, subject, message } = req.body;
    const { data, error } = await supabase.from('inquiries').insert([{ name, email, phone, category, subject, message, status: 'Unread' }]).select();
    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/inquiries', async (req, res) => {
  try {
    const { data, error } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/inquiries/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    const { data, error } = await supabase.from('inquiries').update({ status }).eq('id', id).select();
    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Events
app.get('/api/events', async (req, res) => {
  try {
    const { data, error } = await supabase.from('events').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/events/:id/rsvp', async (req, res) => {
  try {
    const { name, phone } = req.body;
    if (!name || !phone) return res.status(400).json({ error: 'Name and phone required' });
    res.json({ success: true, message: `RSVP registered for ${name}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Stats
app.get('/api/stats', async (req, res) => {
  try {
    const { count: totalDonations, data: donationsData } = await supabase.from('donations').select('amount', { count: 'exact' });
    const totalAmount = donationsData ? donationsData.reduce((acc, curr) => acc + curr.amount, 0) : 0;
    const { count: totalVolunteers } = await supabase.from('volunteers').select('*', { count: 'exact' });
    const { count: pendingVolunteers } = await supabase.from('volunteers').select('*', { count: 'exact' }).eq('status', 'Pending');
    const { count: totalInquiries } = await supabase.from('inquiries').select('*', { count: 'exact' });
    const { count: unreadInquiries } = await supabase.from('inquiries').select('*', { count: 'exact' }).eq('status', 'Unread');
    
    res.json({
      totalDonations: totalDonations || 0, totalAmount, totalVolunteers: totalVolunteers || 0,
      pendingVolunteers: pendingVolunteers || 0, totalInquiries: totalInquiries || 0, unreadInquiries: unreadInquiries || 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve static frontend files from ../dist
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Handle SPA routing fallback for non-API routes
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    return res.sendFile(path.join(distPath, 'index.html'));
  }
  next();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

if (port !== 3000) {
  const server3000 = app.listen(3000, () => {
    console.log(`Frontend and API also accessible at http://localhost:3000`);
  });
  server3000.on('error', (err) => {
    console.log(`Port 3000 unavailable (${err.code}), main port ${port} active.`);
  });
}
