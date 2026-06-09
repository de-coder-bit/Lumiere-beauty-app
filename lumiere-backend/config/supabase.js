const { createClient } = require('@supabase/supabase-js');

// Get environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Check if credentials exist
if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase credentials missing in .env file');
  console.error('Please add SUPABASE_URL and SUPABASE_ANON_KEY to .env');
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

console.log('✅ Supabase client initialized');

module.exports = supabase;
