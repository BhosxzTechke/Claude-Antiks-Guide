# Elementor Site From Doc

A custom Claude Skill that builds a client website from their **copy doc** as
**native Elementor JSON**, using the client's exact copy and a design that
doesn't look like a generic AI template.

Works with any Elementor-compatible theme (Hello Elementor, Astra, Kadence,
GeneratePress, OceanWP and others), Elementor Free or Pro.

---

# What It Does

- **Asks first** (one message): where to save the files, which pages to build
  and in what order, inspiration sites or screenshots, and the site's setup
  (theme, Elementor version, Free or Pro, header/footer method, form plugin).
- **Reads the whole doc**, builds a URL map, and lists the SEO title, meta
  description and H1 per page.
- **Studies inspiration** (screenshots or links), summarizes what to take in
  5–8 bullets, and waits for your confirmation. It takes the feel, never the
  design, text, images or brand.
- **Uses the copy exactly.** No rewriting, no invented stats or reviews. A copy
  audit runs after each page.
- **Designs like a senior web designer:** client brand colours and fonts,
  varied layouts, subtle motion, mobile-first (360, 390, 768, 1280 px).
- **Builds with native Elementor widgets** so the client can edit text,
  matching the site's Elementor version (Containers vs Sections/Columns, Pro
  widgets only if Pro).
- **Beginner-friendly code:** every CSS/JS/PHP block has a comment box
  explaining where it is and what it does. PHP always goes in a child theme.
- **Checks before "done":** link audit (no `#`, no 404s), copy audit, desktop
  and mobile screenshots.

---

# Output Folder

```text
<client>-elementor-build/
├── README-START-HERE.txt      ← import order + theme settings, step by step (Taglish)
├── inspiration/               ← your screenshots + the inspiration summary
├── <page-name>/
│   ├── json/
│   │   ├── 00-styles.json
│   │   ├── 01-hero.json
│   │   ├── ...                ← one JSON per section
│   │   └── <page>-full.json   ← whole page
│   ├── <PAGE>-SETUP.txt       ← SEO title, meta, H1, URL slug, classes used
│   └── previews/
│       ├── desktop.png
│       └── mobile.png
├── style-code/                ← each HTML widget's code as its own file
├── theme/                     ← child theme files (only if PHP was needed)
└── images/                    ← optimised .webp
```

Import the JSON with **Templates → Import**, or paste it into the page.

---

# Installation

## Claude Code (personal, all projects)

```text
~/.claude/skills/elementor-site-from-doc/SKILL.md
```

Windows:

```text
C:\Users\<you>\.claude\skills\elementor-site-from-doc\SKILL.md
```

## Claude app (claude.ai / desktop)

Zip the `elementor-site-from-doc` folder and upload it from your Skills
settings.

Restart Claude Code (or start a new chat) after installing.

**Recommended:** connect Google Drive (for Google Doc copy) and a local folder
(for the output files) before starting.

---

# How to Use

1. Share the copy doc: a Google Docs link, or attach the file.
2. Say what you want, for example *"build the pages from this doc"*, or type
   `/elementor-site-from-doc`.
3. Answer the Step 0 questions (folder, pages, inspiration, site setup).
   If you give the staging URL, Claude checks the theme and Elementor version
   itself (read-only).
4. Confirm the inspiration summary.
5. Review each page's previews, copy audit and link audit.
6. Follow `README-START-HERE.txt` to import into WordPress.

---

# Examples

## 1. Full site from a Google Doc

```text
Build the website from this copy doc: https://docs.google.com/document/d/...
Client: Smile Dental Cebu. Start with Home, then Services, then Contact.
Staging: https://staging.smiledentalcebu.com
```

Claude reads every tab, checks the staging site's theme and Elementor version,
asks for missing items (logo, form email), then builds Home first.

## 2. One page with inspiration screenshots

```text
Gawa ka ng About page from the attached doc.
Attached din yung 2 full-page screenshots na gusto ng client.
Hello Elementor, Elementor Pro, Contact Form 7.
```

Claude studies both screenshots, sends a short inspiration summary for you to
confirm, then builds the About page with the exact doc copy.

## 3. Landing page with inspiration links

```text
Build the "Roof Repairs Brisbane" landing page from this doc.
Inspiration: https://example-roofing.com and https://another-site.com.au
Astra theme, Elementor Free.
```

Claude opens both sites read-only (desktop and mobile), takes the feel only,
uses Sections/Columns or Containers depending on the site, and lists the Astra
settings to change (disable title and sidebar).

---

# Rules From Experience

- Anything outside the doc's scope is asked first (extra requests = separate quote).
- Claude never enters passwords; you do the logins.
- On staging, read-only unless you ask; never clicks Publish or Delete for you.
- Checks that a slug isn't already used (including drafts) before changing it.
- Before go-live: backup, untick "Discourage search engines", set the form
  email, add 301 redirects for changed URLs.

---

# Works Well With

- **blueprint-interview**: run it first for bigger sites to settle goals,
  sitemap and SEO before building.
- **client-reply**: turn your notes into a short message to the client
  (questions about missing content, review requests).
