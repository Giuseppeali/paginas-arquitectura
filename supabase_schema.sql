-- Create the clients table to store custom links
CREATE TABLE clients (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  logo text,
  invert_logo boolean DEFAULT false,
  email text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Allow public read access to clients table so anyone can view the profile
CREATE POLICY "Allow public read access"
  ON clients
  FOR SELECT
  TO public
  USING (true);

-- Allow public insert/update (upsert) access so the Generator can save data
-- Note: In a real production app without auth, you might want to restrict this
-- or use a backend API route. For this use case, we allow public inserts.
CREATE POLICY "Allow public insert"
  ON clients
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update"
  ON clients
  FOR UPDATE
  TO public
  USING (true);
