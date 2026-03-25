# skill-browser Session Report

> Date: 2026-03-25
> Duration: ~6 hours
> Projects: skill-browser, opencli (upstream)

---

## 一、Session 总览

本次 session 围绕 `skill-browser` 仓库做了 **4 轮递进式优化**，并向 opencli 上游贡献了 2 个 PR。

```text
Round 1: 基础 Review & 可移植性修复
Round 2: Skill 结构统一 & 可执行性增强
Round 3: 架构升级 — Runtime-aware 执行路由
Round 4: opencli 上游贡献 — adapter 质量审计 & 批量修复
```

---

## 二、Round 1 — 基础 Review & 可移植性

### 问题
- SKILL.md 中有 4 处硬编码的本机绝对路径 (`C:\Users\...`)
- 降低了仓库的可移植性和复用性

### 改动
| 文件 | 改动 |
|------|------|
| `skills/web-adapt/SKILL.md` | 路径改为仓库相对引用 |
| `skills/site-profile/SKILL.md` | 路径改为仓库相对引用 |
| `skills/content-summary/SKILL.md` | 路径改为仓库相对引用 |
| `skills/external-site-profile-learning/SKILL.md` | 项目路径改为通用描述 |

### 验证
全仓扫描确认 `*.md` 中已无 `C:\Users\...` 硬编码路径。

---

## 三、Round 2 — Skill 结构统一 & 可执行性增强

### 2.1 结构统一

为 3 个 alias skill 新增统一章节：
- `Quick invocation template`（中英文可直接粘贴的调用模板）
- `Output contract`（强制输出结构）

### 2.2 质量规则增强

为 3 个 full skill 补强证据规则：

| Skill | 新增规则 |
|-------|---------|
| `universal-web-adaptation` | 要求输出 URL/title/selector/popup 证据 |
| `external-site-profile-learning` | 验证报告必须带证据字段 |
| `content-search-summarization` | 每条结果必须有 evidence note |

### 2.3 调用方式优化

解决"必须用 `/skill-name` 吗？"的痛点：
- README 新增"触发强度"说明（slash > 显式 skill 名 > 自然语言）
- 每个 alias skill 补充了自然语言触发示例

### 2.4 双语别名系统

新增 6 个 alias skill 文件夹：

| 能力族 | 最短英文 | 中文别名 | 原英文名 |
|--------|---------|---------|---------|
| 网站适配 | `adapt` | `网站适配` | `web-adapt` |
| 站点配置 | `profile` | `站点配置` | `site-profile` |
| 内容摘要 | `summary` | `内容摘要` | `content-summary` |

---

## 四、Round 3 — 架构升级：Runtime-aware

### 4.1 Browser Cognition Layer 分析

通过对照 `doc-1.txt`（2026 AI Agent 技术白皮书）和 opencli 项目，识别出核心架构缺陷：

```text
Layer 5  输出层        ← summary 的 Output Format         ✅ 够用
Layer 4  数据提取层    ← summary 的 metadata extraction    ⚠️ 只覆盖 SSR
Layer 3  动作层        ← adapt 的 probe/click/type/popup   ✅ 够用
Layer 2  分类层        ← adapt + profile 的 classification ⚠️ 缺 SPA/API 分类
Layer 1  感知层        ← adapt 的 selector discovery       ✅ 够用
Layer 0  接入层        ← ??? 严重缺失                     ❌ 核心断裂点
```

**根因**：skill 没有"平台可达性分级"，盲目尝试所有平台，全部走同一条 Browser fallback 链。

### 4.2 架构升级内容

#### README.md 新增

- **2026 Architecture Model**（Cognition / Execution / Memory / Environment）
- **Execution Routing** 决策树

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

- **Platform Access Tiers** 表（10+ 平台，标注 T1/T2/T3）

| Tier | 含义 | 示例平台 |
|------|------|---------|
| T1 | 多条路径可用，opencli 优先 | Bilibili, YouTube, Wikipedia |
| T2 | opencli 必须，无公开 fallback | 小红书, 抖音, 知乎, 微博 |
| T3 | 公开 fetch 可靠，opencli 可选 | arXiv, BBC |

#### content-search-summarization — 核心重写

- 执行路由从第一优先级开始
- 完整平台注册表 + opencli 命令模板
- T2 平台明确标注 "opencli required，否则 declare blocked"

#### universal-web-adaptation — 增强

- 新增 **Capability discovery** 步骤（先查 `opencli list`）
- 新增 **Auth cascade** 分类（PUBLIC → COOKIE → HEADER → LOGIN-GATED）
- 新增 **SPA-shell** 分类桶

#### external-site-profile-learning — 增强

- Profile 字段新增 `executionTier`、`opencliCommand`、`authLevel`
- 新增 **Dual-engine awareness** 概念

### 4.3 实测验证

#### 升级前（小红书 + 抖音）

```
小红书公开页 → SPA 空壳 → 失败
搜索引擎 site: → 噪声结果 → 失败
抖音公开页 → JS 混淆壳 → 失败
结果：0/2 成功，3 轮 fallback 浪费
```

#### 升级后（安装 opencli + Browser Bridge）

```
小红书 → opencli xiaohongshu search → 10 条真实结果 ✅
抖音 → opencli tiktok search → 10 条真实结果 ✅
Bilibili → opencli bilibili search → 5 条带链接 ✅
YouTube → opencli youtube search → 5 条带链接 ✅
HackerNews → fetch API → 5 条带链接 ✅
arXiv → fetch API → 5 条带链接 ✅
今日头条 → web_fetch SSR → 文本结果 ✅
结果：7/7 成功，零 fallback 浪费
```

---

## 五、Round 4 — opencli 上游贡献

### 5.1 PR #404 — TikTok search 加 video URL

- **状态**: ✅ 已合并
- **改动**: `src/clis/tiktok/search.yaml` +2 行
- **效果**: TikTok search 从"无链接"到"每条结果带视频直链"
- **链接**: https://github.com/jackwener/opencli/pull/404

### 5.2 PR #414 — 批量修复 9 个 search adapter 的 url 字段

- **状态**: 已提交，待 review
- **改动**: 9 个文件, +17/-10 行
- **效果**: search adapter URL 覆盖率从 67% 提升到 97%
- **链接**: https://github.com/jackwener/opencli/pull/414

修复详情：

| Adapter | 类型 | 修复方式 |
|---------|------|---------|
| hackernews | YAML | url 已在 map 中，加入 columns |
| zhihu | YAML | url 已在 evaluate 中，穿透 map + 加入 columns |
| linux-do | YAML | 从 topic id 构造 url |
| instagram | YAML | 从 username 构造 profile url |
| xueqiu | YAML | url 已在 evaluate 中，穿透 map + 加入 columns |
| arxiv | TS | url 已在 parseEntries 中，加入 return + columns |
| apple-podcasts | TS | 从 iTunes API 的 collectionViewUrl 取值 |
| medium | TS | url 已在 utils 中计算，加入 columns |
| weread | TS | 从 bookId 构造 url |

### 5.3 新 Skill — adapter-audit

将整套"扫描 → 分类 → 修复 → 提交"流程沉淀为新 skill：

- 路径: `skills/adapter-audit/SKILL.md`
- 用途: 对任意 CLI adapter 项目做字段质量审计和批量修复
- 已验证: 在 opencli 上实战验证通过

---

## 六、仓库最终结构

```text
skill-browser/
  skills/
    adapt/SKILL.md              # 最短英文别名
    web-adapt/SKILL.md          # 英文短名
    网站适配/SKILL.md            # 中文别名
    universal-web-adaptation/   # 完整版（含 Runtime-aware 升级）

    profile/SKILL.md
    site-profile/SKILL.md
    站点配置/SKILL.md
    external-site-profile-learning/  # 完整版（含 dual-engine 概念）

    summary/SKILL.md
    content-summary/SKILL.md
    内容摘要/SKILL.md
    content-search-summarization/    # 完整版（含执行路由 + 平台注册表）

    adapter-audit/SKILL.md      # 新增：adapter 质量审计 skill

  README.md                     # 含 2026 Architecture Model
  CONTRIBUTING.md               # 含双语别名命名规范
  doc-1.txt                     # 参考白皮书
```

---

## 七、关键数据

| 指标 | 数值 |
|------|------|
| 总 skill 数 | 13 个（4 个能力族 × 3 层别名 + 1 审计 skill） |
| 修改文件数 | 20+ |
| 上游 PR | 2 个（1 merged, 1 pending） |
| 上游代码贡献 | 10 files, +19/-11 lines |
| 多平台实测通过 | 7/7 |
| URL 覆盖率提升 | 67% → 97% |
| 全部 todo 完成 | 23/23 ✅ |
