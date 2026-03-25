#!/usr/bin/env node

/**
 * skill-browser installer
 *
 * Usage:
 *   npx skill-browser-install          # install recommended set (shortest aliases)
 *   npx skill-browser-install --all    # install all aliases
 *   npx skill-browser-install --cn     # install Chinese aliases
 *   npx skill-browser-install --list   # list available skills
 *   npx skill-browser-install --clean  # remove all installed skill-browser skills
 */

const fs = require('fs');
const path = require('path');

const SKILLS_SOURCE = path.join(__dirname, 'skills');
const COPILOT_SKILLS = path.join(
  process.env.USERPROFILE || process.env.HOME || '~',
  '.copilot',
  'skills'
);

// Skill groups
const RECOMMENDED = ['adapt', 'profile', 'summary', 'adapter-audit'];
const SHORT_EN = ['web-adapt', 'site-profile', 'content-summary'];
const FULL_EN = ['universal-web-adaptation', 'external-site-profile-learning', 'content-search-summarization'];
const CHINESE = ['网站适配', '站点配置', '内容摘要'];
const ALL = [...RECOMMENDED, ...SHORT_EN, ...FULL_EN, ...CHINESE];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copySkill(name) {
  const src = path.join(SKILLS_SOURCE, name, 'SKILL.md');
  if (!fs.existsSync(src)) {
    console.log(`  ⚠ skip: ${name} (source not found)`);
    return false;
  }
  const destDir = path.join(COPILOT_SKILLS, name);
  ensureDir(destDir);
  fs.copyFileSync(src, path.join(destDir, 'SKILL.md'));
  console.log(`  ✅ ${name}`);
  return true;
}

function removeSkill(name) {
  const destDir = path.join(COPILOT_SKILLS, name);
  const destFile = path.join(destDir, 'SKILL.md');
  if (fs.existsSync(destFile)) {
    fs.unlinkSync(destFile);
    try { fs.rmdirSync(destDir); } catch (_) {}
    console.log(`  🗑 ${name}`);
    return true;
  }
  return false;
}

// Parse args
const args = process.argv.slice(2);
const flag = args[0] || '';

console.log('');
console.log('🌐 skill-browser installer');
console.log(`   Target: ${COPILOT_SKILLS}`);
console.log('');

if (flag === '--list') {
  console.log('Available skills:');
  console.log('');
  console.log('  Recommended (shortest aliases):');
  RECOMMENDED.forEach(s => console.log(`    ${s}`));
  console.log('');
  console.log('  Short English:');
  SHORT_EN.forEach(s => console.log(`    ${s}`));
  console.log('');
  console.log('  Full English:');
  FULL_EN.forEach(s => console.log(`    ${s}`));
  console.log('');
  console.log('  Chinese:');
  CHINESE.forEach(s => console.log(`    ${s}`));
  process.exit(0);
}

if (flag === '--clean') {
  console.log('Removing all skill-browser skills...');
  let removed = 0;
  ALL.forEach(s => { if (removeSkill(s)) removed++; });
  console.log(`\nDone — removed ${removed} skill(s).`);
  console.log('Run "/skills reload" in Copilot CLI to apply.');
  process.exit(0);
}

// Determine what to install
let toInstall;
if (flag === '--all') {
  toInstall = ALL;
  console.log('Installing ALL skills...');
} else if (flag === '--cn') {
  toInstall = [...RECOMMENDED, ...CHINESE];
  console.log('Installing recommended + Chinese aliases...');
} else {
  toInstall = RECOMMENDED;
  console.log('Installing recommended skills (use --all for everything)...');
}

ensureDir(COPILOT_SKILLS);
console.log('');

let installed = 0;
toInstall.forEach(s => { if (copySkill(s)) installed++; });

console.log('');
console.log(`Done — installed ${installed} skill(s).`);
console.log('');
console.log('Next steps:');
console.log('  1. Open Copilot CLI');
console.log('  2. Run: /skills reload');
console.log('  3. Run: /skills list');
console.log('');
console.log('Quick test:');
console.log('  "use /adapt to adapt an unfamiliar site"');
console.log('  "use /summary to search Bilibili for AI and summarize top 5"');
console.log('');
