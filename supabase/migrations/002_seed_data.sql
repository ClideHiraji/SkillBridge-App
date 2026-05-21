-- ============================================
-- SEED DATA - Sample Jobs Only
-- ============================================
--
-- NOTE: This migration only seeds jobs because users must be created via 
-- the registration flow first (to link with auth.users).
--
-- STEPS TO USE:
-- 1. Register 1-3 business accounts through the app
-- 2. Go to Supabase Dashboard > Authentication > Users
-- 3. Copy the business user UUIDs
-- 4. Run this query in Supabase SQL Editor
-- 5. Replace the placeholder UUIDs below with your actual business user IDs
--
-- PLACEHOLDER UUIDs (replace with your business user IDs):
-- Business 1: 00000000-0000-0000-0000-000000000001
-- Business 2: 00000000-0000-0000-0000-000000000002
-- Business 3: 00000000-0000-0000-0000-000000000003

-- Disable RLS temporarily for seeding
ALTER TABLE jobs DISABLE ROW LEVEL SECURITY;

-- ============================================
-- SAMPLE JOBS (using placeholder business user IDs)
-- ============================================
INSERT INTO jobs (title, description, category, budget, deadline, status, created_at, business_id)
VALUES
  (
    'React Frontend Developer',
    'We are looking for an experienced React developer to build a new dashboard. Must have 2+ years of experience.',
    'Web Development',
    25000,
    (now() + interval '30 days'),
    'open',
    now(),
    '00000000-0000-0000-0000-000000000001'
  ),
  (
    'UI/UX Design',
    'Design mockups and prototypes for our mobile app. Looking for creative designers with portfolio.',
    'Design',
    18000,
    (now() + interval '21 days'),
    'open',
    now(),
    '00000000-0000-0000-0000-000000000001'
  ),
  (
    'Social Media Manager',
    'Manage social media accounts across Instagram, Facebook, and TikTok. Content creation included.',
    'Marketing',
    12000,
    (now() + interval '14 days'),
    'open',
    now(),
    '00000000-0000-0000-0000-000000000002'
  ),
  (
    'Graphic Designer - Branding',
    'Create brand identity for new client. Logo, color palette, and brand guidelines needed.',
    'Design',
    20000,
    (now() + interval '28 days'),
    'open',
    now(),
    '00000000-0000-0000-0000-000000000002'
  ),
  (
    'Content Writer - Tech Blog',
    'Write 10 blog posts about tech trends and product features. SEO optimization required.',
    'Content Writing',
    8000,
    (now() + interval '21 days'),
    'open',
    now(),
    '00000000-0000-0000-0000-000000000003'
  ),
  (
    'Virtual Assistant',
    'Support administrative tasks, email management, and scheduling. 20 hours/week.',
    'Administrative',
    15000,
    (now() + interval '7 days'),
    'open',
    now(),
    '00000000-0000-0000-0000-000000000003'
  );

-- ============================================
-- SAMPLE SKILLS
-- ============================================
-- These depend on user IDs. Once users register, you can add skills manually
-- or create a separate migration for this.

-- ============================================
-- SAMPLE PORTFOLIO ITEMS
-- ============================================
-- Same as skills - add after users register

-- ============================================
-- SAMPLE JOB APPLICATIONS
-- ============================================
-- Same as skills - will be created when students apply

-- Re-enable RLS
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- ============================================
-- SUCCESS!
-- ============================================
-- If you see this without errors, the sample jobs have been created!
-- 
-- Next steps:
-- 1. Register a student account in the app
-- 2. Go to Student > Feed to see these 6 jobs
-- 3. Click on a job to view details and apply
--
-- The jobs are associated with placeholder business IDs.
-- Once you register actual business users, you can update the business_id
-- or create new jobs from the business dashboard.
