-- Populate useful SEO defaults for every published profile.
-- Existing admin-entered SEO is preserved.
INSERT INTO seo_meta (
  founder_id,
  seo_title,
  seo_description,
  keywords,
  canonical_url,
  og_image,
  og_title,
  twitter_card,
  schema_type,
  focus_keyword,
  robots
)
SELECT
  f.id,
  f.name ||
    CASE
      WHEN NULLIF(TRIM(f.designation), '') IS NOT NULL THEN ' — ' || TRIM(f.designation)
      ELSE ' — Profile'
    END ||
    ' | ProfileBizz',
  SUBSTR(
    COALESCE(
      NULLIF(TRIM(f.one_liner), ''),
      NULLIF(TRIM(f.executive_summary), ''),
      'Read the complete profile of ' || f.name || ' on ProfileBizz.'
    ),
    1,
    160
  ),
  f.name || ', ' ||
    COALESCE(NULLIF(TRIM(f.designation), ''), 'profile') || ', ' ||
    COALESCE(NULLIF(TRIM(f.category), ''), 'business story') || ', ProfileBizz',
  'https://profilebizz.com' ||
    CASE
      WHEN LOWER(COALESCE(f.profile_type, '')) = 'social-hero'
        OR LOWER(COALESCE(f.category, '')) LIKE '%social hero%'
        THEN '/social-hero/' || f.slug
      WHEN LOWER(COALESCE(f.profile_type, '')) = 'brand'
        OR LOWER(COALESCE(f.category, '')) LIKE '%brand%'
        THEN '/brand/' || f.slug
      WHEN LOWER(COALESCE(f.profile_type, '')) = 'industry'
        OR LOWER(COALESCE(f.category, '')) LIKE '%industry%'
        THEN '/industry/' || f.slug
      WHEN LOWER(COALESCE(f.profile_type, '')) = 'women-story'
        OR LOWER(COALESCE(f.category, '')) LIKE '%women%'
        THEN '/women-story/' || f.slug
      ELSE '/founder/' || f.slug
    END,
  COALESCE(NULLIF(TRIM(f.cover_photo_url), ''), NULLIF(TRIM(f.photo_url), ''), 'https://profilebizz.com/og-cover.jpg'),
  f.name ||
    CASE
      WHEN NULLIF(TRIM(f.designation), '') IS NOT NULL THEN ' — ' || TRIM(f.designation)
      ELSE ' — Profile'
    END ||
    ' | ProfileBizz',
  'summary_large_image',
  CASE
    WHEN LOWER(COALESCE(f.profile_type, '')) = 'brand' THEN 'Organization'
    ELSE 'Person'
  END,
  f.name,
  'index, follow'
FROM founders f
WHERE f.published = 1
ON CONFLICT(founder_id) DO NOTHING;
