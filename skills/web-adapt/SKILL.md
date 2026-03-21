---
name: web-adapt
description: Short alias for universal-web-adaptation. Use this when adapting an unfamiliar public website generically before creating any site-specific rules.
license: Proprietary session artifact for local Copilot use
---

# Web adapt skill

This is the short public alias for:

- `universal-web-adaptation`

Use this skill when you want to:

- work with an unfamiliar site generically
- detect search inputs, buttons, popups, and openers
- try multiple navigation/submission strategies
- decide whether a site profile is actually needed

## Primary guidance

1. try generic adaptation first
2. tune runtime if the page is heavy
3. follow popups/new tabs when needed
4. only create a dedicated site profile if the generic path is not robust enough

## Key rules

- Prefer URL verification whenever possible.
- Use container-qualified selectors when duplicates exist.
- Treat opener-search, popup-search, hidden/disabled, login-gated, and rate-limited sites as distinct classes.

## Pointer

For the full detailed playbook, also see:

- `C:\Users\v-songjun\.copilot\skills\universal-web-adaptation\SKILL.md`
