-- =======================================================================
-- InstaPaws Initial Schema
-- =======================================================================

-- ---- Enum Types ----
CREATE TYPE abuse_type AS ENUM (
  'physical-abuse',
  'neglect',
  'fighting',
  'baiting',
  'sexual-abuse',
  'hoarding',
  'abandonment',
  'other'
);

CREATE TYPE report_status AS ENUM (
  'pending-review',
  'under-investigation',
  'confirmed',
  'action-taken',
  'dismissed',
  'escalated'
);

CREATE TYPE moderation_status AS ENUM (
  'unmoderated',
  'approved',
  'rejected'
);

-- ---- Videos Table ----
CREATE TABLE videos (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  instagram_url TEXT        NOT NULL,
  embed_url    TEXT        NOT NULL,
  thumbnail_url TEXT       NOT NULL DEFAULT '/images/placeholder-thumb.jpg',
  abuse_type   abuse_type  NOT NULL,
  description  TEXT        NOT NULL,
  location     TEXT,
  status       report_status    NOT NULL DEFAULT 'pending-review',
  moderation_status moderation_status NOT NULL DEFAULT 'unmoderated',
  is_graphic   BOOLEAN     NOT NULL DEFAULT false,
  view_count   INTEGER     NOT NULL DEFAULT 0,
  reported_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  reported_to_instagram_at TIMESTAMPTZ,
  instagram_response TEXT,
  moderated_by TEXT,
  moderated_at TIMESTAMPTZ,
  moderator_notes TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_videos_moderation_status ON videos (moderation_status);
CREATE INDEX idx_videos_status ON videos (status);
CREATE INDEX idx_videos_abuse_type ON videos (abuse_type);
CREATE INDEX idx_videos_reported_at ON videos (reported_at DESC);
CREATE INDEX idx_videos_is_graphic ON videos (is_graphic);

-- ---- Success Stories Table ----
CREATE TABLE success_stories (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title      TEXT NOT NULL,
  summary    TEXT NOT NULL,
  outcome    TEXT NOT NULL,
  video_id   UUID REFERENCES videos(id) ON DELETE SET NULL,
  date       DATE NOT NULL DEFAULT CURRENT_DATE,
  image_url  TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_success_stories_date ON success_stories (date DESC);

-- ---- Site Stats Table ----
CREATE TABLE site_stats (
  key        TEXT PRIMARY KEY,
  value      INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Seed default stats
INSERT INTO site_stats (key, value) VALUES
  ('videos_flagged', 47),
  ('videos_removed', 47),
  ('investigations_opened', 14),
  ('dogs_rescued', 3)
ON CONFLICT (key) DO NOTHING;

-- ---- Row Level Security ----
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE success_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_stats ENABLE ROW LEVEL SECURITY;

-- Videos: public read, authenticated write
CREATE POLICY "Public can view approved videos"
  ON videos FOR SELECT
  USING (moderation_status = 'approved');

CREATE POLICY "Anyone can insert video reports"
  ON videos FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update videos"
  ON videos FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Success stories: public read
CREATE POLICY "Public can view success stories"
  ON success_stories FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage stories"
  ON success_stories FOR ALL
  USING (auth.role() = 'authenticated');

-- Site stats: public read
CREATE POLICY "Public can view site stats"
  ON site_stats FOR SELECT
  USING (true);

CREATE POLICY "Service role can update stats"
  ON site_stats FOR UPDATE
  USING (auth.role() = 'service_role');
