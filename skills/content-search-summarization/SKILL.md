---
name: content-search-summarization
description: Use this skill when asked to search public content platforms such as Bilibili or YouTube, pick the top relevant results for a topic, and summarize each item with links and brief overviews. Prefer opencli for supported sites, but fall back to Playwright scraping of public search results when the browser bridge is unavailable.
license: Proprietary session artifact for local Copilot use
---

# Content search summarization skill

Use this skill when the user asks for tasks such as:

- "Find the top 5 videos about X on Bilibili and summarize them"
- "Search YouTube for a topic and give me the best results"
- "Look up public content on a supported site and summarize the top items"

## Primary strategy

1. Prefer `opencli` for supported content platforms because it can use the user's logged-in Chrome session.
2. If `opencli` fails because the Browser Bridge extension is not connected, fall back to Playwright scraping of **public search results only**.
3. Rank results by practical relevance, not just by raw view count:
   - exact keyword match in title
   - clarity of topic focus
   - likely tutorial / overview value
   - recency and popularity as secondary hints
4. Always include source links.

## Supported workflow

### 1. Search

For supported sites like Bilibili:

- first try `opencli`
- if unavailable, use Playwright to load the public search URL
- collect at least the first 5 to 10 results

For Bilibili, public search URLs typically look like:

```text
https://search.bilibili.com/all?keyword=<keyword>
```

### 2. Filter and rank

Prefer results that:

- directly match the requested topic
- are clearly about the requested concept rather than loosely related AI content
- look like tutorials, explainers, or practical overviews

Avoid results that:

- are generic entertainment content that only happens to mention the keyword
- are clearly unrelated despite matching a broad term like `AI`

### 3. Fetch more detail

When possible, open each selected result page and collect:

- page title
- meta description
- page description
- tags / keywords
- lightweight stat text if available

Use those fields to produce a summary that is better than title-only guessing.

### 4. Summarize

For each selected item, provide:

- rank
- original title
- optional translated / normalized title if helpful
- platform / source
- capture time when available
- source link
- author / uploader if available
- a short summary of what the item is likely about
- confidence level: `high`, `medium`, or `low`
- a brief caveat when the summary is inferred from metadata rather than full content

Be clear when the summary is inferred from metadata and page description rather than a full transcript.

## Fallback rules

### If opencli is unavailable

If `opencli` reports that the Browser Bridge extension is not connected:

- do not stop
- switch to Playwright scraping of public result pages
- explicitly note that the run used fallback scraping

### If the site is public but dynamic

Use these tactics:

- wait for `domcontentloaded`
- add a short settle delay
- gather multiple selector candidates
- deduplicate items by URL

### If item pages are heavy

Prefer metadata extraction:

- `meta[name="description"]`
- `meta[name="keywords"]`
- visible description blocks

This is often enough for concise content summaries.

## Output format

Return a compact ranked list.

Recommended structure:

1. short note about the search method used
2. query keyword and capture time
3. a ranked list of top items
4. a short summary paragraph for each item

Recommended per-item fields:

- `Rank`
- `Title`
- `Platform`
- `Link`
- `Author`
- `Captured at`
- `Summary`
- `Confidence`
- `Caveat`

## Proven example pattern

This pattern already worked in this environment for Bilibili:

1. search Bilibili for `openclaw`
2. collect the first 8 public results
3. select the top 5 most directly relevant videos
4. open each video page
5. extract:
   - page title
   - meta description
   - meta keywords
   - page description
   - tags
6. summarize each item in Chinese

## Key cautions

- Do not claim you watched the whole video unless you actually processed a transcript or full content.
- Phrase summaries as "主要在讲 / 偏向 / 看起来聚焦于" when based on metadata.
- Keep links and titles accurate.
- For broad keywords like `AI`, narrow to the user's likely intent if enough exact-match results exist.
- If publish time or exact timestamp is unavailable, explicitly say it was not visible in the captured result.
