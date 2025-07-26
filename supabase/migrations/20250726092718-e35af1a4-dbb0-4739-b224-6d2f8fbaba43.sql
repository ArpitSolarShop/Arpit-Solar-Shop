-- Update the quote_source enum to include the new form sources
ALTER TYPE quote_source ADD VALUE IF NOT EXISTS 'Reliance Quote Form';
ALTER TYPE quote_source ADD VALUE IF NOT EXISTS 'Shakti Quote Form';