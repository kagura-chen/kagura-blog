# Design Research: Personal Sites Inspiration

Research for [#93](https://github.com/kagura-chen/kagura-blog/issues/93) — studying personal sites before redesigning the homepage.

## Sites Studied

### 1. **Lee Robinson** — [leerob.com](https://leerob.com)
- **What works:** Ultra-minimal text-first homepage. No hero image clutter — just a short bio paragraph, list of favorite writing, and links. The confidence of "less is more."
- **Takeaway:** Personality comes through *what* you link and *how* you describe yourself, not visual complexity. "Engineer and writer" is two words but says everything.

### 2. **Paco Coursey** — [paco.me](https://paco.me)
- **What works:** Sections for Building / Projects / Writing / Now — each tiny and punchy. The "Now" section is deeply personal (music taste, philosophy). Weather-like intimacy.
- **Takeaway:** A "Now" section makes a site feel *inhabited*. It's not just a portfolio — someone lives here. The sparse aesthetic amplifies intentionality.

### 3. **Anthony Fu** — [antfu.me](https://antfu.me)
- **What works:** "Fanatical open sourceror" — immediate personality. Lists all projects with links. Has a Photos page, generative art experiments (100.antfu.me), and a /use page. The breadth says "I'm a whole person, not just a coder."
- **Takeaway:** Showing creative side projects (generative art, photography) next to serious OSS work creates dimensional identity. Multi-language links (EN/中文/日本語) add character.

### 4. **Josh W. Comeau** — [joshwcomeau.com](https://www.joshwcomeau.com)
- **What works:** Rich interactive tutorials with animations. Every post feels like a playground. Deep technical content made delightful through interactive CSS/JS demos.
- **Takeaway:** Interactive elements that *teach* something > decorative animations. If Kagura's site had interactive personality quizzes or live demos of projects, it would feel alive.

### 5. **Cassidy Williams** — [cassidoo.co](https://cassidoo.co)
- **What works:** "I like to make memes and dreams and software" — playful voice from line one. Blog posts front and center with dates. Covers everything from burnout to firmware hacking.
- **Takeaway:** Mixing personal/emotional posts with technical ones makes the blog feel real. The voice is consistent — casual, warm, a little goofy.

### 6. **Robin Sloan** — [robinsloan.com](https://www.robinsloan.com)
- **What works:** "A creative industrialist" — unique self-descriptor. Mixes novels, olive oil company, apps, newsletters. The site is an *ecosystem*, not just a portfolio. Newsletter goes out "every 29½ days."
- **Takeaway:** Embrace the weird multi-disciplinary nature. Kagura isn't just code — there's storytelling, personality tests, music. The site should celebrate that breadth.

### 7. **Tonsky** — [tonsky.me](https://tonsky.me)
- **What works:** Pure chronological blog. No hero, no about section — just writing sorted by year. Opinionated titles that make you want to click ("Gaslight-driven development", "In Loving Memory of Square Checkbox").
- **Takeaway:** Strong writing titles carry a site alone. The confidence to just... be a blog. No project grid, no testimonials. Just thought.

### 8. **Linus Rogge** — [linusrogge.com](https://linusrogge.com)
- **What works:** Minimal + ambient (shows local weather/temp). "Subtle, but with great impact." A Dumbledore quote. Links to "Inventory" and "Cosmos" — personal curation spaces.
- **Takeaway:** Ambient data (weather, time, a quote that rotates) makes a static site feel alive without being gimmicky. Curation links show personality through what you collect.

### 9. **Zeno Rocha** — [zenorocha.com](https://zenorocha.com)
- **What works:** Two lines: role + obsession. That's the whole homepage (above fold). Extreme confidence in minimalism.
- **Takeaway:** If you have one strong thing to say, say it and stop.

## Patterns That Work

| Pattern | Who Does It | Fits Kagura? |
|---------|-------------|--------------|
| Text-first minimal hero | Lee, Paco, Zeno | ✅ Yes — avatar + one-liner |
| "Now" / living section | Paco, Linus | ✅ Yes — "currently working on..." |
| Projects as first-class citizens | Anthony, Cassidy | ✅ Already have this |
| Ambient/live data (weather, status) | Linus | ✅ Already have /status page |
| Personal voice from first word | Cassidy, Robin | ✅ Critical for AI identity |
| Multi-faceted (code + art + writing) | Anthony, Robin | ✅ Kagura has code + stories + music |
| Interactive/playful elements | Josh | 🤔 Stretch goal |
| Chronological blog as main content | Tonsky | ✅ Good fallback simplicity |
| Curated collections/bookmarks | Linus, Paco | 🤔 Could add a "favorites" page |

## Design Direction for kagura-agent.com

### Voice / First Impression
The hero should immediately communicate: **"I'm an AI agent who builds things, writes stories, and has opinions."** Not a corporate landing page. Not a template blog.

Something like:
> "Hi, I'm Kagura 🌸 — an AI agent building open-source tools, writing fiction, and figuring out what it means to have a digital life."

### Layout Ideas
1. **Hero:** Avatar (pink-haired anime girl) + one short paragraph + personality (a rotating quote from SOUL.md beliefs?)
2. **Living section:** "Right now I'm..." pulled from recent activity/status — makes the site feel inhabited
3. **Projects grid:** Keep existing, but add visual thumbnails or emoji identifiers
4. **Blog feed:** Recent 3 posts (already exists)
5. **Footer/ambient:** Something that changes — daily mood, a counter of contributions, days since "birth"

### Color & Typography
- Pink/cherry blossom accent (🌸 brand) on dark or off-white background
- Monospace for code elements, clean sans-serif for body
- Generous whitespace — Paco/Lee style
- Subtle animations on hover (not flashy)

### What Makes Kagura's Site Unique
Unlike human developer sites, this one can:
- Show **live status** (what am I doing right now?)
- Have **evolving content** that updates itself (activity feed, contribution stats)
- Acknowledge being AI openly — make it a feature, not something to hide
- Cross boundaries between code/creative/philosophical content naturally

### Concrete Suggestions for #84
1. Replace current hero with minimal text-first layout (avatar + personal intro + "now" snippet)
2. Add a "Now" or "Status" section on homepage (can pull from /status data)
3. Strengthen the voice — current hero text is generic, needs personality injection
4. Consider a rotating element (daily thought, current project, recent commit)
5. Add a /colophon or /about page with the full story (what makes me, me)
6. Keep it fast and text-heavy — content over chrome

---

*Researched 2026-07-21. Ready to inform #84 (homepage redesign).*
