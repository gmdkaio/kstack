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

function installPlugin(dir) {
  // Recreate plugin directory cleanly so removed files do not linger.
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });

  // 1. Copy Antigravity manifest, rules, and templates.
  copyDir(agySource, dir);

  // 2. Copy shared icon.
  const iconSrc = path.join(repoRoot, '.claude-plugin', 'icon.png');
  if (fs.existsSync(iconSrc)) {
    fs.mkdirSync(path.join(dir, 'assets'), { recursive: true });
    fs.copyFileSync(iconSrc, path.join(dir, 'assets', 'icon.png'));
  }

  // 3. Copy shared skills (excluding the 5 principles folded into rules/AGENTS.md).
  const skillsSrc = path.join(repoRoot, 'skills');
  const skillsDest = path.join(dir, 'skills');
  fs.mkdirSync(skillsDest, { recursive: true });
  for (const entry of fs.readdirSync(skillsSrc, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    if (FOLDED_PRINCIPLES.has(entry.name)) continue;
    copyDir(path.join(skillsSrc, entry.name), path.join(skillsDest, entry.name));
  }

  // 4. Generate Antigravity reviewer agent from the single-source prompt body.
  const agentsDest = path.join(dir, 'agents');
  fs.mkdirSync(agentsDest, { recursive: true });
  fs.writeFileSync(
    path.join(agentsDest, 'reviewer.md'),
    buildAntigravityReviewer(path.join(repoRoot, 'agents', 'reviewer.md')),
    'utf8',
  );

  console.log(`Installed Antigravity plugin to ${dir}`);
}

installPlugin(targetDir);

if (!process.argv[2]) {
  // 5. Copy default models sheet to ~/.gemini/config/kstack-models.md if absent.
  const modelsDest = path.join(os.homedir(), '.gemini', 'config', 'kstack-models.md');
  if (!fs.existsSync(modelsDest)) {
    fs.mkdirSync(path.dirname(modelsDest), { recursive: true });
    fs.copyFileSync(path.join(agySource, 'templates', 'kstack-models.md'), modelsDest);
    console.log(`Created ${modelsDest}`);
  }

  // 6. T3 Code runs its own Antigravity with a separate home per install. It copies
  // ~/.gemini/GEMINI.md there but not plugins, and has no Customizations page, so
  // install, enable, and copy the models sheet into each home directly.
  const t3Root = path.join(os.homedir(), '.t3', 'userdata', 'providers', 'antigravity');
  const t3Homes = fs.existsSync(t3Root)
    ? fs.readdirSync(t3Root, { withFileTypes: true }).filter((e) => e.isDirectory())
    : [];
  for (const home of t3Homes) {
    const configDir = path.join(t3Root, home.name, 'config');
    installPlugin(path.join(configDir, 'plugins', 'kstack'));

    const configPath = path.join(configDir, 'config.json');
    const config = fs.existsSync(configPath) ? JSON.parse(fs.readFileSync(configPath, 'utf8')) : {};
    config.plugins = { ...config.plugins, kstack: { enabled: true } };
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n');

    const t3Models = path.join(configDir, 'kstack-models.md');
    if (!fs.existsSync(t3Models)) fs.copyFileSync(modelsDest, t3Models);
  }
}
