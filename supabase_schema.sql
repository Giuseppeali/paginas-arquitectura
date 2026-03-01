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

-- Require authentication for inserts
CREATE POLICY "Enable insert for authenticated users only"
  ON clients
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Require authentication for updates
CREATE POLICY "Enable update for authenticated users only"
  ON clients
  FOR UPDATE
  TO authenticated
  USING (true);

-- Require authentication for deletes
CREATE POLICY "Enable delete for authenticated users only"
  ON clients
  FOR DELETE
  TO authenticated
  USING (true);
