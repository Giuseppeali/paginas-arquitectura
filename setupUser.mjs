import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Read .env manually to avoid powershell parsing weirdness
const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf8');

const env = {};
envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
        let key = match[1].trim();
        let val = match[2].trim().replace(/^["'](.*)["']$/, '$1');
        env[key] = val;
    }
});

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function setup() {
    const email = env.VITE_ADMIN_EMAIL || 'admin@ttoarquitectura.com';
    const password = env.VITE_ADMIN_PASSWORD || 'ttoAdmin2026!';

    console.log(`Attempting to create user: ${email}`);

    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });

    if (error) {
        console.error("SignUp Error:", error.message);
    } else {
        console.log("Success! User created.");
        console.log("Please log in with:");
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
    }
}

setup();
