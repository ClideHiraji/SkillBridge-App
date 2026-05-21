export type UserType = 'student' | 'business';
export type TaskStatus = 'open' | 'in_progress' | 'done' | 'paid' | 'cancelled';
export type ApplicantStatus = 'pending' | 'accepted' | 'rejected';
export type NotifType = 'task_match' | 'application' | 'payment' | 'deadline' | 'review';

export interface Task {
  id: string;
  title: string;
  businessName: string;
  businessId: string;
  category: string;
  description: string;
  price: number;
  deadline: string;
  skills: string[];
  maxApplicants: number;
  applicantCount: number;
  status: TaskStatus;
  estimatedTime: string;
  postedDate: string;
  daysLeft: number;
}

export interface Applicant {
  id: string;
  name: string;
  initials: string;
  university: string;
  rating: number;
  reviewCount: number;
  skills: string[];
  completedTasks: number;
  status: ApplicantStatus;
  bio: string;
}

export interface Notification {
  id: string;
  type: NotifType;
  message: string;
  time: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participantName: string;
  participantInitials: string;
  participantColor: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
}

export interface ChatMessage {
  id: string;
  text: string;
  time: string;
  isMe: boolean;
}

export const CATEGORIES = [
  'Design', 'Social Media', 'Writing', 'Coding', 'Photography', 'Tutoring', 'Marketing', 'Video'
];

export const mockTasks: Task[] = [
  {
    id: 't1',
    title: 'Social Media Content Creation',
    businessName: 'FitLife Gym',
    businessId: 'b1',
    category: 'Social Media',
    description: 'We need a creative student to design and schedule weekly social media posts for our gym. Content should be engaging, motivational, and on-brand. We\'ll provide brand assets.',
    price: 850,
    deadline: 'May 15, 2026',
    daysLeft: 21,
    skills: ['Canva', 'Instagram', 'Content Writing', 'Graphic Design'],
    maxApplicants: 5,
    applicantCount: 3,
    status: 'open',
    estimatedTime: '5-8h',
    postedDate: '2 days ago',
  },
  {
    id: 't2',
    title: 'Logo & Brand Identity Design',
    businessName: 'Café Latte',
    businessId: 'b2',
    category: 'Design',
    description: 'Looking for a talented design student to create a modern logo and basic brand identity for our new café. Include color palette, logo variations, and simple brand guide.',
    price: 1200,
    deadline: 'May 20, 2026',
    daysLeft: 26,
    skills: ['Adobe Illustrator', 'Logo Design', 'Branding', 'Typography'],
    maxApplicants: 3,
    applicantCount: 1,
    status: 'open',
    estimatedTime: '8-12h',
    postedDate: '5 days ago',
  },
  {
    id: 't3',
    title: 'Math & Physics Tutoring (Grade 11)',
    businessName: 'HomeBase Academy',
    businessId: 'b3',
    category: 'Tutoring',
    description: 'Need a patient and knowledgeable tutor for a Grade 11 student struggling with calculus and physics. 2 sessions per week, 1.5 hours each. Online via Zoom.',
    price: 600,
    deadline: 'May 30, 2026',
    daysLeft: 36,
    skills: ['Mathematics', 'Physics', 'Teaching', 'Patience'],
    maxApplicants: 2,
    applicantCount: 2,
    status: 'open',
    estimatedTime: '3-5h',
    postedDate: '1 week ago',
  },
  {
    id: 't4',
    title: 'WordPress Landing Page Development',
    businessName: 'Digital Agency PH',
    businessId: 'b4',
    category: 'Coding',
    description: 'Build a responsive landing page using WordPress and Elementor for a product launch campaign. Must be mobile-optimized and include a contact form integration.',
    price: 1800,
    deadline: 'May 12, 2026',
    daysLeft: 18,
    skills: ['WordPress', 'Elementor', 'HTML/CSS', 'Responsive Design'],
    maxApplicants: 4,
    applicantCount: 4,
    status: 'open',
    estimatedTime: '12h+',
    postedDate: '3 days ago',
  },
  {
    id: 't5',
    title: 'Product Photography Session',
    businessName: 'Style & Co.',
    businessId: 'b5',
    category: 'Photography',
    description: 'We need a photographer to shoot 20 product photos for our online store. Items are clothing and accessories. Studio visit required in Makati, lighting equipment provided.',
    price: 950,
    deadline: 'May 8, 2026',
    daysLeft: 14,
    skills: ['Photography', 'Photo Editing', 'Lightroom', 'Product Styling'],
    maxApplicants: 3,
    applicantCount: 2,
    status: 'open',
    estimatedTime: '5-8h',
    postedDate: '1 day ago',
  },
  {
    id: 't6',
    title: 'Instagram Reels Video Editing',
    businessName: 'FitLife Gym',
    businessId: 'b1',
    category: 'Video',
    description: 'Edit 8 raw workout videos into polished Instagram Reels. Add captions, transitions, background music, and color grading. Output: 30–60 second vertical videos.',
    price: 700,
    deadline: 'May 6, 2026',
    daysLeft: 12,
    skills: ['Video Editing', 'CapCut', 'After Effects', 'Reels'],
    maxApplicants: 3,
    applicantCount: 1,
    status: 'in_progress',
    estimatedTime: '5-8h',
    postedDate: '4 days ago',
  },
  {
    id: 't7',
    title: 'SEO Blog Article Writing (5 articles)',
    businessName: 'Health First PH',
    businessId: 'b6',
    category: 'Writing',
    description: 'Write 5 SEO-optimized blog articles (800-1200 words each) on health and wellness topics. Must include target keywords, meta descriptions, and proper formatting.',
    price: 550,
    deadline: 'May 18, 2026',
    daysLeft: 24,
    skills: ['SEO Writing', 'Research', 'Content Strategy', 'Google Docs'],
    maxApplicants: 5,
    applicantCount: 3,
    status: 'open',
    estimatedTime: '8-12h',
    postedDate: '6 days ago',
  },
  {
    id: 't8',
    title: 'Email Marketing Campaign Design',
    businessName: 'TechStart Manila',
    businessId: 'b7',
    category: 'Marketing',
    description: 'Design and write a 3-email onboarding sequence for new app users. Must align with our brand guidelines. Experience with Mailchimp templates preferred.',
    price: 1100,
    deadline: 'May 25, 2026',
    daysLeft: 31,
    skills: ['Email Marketing', 'Mailchimp', 'Copywriting', 'Design'],
    maxApplicants: 3,
    applicantCount: 0,
    status: 'open',
    estimatedTime: '5-8h',
    postedDate: '2 hours ago',
  },
];

export const mockApplicants: Applicant[] = [
  {
    id: 'a1',
    name: 'Maria Santos',
    initials: 'MS',
    university: 'De La Salle University',
    rating: 4.9,
    reviewCount: 22,
    skills: ['Canva', 'Instagram', 'Content Writing'],
    completedTasks: 18,
    status: 'pending',
    bio: 'Marketing student with 2 years of freelance experience. Specialized in social media management and content creation for small businesses.',
  },
  {
    id: 'a2',
    name: 'Carlo Reyes',
    initials: 'CR',
    university: 'Ateneo de Manila University',
    rating: 4.7,
    reviewCount: 11,
    skills: ['Graphic Design', 'Adobe Creative Suite', 'Canva'],
    completedTasks: 9,
    status: 'pending',
    bio: 'Fine Arts student with a passion for digital design. Have completed projects for local startups and personal brands.',
  },
  {
    id: 'a3',
    name: 'Ana Lim',
    initials: 'AL',
    university: 'University of the Philippines',
    rating: 5.0,
    reviewCount: 8,
    skills: ['Instagram', 'Video Editing', 'Reels'],
    completedTasks: 7,
    status: 'accepted',
    bio: 'Communication Arts student passionate about storytelling through social media. Editor for our university\'s official digital platforms.',
  },
  {
    id: 'a4',
    name: 'Paolo Mendoza',
    initials: 'PM',
    university: 'Far Eastern University',
    rating: 4.5,
    reviewCount: 6,
    skills: ['Copywriting', 'Content Strategy', 'SEO'],
    completedTasks: 5,
    status: 'rejected',
    bio: 'Mass Communication student with a knack for writing compelling copy. Have written for blogs, newsletters, and social media.',
  },
];

export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    type: 'application',
    message: 'FitLife Gym accepted your application for Social Media task.',
    time: '2 min ago',
    isRead: false,
  },
  {
    id: 'n2',
    type: 'payment',
    message: '💰 Payment of ₱350 released for Instagram Templates task.',
    time: '1 hr ago',
    isRead: false,
  },
  {
    id: 'n3',
    type: 'task_match',
    message: 'Café Latte posted a new task matching your skills.',
    time: '3 hrs ago',
    isRead: false,
  },
  {
    id: 'n4',
    type: 'deadline',
    message: 'Reminder: Math Tutoring deadline is tomorrow.',
    time: 'Yesterday',
    isRead: true,
  },
  {
    id: 'n5',
    type: 'review',
    message: 'Digital Agency PH left you a ⭐⭐⭐⭐⭐ review! Check your profile.',
    time: 'Yesterday',
    isRead: true,
  },
  {
    id: 'n6',
    type: 'task_match',
    message: 'Style & Co. posted a Photography task that matches your skills.',
    time: '2 days ago',
    isRead: true,
  },
  {
    id: 'n7',
    type: 'application',
    message: 'Your application for SEO Blog Writing has been submitted.',
    time: '3 days ago',
    isRead: true,
  },
];

export const mockConversations: Conversation[] = [
  {
    id: 'c1',
    participantName: 'FitLife Gym',
    participantInitials: 'FL',
    participantColor: '#FF7B54',
    lastMessage: 'Great! Can you start on Monday?',
    lastMessageTime: '2 min',
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: 'c2',
    participantName: 'Café Latte',
    participantInitials: 'CL',
    participantColor: '#10B981',
    lastMessage: 'I loved the logo concepts! Let\'s go with Option A',
    lastMessageTime: '1 hr',
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: 'c3',
    participantName: 'Digital Agency PH',
    participantInitials: 'DA',
    participantColor: '#4F5BD5',
    lastMessage: 'The landing page looks perfect. Releasing payment now.',
    lastMessageTime: '3 hrs',
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: 'c4',
    participantName: 'Style & Co.',
    participantInitials: 'SC',
    participantColor: '#F59E0B',
    lastMessage: 'Are you available this Saturday for the shoot?',
    lastMessageTime: 'Yesterday',
    unreadCount: 1,
    isOnline: false,
  },
];

export const mockChatMessages: ChatMessage[] = [
  { id: 'm1', text: 'Hi! I saw your application for the Social Media task.', time: '10:00 AM', isMe: false },
  { id: 'm2', text: 'Yes! I\'m really excited about this opportunity. I have experience with gym-related content.', time: '10:02 AM', isMe: true },
  { id: 'm3', text: 'Perfect! Can you share some samples of your previous work?', time: '10:03 AM', isMe: false },
  { id: 'm4', text: 'Sure! I\'ll send over my portfolio link right now. I worked with 3 fitness brands before.', time: '10:05 AM', isMe: true },
  { id: 'm5', text: 'Wow, impressive work! We\'d like to move forward. Can you start on Monday?', time: '10:15 AM', isMe: false },
  { id: 'm6', text: 'Monday works perfectly for me! I\'ll prepare the content calendar ahead of time.', time: '10:17 AM', isMe: true },
  { id: 'm7', text: 'Great! Can you start on Monday?', time: '10:18 AM', isMe: false },
];

export const mockStudent = {
  id: 's1',
  name: 'Juan dela Cruz',
  email: 'juan.delacruz@email.com',
  initials: 'JD',
  university: 'University of Santo Tomas',
  bio: 'Computer Science student passionate about design and development. Looking for freelance opportunities to build my portfolio and earn while studying.',
  skills: ['Graphic Design', 'Social Media', 'Video Editing', 'Web Design', 'Photography', 'Canva'],
  rating: 4.8,
  reviewCount: 15,
  completedTasks: 12,
  totalEarned: 4850,
  availableBalance: 1200,
  pendingBalance: 350,
  joinedDate: 'January 2026',
};

export const mockBusiness = {
  id: 'b_user',
  name: 'TechStart Manila',
  ownerName: 'Rafael Cruz',
  initials: 'TS',
  category: 'Technology',
  email: 'hello@techstart.ph',
  address: 'BGC, Taguig City, Metro Manila',
  website: 'www.techstartmanila.ph',
  description: 'Innovative tech startup building productivity tools for Filipino SMEs. We love working with student talent to bring fresh ideas to life.',
  rating: 4.7,
  reviewCount: 12,
  tasksPosted: 8,
  totalHired: 6,
  avgCompletionTime: '5 days',
  totalSpent: 7200,
};

export const mockStudentReviews = [
  {
    id: 'r1',
    businessName: 'Digital Agency PH',
    businessInitials: 'DA',
    rating: 5,
    comment: 'Juan delivered exceptional work! The landing page was pixel-perfect and submitted ahead of deadline. Would definitely hire again.',
    date: '2 weeks ago',
  },
  {
    id: 'r2',
    businessName: 'FitLife Gym',
    businessInitials: 'FL',
    rating: 5,
    comment: 'Outstanding social media content! Engagement went up 40% in the first week. Very professional and responsive.',
    date: '1 month ago',
  },
  {
    id: 'r3',
    businessName: 'Café Latte',
    businessInitials: 'CL',
    rating: 4,
    comment: 'Great logo design. Needed a couple of revisions but overall very satisfied with the final result.',
    date: '6 weeks ago',
  },
];

export const mockBusinessReviews = [
  {
    id: 'br1',
    studentName: 'Maria Santos',
    studentInitials: 'MS',
    rating: 5,
    comment: 'Amazing to work with! Very clear instructions and paid on time. Highly recommended for students.',
    date: '3 weeks ago',
  },
  {
    id: 'br2',
    studentName: 'Carlo Reyes',
    studentInitials: 'CR',
    rating: 4,
    comment: 'Good communication and fair pay. The task scope was clear and the deadline was reasonable.',
    date: '1 month ago',
  },
];

export const mockEarningsHistory = [
  { id: 'e1', taskTitle: 'Instagram Templates Pack', businessName: 'FitLife Gym', amount: 350, date: 'Apr 20, 2026', status: 'released' },
  { id: 'e2', taskTitle: 'WordPress Landing Page', businessName: 'Digital Agency PH', amount: 1800, date: 'Apr 10, 2026', status: 'released' },
  { id: 'e3', taskTitle: 'Logo Design', businessName: 'Café Latte', amount: 1200, date: 'Mar 28, 2026', status: 'released' },
  { id: 'e4', taskTitle: 'Brand Photography', businessName: 'Style & Co.', amount: 950, date: 'Mar 15, 2026', status: 'released' },
  { id: 'e5', taskTitle: 'SEO Article Writing', businessName: 'Health First PH', amount: 550, date: 'Feb 28, 2026', status: 'released' },
];

export const mockActiveTasks = [
  {
    id: 'at1',
    taskId: 't1',
    title: 'Social Media Content Creation',
    businessName: 'FitLife Gym',
    businessInitials: 'FL',
    price: 850,
    deadline: 'May 15, 2026',
    daysLeft: 21,
    category: 'Social Media',
    status: 'in_progress' as TaskStatus,
    progress: 60,
    currentStep: 3,
  },
  {
    id: 'at2',
    taskId: 't6',
    title: 'Instagram Reels Video Editing',
    businessName: 'FitLife Gym',
    businessInitials: 'FL',
    price: 700,
    deadline: 'May 6, 2026',
    daysLeft: 12,
    category: 'Video',
    status: 'done' as TaskStatus,
    progress: 100,
    currentStep: 4,
  },
];

export const categoryColors: Record<string, string> = {
  'Design': '#4F5BD5',
  'Social Media': '#10B981',
  'Writing': '#F59E0B',
  'Coding': '#6366F1',
  'Photography': '#EC4899',
  'Tutoring': '#14B8A6',
  'Marketing': '#FF7B54',
  'Video': '#8B5CF6',
};
