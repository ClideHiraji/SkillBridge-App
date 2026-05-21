# Seed Data Setup Guide

## Overview
The app includes a simple seed script that adds 6 sample jobs to the database. This makes it easy to test the app without manually creating jobs.

## ⚠️ Important: Foreign Key Constraint

The `users` table has a foreign key constraint to `auth.users`. This means:
- ✅ You CAN seed jobs (they don't depend on specific user records)
- ❌ You CANNOT seed users with hardcoded IDs (they must exist in auth first)
- Users MUST be created through the registration flow

## How to Load Sample Jobs

### Step 1: Register a Business Account
1. Open the app
2. Go to **Register**
3. Create a business account:
   - Email: `business1@example.com`
   - Password: (create one)
   - User Type: **Business**

### Step 2: Get Your Business User ID
1. Go to Supabase Dashboard
2. Navigate to **Authentication > Users**
3. Find your business user account
4. Copy the UUID (it looks like: `550e8400-e29b-41d4-a716-446655440001`)

### Step 3: Run the Seed Query
1. In Supabase, go to **SQL Editor**
2. Click **"New Query"**
3. Copy the entire contents of: `supabase/migrations/002_seed_data.sql`
4. In the SQL Editor, find and replace these placeholder IDs with your business user ID:
   - Replace: `00000000-0000-0000-0000-000000000001` → Your business ID
   - Replace: `00000000-0000-0000-0000-000000000002` → Your business ID
   - Replace: `00000000-0000-0000-0000-000000000003` → Your business ID
5. Click **"Run"**

### Step 4: Verify
1. Refresh the app
2. Register a **Student** account
3. Go to **Student > Feed**
4. You should see the 6 sample jobs!

---

## Sample Jobs Created

| Job | Category | Budget | Posted By |
|-----|----------|--------|-----------|
| React Frontend Developer | Web Development | ₱25,000 | Business 1 |
| UI/UX Design | Design | ₱18,000 | Business 1 |
| Social Media Manager | Marketing | ₱12,000 | Business 2 |
| Graphic Designer - Branding | Design | ₱20,000 | Business 2 |
| Content Writer - Tech Blog | Content Writing | ₱8,000 | Business 3 |
| Virtual Assistant | Administrative | ₱15,000 | Business 3 |

---

## Why This Approach?

❌ **Old approach failed because:**
- Tried to insert users with hardcoded IDs
- Those IDs didn't exist in `auth.users` table
- Foreign key constraint prevented insertion
- Error: "insert or update on table users violates foreign key constraint"

✅ **New approach works because:**
- Only seeds jobs (no user FK constraint)
- Jobs reference business user IDs you provide
- You create users through normal registration
- Flexible - works with any business user IDs

---

## Tips

- You can register multiple business accounts and replace the placeholder IDs
- If you want to seed more jobs, just add more INSERT statements
- Students can apply to these jobs immediately
- Jobs auto-generate IDs, so no conflicts

---

## Troubleshooting

### Still getting FK error?
- Double-check you replaced ALL three placeholder IDs
- Make sure the UUID format is correct (36 characters with dashes)
- Verify the business account exists in Supabase Auth

### Jobs not showing?
- Refresh the app page
- Make sure you're logged in as a student
- Go to Student > Feed page

### Want more jobs?
- Just add more INSERT statements to the seed script
- Or manually create jobs from the Business dashboard

---

## Next Steps

After seeding jobs:
1. Register student accounts
2. Browse jobs in the Student Feed
3. Apply for jobs
4. Switch to business account to see applications
5. Test the full workflow

Happy job hunting! 🎉

