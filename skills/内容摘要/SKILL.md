---
name: 内容摘要
description: `content-summary` 的中文别名。适合搜索公开内容平台、筛选 Top 结果，并输出带链接和置信度的摘要。
license: Proprietary session artifact for local Copilot use
---

# 内容摘要 skill

这是下面这个能力族的中文短名：

- `summary`
- `content-summary`
- `content-search-summarization`

适合场景：

- 搜索 Bilibili、YouTube 等公开内容平台
- 按相关度筛选 Top N
- 输出带链接、置信度和 caveat 的摘要

## 核心做法

1. 优先用 `opencli`
2. 不可用时回退到公开页面抓取
3. 先按相关度排序，再参考热度
4. 基于 metadata 时要保守表述

## 调用示例

```text
请用 /内容摘要 在 <平台> 搜索 <主题>，筛选 Top 5，并输出带链接和置信度的摘要。
```

```text
请帮我在公开内容平台上搜索这个主题，按相关度排序，并逐条总结结果。
```

## 指向

详细版请看：

- `skills/content-search-summarization/SKILL.md`
