---
name: ui-recall
description: Search and apply saved UI styles, layouts, components, and motion designs from the user's personal frontend library at C:\UI\ui-vault. Use whenever the user asks to build or redesign a frontend page/component using their UI library, UI Vault, saved styles, or asks what UI references are currently stored in C:\UI\ui-vault.
---

# UI Vault · 调用与复用 Skill (`ui-recall`)

当你接到前端页面、组件、仪表盘或交互动效开发任务，且用户希望参考或调用自己的个人前端素材库（`C:\UI\ui-vault`）时，严格按以下流程精准调用，**绝不凭空猜测库里有什么**。

## 第一步：先读总索引（严禁盲目遍历全库）

1. 第一时间使用 `read_file` 读取 `C:\UI\ui-vault\catalog.json`。
2. 如果用户只是想浏览库里有什么，按 `kind`（`theme` / `layout` / `component` / `motion`）分组简洁展示清单，并附上可点击的 `preview.html` 链接。
3. 如果用户提出设计需求（例如“用我库里的极简暗黑侧边栏风格做一个控制面板”或“套用我收藏的那个动效卡片”）：
   - 从 `catalog.json` 里按 `title`、`kind`、`theme`、`tags`、`summary` 精准筛出最匹配的 **1–3 个条目**；
   - 如果有多个风格相近的候选且用户没指定，简短列出这 2–3 个候选问用户偏爱哪一个，或直接选最贴合的一个并说明原因。

## 第二步：按需精准加载目标素材

针对选中的 1–3 个条目，**并行**读取它们的核心文件：
1. `spec.md`（掌握设计精髓、留白层次、动效节奏与复用忌讳）
2. `tokens.json`（拿到精确色板、字重、圆角、阴影和动效曲线）
3. `preview.html`（或 `snippet.tsx`）了解完整结构与 CSS/JS 交互实现
4. 若存在 `assets/preview.png` / `.jpg`，也用 `read_file` 看一眼原视觉参考图，校准视觉重心与质感。

## 第三步：选择正确的复用模式落地代码

根据当前项目的实际技术栈（React / Vue / Next.js / Tailwind / 原生 CSS 等）自动转译，区分两种模式：

### 模式 A：风格迁移模式（Style Transfer）
适用场景：用户要做一个**全新业务页面**，但想要库里某条目的整体高级质感。
- 严格继承 `tokens.json` 的配色层次、描边透明度、圆角比例、排版对比和动效缓动曲线；
- 遵守 `spec.md` 里的「复用忌讳（Anti-patterns）」；
- **不要生搬硬套原 Demo 的假文案或无关布局**，而是用同样的设计语言长出当前业务真正需要的信息架构。

### 模式 B：组件 / 动效复刻模式（Component & Motion Reuse）
适用场景：用户点名要某个具体组件（如悬浮操作条、侧边栏、Bento 卡片、微交互按钮）。
- 完整保留 `preview.html` / `snippet.tsx` 中的核心交互状态机、DOM 结构和动效曲线（`transition` / `@keyframes` / spring 参数）；
- 干净适配为目标项目的框架语法、TypeScript 类型与状态管理，剥离无关 demo 壳子；
- 如可组合多个条目（例如：**A 条目的整页主题配色** + **B 条目的侧边栏布局** + **C 条目的卡片动效**），主动统一它们的 CSS 变量使其视觉和谐一致。

## 品质守则

- **零表情包图标**：除非用户明确要求，所有 UI 图标一律使用项目图标库或极简统一线宽的几何 SVG。
- **诚实溯源**：完成后在回复末尾用一句话注明本次参考了 UI Vault 的哪些条目（附可点击链接），方便用户随时微调或迭代素材库。
