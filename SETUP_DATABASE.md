# SkillBridge - Fully Functional Prototype Setup Guide

## 🚀 Quick Start (15 minutes)

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up / Log in
3. Create a new project
4. Copy your **Project URL** and **Anon Key** (in Settings > API)

### Step 2: Create Environment File
Create `.env.local` in your project root:
```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### Step 3: Install Dependencies
```bash
npm install @supabase/supabase-js
```

### Step 4: Set Up Database Schema
Go to Supabase > SQL Editor and run all SQL scripts in the `supabase/migrations/` folder

### Step 5: Start Development
```bash
npm run dev
```

---

## 📊 Database Schema

The app uses these main tables:
- `users` - User profiles and authentication
- `jobs` - Job postings
- `applications` - Job applications
- `notifications` - User notifications
- `skills` - User skills
- `portfolio_items` - Portfolio projects
- `favorites` - Saved jobs

---

## ✨ Features Implemented

### Authentication
✅ Register with email/password
✅ Login / Logout
✅ Password reset
✅ Session persistence

### Profile Management
✅ Edit personal info (name, bio, avatar)
✅ Add/edit address, birthdate, school, year, program
✅ Upload profile picture
✅ Add skills and endorsements
✅ Create portfolio projects
✅ Update about/bio

### Job Management
✅ Post jobs (business users)
✅ View all jobs (student users)
✅ Edit job postings
✅ Delete jobs
✅ Apply for jobs
✅ View applicants

### Notifications
✅ View notifications
✅ Delete notifications
✅ Real-time updates (via Supabase)

### UI/UX
✅ Dark mode toggle (localStorage)
✅ Responsive design
✅ Mobile & desktop optimized

---

## 🔐 Security

- Row Level Security (RLS) enabled
- User data isolated by user ID
- Private file storage for profiles/portfolios
- Authentication required for all operations

---

## 📝 Environment Variables Required

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...your...key...
```

Get these from: Supabase Dashboard > Settings > API

---

## 🚢 Deployment

### Deploy Frontend (Vercel)
```bash
git push origin main
```
- Vercel auto-deploys from GitHub
- Add `.env.local` secrets to Vercel project settings

### Database (Supabase)
- Already hosted
- No additional setup needed
- Just ensure RLS policies are active

---

## 🆘 Troubleshooting

**"No API key provided"**
- Check `.env.local` is created and has correct values
- Restart dev server: `npm run dev`

**"Email already registered"**
- Try different email or reset password
- Check Supabase Auth > Users

**Dark mode not saving**
- Check browser localStorage is enabled
- Try incognito mode

---

## 📚 Next Steps

1. [Set up Supabase Project](#)
2. [Configure Environment Variables](#)
3. [Run Database Migrations](#)
4. [Test Authentication](#)
5. [Start Development](#)

## 📞 Support

For issues, check:
1. Supabase logs: Dashboard > Logs
2. Browser console: F12 > Console
3. Network tab: F12 > Network
