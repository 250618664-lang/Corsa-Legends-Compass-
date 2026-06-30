// Corsa Legends Compass — site registry
// Minimal registry for page运行 and validator needs only.
// Does NOT contain research notes, screenshots, or full source-log.

export const SITE = {
  title: 'Corsa Legends Tune & Code Checker',
  description: 'Unofficial Corsa Legends helper for Roblox. Check official code status, tune categories, and update tracker — safe sources only.',
  gameName: 'Corsa Legends',
  platform: 'Roblox',
  creator: 'Cogito',
  gameId: '122720857080780',
  universeId: '6786784563',
  alpha: true,
  officialTitle: '[🏎️2 CARS + NEW RACE] Corsa Legends [ALPHA]',
  // API snapshot date for volatile metrics
  metricsDate: '2026-06-29',
  // Official code from Roblox game description
  officialCode: '75K',
  nextCodeLikes: 90000,
  // Official scope: over 80 cars/trims from description
  carCount: '80+',
  // Official tuning categories from description
  tuningCategories: [
    'Engine Swaps',
    'Suspension Setups',
    'Tire Choices',
    'Advanced Tuning',
    'Performance Upgrades',
    'Paint / Interior / Rims / Tint',
  ],
  // Active pages
  pages: [
    { url: '/',            title: 'Home',          label: 'Task Hub' },
    { url: '/codes/',       title: 'Codes',         label: 'Code Status' },
    { url: '/tune-helper/', title: 'Tune Helper',   label: 'Tune Checklist' },
    { url: '/updates/',     title: 'Updates',       label: 'Update Tracker' },
    { url: '/wiki-discord/',title:'Wiki & Discord', label: 'Source Checker' },
    { url: '/sources/',     title: 'Sources',       label: 'Trust Info' },
    { url: '/about/',       title: 'About',         label: 'Policy' },
  ] as const,
} as const;

export const NAV = [
  { url: '/',            label: 'Home' },
  { url: '/codes/',       label: 'Codes' },
  { url: '/tune-helper/', label: 'Tune Helper' },
  { url: '/updates/',     label: 'Updates' },
  { url: '/wiki-discord/',label: 'Wiki & Discord' },
  { url: '/sources/',     label: 'Sources' },
  { url: '/about/',       label: 'About' },
] as const;
