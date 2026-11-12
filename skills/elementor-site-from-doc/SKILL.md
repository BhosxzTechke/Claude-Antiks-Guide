---
name: "elementor-site-from-doc"
description: "Build a client website from their copy doc as native Elementor JSON (exact copy, non-template design). Use when Dan shares or attaches a website copy doc and asks to build pages."
---

# Build an Elementor website from the client's copy doc

Dan is a freelance WordPress/Elementor developer in the Philippines. Talk to him in short, simple Taglish. He is still learning, so explain steps like to a beginner.

## Step 0: Ask first (one message, before any building)

1. **Where to save the files?** Ask: "Saang folder ko ilalagay?" Offer to create one: `<client-name>-elementor-build/` inside his connected folder. Do not start until he answers (or use that default if he says "ikaw na").
2. **Which pages to build now**, and the order.
3. **Inspiration:** "May inspiration websites ba na gusto ng client?" Dan can send **full-page screenshots** or **website links** (or both). If none, say you'll design from the brand and the doc, and continue.
4. **The site's setup.** If Dan gives the site or staging URL, check it yourself (read-only) before asking: theme name, Elementor version, Free or Pro, header/footer plugin, form plugin. Otherwise ask:
   - WordPress theme (Astra, Hello Elementor, Kadence, GeneratePress, OceanWP, a block theme, or other)
   - Elementor **Free or Pro**, and the Elementor version
   - How the header/footer is made (Elementor Pro Theme Builder, a plugin like "Header Footer Elementor", or the theme's own header)
   - Form plugin (Contact Form 7, WPForms, Elementor Pro Form, etc.)
5. Anything missing from the doc: logo, brand colours/fonts, images, real URLs, form email.

## Step 1: Read the doc fully

- Read every tab/section of the doc (Google Doc via Drive, or the attached file). Do not skim.
- If there are two versions of the same page (e.g. "Main" vs "Brief"), ask which one to use.
- Make a **URL map** from the doc (every page's URL). Use it for every link. Never use `#` or placeholder links; if a URL is missing, list it as a question.
- Check the live site for URLs that already exist; changed URLs need a 301 redirect later.
- List the SEO title, meta description and H1 per page for the setup notes.

## Step 2: Study the inspiration (if any)

- **Screenshots:** look at every screenshot fully (top to bottom).
- **Links:** open each site read-only in the browser; look at desktop and mobile, scroll the whole page.
- Write Dan a short summary (5–8 bullets) of what to take from them: overall feel (bold / minimal / premium / friendly), layout patterns, typography style, spacing, how images and cards are used, motion, how CTAs look. Ask him to confirm before building.
- **Take the feel, not the design.** Never copy their exact layout section-for-section, their text, images, logos, icons or brand colours. The site must still use the client's own copy and brand and look like its own design.

## Step 3: Copy rules (strict)

- Use the doc copy **exactly**. Do not add, rewrite, shorten or paraphrase any text.
- Do not invent stats, reviews, client names, badges or claims. If the design needs text the doc doesn't have, leave it out or ask.
- Developer notes in the doc are instructions, not page text.
- After building each page, run a **copy audit**: compare every text string on the page against the doc and report anything that doesn't match.

## Step 4: Design rules (no AI-template look)

Act as a senior web designer. The site must not look like a generic AI template.

- Follow the confirmed inspiration summary from Step 2 (if there is one).
- Use the client's brand colours and fonts. No random purple/blue gradients, no emoji icons, no glassmorphism by default.
- Vary the layouts: not every section is centred heading + 3 cards. Use asymmetric splits, editorial headings, real numbers/visuals from the doc, alternating backgrounds.
- Subtle premium motion only (reveal on scroll, small hover lifts). Respect `prefers-reduced-motion`.
- Mobile-first: check 360, 390, 768 and 1280 px. No horizontal scroll, buttons never cut off text.
- Take screenshots of each page (desktop + mobile) and look at them before delivering. Fix anything that looks off.

## Step 5: Build rules (Elementor, any theme)

- Use **native Elementor widgets** (Container, Heading, Text Editor, Button, Image, Icon List, Icon Box, Divider) so the client can edit text in the editor.
- **Match the site's Elementor version:** use Flexbox Containers only if the site has them enabled; on older sites use Sections/Columns. Use Pro-only widgets (Form, Posts, Loop, Theme Builder) only if the site has Pro.
- Use an **HTML widget only when necessary**: effects Elementor Free can't do, carousels, custom visuals, forms styling.
- Give widgets CSS classes in Advanced > CSS Classes; put page CSS in one HTML widget at the top of the page ("Page styles").
- **Theme-agnostic:** don't rely on one theme's classes. Set page layout to "Elementor Full Width" / "Canvas" (or the theme's full-width option) and override the theme's default styles inside our own classes only. Note any theme-specific setting Dan must change (e.g. Astra: disable title + sidebar; Kadence/GeneratePress: full-width, no title; Hello Elementor: nothing extra).
- If the theme is **not compatible with Elementor** (e.g. Divi, a page builder theme), stop and tell Dan before building.
- **PHP / theme files** (custom templates, dynamic pages, blog templates): always in a **child theme** of whatever theme the site uses. Create the child theme if it doesn't exist; never edit the parent theme.
- All custom CSS/JS/PHP must be **readable for a beginner**: spaces between blocks, and a comment box above each part:
  ```
  /* ==========================================
     WHERE: Hero section
     WHAT IT DOES: dotted background + spacing
     ========================================== */
  ```
  Label every `@media` block (e.g. "ONLY ON PHONES").
- Known fixes to include:
  - Elementor container `::before` can show a grey oval: `border:0!important`.
  - Remove the theme's underline on buttons.
  - Contact Form 7 submit buttons can't wrap text: on phones allow `white-space:normal; height:auto`.
  - External links (calendar, PDFs) open in a new tab.

## Step 6: Output (in the agreed folder)

```
<client>-elementor-build/
  README-START-HERE.txt      (order of import, Taglish, step by step, theme settings to change)
  inspiration/               (Dan's screenshots + the inspiration summary)
  <page-name>/
    json/00-styles.json, 01-hero.json, ...   (one JSON per section)
    json/<page>-full.json                   (whole page)
    <PAGE>-SETUP.txt                         (SEO title, meta, H1, URL slug, classes used)
    previews/desktop.png, mobile.png
  style-code/                                (each HTML widget's code as a separate file)
  theme/                                     (child theme files, only if PHP was needed)
  images/                                    (optimised .webp)
```

- JSON must be valid Elementor export format for the site's version (import via Templates > Import, or paste into the page).
- Copy the finished files to Dan's folder and tell him the exact path.

## Step 7: Before saying "done"

- Link audit: every link matches the URL map, no `#`, no 404s.
- Copy audit passed.
- Desktop + mobile screenshots checked.
- Short summary for Dan: what was built, where the files are, what he needs to do next, and any questions for the client.

## Rules from experience

- Ask before anything outside the doc's scope; extra requests get a separate quote.
- Never enter passwords; Dan does logins himself.
- On staging: read-only checks unless Dan asks; never click Publish/Delete for him.
- Before changing a slug, check no other page (including drafts) already uses it.
- Before go-live: backup, untick "Discourage search engines", set the form email, add 301 redirects for changed URLs.