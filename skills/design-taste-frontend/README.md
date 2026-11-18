# Design Taste Frontend

Skill na nagtuturo kay Claude ng **design taste**: layout, fonts, colors, spacing at motion, para hindi "generic AI" ang itsura ng UI. Ginawa ni Leonxlnx. Version na tested: **tasteskill 2.5.1**.

Official repo: https://github.com/Leonxlnx/taste-skill

> Tested sa **Mkeni Spec** practice app (Next.js, Tailwind v4, Windows, Claude Code sa editor).

---

## Ano ang "taste skill"?

Ang skill ay folder na may `SKILL.md` (mga rules) at minsan may `references/`, `assets/` at `scripts/`. Binabasa ni Claude ang maikling description sa taas ng `SKILL.md`. Kapag tumugma ang request mo (halimbawa "redesign this page"), saka niya ilo-load ang buong skill.

Ang **taste skill** ay skill na puno ng design rules, kaya pare-pareho at maganda ang output, hindi random.

---

## Mahalaga: para sa WEBSITE ito, hindi para sa maliit na APP

Sinasabi sa description ng skill na gumagawa ito ng landing pages, company sites, product, shop, SaaS at game sites. Maraming rules nito ay pang-marketing page: photos sa bawat screen, isang section bawat screen, 60 hanggang 80 words bawat screen, hero entrance.

| Project | Paano gamitin |
|---|---|
| **Website** (landing page, company site, shop) | Buong skill. Walang kailangang sabihin. |
| **App** (notes app, dashboard, tool) | Sabihin kay Claude na **app** ito. Kunin lang ang palette, fonts, spacing, radius, hover at focus. **Laktawan** ang hero, photos, sections, scenes at effects. |

> ⚠️ Kapag hindi mo sinabi na app ito, baka gawing landing page ni Claude ang app mo.

---

# PART 1: Install

### Requirements

- Node 22 pataas
- Chrome, Edge o Chromium (ginagamit ng mga checker scripts sa headless browser)

```powershell
node -v
```

### I-install

Mula sa **project root**:

```powershell
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"
```

May itatanong na **"Which agents do you want to install to?"** (maraming listahan, halos 79). Piliin ang **Claude Code** lang. Kung isa lang ang nakita sa tutorial mo na maraming skills, ibig sabihin lumang bersyon iyon. Sa bago, **1 skill na lang** ang repo, at kasama na rito ang redesign.

### Ano ang makikita mo pagkatapos

```text
.agents/skills/design-taste-frontend/   ← ang totoong files
.claude/skills/design-taste-frontend    ← link papunta sa .agents
skills-lock.json                        ← nagpapaalala ng eksaktong version
```

| Folder sa loob ng skill | Laman |
|---|---|
| `SKILL.md` | Ang mga rules |
| `references/` | Copy, layout, motion, sections |
| `assets/` | Starter page at CSS system |
| `scripts/` | Mga checker, kasama ang `gate.mjs` |

### I-commit

```powershell
git add .agents .claude/skills skills-lock.json
git commit -m "chore: add design-taste-frontend skill"
```

> 💡 Malaki ang `.agents/` (mga 3,100 files). Kung ayaw mong i-commit lahat, i-commit lang ang `skills-lock.json`. Pwede mo itong i-install ulit gamit ang lock file.

> 💡 Kung gusto mo ang lumang v1: `--skill "design-taste-frontend-v1"`. Pero ang bago ang inirerekomenda.

---

# PART 2: Redesign ng existing app (hakbang-hakbang)

### Bago magsimula

1. **I-commit muna ang trabaho mo**, tapos gumawa ng branch:
   ```powershell
   git switch -c redesign
   ```
   **Bakit?** Kung hindi mo gusto ang resulta, `git switch main` lang at walang nawala.
2. Basahin ang `constitution.md` (Spec Kit). Kung may UI o accessibility rules doon, susundin ng redesign.
3. **Itsura lang ang babaguhin.** Hindi ang behavior. Mananatiling totoo ang specs mo.

### Step 1: Humingi ng PLAN, hindi code

Magbukas ng **bagong** Claude chat (huwag ihalo sa Spec Kit session) at i-paste:

```text
Use the design-taste-frontend skill. This is an app, not a landing page. Redesign only the look of app/page.tsx and app/globals.css. Don't change behavior or app/notes.ts. Skip heroes, photos and sections. First give me a design plan: mood, palette, fonts, radius, and what changes on the screen. No code yet.
```

**Bakit plan muna?** Mas mura ang magbago ng plano kaysa magbago ng code.

### Step 2: Basahin at mag-react

Sabihin kung ano ang gusto mo. Kung hindi ka sigurado, humingi ng **2 options** (halimbawa calm at minimal vs warm at friendly).

### Step 3: Aprubahan at ipa-build

```text
Looks good. Build option A. Fix the Arial font bug in globals.css. Group notes by Today, Tomorrow, This week, Later. Add hover and focus states. Make light and dark mode work.
```

### Step 4: Ikaw mismo ang mag-check

```powershell
npm run dev
```

Buksan ang http://localhost:3000. Tingnan sa **phone width** at **desktop width**, **light** at **dark** mode. Tapos:

```powershell
npm run lint
npx tsc --noEmit
```

### Step 5: Review pass

```text
Review the result against the skill's rules. List what still looks generic or inconsistent, then fix only that.
```

### Step 6: Commit

Maliit na commit, malinaw na message. Kapag hindi mo nagustuhan: `git switch main`.

---

## Mga halimbawang problema na hinuhuli nito (Mkeni)

Ito ang nakita bago ang redesign. Magagamit mo itong gabay sa sarili mong app:

- Naka-set ang `body` sa **Arial** sa `globals.css`, kaya hindi nagagamit ang Geist font na na-load sa `layout.tsx`. Totoong bug ito.
- Puro default na kulay abo: manipis na borders, maliliit na rounded boxes, walang hierarchy.
- Maliit ang title, pare-pareho ang itsura ng form at list.
- Walang accent color.
- Isang flat list lang, walang "Today" o "Tomorrow".
- Walang nakikitang focus style, walang hover o press feel.

---

# Mga dapat bantayan

| Bagay | Paliwanag |
|---|---|
| **Ang gate hook** | May Stop hook na tumatakbo ang `gate.mjs` kapag natapos si Claude. Pwedeng mabagal (timeout 10 minuto) at kailangan ng Chrome. Maaaring magreklamo sa mga rules na pang-website lang. Hindi ko pa ito natatakbo sa Mkeni. Kung humarang, sabihin kay Claude na app ito. |
| **Design system ng repo ang nauuna** | Kung may design system na ang project, sabihin: "improve taste inside it, don't replace it". |
| **Nagbabago ang version** | Ang `skills-lock.json` ang nagpapanatili ng kopya mo. I-install ulit lang kung gusto mo ng bago. |
| **Malaki ang SKILL.md** | Maraming reference files ang nilo-load. Sa mahabang session, pwedeng bumagal at tumaas ang gastos. |
| **Tiwala** | Ang skill ay kayang magpatakbo ng scripts at mag-edit ng files. Basahin ang `SKILL.md` at ang `scripts/` bago mag-install ng skill mula sa GitHub. |

---

# Checklist para sa kahit anong project

1. I-install ang skill, i-commit.
2. Bagong branch.
3. Sumulat ng isang talatang brief: ano, para kanino, isang main action, anong stack.
4. Sabihin kung **website** o **app**.
5. Humingi ng plan muna, aprubahan.
6. I-build, tapos patakbuhin at tingnan sa phone at desktop.
7. Lint at typecheck.
8. Review pass laban sa skill.
9. Commit.

---

# Katabi ng ibang skills sa repo na ito

- [`frontend-design`](../frontend-design/README.md): visual direction para sa bagong UI.
- [`impeccable`](../impeccable/README.md): critique at polish ng existing UI.
- `design-taste-frontend` (ito): anti-generic na design rules at redesign. Gamitin ito **o** ang `frontend-design` para sa direction. Hindi mo kailangang pagsabayin lahat sa isang gawain.
