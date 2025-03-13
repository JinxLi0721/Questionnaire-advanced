import { createClient } from "@supabase/supabase-js";
const env = import.meta.env;
const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);
