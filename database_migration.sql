-- Database Migration: Modify manifestos table
-- Date: October 13, 2025
-- Description: 
--   1. Remove columns: total_pages, created_at
--   2. Add column: is_winner (to mark winning party/alliance)

-- Step 1: Drop the columns
ALTER TABLE manifestos DROP COLUMN IF EXISTS total_pages;
ALTER TABLE manifestos DROP COLUMN IF EXISTS created_at;

-- Step 2: Add is_winner column
ALTER TABLE manifestos ADD COLUMN is_winner BOOLEAN DEFAULT FALSE;

-- Step 3: Set winners for existing data (example - update as needed)
-- Mark BJP as winner for 2024 Lok Sabha
UPDATE manifestos 
SET is_winner = TRUE 
WHERE id = 'bjp-2024';

-- Mark AAP as winner for Delhi 2020
UPDATE manifestos 
SET is_winner = TRUE 
WHERE id = 'aap-delhi-2020';

-- Mark INC-led AINRC alliance as winner for Puducherry 2021
UPDATE manifestos 
SET is_winner = TRUE 
WHERE id = 'inc-puducherry-2021';

-- Verify the changes
SELECT 
  id,
  party_name,
  election_year,
  election_type,
  region_name,
  is_winner
FROM manifestos
ORDER BY election_type, election_year DESC;

-- Expected result after migration:
-- All records will have is_winner field
-- total_pages and created_at columns will be removed
