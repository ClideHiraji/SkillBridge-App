# 🚀 SkillBridge - Complete Setup Guide for Fully Functional Prototype

This guide walks you through setting up your fully functional SkillBridge prototype with **Supabase** as the backend.

## ⚡ Quick Start (20 minutes)

### 1️⃣ Create Supabase Account & Project

**Sign up:**
- Go to [https://supabase.com](https://supabase.com)
- Click "Start your project" → Sign up with email

**Create project:**
- Click "New Project"
- Fill in:
  - **Organization**: Create new (e.g., "SkillBridge")
  - **Project name**: `skillbridge-app`
  - **Database Password**: Save this somewhere safe!
  - **Region**: Choose closest to you
- Click "Create new project" and wait 2-3 minutes

### 2️⃣ Get Your API Keys

**In Supabase Dashboard:**
1. Go to **Settings** → **API**
2. You'll see:
   - **Project URL** (starts with `https://...supabase.co`)
   - **Anon Public** key (starts with `eyJ...`)
   - Copy both values

### 3️⃣ Create `.env.local` File

**In your project root directory** (`IT-17-SkillBridge App/`), create a file named `.env.local`:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
```

Replace with your actual values from Step 2.

### 4️⃣ Set Up Database Schema

**In Supabase Dashboard:**
1. Go to **SQL Editor**
2. Click **+ New Query**
3. Copy the entire contents of: `supabase/migrations/001_initial_schema.sql`
4. Paste into the SQL editor
5. Click **Run** button
6. Wait for success message ✅

This creates all tables: users, jobs, applications, skills, portfolio, notifications, etc.

### 5️⃣ Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ✨ Now Available Features

### 🔐 Authentication
✅ Register new account (email/password)
✅ Login with credentials
✅ Logout
✅ Session persistence (stay logged in)
✅ Password reset

### 👤 Profile Management
✅ Edit personal information:
  - Full name, bio
  - Address, birthdate
  - School, year, program
✅ Upload profile picture
✅ Add skills & endorsements
✅ Create portfolio items
✅ Toggle profile visibility
✅ View other user profiles

### 💼 Job Management
✅ **For Business Users:**
  - Post new jobs
  - Edit/delete job postings
  - View job applicants
  - Track applications

✅ **For Students:**
  - Browse all open jobs
  - View job details
  - Apply to jobs
  - View application status
  - Save favorite jobs

### 🔔 Notifications
✅ View notifications in real-time
✅ Mark as read
✅ Delete notifications
✅ Auto-save preference

### 🌙 Dark Mode
✅ Toggle dark/light theme
✅ Settings saved in browser
✅ Switch anytime from settings

### 📊 Analytics & Tracking
✅ View skill endorsements
✅ Track applications received/sent
✅ Profile view counter

---

## 🧪 Test the App

### Create Test Accounts

**Account 1 - Student:**
```
Email: student@example.com
Password: password123
Type: Student
```

**Account 2 - Business:**
```
Email: business@example.com
Password: password123
Type: Business Owner
```

### Test Workflows

1. **Student Registration & Profile:**
   - Register as student
   - Go to Settings → Edit Profile
   - Add skills and portfolio
   - View available jobs

2. **Business Job Posting:**
   - Register as business
   - Go to Post Task
   - Create a job posting
   - View applicants

3. **Notifications:**
   - Bell icon shows unread count
   - Click to view notifications
   - Delete when done

4. **Dark Mode:**
   - Settings → Toggle Dark Mode
   - Changes persist across sessions

---

## 🔐 Security Features

✅ **Row Level Security (RLS)** - Users only see their own data
✅ **User Isolation** - Each user's data is private
✅ **Secure File Storage** - Profile pics & portfolio items encrypted
✅ **Authentication** - Supabase-managed, production-ready

---

## 📲 Responsive Design

✅ **Mobile** (< 768px): Phone mockup with bottom navigation
✅ **Tablet** (768px - 1024px): Full responsive layout
✅ **Desktop** (≥ 1024px): Sidebar navigation + main content

---

## 🚢 Deployment

### Deploy Frontend (Vercel - Recommended)

```bash
# Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main
```

1. Go to [https://vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Select your GitHub repository
4. Configure:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add environment variables:
   - `VITE_SUPABASE_URL` = your URL
   - `VITE_SUPABASE_ANON_KEY` = your key
6. Click "Deploy"

### Backend (Supabase)

✅ No additional setup needed!
✅ Already hosted and running
✅ Automatically scales
✅ SSL/TLS included

---

## 🆘 Troubleshooting

### "Cannot find VITE_SUPABASE_URL"
- ✅ Create `.env.local` file in root directory
- ✅ Restart dev server: `npm run dev`
- ✅ Check file has correct variable names

### "Email already registered"
- ✅ Use different email for test accounts
- ✅ Or go to Supabase > Auth > Users, delete user, try again

### "Database query failed"
- ✅ Check Supabase > SQL Editor, re-run migrations
- ✅ Make sure RLS policies exist
- ✅ Check browser console (F12) for error details

### Dark mode not saving
- ✅ Check localStorage is enabled
- ✅ Try in incognito/private window
- ✅ Clear browser cache

### Login not working
- ✅ Verify email/password are correct
- ✅ Check email is confirmed (if email verification enabled)
- ✅ Look at Supabase > Auth > Users to see registered users

---

## 📚 Project Structure

```
IT-17-SkillBridge App/
├── src/
│   ├── lib/
│   │   ├── supabase.ts          # Supabase client
│   │   ├── db.ts                # Database functions
│   │   └── types.ts             # TypeScript types
│   ├── app/
│   │   ├── context/
│   │   │   └── AppContext.tsx   # Auth & dark mode state
│   │   ├── pages/
│   │   │   ├── auth/            # Login, Register pages
│   │   │   ├── business/        # Job posting, dashboard
│   │   │   └── student/         # Jobs, applications
│   │   └── components/          # UI components
│   └── main.tsx
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql # Database setup
├── .env.local                    # Environment variables
├── vite.config.ts               # Build config
└── package.json
```

---

## 🎯 What's Next?

1. ✅ Test all features locally
2. ✅ Deploy to Vercel
3. ✅ Share with team/users
4. ✅ Gather feedback
5. ✅ Add additional features as needed

### Future Enhancements (Optional):
- Email notifications
- Real-time chat
- Payment integration
- Review system
- Advanced search filters

---

## 💡 Tips & Best Practices

1. **Always use `.env.local`** for sensitive keys
2. **Never commit API keys** to GitHub
3. **Test in incognito** mode for clean browser state
4. **Check Supabase logs** for detailed error information
5. **Use Chrome DevTools** (F12) to debug
6. **Read error messages** carefully - they're helpful!

---

## 📞 Support & Resources

- **Supabase Docs**: https://supabase.com/docs
- **React Docs**: https://react.dev
- **Vite Docs**: https://vitejs.dev
- **Tailwind CSS**: https://tailwindcss.com

---

## ✅ Checklist

- [ ] Supabase project created
- [ ] API keys obtained
- [ ] `.env.local` file created
- [ ] Database schema migrations run
- [ ] Dependencies installed (`npm install`)
- [ ] Dev server running (`npm run dev`)
- [ ] Can register new account
- [ ] Can login successfully
- [ ] Can edit profile
- [ ] Can post/view jobs
- [ ] Can see notifications
- [ ] Dark mode works
- [ ] Ready to deploy to Vercel

---

## 🎉 You're All Set!

Your SkillBridge prototype is now **fully functional** with:
- ✅ Real database (Supabase PostgreSQL)
- ✅ Real authentication
- ✅ Real-time updates
- ✅ Production-ready security
- ✅ Responsive design

**Next step**: Test it out and start using it! 🚀
