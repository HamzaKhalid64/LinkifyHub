-- Drop existing tables
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.listings CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('buyer', 'seller', 'admin')),
  is_approved BOOLEAN DEFAULT false,
  location_address TEXT,
  phone_number TEXT,
  business_type TEXT,
  budget TEXT,
  available_balance INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create listings table
CREATE TABLE public.listings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id UUID REFERENCES public.profiles(id) NOT NULL,
  seller_name TEXT NOT NULL,
  url TEXT NOT NULL,
  da INTEGER DEFAULT 0,
  pa INTEGER DEFAULT 0,
  country TEXT DEFAULT 'US',
  traffic INTEGER DEFAULT 0,
  niche TEXT DEFAULT 'Technology',
  guest_post_price INTEGER DEFAULT 0,
  link_insertion_price INTEGER DEFAULT 0,
  pr_price INTEGER DEFAULT 0,
  writing_fee INTEGER DEFAULT 0,
  is_do_follow BOOLEAN DEFAULT true,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  buyer_id UUID REFERENCES public.profiles(id) NOT NULL,
  seller_id UUID REFERENCES public.profiles(id) NOT NULL,
  listing_id UUID REFERENCES public.listings(id) NOT NULL,
  listing_url TEXT NOT NULL,
  order_type TEXT DEFAULT 'guest_post' CHECK (order_type IN ('guest_post', 'link_insertion', 'pr')),
  article_option TEXT DEFAULT 'provided' CHECK (article_option IN ('provided', 'written', 'none')),
  article_content TEXT,
  target_url TEXT NOT NULL,
  anchor_text TEXT NOT NULL,
  total_price INTEGER DEFAULT 0,
  payment_method TEXT DEFAULT 'bank' CHECK (payment_method IN ('bank', 'paypal', 'crypto', 'google_pay')),
  transaction_id TEXT,
  transaction_details TEXT,
  delivery_details TEXT,
  status TEXT DEFAULT 'pending_payment' CHECK (status IN ('pending_payment', 'processing', 'completed', 'cancelled', 'completion_review')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Note: Since we are using anon key prototyping, policies can be left fully open.
-- Here are some policies to allow all operations for prototyping.
CREATE POLICY "Allow public read profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Allow public insert profiles" ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update profiles" ON public.profiles FOR UPDATE USING (true);
CREATE POLICY "Allow public delete profiles" ON public.profiles FOR DELETE USING (true);

CREATE POLICY "Allow public read listings" ON public.listings FOR SELECT USING (true);
CREATE POLICY "Allow public insert listings" ON public.listings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update listings" ON public.listings FOR UPDATE USING (true);
CREATE POLICY "Allow public delete listings" ON public.listings FOR DELETE USING (true);

CREATE POLICY "Allow public read orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Allow public insert orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update orders" ON public.orders FOR UPDATE USING (true);
CREATE POLICY "Allow public delete orders" ON public.orders FOR DELETE USING (true);

-- Create withdrawals table
CREATE TABLE public.withdrawals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id UUID REFERENCES public.profiles(id) NOT NULL,
  amount INTEGER NOT NULL,
  fee INTEGER NOT NULL,
  net_amount INTEGER NOT NULL,
  withdrawal_method TEXT NOT NULL CHECK (withdrawal_method IN ('bank', 'jazzcash', 'paypal')),
  account_details TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.withdrawals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read withdrawals" ON public.withdrawals FOR SELECT USING (true);
CREATE POLICY "Allow public insert withdrawals" ON public.withdrawals FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update withdrawals" ON public.withdrawals FOR UPDATE USING (true);
CREATE POLICY "Allow public delete withdrawals" ON public.withdrawals FOR DELETE USING (true);
