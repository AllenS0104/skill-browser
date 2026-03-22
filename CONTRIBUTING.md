# Contributing to skill-browser

Thanks for your interest in improving `skill-browser`.

This repository collects reusable **GitHub Copilot CLI** skills for website adaptation, site-profile learning, and content summarization.

感谢你愿意一起完善 `skill-browser`。

这个仓库主要收集可复用的 **GitHub Copilot CLI** skills，聚焦网站适配、site profile 沉淀，以及内容搜索与摘要。

---

## What to contribute | 欢迎贡献什么

Useful contributions include:

欢迎贡献的方向包括：

- a new reusable skill
- a clearer alias for an existing skill
- better prompts, examples, or instructions in `SKILL.md`
- documentation improvements
- validation notes from real websites or real user workflows

- 新的可复用 skill
- 现有 skill 的更易记短名
- 更好的 `SKILL.md` 提示词、步骤或说明
- 文档优化
- 基于真实网站或真实使用场景的验证经验

---

## Repository structure | 仓库结构

```text
skills/
  <skill-name>/
    SKILL.md
README.md
CONTRIBUTING.md
```

Each skill should live in its own folder under `skills/`.

每个 skill 都应放在 `skills/` 下的独立目录中。

---

## Skill guidelines | Skill 编写建议

When adding or revising a skill:

当你新增或修改一个 skill 时，建议遵循这些原则：

1. keep the skill focused on one clear job
2. prefer reusable workflows over site-specific hacks
3. write instructions that are easy to invoke in real conversations
4. keep naming memorable and easy to type
5. include examples when they help users get started quickly

1. 让 skill 聚焦于一个清晰任务
2. 优先沉淀可复用工作流，而不是一次性站点 hack
3. 让说明能直接用于真实对话调用
4. 名字要好记、好输入
5. 能帮助用户快速上手时，尽量给出示例

---

## Naming suggestions | 命名建议

- Prefer short, memorable public names.
- Keep long descriptive names only when they improve clarity or compatibility.
- If a long-form skill already exists, adding a short alias is welcome.

- 优先使用短小、好记的公开名称。
- 只有在能提升清晰度或兼容性时，才保留较长全名。
- 如果已经有长名 skill，补一个短 alias 也是很好的贡献。

---

## Quality bar | 质量标准

Before proposing a change, try to make sure:

提交前建议尽量确认：

- the skill goal is clear
- the instructions are actionable
- the examples match the skill purpose
- the wording is consistent in both Chinese and English when applicable

- skill 目标清晰
- 指令可执行
- 示例和 skill 的用途匹配
- 如果同时提供中英文，表述尽量一致

---

## Pull request notes | Pull Request 说明

A good pull request usually includes:

一个好的 Pull Request 通常包括：

- what changed
- why the change is useful
- which skill folders were added or updated
- example prompts if behavior changed

- 改了什么
- 为什么这些修改有价值
- 涉及了哪些 skill 目录
- 如果行为有变化，给出示例提示词

---

## Keep it practical | 保持实用主义

This repo values practical, reusable skill design over theoretical completeness.

If a change makes the skills easier to remember, easier to install, or more reliable in real tasks, it is usually a strong contribution.

这个仓库更看重实战可复用性，而不是形式上的“面面俱到”。

如果一个改动能让 skill 更好记、更容易安装、或者在真实任务里更稳定，那通常就是好贡献。
