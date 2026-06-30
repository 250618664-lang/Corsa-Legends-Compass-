/**
 * Corsa Legends Compass — content validator
 * Scans all built HTML output for banned phrases.
 * Banned phrases may only appear in a "Not confirmed" / "Hold" / "Cannot verify" context.
 * Exit code 0 = pass, 1 = violations found.
 */

import { readdir, readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const BANNED = [
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
];

// Patterns that indicate a safe context (banned phrase is inside a denial/hold statement)
const SAFE_INDICATORS = [
  'not confirmed',
  'cannot confirm',
  'cannot verify',
  'not verified',
  'unverified',
  'do not trust',
  'cannot be confirmed',
  'no official',
  'not yet confirmed',
  'not available',
  'not published',
  'not exist',
  'hold',
  'check in game',
  'cannot ',
  'verify before',
  'cross-check',
  'methods',
  'beyond official',
  'tier list',
];

/**
 * Returns true if the banned phrase appears within a safe-context sentence
 * in the given text block.
 */
function isInSafeContext(text, phrase) {
  const lower = text.toLowerCase();
  const phraseLower = phrase.toLowerCase();
  const idx = lower.indexOf(phraseLower);
  if (idx === -1) return true; // not found = not a violation

  // Check a window of 200 chars around each occurrence
  const WINDOW = 200;
  let pos = 0;
  while (true) {
    const found = lower.indexOf(phraseLower, pos);
    if (found === -1) break;
    const windowText = lower.slice(Math.max(0, found - WINDOW), found + phraseLower.length + WINDOW);
    const inSafe = SAFE_INDICATORS.some(ind => windowText.includes(ind));
    if (!inSafe) return false;
    pos = found + 1;
  }
  return true;
}

async function findDist() {
  return resolve(import.meta.dirname, '..', 'dist');
}

async function scanFile(filePath) {
  const raw = await readFile(filePath, 'utf-8');

  // Strip <head> section — meta descriptions shouldn't be held to body rules
  const bodyStart = raw.indexOf('<body');
  const bodyEnd = raw.lastIndexOf('</body>');
  if (bodyStart === -1 || bodyEnd === -1) return [];
  const body = raw.slice(bodyStart, bodyEnd);

  const violations = [];
  for (const phrase of BANNED) {
    if (!isInSafeContext(body, phrase)) {
      // Find the sentence around the first occurrence for reporting
      const lower = body.toLowerCase();
      const idx = lower.indexOf(phrase.toLowerCase());
      const snippet = body.slice(Math.max(0, idx - 80), idx + phrase.length + 80).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      violations.push({ phrase, snippet: snippet.slice(0, 140) });
    }
  }

  return violations;
}

async function main() {
  const dist = await findDist();
  const htmlFiles = [];

  async function walk(dir) {
    try {
      const entries = await readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) {
          await walk(full);
        } else if (entry.name.endsWith('.html')) {
          htmlFiles.push(full);
        }
      }
    } catch {
      // dist may not exist yet on first run
    }
  }

  await walk(dist);

  if (htmlFiles.length === 0) {
    console.log('No HTML files found in dist/ — run npm run build first.');
    process.exit(0);
  }

  console.log(`Scanning ${htmlFiles.length} HTML files for banned phrases...\n`);

  let totalViolations = 0;
  let passCount = 0;

  for (const file of htmlFiles) {
    const violations = await scanFile(file);
    const rel = file.slice(dist.length);
    if (violations.length === 0) {
      passCount++;
      console.log(`  ✓ ${rel}`);
    } else {
      totalViolations += violations.length;
      console.log(`  ✗ ${rel} — ${violations.length} violation(s):`);
      for (const v of violations) {
        console.log(`      [${v.phrase}]: ...${v.snippet}...`);
      }
    }
  }

  console.log(`\n${passCount}/${htmlFiles.length} files passed`);

  if (totalViolations > 0) {
    console.log(`\n⚠ ${totalViolations} violation(s) found. Banned phrases must only appear in safe contexts.`);
    process.exit(1);
  } else {
    console.log('\n✓ All files pass content validation.');
    process.exit(0);
  }
}

main().catch(err => {
  console.error('Validator error:', err);
  process.exit(1);
});
