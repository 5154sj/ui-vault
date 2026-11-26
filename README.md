# UI Vault · 个人前端美学与动效素材库

存放日常收集的优秀 UI 界面、组件布局与交互动效，结构化沉淀为 **Design Tokens + 设计说明书 + 可直接双击预览的单文件 Demo**，同时作为一个 Antigravity 全局插件运行，随时供 AI 拆解入库与精准调用。

## 目录结构

```text
C:\UI\ui-vault\
├── plugin.json                   # Antigravity 插件清单（已软链至全局 plugins 目录）
├── catalog.json                  # AI 轻量检索总索引（自动维护）
├── scripts/
│   └── rebuild-catalog.mjs       # 扫描 items/*/meta.json 自动重建 catalog.json
├── skills/
│   ├── ui-deconstruct/SKILL.md   # 拆解入库 Skill（截图/视频/URL/软件动效 -> 落盘 + Git 同步）
│   └── ui-recall/SKILL.md        # 检索调用 Skill（风格迁移 / 组件与动效复刻）
└── items/
    └── YYYY-MM-<slug>/
        ├── meta.json             # 分类、标签、暗亮色、来源
        ├── tokens.json           # 结构化 Design Tokens
        ├── spec.md               # 设计基因、动效时序与复用忌讳
        ├── preview.html          # 单文件零依赖复刻 Demo（浏览器双击即可验收）
        ├── snippet.tsx           # 可选：React 组件代码
        └── assets/               # 参考截图 / 动效关键帧（大视频放 assets/raw/ 仅本地保留）
```

## 日常使用方式

1. **随手收藏入库（触发 `ui-deconstruct`）**：
   - 截图（`Win + Shift + S`）或录一段 2–5 秒动效视频（`Win + Shift + R`）直接贴进聊天，说一句：*“拆解这个 UI / 动效存入我的 UI Vault 并同步 GitHub”*。
2. **写前端时调用（触发 `ui-recall`）**：
   - 在**任意项目工作区**里说：*“参考我 UI Vault 里那个暗黑极简侧边栏风格，帮我做这个页面”*。
3. **手动重建索引**：
   ```powershell
   node C:\UI\ui-vault\scripts\rebuild-catalog.mjs
   ```
