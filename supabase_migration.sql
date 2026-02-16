-- Run this in Supabase Dashboard > SQL Editor
-- ============================================================
-- PART 1: Seminar Registrations
-- ============================================================

CREATE TABLE IF NOT EXISTS seminar_registrations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  seminar_id text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(seminar_id, email)
);

ALTER TABLE seminar_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view registration counts"
  ON seminar_registrations FOR SELECT
  USING (true);

CREATE POLICY "Anyone can register"
  ON seminar_registrations FOR INSERT
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_seminar_registrations_seminar_id
  ON seminar_registrations(seminar_id);

CREATE INDEX IF NOT EXISTS idx_seminar_registrations_email_seminar
  ON seminar_registrations(seminar_id, email);

-- ============================================================
-- PART 2: Training Batches
-- ============================================================

CREATE TABLE IF NOT EXISTS batches (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  start_date text NOT NULL,
  end_date text NOT NULL,
  total_seats integer NOT NULL DEFAULT 20,
  registered integer NOT NULL DEFAULT 0,
  price_sar numeric NOT NULL DEFAULT 1000,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE batches ENABLE ROW LEVEL SECURITY;

-- Anyone can read batches (public listing)
CREATE POLICY "Anyone can view batches"
  ON batches FOR SELECT
  USING (true);

-- Only service role (webhook) can update batches
CREATE POLICY "Service role can update batches"
  ON batches FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- PART 3: Payments
-- ============================================================

CREATE TABLE IF NOT EXISTS payments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_session_id text,
  batch_id uuid REFERENCES batches(id),
  course_id text,
  amount integer NOT NULL,
  status text NOT NULL DEFAULT 'completed',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Only service role (webhook) can insert/read payments
CREATE POLICY "Service role can insert payments"
  ON payments FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can view payments"
  ON payments FOR SELECT
  USING (true);

-- ============================================================
-- PART 4: Increment Seats RPC (atomic)
-- ============================================================

CREATE OR REPLACE FUNCTION increment_seats(batch_uuid uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_count integer;
BEGIN
  UPDATE batches
  SET registered = registered + 1
  WHERE id = batch_uuid AND registered < total_seats
  RETURNING registered INTO new_count;

  IF new_count IS NULL THEN
    RAISE EXCEPTION 'Batch is full or does not exist';
  END IF;

  RETURN new_count;
END;
$$;

-- ============================================================
-- PART 5: Enable Realtime on batches (for live seat updates)
-- ============================================================

ALTER PUBLICATION supabase_realtime ADD TABLE batches;

-- ============================================================
-- PART 6: Seed an initial batch (optional - remove if not needed)
-- ============================================================

INSERT INTO batches (start_date, end_date, total_seats, registered, price_sar, active)
VALUES
  ('Mar 1, 2026', 'Mar 5, 2026', 20, 0, 1000, true),
  ('Mar 15, 2026', 'Mar 19, 2026', 20, 0, 1000, true),
  ('Mar 29, 2026', 'Apr 2, 2026', 20, 0, 1000, true);

-- ============================================================
-- PART 7: Training Workshop Registrations
-- ============================================================

CREATE TABLE IF NOT EXISTS training_registrations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  workshop_id text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  method text NOT NULL DEFAULT 'email',
  created_at timestamptz DEFAULT now(),
  UNIQUE(workshop_id, email)
);

ALTER TABLE training_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view training registration counts"
  ON training_registrations FOR SELECT
  USING (true);

CREATE POLICY "Anyone can register for training"
  ON training_registrations FOR INSERT
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_training_registrations_workshop_id
  ON training_registrations(workshop_id);
