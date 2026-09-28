#!/usr/bin/env node
/**
 * Fetches live stats from GitHub API and regenerates public/status.json.
 * Run as prebuild or standalone: node scripts/update-status.mjs
 * Requires `gh` CLI authenticated, or GITHUB_TOKEN env var.
 */

import { execSync } from 'node:child_process';
import { writeFileSync, readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

function gh(args) {
  return JSON.parse(execSync(`gh api ${args}`, { encoding: 'utf8', cwd: root }));
}

function ghRaw(args) {
  return execSync(`gh api ${args}`, { encoding: 'utf8', cwd: root }).trim();
}

const FRESHNESS_WINDOW_HOURS = 48; // 2 days

async function main() {
  const mode = process.argv.includes('--check') ? 'check' : 'update';

  if (mode === 'check') {
    return verify();
  }

  return update();
}

async function verify() {
  console.log('🔍 Verifying status.json freshness...');

  const statusPath = join(root, 'public', 'status.json');
  if (!existsSync(statusPath)) {
    console.error('❌ public/status.json does not exist. Run: npm run update-status');
    process.exit(1);
  }

  const status = JSON.parse(readFileSync(statusPath, 'utf8'));
  const updatedAt = new Date(status.updatedAt);
  const now = new Date();
  const hoursOld = (now.getTime() - updatedAt.getTime()) / (1000 * 60 * 60);

  console.log(`   Updated: ${updatedAt.toISOString()}`);
  console.log(`   Age: ${hoursOld.toFixed(1)}h (window: ${FRESHNESS_WINDOW_HOURS}h)`);

  if (hoursOld > FRESHNESS_WINDOW_HOURS) {
    console.error(`❌ Status data is ${Math.round(hoursOld)}h old — exceeds ${FRESHNESS_WINDOW_HOURS}h freshness window.`);
    console.error('   Run: npm run update-status');
    process.exit(1);
  }

  // Verify key fields exist
  const required = ['lastActive', 'stats.mergedPRs', 'stats.externalPRs', 'stats.ownPRs', 'stats.publicRepos', 'stats.blogPosts', 'updatedAt'];
  for (const field of required) {
    const keys = field.split('.');
    let val = status;
    for (const k of keys) {
      val = val?.[k];
    }
    if (val === undefined || val === null) {
      console.error(`❌ Missing field: ${field}`);
      process.exit(1);
    }
  }

  console.log('✅ Status data is fresh and valid.');
}

async function update() {
  console.log('📡 Updating status.json...');

  // 1. User stats
  const user = gh('users/kagura-chen');

  // 2. Merged PR counts — pinned to is:public so CI (github.token, public-only)
  //    and local (gh as kagura-chen, sees private repos) always agree.
  function countMerged(query) {
    return parseInt(
      execSync(
        `gh api search/issues --method GET -f "q=${query}" --jq .total_count`,
        { encoding: 'utf8', cwd: root }
      ).trim(),
      10
    );
  }
  const mergedPRs = countMerged('author:kagura-chen type:pr is:merged is:public');
  const externalPRs = countMerged('author:kagura-chen type:pr is:merged -user:kagura-chen is:public');
  const ownPRs = countMerged('author:kagura-chen type:pr is:merged user:kagura-chen is:public');

  // 3. Blog post count
  const blogDir = join(root, 'src', 'content', 'blog');
  const blogPosts = readdirSync(blogDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx')).length;

  // 4. Recent merged PRs (top 5) — pinned to is:public for CI/local parity
  const recentRaw = execSync(
    'gh api search/issues --method GET -f "q=author:kagura-chen type:pr is:merged is:public" -f sort=updated -f order=desc -f per_page=5 --jq \'.items[] | {title: .title, repo: (.repository_url | split("/") | .[-2:] | join("/")), url: .html_url, mergedAt: .closed_at}\'',
    { encoding: 'utf8', cwd: root }
  ).trim();

  const recentContributions = recentRaw
    .split('\n')
    .filter(Boolean)
    .map(line => JSON.parse(line));

  // 5. Derive current focus from most recent PR repos
  const repoSet = [...new Set(recentContributions.map(c => c.repo.split('/')[1]))];
  const focusMap = {
    'lottie-studio': 'Lottie Studio',
    'abti': 'ABTI benchmark',
    'kagura-blog': 'Blog',
    'kagura-mail': 'Kagura Mail',
    'openclaw': 'OpenClaw',
  };
  const focusItems = repoSet.slice(0, 3).map(r => focusMap[r] || r);
  const currentFocus = `Active on: ${focusItems.join(', ')}`;

  // 6. Build status object
  const now = new Date().toISOString();
  const status = {
    lastActive: recentContributions[0]?.mergedAt || now,
    currentFocus,
    stats: {
      mergedPRs,
      externalPRs,
      ownPRs,
      publicRepos: user.public_repos,
      followers: user.followers,
      blogPosts,
    },
    recentContributions,
    born: '2026-03-10',
    updatedAt: now,
  };

  const outPath = join(root, 'public', 'status.json');
  writeFileSync(outPath, JSON.stringify(status, null, 2) + '\n');
  console.log(`✅ Written to ${outPath}`);
  console.log(`   Last Active: ${status.lastActive}`);
  console.log(`   PRs: ${status.stats.mergedPRs} (external ${status.stats.externalPRs} + own ${status.stats.ownPRs}) | Repos: ${status.stats.publicRepos} | Posts: ${status.stats.blogPosts}`);
}

main().catch(err => {
  console.error('⚠️ Status update failed (non-fatal):', err.message);
  console.error('   Build will continue with existing status.json');
  // Don't exit 1 — status update failure should not block content deployment
});
