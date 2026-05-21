import { createBrowserRouter, Navigate, Outlet } from 'react-router';
import { AppProvider, useApp } from './context/AppContext';
import { MainLayout } from './components/layout/MainLayout';
import { Onboarding } from './pages/Onboarding';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { StudentFeed } from './pages/student/Feed';
import { TaskDetail } from './pages/student/TaskDetail';
import { MyTasks } from './pages/student/MyTasks';
import { Earnings } from './pages/student/Earnings';
import { StudentProfile } from './pages/student/Profile';
import { Wallet } from './pages/student/Wallet';
import { BusinessDashboard } from './pages/business/Dashboard';
import { BusinessTasks } from './pages/business/Tasks';
import { PostTask } from './pages/business/PostTask';
import { TaskApplicants } from './pages/business/TaskApplicants';
import { ApplicantProfile } from './pages/business/ApplicantProfile';
import { ManageTask } from './pages/business/ManageTask';
import { BusinessProfile } from './pages/business/BusinessProfile';
import { EditBusinessProfile } from './pages/business/EditBusinessProfile';
import { Analytics } from './pages/business/Analytics';
import { Messages } from './pages/Messages';
import { Chat } from './pages/Chat';
import { Notifications } from './pages/Notifications';
import { Settings } from './pages/Settings';
import { Review } from './pages/Review';
import { SetupNeeded } from './pages/SetupNeeded';

function RootWithProvider() {
  const { supabaseReady } = useApp();

  // If Supabase not configured, show setup page
  if (!supabaseReady) {
    return <SetupNeeded />;
  }

  return (
    <div className="h-full">
      <Outlet />
    </div>
  );
}

function Root() {
  return (
    <AppProvider>
      <RootWithProvider />
    </AppProvider>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      // Auth & onboarding (no nav)
      { index: true, Component: Onboarding },
      { path: 'login', Component: Login },
      { path: 'register', Component: Register },
      { path: 'forgot-password', Component: ForgotPassword },

      // Main pages WITH BottomNav
      {
        Component: MainLayout,
        children: [
          // Student main pages
          { path: 'student/feed', Component: StudentFeed },
          { path: 'student/my-tasks', Component: MyTasks },
          { path: 'student/earnings', Component: Earnings },
          { path: 'student/profile', Component: StudentProfile },
          // Business main pages
          { path: 'business/dashboard', Component: BusinessDashboard },
          { path: 'business/tasks', Component: BusinessTasks },
          { path: 'business/profile', Component: BusinessProfile },
          // Shared main pages
          { path: 'messages', Component: Messages },
        ],
      },

      // Sub-pages WITHOUT BottomNav (have their own back button headers)
      { path: 'student/task/:id', Component: TaskDetail },
      { path: 'student/wallet', Component: Wallet },
      { path: 'review/:taskId', Component: Review },
      { path: 'notifications', Component: Notifications },
      { path: 'settings', Component: Settings },

      // Business sub-pages
      { path: 'business/post-task', Component: PostTask },
      { path: 'business/task/:id/applicants', Component: TaskApplicants },
      { path: 'business/applicant/:studentId', Component: ApplicantProfile },
      { path: 'business/task/:id/manage', Component: ManageTask },
      { path: 'business/profile/edit', Component: EditBusinessProfile },
      { path: 'business/analytics', Component: Analytics },

      // Chat sub-page
      { path: 'messages/:id', Component: Chat },

      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);
