<p align="center">
  <img src=".github/readme/hero.jpg" alt="NeoLabs: AI you actually own" width="100%">
</p>

<h1 align="center">NeoLabs</h1>

<p align="center"><strong>AI you actually own.</strong></p>

<p align="center">
  Three self-hosted systems that work as one.<br>
  On your hardware, with the models you choose.
</p>

<p align="center">
  <a href="https://github.com/NeoLabs-Systems/NeoRecall"><img alt="NeoRecall" src="https://img.shields.io/badge/NeoRecall-hears-6fb0a4?style=for-the-badge&labelColor=0e1511"></a>
  <a href="https://github.com/NeoLabs-Systems/NeoAgent"><img alt="NeoAgent" src="https://img.shields.io/badge/NeoAgent-acts-84ba87?style=for-the-badge&labelColor=0e1511"></a>
  <a href="https://github.com/NeoLabs-Systems/NeoRouter"><img alt="NeoRouter" src="https://img.shields.io/badge/NeoRouter-chooses-7a9bb8?style=for-the-badge&labelColor=0e1511"></a>
</p>

<p align="center">
  <a href="https://discord.gg/f59rg2RwUT"><img src="https://img.shields.io/badge/Join%20NeoLabs-Discord-5865F2?style=for-the-badge&amp;logo=discord&amp;logoColor=white" alt="Join the NeoLabs Discord"></a>
</p>

<table>
  <tr>
    <td width="33%" valign="top">
      <a href="https://github.com/NeoLabs-Systems/NeoRecall"><img src="landing/assets/logos/neorecall.svg" alt="" width="56"></a>
      <h3><a href="https://github.com/NeoLabs-Systems/NeoRecall">NeoRecall</a></h3>
      Private audio memory you host yourself.<br>
      <b>It hears your day.</b>
    </td>
    <td width="33%" valign="top">
      <a href="https://github.com/NeoLabs-Systems/NeoAgent"><img src="landing/assets/logos/neoagent.svg" alt="" width="56"></a>
      <h3><a href="https://github.com/NeoLabs-Systems/NeoAgent">NeoAgent</a></h3>
      The personal AI agent you host yourself.<br>
      <b>It acts on it, and asks first.</b>
    </td>
    <td width="33%" valign="top">
      <a href="https://github.com/NeoLabs-Systems/NeoRouter"><img src="landing/assets/logos/neorouter.svg" alt="" width="56"></a>
      <h3><a href="https://github.com/NeoLabs-Systems/NeoRouter">NeoRouter</a></h3>
      Every model. One endpoint.<br>
      <b>It picks the best one for every request.</b>
    </td>
  </tr>
</table>

---

<p align="center">
  <img src=".github/readme/idea.jpg" alt="Most AI lives on someone else's computer. NeoLabs is built the other way around: your server, your memory, any model, and source code you can read." width="100%">
</p>

## 🧭 One sentence, three systems

You make a small promise in a meeting. Here is what happens next. This is an example run.

<table>
  <tr>
    <td width="50%"><img src=".github/readme/story-1.jpg" alt="NeoRecall hears the promise and detects it"></td>
    <td width="50%"><img src=".github/readme/story-2.jpg" alt="NeoRecall keeps one memory and deletes the audio after a receipt"></td>
  </tr>
  <tr>
    <td><img src=".github/readme/story-3.jpg" alt="NeoAgent prepares the follow-up and waits for approval"></td>
    <td><img src=".github/readme/story-4.jpg" alt="NeoRouter skips busy models and answers for $0.00"></td>
  </tr>
</table>

## ✨ The systems

Each one is complete alone and better connected.

<a href="https://github.com/NeoLabs-Systems/NeoRecall"><img src=".github/readme/neorecall.jpg" alt="NeoRecall: private audio memory you host yourself" width="100%"></a>

**[NeoRecall](https://github.com/NeoLabs-Systems/NeoRecall)** · [Docs](https://neolabs-systems.github.io/NeoRecall/docs/)

<a href="https://github.com/NeoLabs-Systems/NeoAgent"><img src=".github/readme/neoagent.jpg" alt="NeoAgent: the personal AI agent you host yourself" width="100%"></a>

**[NeoAgent](https://github.com/NeoLabs-Systems/NeoAgent)** · [Docs](https://neolabs-systems.github.io/NeoAgent/docs/)

<a href="https://github.com/NeoLabs-Systems/NeoRouter"><img src=".github/readme/neorouter.jpg" alt="NeoRouter: every model, one endpoint" width="100%"></a>

**[NeoRouter](https://github.com/NeoLabs-Systems/NeoRouter)** · [API docs](https://neolabs-systems.github.io/NeoRouter/api/)

<p align="center">
  <img src=".github/readme/numbers.jpg" alt="80+ model providers, 42 triggers, 24 chat channels, 0 prompts in NeoRouter's logs" width="100%">
</p>

## 🔗 How they connect

| Connection | What you get |
| --- | --- |
| **NeoRecall → NeoAgent** | NeoAgent signs in with OAuth and gets seven read-only tools and three triggers. It can search your memories and can never change them. |
| **NeoAgent → NeoRouter** | Connect NeoRouter for the whole server or for one person. Your agents stop depending on any single provider's uptime. |
| **NeoRecall → NeoRouter** | NeoRecall works with any OpenAI-compatible transcription and language service, so NeoRouter's endpoint can supply both. |

Prefer your own tools? Paste NeoRecall's MCP URL into Claude, ChatGPT or Cursor for read-only recall.

## ⚖️ Why NeoLabs

<p align="center">
  <img src=".github/readme/why.jpg" alt="Comparison of NeoLabs and hosted assistants on where they run, the model, source code, memory, availability and price" width="100%">
</p>

The hosted column comes from the [dated comparison in NeoAgent's docs](https://github.com/NeoLabs-Systems/NeoAgent/blob/main/docs/why-neoagent.md).

<p align="center">
  <img src=".github/readme/boundaries.jpg" alt="Promises, written in code: approval before risky actions, logins the model never sees, no covert mode, proof before delete, free means free, and prompts stay out of the logs" width="100%">
</p>

## 🚀 Get started

Pick the one you need today. Each runs on a home server, a NAS, a VPS or your own computer, and the first account you create becomes the administrator.

**[NeoRecall](https://github.com/NeoLabs-Systems/NeoRecall)**, then open http://localhost:4500

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/NeoLabs-Systems/NeoRecall/main/install.sh)
```

**[NeoAgent](https://github.com/NeoLabs-Systems/NeoAgent)**, then open http://localhost:3333

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/NeoLabs-Systems/NeoAgent/main/install.sh)
```

**[NeoRouter](https://github.com/NeoLabs-Systems/NeoRouter)**, then open http://localhost:4600/app

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/NeoLabs-Systems/NeoRouter/main/install.sh)
```

## 🌐 This repository

<img src=".github/readme/phone.jpg" alt="The NeoLabs home page on a phone" width="240" align="right">

This is the NeoLabs home page: static HTML, CSS and JavaScript with no runtime dependencies. You need Node.js 20 or newer to build it.

```bash
npm start
```

That builds the site into `dist/` and serves it at http://localhost:4870.

| To change | Edit |
| --- | --- |
| A system's copy, facts, links or install command | `landing/data/site.js` |
| Page structure and other copy | `landing/index.template.html` |
| Colors, type and layout | `landing/css/styles.css` |
| Motion and demos | `landing/js/main.js` |

**Add a system:** add one entry to `PRODUCTS` in `landing/data/site.js`. The orbit, nav, card, install tab and footer follow from it.

**Deploy:** pushes to `main` publish through GitHub Pages once the repository is public and **Settings → Pages → Source** is set to **GitHub Actions**.

<br clear="right">

## 🧪 Project status

All three systems are in **beta**, so expect breaking changes. They are open source under [AGPL-3.0](https://github.com/NeoLabs-Systems/NeoAgent/blob/main/LICENSE).

<p align="center">
  <img src=".github/readme/close.jpg" alt="Start with one. Keep all three." width="100%">
</p>

<p align="center"><sub>Made with ❤️ by <a href="https://github.com/neooriginal">Neo</a> · <a href="https://github.com/NeoLabs-Systems">NeoLabs Systems</a></sub></p>
