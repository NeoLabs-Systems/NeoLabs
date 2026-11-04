// Everything the home page says about the systems lives here.
//
// To add a system: add one entry to PRODUCTS and run `npm run build`. The orbit,
// nav, chapter card, install tab and footer all follow from that entry.
//   - `image` / `imageAlt`: a screenshot for the chapter card, if it has no live demo.
//   - Give it its own colour with `--c-<name>` tokens and a `.t-<id>` rule in
//     css/styles.css; without one the card uses the NeoLabs gold.

'use strict';

// The production address, for the canonical link and social preview tags. The Pages
// deploy passes it as the SITE_URL environment variable, which takes priority here.
const SITE_URL = '';

const META = {
  title: 'NeoLabs: AI you actually own',
  description: 'NeoLabs builds three self-hosted, open-source AI systems that work as one: NeoRecall hears your day, NeoAgent acts on it, NeoRouter picks the best model for every request.'
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
    then: 'Then open http://localhost:4600/app', note: 'Point any OpenAI or Anthropic SDK at http://localhost:4600/v1.' }
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

const FACES = {
  idle: ['.........', '.........', '..##.##..', '..##.##..', '..##.##..', '.........', '.........', '.........', '.........'],
  blink: ['.........', '.........', '.........', '.........', '..##.##..', '.........', '.........', '.........', '.........'],
  done: ['.........', '.........', '..#...#..', '.#.#.#.#.', '.........', '.........', '..#...#..', '...###...', '.........']
};

module.exports = { SITE_URL, META, PRODUCTS, PROVIDERS, THESIS, GOLD_WORDS, WAVE, ASKS, MODELS, PRESETS, STATS, LEDGER, FACES };
