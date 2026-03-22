# skill-browser

一组面向 **GitHub Copilot CLI** 的可复用 skills，重点解决三类问题：

- 陌生网站的通用适配
- 外部网站 profile 的沉淀与维护
- 内容平台的搜索、筛选与摘要

这套 skills 最初围绕一个 Playwright 浏览器项目打磨，但现在已经整理成可独立分享、安装和复用的形式。

## 推荐先记住的 3 个短名

如果你只想先记最常用的名字，推荐这 3 个：

- `web-adapt`
- `site-profile`
- `content-summary`

它们分别对应：

- 通用网站适配
- 站点 profile 学习与维护
- 内容搜索与摘要

## 仓库包含的 skills

### 推荐公开使用的短名

- `site-profile`
- `content-summary`
- `web-adapt`

### 兼容保留的完整名

- `external-site-profile-learning`
- `content-search-summarization`
- `universal-web-adaptation`

## 每个 skill 是做什么的

### `web-adapt`

用于先用**通用方法**适配陌生网站，而不是一开始就给每个网站写专门规则。

适合：

- 找搜索框、按钮、弹窗、新标签页
- 尝试 Enter / click / opener / popup 等策略
- 判断这个网站是不是值得沉淀成专用 profile

### `site-profile`

用于把某个网站从“能试出来”升级到“稳定可复用”。

适合：

- 调查稳定 selector
- 分析失败模式
- 增加 config-driven site profile
- 验证 heuristic / LLM / Gemini 两套规划链路

### `content-summary`

用于在内容平台上搜索主题，选出 Top N 结果并做摘要。

适合：

- B站 / YouTube / 小红书等公开内容平台
- Top 5 / Top 10 结果筛选
- 打开详情页补元数据
- 输出中文概况、链接和作者信息

## 安装方式

把 skill 目录复制到 Copilot CLI 的 skills 目录即可。

### Windows

复制到：

```text
%USERPROFILE%\.copilot\skills\<skill-name>\SKILL.md
```

### macOS / Linux

复制到：

```text
~/.copilot/skills/<skill-name>/SKILL.md
```

复制完成后，在 Copilot CLI 中执行：

```text
/skills reload
/skills list
```

## 推荐目录结构

```text
.copilot/
  skills/
    web-adapt/
      SKILL.md
    site-profile/
      SKILL.md
    content-summary/
      SKILL.md
```

## 中文使用示例

### 通用网站适配

```text
使用 /web-adapt 这个 skill，先通用适配这个陌生网站。
```

```text
Use the /web-adapt skill to make this unfamiliar website searchable.
```

### 站点 profile 学习

```text
使用 /site-profile 这个 skill，把这个网站沉淀成稳定的 site profile。
```

```text
Use the /site-profile skill to add a stable external site profile for this website.
```

### 内容搜索与摘要

```text
使用 /content-summary 这个 skill，帮我从 B 站找 5 个关于 AI 的视频并总结。
```

```text
Use the /content-summary skill to find the top 5 Bilibili videos about AI and summarize them.
```

## 设计思路

这套 skills 的核心不是“每个网站硬编码一遍”，而是采用三层思路：

1. **通用优先**  
   先尝试通用探测、通用提交、通用验证。

2. **按需沉淀**  
   只有在站点确实需要更稳定 selector 或独特流程时，才写 site profile。

3. **内容能力复用**  
   对于 B站 / YouTube / 小红书 这类平台，把“搜索 → 筛选 → 摘要”做成通用工作流。

## 适合分享给谁

这套仓库适合分享给：

- 想扩展 Copilot CLI 的开发者
- 想做浏览器自动化 / 网页适配的人
- 想把 AI 工作流产品化的人
- 想让 Copilot 更懂“网站搜索 + 内容摘要 + 站点适配”的团队

## 当前建议

如果你第一次用，建议顺序是：

1. 先用 `web-adapt`
2. 再用 `site-profile`
3. 最后用 `content-summary`

这样最容易形成一条完整闭环：

- 先让 AI 适应网站
- 再把经验沉淀成稳定规则
- 最后复用到内容搜索和摘要任务
