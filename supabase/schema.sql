-- donations table
CREATE TABLE IF NOT EXISTS donations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  receipt_no TEXT NOT NULL,
  donor_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  donor_pan TEXT,
  amount INTEGER NOT NULL,
  cause TEXT NOT NULL,
  mode TEXT NOT NULL,
  razorpay_payment_id TEXT,
  razorpay_order_id TEXT,
  transaction_id TEXT NOT NULL,
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- volunteers table
CREATE TABLE IF NOT EXISTS volunteers (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  state TEXT NOT NULL,
  city TEXT NOT NULL,
  occupation TEXT,
  preferred_initiative TEXT NOT NULL,
  skills TEXT[] DEFAULT '{}',
  availability_hours TEXT,
  work_preference TEXT,
  motivation TEXT NOT NULL,
  status TEXT DEFAULT 'Pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  category TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'Unread',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- events table with seed data
CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  initiative TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  state TEXT NOT NULL,
  capacity INTEGER NOT NULL,
  registered_count INTEGER DEFAULT 0,
  image TEXT NOT NULL,
  description TEXT NOT NULL
);

-- Seed events data
INSERT INTO events (id, title, initiative, date, time, location, state, capacity, registered_count, image, description) VALUES
('ev-1', 'Sunday Street Food Distribution Drive', 'Project Seva', 'Saturday, 20 Sep 2026', '11:00 AM - 02:00 PM', 'Torwa Chowk, Bilaspur Chapter', 'Chhattisgarh', 40, 28, '/images/iaf-gallery-5.jpg', 'Distributing 200+ freshly prepared nutritious meal packs to daily-wage workers, homeless residents, and hospital attendants.'),
('ev-2', 'Bachpanshala Weekend Learning Camp', 'Project Bachpanshala', 'Saturday, 26 Sep 2026', '09:00 AM - 12:30 PM', 'Community Hall, Bilaspur Old Town', 'Chhattisgarh', 30, 19, '/images/slide-2.jpg', 'Distributing stationary kits, conducting fun English storytelling, basic mathematics workshops, and drawing competitions.'),
('ev-3', 'Project Jeev Summer Water Bowl Installation', 'Project Jeev', 'Sunday, 27 Sep 2026', '07:30 AM - 11:00 AM', 'Multiple Public Parks, Raipur Chapter', 'Chhattisgarh', 50, 35, '/images/slide-4.jpg', 'Setting up 200+ earthen clay water bowls for birds and community stray dogs.'),
('ev-4', 'Project Prakriti Monsoon Plantation Drive', 'Project Prakriti', 'Sunday, 04 Oct 2026', '06:30 AM - 10:00 AM', 'Botanical Green Belt, Pune Chapter', 'Maharashtra', 60, 42, '/images/slide-5.jpg', 'Planting 500 indigenous saplings (Neem, Peepal, Jamun) with geo-tagging and survival monitoring.')
ON CONFLICT (id) DO NOTHING;


-- Seed sample donations
INSERT INTO donations (receipt_no, donor_name, email, phone, donor_pan, amount, cause, mode, transaction_id) VALUES
('IAF/2026/48201', 'Sanjay Malhotra', 'sanjay.m@corp.in', '9820011223', 'ABCDE1234F', 25000, 'Project Bachpanshala', 'NETBANKING', 'TXN-BM9021'),
('IAF/2026/48202', 'Pooja Hegde', 'pooja.h@gmail.com', '9711033445', 'PQRST5678G', 5000, 'Project Jeev', 'UPI', 'TXN-UP8812'),
('IAF/2026/48203', 'Rajesh Sharma', 'rajesh.sharma@tcs.com', '9830055667', NULL, 10000, 'Project Seva', 'CARD', 'TXN-CR4410')
ON CONFLICT DO NOTHING;

-- Seed sample volunteers
INSERT INTO volunteers (id, full_name, email, phone, state, city, occupation, preferred_initiative, skills, availability_hours, work_preference, motivation, status) VALUES
('IAF-VOL-90214', 'Ananya Deshmukh', 'ananya.d@gmail.com', '9823144521', 'Maharashtra', 'Pune', 'College Student', 'Project Bachpanshala', ARRAY['Teaching & Tutoring', 'Content Writing'], '4-6 hours/week', 'hybrid', 'I want to teach underprivileged kids in low-income clusters during weekends.', 'Pending'),
('IAF-VOL-90215', 'Vikramaditya Rathore', 'vikram.r@outlook.com', '9414088321', 'Rajasthan', 'Jaipur', 'Working Professional', 'Project Jeev', ARRAY['Animal Care & First Aid', 'On-Ground Field Operations'], '2-4 hours/week', 'on-ground', 'Animals deserve care and compassion. I have been actively feeding strays in my colony.', 'Approved')
ON CONFLICT DO NOTHING;
