/*
  # Initial Schema Setup

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `communication_style` (text)
      - `credits` (integer)
      - `created_at` (timestamp)
    
    - `people`
      - `id` (uuid, primary key)
      - `name` (text)
      - `birth_date` (date)
      - `relationship` (text)
      - `interests` (text[])
      - `personality_traits` (text[])
      - `communication_style` (text)
      - `user_id` (uuid, foreign key)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Users table
CREATE TABLE users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text UNIQUE NOT NULL,
  communication_style text CHECK (communication_style IN ('formal', 'casual', 'funny', 'poetic')),
  credits integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- People table
CREATE TABLE people (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  birth_date date NOT NULL,
  relationship text NOT NULL,
  interests text[] DEFAULT '{}',
  personality_traits text[] DEFAULT '{}',
  communication_style text CHECK (communication_style IN ('formal', 'casual', 'funny', 'poetic')),
  user_id uuid REFERENCES users(id) NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE people ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own people"
  ON people
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own people"
  ON people
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own people"
  ON people
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own people"
  ON people
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);