import { supabase } from './supabase';

export async function seedDatabase() {
  if (!supabase) {
    console.error('Supabase not configured');
    return false;
  }

  try {
    console.log('Starting database seeding...');

    // Check if seed data already exists
    const { count } = await supabase
      .from('users')
      .select('id', { count: 'exact', head: true })
      .eq('email', 'juan@example.com');

    if (count && count > 0) {
      console.log('✅ Seed data already exists');
      return true;
    }

    console.log('Running seed migration: 002_seed_data.sql');
    const { error } = await supabase.rpc('exec_seed_data');

    if (error) {
      // If RPC not available, just log that user should run migration manually
      console.warn('⚠️ To load sample data, run in Supabase SQL Editor:', error.message);
      return false;
    }

    console.log('✅ Database seeded successfully');
    return true;
  } catch (error) {
    console.error('Seed error:', error);
    return false;
  }
}

// Test accounts created by seed:
// STUDENTS:
// - juan@example.com (password: set when registering)
// - maria@example.com
// - carlos@example.com
// - ana@example.com
//
// BUSINESSES:
// - startup@example.com
// - agency@example.com
// - ecommerce@example.com
