/*
  # Add Rating and Photo to Testimonials

  1. Changes
    - Add `rating` column (integer, 1-5 stars) to testimonials table
    - Add `photo_url` column for reviewer photo
    - Set default values

  2. Notes
    - Uses DO block to safely add columns if they don't exist
    - Rating defaults to 5 stars
    - Photo URL defaults to empty string
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'testimonials' AND column_name = 'rating'
  ) THEN
    ALTER TABLE testimonials ADD COLUMN rating integer DEFAULT 5 CHECK (rating >= 1 AND rating <= 5);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'testimonials' AND column_name = 'photo_url'
  ) THEN
    ALTER TABLE testimonials ADD COLUMN photo_url text DEFAULT '';
  END IF;
END $$;
