# skill-browser export

This folder packages the custom Copilot CLI skills created in this session so they can be uploaded to GitHub.

## Included skills

- `external-site-profile-learning`
- `content-search-summarization`
- `universal-web-adaptation`
- `site-profile` (short alias)
- `content-summary` (short alias)
- `web-adapt` (short alias)

## Recommended public names

For sharing, prefer the short names:

- `site-profile`
- `content-summary`
- `web-adapt`

Keep the long names as compatibility aliases.

## Install locally

Copy each skill directory into:

- Windows: `~\\.copilot\\skills\\<skill-name>\\SKILL.md`
- macOS/Linux: `~/.copilot/skills/<skill-name>/SKILL.md`

Then run in Copilot CLI:

```text
/skills reload
/skills list
```

## Skill overview

### `site-profile`
Investigate, add, validate, and debug external website profiles.

### `content-summary`
Search content platforms, rank top results, and summarize them with links.

### `web-adapt`
Adapt unfamiliar public websites generically before creating dedicated site rules.

## Source project context

These skills were developed around the Playwright browser demo project at:

- `C:\Users\v-songjun\Downloads\99\99idea`
