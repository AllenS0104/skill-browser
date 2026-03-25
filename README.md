# skill-browser

Reusable **GitHub Copilot CLI** skills for **Runtime-aware web interaction** — not just browser automation.

可复用的 **GitHub Copilot CLI** skills，面向 **Runtime-aware 网页交互** —— 不只是浏览器自动化。

Core capabilities | 核心能力：

- **Explore**: adapt unfamiliar websites generically | 通用适配陌生网站
- **Stabilize**: turn proven flows into reusable profiles | 把验证过的流程沉淀为可复用 profile
- **Execute**: search, rank, and summarize across platforms using the best available runtime | 用最优执行路径做搜索、排序和摘要
---

## Why this repo | 为什么做这个仓库

This repo packages a practical browser-workflow playbook into shareable Copilot skills.

这个仓库把一套实战验证过的浏览器工作流，整理成了可以分享、安装、复用的 Copilot skills。

### Architecture model (2026) | 架构模型

```text
Cognition Layer    → LLM (Planner + Reasoner)
Execution Layer    → opencli (CLI) / fetch (API) / Browser Agent (UI)
Memory Layer       → site profiles, platform registry
Environment        → Web
```

The key insight: **the agent should pick the best execution path per platform, not default to browser scraping.**

核心洞察：**Agent 应该按平台选最优执行路径，而不是默认走浏览器抓取。**

### Execution routing | 执行路由

```text
if opencli supports the platform:
    use opencli (deterministic, zero LLM cost, session-reuse)
elif public API exists:
    use fetch (structured JSON, no rendering needed)
elif site is SSR and publicly accessible:
    use web_fetch or Playwright (metadata extraction)
else:
    require login-state browser or declare blocked
```

### Platform access tiers | 平台接入分级

| Platform | opencli | Public API | SSR fetch | Tier | Recommended |
|----------|---------|-----------|-----------|------|-------------|
| Bilibili | ✅ `bilibili search` | ✅ `api.bilibili.com` | partial | T1 | opencli |
| YouTube | ✅ `youtube search` | ✅ Data API | partial | T1 | opencli |
| HackerNews | ✅ `hackernews top` | ✅ `hn.algolia.com` | ✅ SSR | T1 | opencli or fetch |
| Wikipedia | ✅ `wikipedia search` | ✅ | ✅ SSR | T1 | any path works |
| Reddit | ✅ `reddit search` | ❌ | partial | T1 | opencli |
| 小红书 | ✅ `xiaohongshu search` | ❌ | ❌ SPA | T2 | opencli only |
| 抖音/TikTok | ✅ `tiktok search` | ❌ | ❌ SPA | T2 | opencli only |
| 知乎 | ✅ `zhihu search` | ❌ | ❌ login | T2 | opencli only |
| 微博 | ✅ `weibo search` | ❌ | ❌ | T2 | opencli only |
| 豆瓣 | ✅ `douban search` | ❌ | partial | T2 | opencli |
| Medium | ✅ `medium search` | ❌ | ❌ | T2 | opencli |
| arXiv | ❌ | ✅ `export.arxiv.org` | ✅ SSR | T3 | fetch / web_fetch |
| BBC | ✅ `bbc news` | ❌ | ✅ SSR | T3 | fetch / web_fetch |
| 今日头条 | ❌ | ❌ | ✅ SSR | T3 | web_fetch |

**Tier definitions | 分级定义：**

- **T1** — multiple working paths; opencli preferred for consistency | 多条路径可用，opencli 优先
- **T2** — opencli required; if unavailable, declare blocked | opencli 必须，无公开 fallback
- **T3** — public fetch works reliably; opencli optional | 公开 fetch 可靠，opencli 可选

### Layered skill workflow | 分层 skill 工作流

Instead of hardcoding every website one by one, the workflow follows a layered approach:

它的核心思路不是"每个网站都单独硬编码一遍"，而是三层方法：

1. **adapt** — explore and adapt generically first | 先做通用适配
2. **profile** — stabilize into a reusable profile only when necessary | 只有确实需要时才沉淀专用 profile
3. **summary** — execute search and summarization using the best available runtime | 用最优 runtime 执行搜索与摘要

---

## Recommended names | 推荐优先记住的名称

If you only remember three **public-safe English names**, remember these:

如果你只先记住 3 个**公开场景更稳妥的英文名**，建议记这 3 个：

- `web-adapt`
- `site-profile`
- `content-summary`

If you want the **shortest local English aliases**, use:

如果你想用**最短的本地英文别名**，可以用：

- `adapt`
- `profile`
- `summary`

If you prefer **Chinese aliases**, use:

如果你更喜欢**中文别名**，可以用：

- `网站适配`
- `站点配置`
- `内容摘要`

They map to the same three capability families:

它们本质上都映射到同样的三类能力：

- `adapt` / `web-adapt` / `网站适配`: generic website adaptation | 通用网站适配
- `profile` / `site-profile` / `站点配置`: stable external site profile workflow | 稳定站点 profile 沉淀
- `summary` / `content-summary` / `内容摘要`: content search, ranking, and summarization | 内容搜索、筛选与摘要

---

## Included skills | 仓库包含的 skills

### Shortest English aliases | 最短英文别名

- `adapt`
- `profile`
- `summary`

### Chinese aliases | 中文别名

- `网站适配`
- `站点配置`
- `内容摘要`

### Short public aliases | 推荐公开使用的英文短名

- `web-adapt`
- `site-profile`
- `content-summary`

### Full names kept for compatibility | 为兼容保留的完整名

- `universal-web-adaptation`
- `external-site-profile-learning`
- `content-search-summarization`

---

## What each skill does | 每个 skill 是做什么的

### `web-adapt`

Use this skill when you want to make progress on an unfamiliar public website before writing any site-specific rules.

这个 skill 适合在还没有站点规则时，先用通用方法把网站跑通。

Best for:

适合场景：

- detecting search inputs, buttons, openers, and popups
- trying Enter, click, opener, or popup strategies
- deciding whether a dedicated site profile is actually needed

- 找搜索框、按钮、弹窗、新标签页
- 尝试 Enter、click、opener、popup 等策略
- 判断这个网站是否值得沉淀成专用 profile

### `site-profile`

Use this skill when a website already looks automatable and you want to turn it into a stable, repeatable profile.

这个 skill 适合把“已经能试出来”的网站，升级成“稳定可复用”的 site profile。

Best for:

适合场景：

- investigating stable selectors
- classifying failure modes
- adding config-driven site profiles
- validating heuristic and LLM-based planning flows

- 调查稳定 selector
- 分析失败模式
- 增加 config-driven site profile
- 验证 heuristic 与 LLM 规划链路

### `content-summary`

Use this skill to search public content platforms, pick the top relevant results, and summarize each item with links and short takeaways.

这个 skill 适合在公开内容平台上搜索主题，筛选 Top 结果，并输出链接和摘要。

Best for:

适合场景：

- Bilibili, YouTube, Xiaohongshu, and similar platforms
- Top 5 / Top 10 result selection
- opening detail pages to enrich metadata
- writing Chinese or English summaries

- B站、YouTube、小红书等内容平台
- Top 5 / Top 10 结果筛选
- 打开详情页补充元数据
- 输出中英文摘要

---

## Installation | 安装方式

Copy each skill folder into your Copilot CLI skills directory.

把对应的 skill 文件夹复制到 Copilot CLI 的 skills 目录即可。

### Windows

```text
%USERPROFILE%\.copilot\skills\<skill-name>\SKILL.md
```

### macOS / Linux

```text
~/.copilot/skills/<skill-name>/SKILL.md
```

After copying, reload skills in Copilot CLI:

复制完成后，在 Copilot CLI 中执行：

```text
/skills reload
/skills list
```

### Recommended structure | 推荐目录结构

You do not need to install every alias. In most cases, install only the names you actually want to invoke.

你不需要把所有别名都装上。大多数情况下，只安装你准备实际调用的那几个名字即可。

```text
.copilot/
  skills/
    adapt/
      SKILL.md
    web-adapt/
      SKILL.md
    网站适配/
      SKILL.md
    profile/
      SKILL.md
    site-profile/
      SKILL.md
    站点配置/
      SKILL.md
    summary/
      SKILL.md
    content-summary/
      SKILL.md
    内容摘要/
      SKILL.md
```

---

## Example prompts | 示例提示词

You do **not** have to use an exact slash-style command every time.

不一定每次都必须写成精确的 `/skill-name` 命令。

Recommended invocation strength:

推荐触发强度：

1. explicit slash command such as `/web-adapt` — most deterministic
2. explicit skill-name mention such as `use the web-adapt skill`
3. natural-language task description that clearly matches the skill intent

1. 显式 `/web-adapt` 这类命令 —— 最稳定
2. 显式提到 skill 名，例如 `use the web-adapt skill`
3. 只写自然语言任务，但任务意图要足够清晰

If you want reliable routing, prefer either the slash form or the explicit skill name.

如果你想让路由更稳定，优先使用 slash 形式或明确提到 skill 名。

### `web-adapt`

```text
使用 /web-adapt 这个 skill，先通用适配这个陌生网站。
```

```text
Use the /web-adapt skill to adapt this unfamiliar website before creating any site-specific rules.
```

```text
Please adapt this unfamiliar public website generically first, and tell me whether it really needs a dedicated site profile.
```

```text
请用 /网站适配 先通用适配这个陌生网站，再告诉我是否真的需要专用 profile。
```

### `site-profile`

```text
使用 /site-profile 这个 skill，把这个网站沉淀成稳定的 site profile。
```

```text
Use the /site-profile skill to turn this website into a stable external site profile.
```

```text
Please turn this site into a stable reusable external profile, and validate both heuristic and Gemini planning flows.
```

```text
请用 /站点配置 把这个已经跑通的网站沉淀成稳定可复用的 profile，并验证两条规划链路。
```

### `content-summary`

```text
使用 /content-summary 这个 skill，帮我从 B 站找 5 个关于 AI 的视频并总结。
```

```text
Use the /content-summary skill to find the top 5 Bilibili videos about AI and summarize them.
```

```text
Find the top 5 Bilibili videos about AI, rank them by relevance, and summarize each item with links and confidence notes.
```

```text
请用 /内容摘要 在 B 站搜索 AI 相关内容，筛选 Top 5，并输出带链接和置信度的摘要。
```

---

## Suggested workflow | 推荐使用顺序

If you are new to this repo, use the skills in this order:

如果你是第一次使用，建议按这个顺序：

1. `web-adapt`
2. `site-profile`
3. `content-summary`

This creates a practical loop:

这样最容易形成一条完整闭环：

- first adapt the site
- then stabilize the knowledge into a profile
- finally reuse the workflow for search and summarization tasks

- 先让 AI 适应网站
- 再把经验沉淀成稳定规则
- 最后把流程复用到搜索与摘要任务

---

## Who this is for | 适合谁使用

This repo is useful for:

这个仓库适合：

- developers extending GitHub Copilot CLI
- teams building browser automation workflows
- people productizing AI-assisted web workflows
- anyone who wants reusable website adaptation skills instead of one-off scripts

- 想扩展 GitHub Copilot CLI 的开发者
- 在做浏览器自动化工作流的团队
- 想把 AI 网页工作流产品化的人
- 不想每次都临时写一次性脚本的人

---

## Design principles | 设计原则

- generic first, site-specific second
- prefer reusable workflows over one-off hacks
- keep profile logic config-driven when possible
- validate with real websites, not only toy examples

- 通用优先，专用其次
- 优先沉淀可复用工作流，而不是一次性 hack
- 尽量让 profile 逻辑保持 config-driven
- 尽量用真实网站验证，而不只是 demo

---

## Notes | 说明

These skills were originally shaped around a Playwright-based browser project, then reorganized into a cleaner skill bundle for GitHub Copilot CLI.

这些 skills 最初围绕一个基于 Playwright 的浏览器项目打磨，后来整理成了更适合 GitHub Copilot CLI 分享和安装的形式。

---

## Contributing | 参与贡献

If you want to improve the repo, add a new skill, or propose a better alias, see [`CONTRIBUTING.md`](./CONTRIBUTING.md).

如果你想继续完善仓库、补充新 skill，或者提出更好记的别名，可以先看 [`CONTRIBUTING.md`](./CONTRIBUTING.md)。
