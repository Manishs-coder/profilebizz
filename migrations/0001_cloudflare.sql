PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS founders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  profile_type TEXT,
  profile_tag TEXT,
  category TEXT,
  location TEXT,
  founded TEXT,
  revenue TEXT,
  employees TEXT,
  age TEXT,
  photo_url TEXT,
  cover_photo_url TEXT,
  one_liner TEXT,
  executive_summary TEXT,
  published INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS founder_sections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  founder_id INTEGER NOT NULL REFERENCES founders(id) ON DELETE CASCADE,
  locale TEXT NOT NULL DEFAULT 'en',
  section_key TEXT NOT NULL,
  pull_quote TEXT,
  body_paragraphs TEXT NOT NULL DEFAULT '[]',
  json_data TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS seo_meta (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  founder_id INTEGER NOT NULL UNIQUE REFERENCES founders(id) ON DELETE CASCADE,
  seo_title TEXT,
  seo_description TEXT,
  keywords TEXT,
  canonical_url TEXT,
  og_image TEXT,
  og_title TEXT,
  twitter_card TEXT DEFAULT 'summary_large_image',
  schema_type TEXT DEFAULT 'Person',
  focus_keyword TEXT,
  robots TEXT DEFAULT 'index, follow'
);

CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT DEFAULT '#6B7280',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sub_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_founder_sections_founder_locale
  ON founder_sections(founder_id, locale, sort_order);
CREATE INDEX IF NOT EXISTS idx_founders_published
  ON founders(published, updated_at);
