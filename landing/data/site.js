// Everything the home page says about the systems lives here.
//
// To add a system: add one entry to PRODUCTS and run `npm run build`. The orbit,
// nav, chapter card, install tab and footer all follow from that entry.
//   - `image` / `imageAlt`: a screenshot for the chapter card, if it has no live demo.
//   - `page`: a page of its own on this site, linked from the card.
//   - `status`: a short label such as 'In development', shown next to its name.
//   - Give it its own colour with `--c-<name>` tokens and a `.t-<id>` rule in
//     css/styles.css; without one the card uses the NeoLabs gold.

'use strict';

// The production address, for the canonical link and social preview tags. The Pages
// deploy passes it as the SITE_URL environment variable, which takes priority here.
const SITE_URL = '';

const META = {
  title: 'NeoLabs: AI you actually own',
  description: 'NeoLabs builds self-hosted, open-source systems that work as one: NeoRecall hears your day, NeoAgent acts on it, NeoRouter picks the best model for every request and NeoCloud keeps your files encrypted.'
};

const PRODUCTS = [
  { id: 'neorecall', name: 'NeoRecall', short: 'hears your day', verb: 'Hears', logo: 'assets/logos/neorecall.svg',
    tagline: 'Private audio memory you host yourself.',
    body: 'Records your day anywhere and turns every conversation into one searchable memory, with the people, promises and decisions in it. Then it answers from your own day.',
    facts: [{ n: '31 MB', t: 'of speech and voice models, on your machine' }, { n: '∞', t: 'recording length, read in windows and folded into one memory' }, { n: 'Offline', t: 'capture that resumes when the server is back' }],
    repo: 'https://github.com/NeoLabs-Systems/NeoRecall', docs: 'https://neolabs-systems.github.io/NeoRecall/docs/', docsLabel: 'Docs', isRecall: true,
    cmd: 'bash <(curl -fsSL https://raw.githubusercontent.com/NeoLabs-Systems/NeoRecall/main/install.sh)',
    then: 'Then open http://localhost:4500', note: 'Also as a desktop app for macOS and Windows, or with Docker.' },
  { id: 'neoagent', name: 'NeoAgent', short: 'acts on it', verb: 'Acts', logo: 'assets/logos/neoagent.svg',
    tagline: 'The personal AI agent you host yourself.',
    body: 'Its own computer, a memory, a schedule and a voice. It keeps working after you close the tab, and you can watch it or take over at any point.',
    facts: [{ n: '42', t: 'triggers, from new mail to Home Assistant' }, { n: '24', t: 'chat channels with one shared context' }, { n: '1', t: 'private cloud computer for each account' }],
    repo: 'https://github.com/NeoLabs-Systems/NeoAgent', docs: 'https://neolabs-systems.github.io/NeoAgent/docs/', docsLabel: 'Docs', isAgent: true,
    cmd: 'bash <(curl -fsSL https://raw.githubusercontent.com/NeoLabs-Systems/NeoAgent/main/install.sh)',
    then: 'Then open http://localhost:3333', note: 'Also as a desktop app for macOS, Windows and Linux, or with Docker.' },
  { id: 'neorouter', name: 'NeoRouter', short: 'picks the best model', verb: 'Chooses', logo: 'assets/logos/neorouter.svg',
    tagline: 'Every model. One endpoint.',
    body: 'Connect free tiers, paid APIs and your own servers. Each request goes to the best model right now, and if one fails, the next one answers.',
    facts: [{ n: '80+', t: 'providers, including local Ollama' }, { n: '3', t: 'APIs: OpenAI Chat, Anthropic Messages, OpenAI Responses' }, { n: '$0', t: 'in free mode, guaranteed' }],
    repo: 'https://github.com/NeoLabs-Systems/NeoRouter', docs: 'https://neolabs-systems.github.io/NeoRouter/api/', docsLabel: 'API docs', isRouter: true,
    cmd: 'bash <(curl -fsSL https://raw.githubusercontent.com/NeoLabs-Systems/NeoRouter/main/install.sh)',
    then: 'Then open http://localhost:4600/app', note: 'Point any OpenAI or Anthropic SDK at http://localhost:4600/v1.' },
  { id: 'neocloud', name: 'NeoCloud', short: 'keeps your files', verb: 'Keeps', logo: 'assets/logos/neocloud.svg', status: 'In development', page: 'neocloud.html',
    tagline: 'Your files. Your server. Encrypted.',
    body: 'Self-hosted file storage for the whole household or team. One process, one database, and every file encrypted with its own key before it touches the disk.',
    facts: [{ n: 'AES', t: '256-bit encryption for every file at rest, in authenticated 64 KB segments' }, { n: '1', t: 'process: Node and SQLite, no PHP and no plugin store' }, { n: '4', t: 'backup targets: NAS, SFTP, S3 and WebDAV' }],
    repo: 'https://github.com/NeoLabs-Systems/NeoCloud', docs: 'https://github.com/NeoLabs-Systems/NeoCloud/blob/main/docs/getting-started.md', docsLabel: 'Docs', isCloud: true,
    cmd: 'bash <(curl -fsSL https://raw.githubusercontent.com/NeoLabs-Systems/NeoCloud/main/install.sh)',
    then: 'Then open http://localhost:3344', note: 'Back up the master key right away with neocloud keys export.' }
];

const PROVIDERS = ['Groq', 'Google Gemini', 'Cerebras', 'Mistral', 'OpenRouter', 'NVIDIA NIM', 'OpenAI', 'Anthropic', 'xAI', 'DeepSeek', 'Cohere', 'Together', 'Fireworks', 'Hugging Face', 'Cloudflare', 'Ollama', 'LM Studio'];

const THESIS = 'Most AI lives on someone else’s computer. It forgets what you said, rents you one model and sees everything you tell it. NeoLabs is built the other way around: your server, your memory, any model, and source code you can read.';
const GOLD_WORDS = ['other', 'way', 'around:'];

const WAVE = [.3,.55,.8,.42,.95,.6,.34,.74,1,.5,.28,.66,.88,.4,.7,.96,.52,.3,.62,.84,.46,.78,1,.58,.32,.7,.92,.44,.26,.6,.86,.5,.74,.98,.54,.3,.66,.82,.4,.56].map((h, i) => ({ i, h }));

const ASKS = [
  { q: 'What did I agree to this morning?', a: 'You took the boundary fix, and said you’d have it behind a flag by end of day.', cites: [{ t: '09:40', w: 'Standup · desktop microphone', k: 'Promise' }, { t: '09:52', w: 'Follow-up · desktop microphone', k: 'Decision' }] },
  { q: 'When did we decide on the smaller enclosure?', a: 'The team settled on the smaller housing at 10:14, with revised dimensions promised after lunch.', cites: [{ t: '10:14', w: 'Hardware planning · desktop microphone', k: 'Decision' }, { t: '14:30', w: 'Workshop · wearable', k: 'Promise' }] },
  { q: 'What’s still open from last week?', a: 'Three things: the segmentation window, the retry budget on weak connections, and speaker evidence.', cites: [{ t: '11:02', w: 'Planning · desktop microphone', k: 'Open' }, { t: '16:20', w: 'Workshop · wearable', k: 'Open' }] }
];

const MODELS = [
  { name: 'Muse Spark', time: '0.4 s' }, { name: 'Qwen3.6 27B', time: '0.6 s' }, { name: 'DeepSeek V4.1 Flash', time: '0.7 s' },
  { name: 'Gemma 4', time: '0.9 s' }, { name: 'GPT-OSS 120B', time: '1.3 s' },
  { name: 'GLM 5.3 Flash', busy: true }, { name: 'Nemotron 3 Ultra', busy: true }
];
const PRESETS = [
  { name: 'Fast', order: [0, 1, 2, 3, 4] }, { name: 'Smart', order: [4, 1, 2, 0, 3] }, { name: 'Reliable', order: [1, 2, 0, 3, 4] },
  { name: 'Cheapest', order: [3, 0, 1, 2, 4] }, { name: 'Best', order: [1, 4, 0, 2, 3] }
];

const STATS = [{ n: 80, suffix: '+', t: 'model providers behind one endpoint' }, { n: 42, suffix: '', t: 'triggers that wake an agent' }, { n: 24, suffix: '', t: 'chat channels, one shared context' }, { n: 0, suffix: '', t: 'prompts in NeoRouter’s logs' }];

const LEDGER = [
  { k: 'Runs on', a: 'Your hardware', b: 'The vendor’s cloud' },
  { k: 'Model', a: 'Any, local ones included', b: 'The vendor’s own' },
  { k: 'Source code', a: 'Open, AGPL-3.0', b: 'Closed' },
  { k: 'Your memory', a: 'Editable, in your database', b: 'On the vendor’s servers' },
  { k: 'Available in', a: 'Anywhere you host it', b: 'Several exclude the EU, UK or Switzerland' },
  { k: 'Price', a: 'Free, plus model costs', b: 'Free tiers, then plans up to $199 a month' }
];

// The NeoCloud page (neocloud.html).
const NC_LEVELS = [
  { n: '01', title: 'Master key', sub: 'generated once', where: 'your server',
    body: 'Created on the first start and kept in the server’s .env file. It never protects a file directly: it only wraps the account keys. Export it with neocloud keys export, because without it nothing can be read again.' },
  { n: '02', title: 'Account key', sub: 'one per person', where: 'per account',
    body: 'A random data key for every account, wrapped by the master key. Every account sees only its own files.' },
  { n: '03', title: 'File key', sub: 'one per file', where: 'per file',
    body: 'Derived for each stored file. A stolen drive or a leaked backup holds nothing but noise.' },
  { n: '04', title: '64 KB segments', sub: 'each one authenticated', where: 'AES-256-GCM',
    body: 'Files are sealed in 64 KB segments bound to their file, their position and whether they are the last one. Nothing can be altered, reordered, swapped or cut short without detection, and any byte range decrypts on its own, so a video can still be scrubbed.' },
  { n: '05', title: 'Vault folders', sub: 'end-to-end', where: 'your devices',
    body: 'For files even the running server should not read. Names and contents are encrypted on your devices with a passphrase and a recovery key the server never sees, and vaults are never indexed.' }
];

// Stroke paths in a 24 px box, one per feature.
const NC_FEATS = [
  { title: 'Files', body: 'Drag and drop, whole folders, resumable uploads, and search inside documents.', icon: 'M3.5 7.5a2 2 0 012-2h4l2 2.2h7a2 2 0 012 2V17a2 2 0 01-2 2h-13a2 2 0 01-2-2z' },
  { title: 'Versions and trash', body: 'Earlier versions are kept, deletes are recoverable, and undo works everywhere.', icon: 'M4 12a8 8 0 108-8 8.5 8.5 0 00-6 2.5L4 8.5M4 4v4.5h4.5M12 8v4.5l3 2' },
  { title: 'Viewers', body: 'Photos, PDF, Office documents, text, video and audio open in the browser.', icon: 'M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12zM12 9a3 3 0 110 6 3 3 0 010-6z' },
  { title: 'Sync', body: 'The NeoCloud Lite tray client keeps chosen folders in sync on Windows, macOS and Linux.', icon: 'M19.5 9A8 8 0 006 6.2L4 8M4.5 15A8 8 0 0018 17.8L20 16M4 4v4h4M20 20v-4h-4' },
  { title: 'Mobile', body: 'The Android app backs up your photos and lets you share to NeoCloud. Pair it by QR code.', icon: 'M8 2.5h8a1.5 1.5 0 011.5 1.5v16a1.5 1.5 0 01-1.5 1.5H8A1.5 1.5 0 016.5 20V4A1.5 1.5 0 018 2.5zM11 18.5h2' },
  { title: 'Sharing', body: 'Links with expiry, passwords and download limits, plus upload-only requests.', icon: 'M10 14a4.5 4.5 0 006.4 0l3-3a4.5 4.5 0 00-6.4-6.4l-1.2 1.2M14 10a4.5 4.5 0 00-6.4 0l-3 3a4.5 4.5 0 006.4 6.4l1.2-1.2' },
  { title: 'Backups', body: 'Encrypted and incremental, to a NAS, SFTP, S3 or WebDAV.', icon: 'M4 6.5c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6.5v11c0 1.7 3.6 3 8 3s8-1.3 8-3v-11M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3' },
  { title: 'WebDAV', body: 'Finder, Explorer, rclone, Obsidian and KeePassXC connect with app passwords.', icon: 'M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18M12 3a9 9 0 110 18 9 9 0 010-18z' },
  { title: 'From Nextcloud', body: 'One import copies files, dates and favorites over.', icon: 'M3.5 8l8.5-4.5L20.5 8v8L12 20.5 3.5 16zM3.5 8L12 12.5 20.5 8M12 12.5v8' }
];

const NC_TARGETS = [
  { name: 'NAS', where: '/mnt/backup', state: 'ok' },
  { name: 'SFTP', where: 'offsite box', state: 'ok' },
  { name: 'S3', where: 'b2 · 7 snapshots', state: 'ok' },
  { name: 'WebDAV', where: 'storage box', state: 'ok' }
];

const NC_DEVICES = [
  { os: 'Windows', title: 'In the notification area', body: 'Pick folders to keep in sync, with the NeoCloud folder in Explorer. ARM64 too.' },
  { os: 'macOS', title: 'In the menu bar', body: 'Puts your NeoCloud folder in the Finder sidebar. One app for Apple silicon and Intel.' },
  { os: 'Linux', title: 'AppImage or binary', body: 'A single AppImage with a tray icon, or the plain neocloud-lite binary for servers and scripts.' },
  { os: 'Android', title: 'In your pocket', body: 'Browse and share your files, back up the camera roll, and approve new sign-ins by scanning a QR code.' },
  { os: 'iOS', title: 'Coming soon', body: 'The same app for iPhone and iPad is on the way.', cls: 'soon' }
];

const NC_INSTALL = [
  { name: 'Docker', lines: ['curl -fsSLO https://raw.githubusercontent.com/NeoLabs-Systems/NeoCloud/main/compose.yaml', 'docker compose up -d'] },
  { name: 'Script', lines: ['bash <(curl -fsSL https://raw.githubusercontent.com/NeoLabs-Systems/NeoCloud/main/install.sh)'] }
];

const NEOCLOUD = { levels: NC_LEVELS, feats: NC_FEATS, targets: NC_TARGETS, devices: NC_DEVICES, install: NC_INSTALL };

const FACES = {
  idle: ['.........', '.........', '..##.##..', '..##.##..', '..##.##..', '.........', '.........', '.........', '.........'],
  blink: ['.........', '.........', '.........', '.........', '..##.##..', '.........', '.........', '.........', '.........'],
  done: ['.........', '.........', '..#...#..', '.#.#.#.#.', '.........', '.........', '..#...#..', '...###...', '.........']
};

module.exports = { SITE_URL, META, PRODUCTS, PROVIDERS, THESIS, GOLD_WORDS, WAVE, ASKS, MODELS, PRESETS, STATS, LEDGER, FACES, NEOCLOUD };
