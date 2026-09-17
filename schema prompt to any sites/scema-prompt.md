# Reusable Prompts — Website Schema / JSON-LD Work

Two reusable prompts: one for inspecting a site's current schema, and one for turning the findings into a production-ready schema package.

Copy the relevant prompt into a new Claude chat and fill in the bracketed placeholders.

---

## PROMPT 1 — Schema Inspection

```text
SCHEMA / JSON-LD INSPECTION

Website: [WEBSITE URL]
Tech stack: [e.g. WordPress + Elementor, or "unknown — please detect"]
SEO/schema plugin: [e.g. Rank Math, Yoast, or "unknown — please detect"]

GOAL

Understand the CURRENT schema / JSON-LD implementation before proposing changes.

Inspection only. Do not modify anything.

SAFETY

- Do not modify, save, or change settings.
- Do not guess admin/login URLs.
- Do not attempt to log in.
- If something requires admin access, tell me exactly what screen I need to provide.

WHAT TO CHECK

1. Find all JSON-LD on the homepage.
2. Identify:
   - @context
   - @type
   - @id
   - @graph
   - entity relationships
3. Identify global entities such as:
   - Organization
   - WebSite
   - WebPage
   - BreadcrumbList
   - SearchAction
4. Record the actual Organization values:
   - name
   - URL
   - logo
   - description
   - contact information
   - sameAs
5. Determine what generates the schema:
   - SEO plugin
   - page builder
   - theme
   - custom code
6. Only report problems that are actually confirmed.
7. Inspect the sitemap, REST API, CMS, or equivalent to identify actual content/page groups and counts.
8. For each content group, identify:
   - page count
   - URL pattern
   - current schema
   - reusable schema opportunity

OUTPUT

Provide a concise report containing:

- Current global schema
- Organization entity
- Entity relationship map
- Schema generator + evidence
- Confirmed problems
- Items requiring validation
- Content/page group coverage

Do not propose implementation changes yet.
```

---

## PROMPT 2 — Schema Creation & Production Package

```text
SCHEMA / JSON-LD PRODUCTION PACKAGE

Website: [WEBSITE URL]

Findings:
[PASTE INSPECTION FINDINGS OR USE THE FINDINGS FROM THIS CONVERSATION]

GOAL

Create a production-ready schema package for review.

Do not make live changes.

CONTENT PRINCIPLE — DO NOT MINIMIZE

Use the ACTUAL content from the actual website.

- If a FAQ contains 15 questions, include all 15 in the example.
- If a service page contains specific benefits/value propositions, use the real content.
- Use the actual Organization information published on the site.
- Use real address, phone, email, social profiles, founding information, and relationships when available.
- Do not invent missing information.
- Only use schema.org properties that have meaningful real data.
- Re-read the live pages when necessary instead of using shortened examples.

WHAT TO INCLUDE

1. Final global schema:
   - Organization
   - WebSite
   - WebPage relationships

2. One reusable JSON-LD template for each relevant content type, such as:
   - BlogPosting
   - NewsArticle
   - Service
   - FAQPage
   - AboutPage
   - ContactPage
   - CreativeWork
   - Person

3. Page-specific schemas should reference the existing Organization/WebSite
   entities using @id instead of redefining them.

4. Explain the production implementation approach:
   - existing CMS/SEO plugin functionality
   - custom code only where necessary
   - where the custom code would live

DOCUMENT FORMAT

- Professional and concise.
- Use headings, short paragraphs, and bullets.
- Use at most one summary table.
- Make the actual JSON-LD the primary code content.
- Do not focus on PHP or implementation code.
- Keep implementation mechanics in concise prose.
- Avoid unnecessary tutorial-style instructions.
- Do not include a rollback plan or blockers section unless requested.

DIAGRAMS

If useful, include two simple diagrams:

1. Schema relationship:

Organization
      ↓
   WebSite
      ↓
    WebPage
      ↓
Page-specific Schema

2. Implementation layers:

Existing Schema Generator
          ↓
     Organization
          ↑
Custom Schema Layer

Keep diagrams clean, corporate, and minimal.

Do not make production changes.
This is a schema design package for review.
```

---

## Notes

### Recommended workflow

```text
Prompt 1
   ↓
Inspect Current Schema
   ↓
Review Findings
   ↓
Prompt 2
   ↓
Create Schema Package
   ↓
Review
   ↓
Implement
   ↓
Validate
```

### Important

Always use **Prompt 1 before Prompt 2**.

Prompt 1 discovers what already exists.

Prompt 2 uses those findings to design the reusable production schema.

The **"DO NOT MINIMIZE"** section in Prompt 2 is important because it prevents Claude from using shortened or generic examples instead of the actual website content.