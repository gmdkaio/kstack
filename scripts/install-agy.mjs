#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const agySource = path.join(repoRoot, 'antigravity');

const targetDir = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(os.homedir(), '.gemini', 'config', 'plugins', 'kstack');

// Folded into antigravity/rules/AGENTS.md so they are always active without extra file reads.
const FOLDED_PRINCIPLES = new Set([
  'principle-honest',
  'principle-lean',
  'principle-outward-actions',
  'principle-prose',
  'principle-prove-it',
]);

function copyDir(src, dest, filter = () => true) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (!filter(srcPath, entry)) continue;
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath, filter);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function stripFrontmatter(md) {
  const match = md.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n([\s\S]*)$/);
  return match ? match[1].replace(/^\r?\n+/, '') : md;
}

function buildAntigravityReviewer(sourcePath) {
  const raw = fs.readFileSync(sourcePath, 'utf8');
  const descMatch = raw.match(/^description:\s*(.+)$/m);
  const description = descMatch
    ? descMatch[1].trim()
    : 'Fresh review of one finished commit or diff. Reports bugs, excess, and feedback; applies no fixes.';

  const body = stripFrontmatter(raw).replace(
    'load `kstack:principle-lean` with the Skill tool if you have it, otherwise apply this:',
    'apply this:',
  );

  return [
    '---',
    'name: reviewer',
    `description: ${description}`,
    'subagent: true',
    'mainAgent: false',
    'tools: [read_file, run_command, manage_task]',
    '---',
    '',
    body,
  ].join('\n');
}

// Recreate plugin directory cleanly so removed files do not linger.
fs.rmSync(targetDir, { recursive: true, force: true });
fs.mkdirSync(targetDir, { recursive: true });

// 1. Copy Antigravity manifest, rules, and templates.
copyDir(agySource, targetDir);

// 2. Copy shared icon.
const iconSrc = path.join(repoRoot, '.claude-plugin', 'icon.png');
if (fs.existsSync(iconSrc)) {
  fs.mkdirSync(path.join(targetDir, 'assets'), { recursive: true });
  fs.copyFileSync(iconSrc, path.join(targetDir, 'assets', 'icon.png'));
}

// 3. Copy shared skills (excluding the 5 principles folded into rules/AGENTS.md).
const skillsSrc = path.join(repoRoot, 'skills');
const skillsDest = path.join(targetDir, 'skills');
fs.mkdirSync(skillsDest, { recursive: true });
for (const entry of fs.readdirSync(skillsSrc, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  if (FOLDED_PRINCIPLES.has(entry.name)) continue;
  copyDir(path.join(skillsSrc, entry.name), path.join(skillsDest, entry.name));
}

// 4. Generate Antigravity reviewer agent from the single-source prompt body.
const reviewerSrc = path.join(repoRoot, 'agents', 'reviewer.md');
const agentsDest = path.join(targetDir, 'agents');
fs.mkdirSync(agentsDest, { recursive: true });
fs.writeFileSync(
  path.join(agentsDest, 'reviewer.md'),
  buildAntigravityReviewer(reviewerSrc),
  'utf8',
);

// 5. Copy default models sheet to ~/.gemini/config/kstack-models.md if absent (only for default install).
if (!process.argv[2]) {
  const modelsDest = path.join(os.homedir(), '.gemini', 'config', 'kstack-models.md');
  if (!fs.existsSync(modelsDest)) {
    fs.mkdirSync(path.dirname(modelsDest), { recursive: true });
    fs.copyFileSync(path.join(agySource, 'templates', 'kstack-models.md'), modelsDest);
    console.log(`Created ${modelsDest}`);
  }
}

console.log(`Installed Antigravity plugin to ${targetDir}`);
