require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createAdmin() {
    const { data, error } = await supabase.auth.signUp({
        email: 'admin@ttoarquitectura.com',
        password: 'ttoAdmin2026!'
    });

    if (error) {
        console.error("Error creating user:", error);
    } else {
        console.log("Admin user created successfully:", data.user?.email);
    }
}

createAdmin();
