ALTER TABLE challenges
ADD COLUMN IF NOT EXISTS photo_url TEXT;
UPDATE challenges
SET photo_url = 'https://example.com/default_photo.png'
WHERE photo_url IS NULL; 