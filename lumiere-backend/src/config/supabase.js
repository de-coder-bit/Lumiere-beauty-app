const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Missing Supabase environment variables");
  console.error(
    "Please check your .env file has SUPABASE_URL and SUPABASE_ANON_KEY",
  );
  process.exit(1);
}

// For frontend/regular API calls (limited permissions)
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// For admin/backend operations (full access - keep server-side only!)
const supabaseAdmin = supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : supabase;

console.log("✅ Supabase client initialized");

module.exports = { supabase, supabaseAdmin };
