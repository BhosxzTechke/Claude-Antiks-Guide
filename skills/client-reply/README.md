# Client Reply

A custom Claude Skill that turns a rough draft or idea (English, Tagalog or
Taglish) into a **short, natural English message** you can paste straight into
WhatsApp or email.

Built for freelance client work, where clients dislike long, generic,
AI-sounding messages.

---

# What It Does

- Finds the 1–3 things the message must say. If the client asked something,
  the reply answers it.
- Translates Tagalog / Taglish into plain English (meaning, not word order).
- Cuts it down:
  - **WhatsApp:** 1–3 short lines
  - **Email:** a short paragraph or two, with a subject line
- Leads with the answer or result ("Done, ..."), no warm-up.
- Sounds like a person: direct, relaxed, polite, contractions are fine.
- Removes generic phrases such as:
  - "I hope this message finds you well"
  - "Please don't hesitate to reach out"
  - "I wanted to let you know"
  - "seamless", "robust", "leverage", "elevate", "ensure"
  - em dashes, unnecessary apologies, emojis you didn't use
- **Keeps facts safe:** never invents results, dates, prices or promises, and
  never adds offers or questions you didn't ask for.

---

# Output

```text
> The ready-to-send message (nothing else inside the quote)
```

- Email: `Subject: ...` comes first.
- At most one short line after it, only if you must add or check something
  (for example a missing link or price).
- Ask for "another" version to get a genuinely different phrasing with the
  same facts and length.

---

# Installation

## Claude Code (personal, all projects)

```text
~/.claude/skills/client-reply/SKILL.md
```

Windows:

```text
C:\Users\<you>\.claude\skills\client-reply\SKILL.md
```

## Claude app (claude.ai / desktop)

Zip the `client-reply` folder and upload it from your Skills settings.

Restart Claude Code (or start a new chat) after installing.

---

# How to Use

You don't need a special command. Just say **reply**, **message**, **sagot**,
or paste a draft. You can also type `/client-reply`.

Tips:

- Paste the client's message too, so the reply answers what they asked.
- Say **WhatsApp** or **email** if it isn't obvious.
- Say **short lang** if the client is busy.

---

# Examples

## 1. Taglish update

**You:**

```text
sabihin mo kay ash tapos na yung comments off na sa blog tsaka di na makakapag post yung spam
```

**Result:**

> Done, comments are off on all blog posts. Bots can't post anymore either,
> so no more of those moderation emails.

## 2. Cleaning up a long English draft

**You:**

```text
Hi Ash, I hope you are doing well. I just wanted to let you know that I have completed the changes you requested regarding the contact form and it should now be working properly on all of the location pages. Please feel free to reach out if you need anything else.
```

**Result:**

> Hi Ash, the contact form is now live on all location pages. Let me know if
> anything looks off.

## 3. Follow-up after no reply

**You:**

```text
pa follow up kay ash di pa nagrereply 4 days na, tanong ko lang kung may gusto pa siya ipabago
```

**Result:**

> Hi Ash, just checking in. Is everything looking good on the site? If there's
> anything you'd like changed, send it over and I'll sort it.

## 4. Email with a subject line

**You:**

```text
email mo si client, tapos na yung staging site, pa review nalang bago natin i-live. wala pa yung link ilagay ko nalang
```

**Result:**

> Subject: Staging site ready for review
>
> Hi, the staging site is ready. Have a look and let me know if you'd like any
> changes before we go live.

Add the staging link before sending.

---

# Quick Reference

| Say | What happens |
|---|---|
| `reply` / `sagot` + draft | Cleans up the draft |
| `message kay <client> ...` | Writes a new message from your idea |
| `short lang` | Keeps it to 1–2 lines |
| `email` | Adds a subject line, slightly longer |
| `another` | A different phrasing, same facts |
