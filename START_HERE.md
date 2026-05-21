# ✨ SkillBridge - Start Here

Your fully functional SkillBridge prototype is ready! Here's how to get it running in just a few minutes.

## 🚀 Quick Start (5 Minutes)

### Step 1: Create a Supabase Project
1. Go to **https://supabase.com**
2. Click **"Create Project"**
3. Choose a project name and region (US recommended for fastest response)
4. Wait 2-3 minutes for the project to set up

### Step 2: Get Your API Keys
1. In Supabase, go to **Settings → API**
2. Copy the **Project URL** (starts with https://...supabase.co)
3. Copy the **Anon Public Key** (the long string in "anon public" box)

### Step 3: Create `.env.local`
In the project root directory, create a file called `.env.local` with:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ0eXAiOiJKV1QiLCJhbGc...
```

**Replace** the URL and key with the ones you copied from Supabase.

### Step 4: Run Database Migrations
1. In Supabase Dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Open the file: `supabase/migrations/001_initial_schema.sql`
4. Copy ALL the contents
5. Paste into Supabase SQL Editor
6. Click **"Run"** button
7. Wait for success message

### Step 5 (Optional): Load Sample Data
To populate the app with sample jobs, users, and businesses:
1. Go back to **SQL Editor**
2. Click **"New Query"**
3. Open: `supabase/migrations/002_seed_data.sql`
4. Copy and paste into SQL Editor
5. Click **"Run"**
6. Now the app has 6 jobs, 7 sample users, and realistic data!

### Step 6: Start the Dev Server
```bash
npm run dev
```

The app should load on `http://localhost:5173`

---

## ✅ What You Get After Setup

- ✅ User Registration & Login
- ✅ Student & Business Profiles
- ✅ Job Posting & Browsing
- ✅ Job Applications
- ✅ Skills & Portfolio Management
- ✅ Real-time Notifications
- ✅ Dark Mode Toggle
- ✅ Mobile-Responsive Design
- ✅ Desktop Sidebar Navigation
- ✅ Complete Backend Database
- ✨ **Smooth Page Transitions & Animations**
- 🎯 **Sample Data (6 jobs, 7 users, portfolios)**

---

## 📱 Using the App

### Test Accounts
After setup, you can:
1. **Register** a new account (Student or Business)
2. **Login** with your credentials
3. **Create Jobs** (as business)
4. **Apply for Jobs** (as student)
5. **Manage Profile** (add skills, portfolio, etc.)
6. **View Notifications** for applications and job updates

### Mobile vs Desktop
- **Mobile** (< 768px): Shows phone mockup design
- **Desktop** (≥ 768px): Full responsive layout with sidebar navigation

---

## 🔧 Troubleshooting

### Still Seeing White Screen?
1. **Check Console**: Press `F12` → Console tab
2. **Look for**: Any red error messages
3. **Common Issues**:
   - ❌ `.env.local` file not created → Create it with Supabase credentials
   - ❌ Credentials are wrong → Double-check URL and key in Supabase
   - ❌ Database migrations not run → Run SQL query in Supabase SQL Editor
   - ❌ Dev server not restarted → Close terminal, run `npm run dev` again

### Did Migrations Run Successfully?
In Supabase Dashboard → SQL Editor:
- You should see the query completed without errors
- Tables should be visible in the left sidebar

---

## � Visual Feedback & Animations

The app includes smooth animations for better UX:
- 🎬 **Page Transitions**: Smooth fade-in when navigating
- 🎯 **Button Effects**: Hover and click animations
- ⚡ **Loading States**: Spinner feedback during login
- 📱 **Input Focus**: Subtle scale animations on input fields
- 📊 **Staggered Elements**: Elements fade in one by one on page load

---

## 📚 Documentation

For more detailed information:
- **`QUICK_START.md`** - 20-minute comprehensive setup
- **`FULL_SETUP_GUIDE.md`** - In-depth guide with feature list
- **`SEED_DATA.md`** - Sample data details & test accounts
- **`IMPLEMENTATION_STATUS.md`** - Feature checklist
- **`SETUP_DATABASE.md`** - Database-specific details
- **`DEPLOYMENT.md`** - Deploy to Vercel or other platforms

---

## 🎯 Next Steps After Getting Running

1. **Test Registration**: Create a student and business account
2. **Test Job Flow**: Post a job and apply to it
3. **Test Features**: Try notifications, profile editing, dark mode
4. **Test Responsive**: Open on mobile device or use browser DevTools
5. **Deploy to Production**: See `DEPLOYMENT.md`

---

## 💡 Tips

- **Dark Mode**: Toggle in Settings page
- **Profile Picture**: Upload in Profile page
- **Job Categories**: Set when posting jobs
- **Notifications**: Check top-right for real-time updates
- **Mobile Testing**: Use Chrome DevTools (F12 → Toggle device toolbar)

---

Happy coding! 🎉
