---
name: site-profile
description: Short alias for external-site-profile-learning. Use this when investigating, adding, validating, or debugging external website profiles for the 99idea Playwright browser demo.
license: Proprietary session artifact for local Copilot use
---

# Site profile skill

This is the short public alias for:

- `external-site-profile-learning`

Use this skill when you want to:

- add a new external site profile
- debug why a site works heuristically but fails under Gemini
- classify whether a site should be generic, blocked, special, or config-driven
- validate a site in both heuristic and Gemini modes

## Primary guidance

Follow the same workflow as the full skill:

1. probe the site
2. classify the UI pattern and failure mode
3. add a data-only profile when justified
4. validate heuristic and Gemini flows
5. keep special/rate-limited sites out of the default regression matrix

## Key rules

- Prefer URL or title verification for external sites.
- Prefer exact selectors over broad selectors.
- If a profile exists, normalize generated `type` and `click` steps back to the profile selectors.
- Treat login walls, hidden inputs, duplicate controls, and anti-bot behavior as different problem types.

## Pointer

For the full detailed playbook, also see:

- `C:\Users\v-songjun\.copilot\skills\external-site-profile-learning\SKILL.md`
