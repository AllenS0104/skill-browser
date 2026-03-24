---
name: content-summary
description: Short alias for content-search-summarization. Use this to search public content platforms, rank the top relevant items, and summarize them with links.
license: Proprietary session artifact for local Copilot use
---

# Content summary skill

This is the short public alias for:

- `content-search-summarization`

Use this skill when you want to:

- search Bilibili, YouTube, or similar public content platforms
- pick the top N relevant results for a topic
- summarize each item in Chinese with links

## Primary guidance

1. Prefer `opencli` for supported platforms.
2. If `opencli` is unavailable, fall back to Playwright scraping of public result pages.
3. Rank by relevance first, popularity second.
4. Open selected result pages and use metadata to improve summaries.
5. Use a structured output with source, capture time, link, summary, and confidence.

## Key rules

- Always include source links.
- Include capture time or say when the timestamp is not visible.
- Do not pretend a full video was watched if only metadata was collected.
- Phrase summaries conservatively when based on public page metadata.
- Add a confidence label and a short caveat when the summary is metadata-based.

## Pointer

For the full detailed playbook, also see:

- `C:\Users\v-songjun\.copilot\skills\content-search-summarization\SKILL.md`
