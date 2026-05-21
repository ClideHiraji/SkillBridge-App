import { supabase } from './supabase';
import { UserProfile, Job, Notification, Skill, PortfolioItem } from './types';

// ============================================
// AUTHENTICATION
// ============================================

export async function registerUser(
  email: string,
  password: string,
  userType: 'student' | 'business',
  fullName: string
) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) throw authError;

  if (authData.user) {
    const { error: profileError } = await supabase.from('users').insert([
      {
        id: authData.user.id,
        email,
        user_type: userType,
        full_name: fullName,
        profile_visible: true,
      },
    ]);

    if (profileError) throw profileError;
  }

  return authData;
}

export async function loginUser(email: string, password: string) {
  return await supabase.auth.signInWithPassword({ email, password });
}

export async function logoutUser() {
  return await supabase.auth.signOut();
}

export async function getCurrentUser() {
  return await supabase.auth.getUser();
}

// ============================================
// USER PROFILE
// ============================================

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) return null;
  return data;
}

export async function updateUserProfile(
  userId: string,
  updates: Partial<UserProfile>
) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function uploadProfilePicture(userId: string, file: File) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}-${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(fileName, file, { upsert: true });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);

  const { error: updateError } = await supabase
    .from('users')
    .update({ avatar_url: data.publicUrl })
    .eq('id', userId);

  if (updateError) throw updateError;

  return data.publicUrl;
}

// ============================================
// JOBS
// ============================================

export async function createJob(jobData: Partial<Job>) {
  const { data, error } = await supabase
    .from('jobs')
    .insert([jobData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getJobs(filters?: { userType?: string; status?: string }) {
  let query = supabase.from('jobs').select('*, business:business_id(*)');

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getJobById(jobId: string): Promise<Job | null> {
  const { data, error } = await supabase
    .from('jobs')
    .select('*, business:business_id(*)')
    .eq('id', jobId)
    .single();

  if (error) return null;
  return data;
}

export async function updateJob(jobId: string, updates: Partial<Job>) {
  const { data, error } = await supabase
    .from('jobs')
    .update(updates)
    .eq('id', jobId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteJob(jobId: string) {
  const { error } = await supabase.from('jobs').delete().eq('id', jobId);

  if (error) throw error;
}

export async function getBusinessJobs(businessId: string) {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('business_id', businessId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// ============================================
// SKILLS
// ============================================

export async function addSkill(userId: string, skillName: string) {
  const { data, error } = await supabase
    .from('skills')
    .insert([
      {
        user_id: userId,
        name: skillName,
        endorsed_count: 0,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getUserSkills(userId: string): Promise<Skill[]> {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .eq('user_id', userId)
    .order('endorsed_count', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function deleteSkill(skillId: string) {
  const { error } = await supabase.from('skills').delete().eq('id', skillId);

  if (error) throw error;
}

export async function endorseSkill(skillId: string) {
  const { data: skill } = await supabase
    .from('skills')
    .select('endorsed_count')
    .eq('id', skillId)
    .single();

  const newCount = (skill?.endorsed_count || 0) + 1;

  const { data, error } = await supabase
    .from('skills')
    .update({ endorsed_count: newCount })
    .eq('id', skillId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ============================================
// PORTFOLIO
// ============================================

export async function addPortfolioItem(userId: string, item: Partial<PortfolioItem>) {
  const { data, error } = await supabase
    .from('portfolio_items')
    .insert([{ user_id: userId, ...item }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getUserPortfolio(userId: string): Promise<PortfolioItem[]> {
  const { data, error } = await supabase
    .from('portfolio_items')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function updatePortfolioItem(itemId: string, updates: Partial<PortfolioItem>) {
  const { data, error } = await supabase
    .from('portfolio_items')
    .update(updates)
    .eq('id', itemId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePortfolioItem(itemId: string) {
  const { error } = await supabase.from('portfolio_items').delete().eq('id', itemId);

  if (error) throw error;
}

// ============================================
// NOTIFICATIONS
// ============================================

export async function getNotifications(userId: string): Promise<Notification[]> {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function markNotificationAsRead(notificationId: string) {
  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('id', notificationId);

  if (error) throw error;
}

export async function deleteNotification(notificationId: string) {
  const { error } = await supabase.from('notifications').delete().eq('id', notificationId);

  if (error) throw error;
}

export async function createNotification(notification: Partial<Notification>) {
  const { data, error } = await supabase
    .from('notifications')
    .insert([notification])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ============================================
// JOB APPLICATIONS
// ============================================

export async function applyForJob(jobId: string, studentId: string, coverLetter: string) {
  const { data, error } = await supabase
    .from('applications')
    .insert([
      {
        job_id: jobId,
        student_id: studentId,
        cover_letter: coverLetter,
        status: 'applied',
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getJobApplications(jobId: string) {
  const { data, error } = await supabase
    .from('applications')
    .select('*, student:student_id(*)')
    .eq('job_id', jobId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getStudentApplications(studentId: string) {
  const { data, error } = await supabase
    .from('applications')
    .select('*, job:job_id(*)')
    .eq('student_id', studentId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}
