// Corsa Legends Compass — minimal claims registry
// Only approved, source-log-backed claims used by pages.
// Does NOT contain raw research notes or full evidence.

export const OFFICIAL_CODE = {
  code: '75K',
  source: 'Roblox API description snapshot 2026-06-29',
  url: 'https://games.roblox.com/v1/games?universeIds=6786784563',
  status: 'official' as const,
};

export const NEXT_CODE = {
  likes: 90000,
  trigger: 'New code at 90,000 likes (from official description)',
};

export const GAME_SCOPE = {
  carsTrims: '80+',
  features: [
    'Paint customization',
    'Interior customization',
    'Rims customization',
    'Tint customization',
    'Performance upgrades',
    'Live races',
    'Engine swaps',
    'Suspension setups',
    'Tire choices',
    'Advanced tuning',
  ],
};

export const METRICS = {
  date: '2026-06-29',
  visits: '16,117,359',
  favorites: '340,940',
  playing: '1,703',
  upvotes: '75,659',
  downvotes: '2,388',
};

// Banned phrases — these must only appear in Not confirmed / Hold / Cannot verify context
export const BANNED_PHRASES = [
  'best car',
  'best engine',
  'best tune',
  'exact tune',
  'supra tune',
  'all working codes',
  'active codes',
  'official Discord',
  'car values',
  'money farm',
] as const;

export type BannedPhrase = typeof BANNED_PHRASES[number];
