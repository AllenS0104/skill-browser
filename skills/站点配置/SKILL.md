---
name: 站点配置
description: `site-profile` 的中文别名。适合把已经跑通的网站流程沉淀成稳定、可复用的外部站点 profile。
license: Proprietary session artifact for local Copilot use
---

# 站点配置 skill

这是下面这个能力族的中文短名：

- `profile`
- `site-profile`
- `external-site-profile-learning`

适合场景：

- 新增稳定的外部站点 profile
- 排查 heuristic 和 Gemini 链路差异
- 把试出来的网站流程沉淀为可复用配置

## 核心做法

1. 先探测页面
2. 分类失败模式
3. 只有值得沉淀时才写 data-only profile
4. 分别验证 heuristic 和 Gemini

## 调用示例

```text
请用 /站点配置 把这个已经跑通的网站沉淀成稳定 profile，并验证 heuristic 和 Gemini 两条链路。
```

```text
请把这个网站流程整理成稳定可复用的外部站点 profile，并说明它是 stable、blocked 还是 special-case。
```

## 指向

详细版请看：

- `skills/external-site-profile-learning/SKILL.md`
