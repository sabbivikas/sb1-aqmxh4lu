/*
  # Create tasks table and auth policies

  1. New Tables
    - `tasks`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `description` (text)
      - `due_date` (date)
      - `priority` (text)
      - `category` (text)
      - `good_deed_rating` (integer)
      - `completed` (boolean)
      - `completion_date` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `tasks` table
    - Add policies for authenticated users to manage their own tasks
*/

CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  description text NOT NULL,
  due_date date NOT NULL,
  priority text NOT NULL CHECK (priority IN ('High', 'Medium', 'Low')),
  category text NOT NULL CHECK (category IN ('Work', 'Personal', 'Family', 'Community Service')),
  good_deed_rating integer NOT NULL CHECK (good_deed_rating BETWEEN 1 AND 5),
  completed boolean DEFAULT false,
  completion_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own tasks"
  ON tasks
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create a trigger to update updated_at
CREATE TRIGGER tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();