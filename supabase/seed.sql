-- =======================================================================
-- InstaPaws — Seed Data
-- =======================================================================
-- Run after migrations to populate the database with initial
-- mock videos and success stories for development/demo.
-- =======================================================================

-- ---- Videos ----
INSERT INTO videos (id, instagram_url, embed_url, thumbnail_url, abuse_type, description, location, status, moderation_status, is_graphic, view_count, reported_at, reported_to_instagram_at, instagram_response, moderator_notes)
VALUES
  (
    '00000000-0000-0000-0000-000000000001',
    'https://www.instagram.com/p/example1/',
    'https://www.instagram.com/p/example1/embed',
    '/images/placeholder-thumb.jpg',
    'physical-abuse',
    'Video shows a person repeatedly kicking a dog in a residential area. The dog appears to be cowering and whimpering.',
    'Urban area, reported coordinates masked',
    'action-taken',
    'approved',
    TRUE,
    342,
    '2026-05-28T10:30:00Z',
    '2026-05-28T11:00:00Z',
    'Content removed after review',
    NULL
  ),
  (
    '00000000-0000-0000-0000-000000000002',
    'https://www.instagram.com/p/example2/',
    'https://www.instagram.com/p/example2/embed',
    '/images/placeholder-thumb.jpg',
    'neglect',
    'Dog left chained up without food or water in extreme heat. Video shows the dog emaciated and distressed.',
    NULL,
    'under-investigation',
    'approved',
    FALSE,
    128,
    '2026-05-27T14:00:00Z',
    NULL,
    NULL,
    NULL
  ),
  (
    '00000000-0000-0000-0000-000000000003',
    'https://www.instagram.com/p/example3/',
    'https://www.instagram.com/p/example3/embed',
    '/images/placeholder-thumb.jpg',
    'fighting',
    'Graphic footage of dogs being forced to fight in a makeshift ring. Distressed barking and visible injuries.',
    'Location hidden for safety',
    'action-taken',
    'approved',
    TRUE,
    891,
    '2026-05-25T09:15:00Z',
    '2026-05-25T09:30:00Z',
    NULL,
    NULL
  ),
  (
    '00000000-0000-0000-0000-000000000004',
    'https://www.instagram.com/p/example4/',
    'https://www.instagram.com/p/example4/embed',
    '/images/placeholder-thumb.jpg',
    'baiting',
    'Small animal being used as bait to train fighting dogs. Extremely graphic content.',
    NULL,
    'pending-review',
    'unmoderated',
    TRUE,
    0,
    '2026-05-26T16:45:00Z',
    NULL,
    NULL,
    NULL
  ),
  (
    '00000000-0000-0000-0000-000000000005',
    'https://www.instagram.com/p/example5/',
    'https://www.instagram.com/p/example5/embed',
    '/images/placeholder-thumb.jpg',
    'abandonment',
    'Dog left tied to a fence outside a shelter after hours. No food, water, or shelter provided.',
    'Rural area, shelter parking lot',
    'under-investigation',
    'approved',
    FALSE,
    56,
    '2026-05-24T08:00:00Z',
    '2026-05-24T08:30:00Z',
    'Under review by Instagram',
    NULL
  ),
  (
    '00000000-0000-0000-0000-000000000006',
    'https://www.instagram.com/p/example6/',
    'https://www.instagram.com/p/example6/embed',
    '/images/placeholder-thumb.jpg',
    'physical-abuse',
    'Person striking a dog with an object. Video is being circulated as a "joke" but clearly shows distress.',
    NULL,
    'dismissed',
    'rejected',
    TRUE,
    12,
    '2026-05-23T19:20:00Z',
    NULL,
    NULL,
    'Unable to verify context. Video quality too low to confirm abuse.'
  )
ON CONFLICT (id) DO NOTHING;

-- ---- Success Stories ----
INSERT INTO success_stories (id, title, summary, outcome, video_id, date)
VALUES
  (
    '00000000-0000-0000-0000-000000000101',
    'Kicking Video Leads to Welfare Check',
    'After being flagged on InstaPaws, the video was reported to local authorities who conducted a welfare check on the dog.',
    'Dog removed from harmful environment',
    '00000000-0000-0000-0000-000000000001',
    '2026-05-30'
  ),
  (
    '00000000-0000-0000-0000-000000000102',
    'Instagram Removes Fighting Ring Content',
    'Three videos showing organized dog fighting were reported via our platform. Instagram removed all three within 48 hours.',
    'Content removed, investigation ongoing',
    '00000000-0000-0000-0000-000000000003',
    '2026-05-28'
  ),
  (
    '00000000-0000-0000-0000-000000000103',
    'Community Rallies for Abandoned Dog',
    'A video of an abandoned dog led to community members organizing a rescue and finding the dog a foster home.',
    'Dog rescued and rehomed',
    NULL,
    '2026-05-20'
  )
ON CONFLICT (id) DO NOTHING;
