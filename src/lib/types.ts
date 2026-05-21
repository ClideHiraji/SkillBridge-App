// User Profile
export interface UserProfile {
  id: string;
  email: string;
  user_type: 'student' | 'business';
  full_name: string;
  avatar_url: string | null;
  bio: string | null;
  address: string | null;
  birthdate: string | null;
  school: string | null;
  year: string | null;
  program: string | null;
  profile_visible: boolean;
  created_at: string;
  updated_at: string;
}

// Job Posting
export interface Job {
  id: string;
  business_id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  deadline: string;
  status: 'open' | 'closed' | 'in_progress';
  created_at: string;
  updated_at: string;
  business?: UserProfile;
}

// Job Application
export interface JobApplication {
  id: string;
  job_id: string;
  student_id: string;
  cover_letter: string | null;
  status: 'applied' | 'reviewed' | 'accepted' | 'rejected';
  created_at: string;
  updated_at: string;
}

// Skill
export interface Skill {
  id: string;
  user_id: string;
  name: string;
  endorsed_count: number;
  created_at: string;
}

// Portfolio Item
export interface PortfolioItem {
  id: string;
  user_id: string;
  title: string;
  description: string;
  image_url: string | null;
  url: string | null;
  created_at: string;
}

// Notification
export interface Notification {
  id: string;
  user_id: string;
  type: 'job_application' | 'job_accepted' | 'new_job' | 'profile_view';
  title: string;
  message: string;
  read: boolean;
  created_at: string;
}

// Favorite Job
export interface FavoriteJob {
  id: string;
  user_id: string;
  job_id: string;
  created_at: string;
}
