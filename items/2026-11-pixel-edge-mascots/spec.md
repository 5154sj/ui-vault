# Obsidian Prism 原版双像素吉祥物骨架引擎（`dual-mascot-rig.js`）

> **上游开源归属与许可声明**：原版核心源码 [source/dual-mascot-rig.js](./source/dual-mascot-rig.js) 与联动灯带 [source/prism-rim-canvas.js](./source/prism-rim-canvas.js) 来自开源项目 **Obsidian Prism**（作者：RMvdesi，仓库：https://github.com/RMvdesi/obsidian-prism），采用 **GNU GPL-3.0-only** 协议。完整许可证与声明已原样保留在 `source/LICENSE`、`source/NOTICE` 与 `source/THIRD_PARTY_NOTICES.md`。
>
> 同时在同目录保留了先前独立手写的轻量 Q弹 28×24 SVG 变体：[preview-mochi-svg.html](./preview-mochi-svg.html)。

## 1. 原版架构精华（为什么还原度与像素质感无敌）
- **官方 Clawd 像素语法（`PX = 3`, `TICK = 100ms`）**：零黑描边、零眼高光噪点、纯方块几何、1×2 竖瞳 `o` 与暗部色 `s`；RLE 字符串压缩图集（`SPRITE_ATLAS_RAW`）覆盖珊瑚小蟹 `clawd`（`#d97757`）、小紫猫 `cat`（`#947fd6`）、3 只迷你小蟹（`cowboy` / `shades` / `wizard`）及 40+ 手工道具与表情符号。
- **整数格接缝挤压（`squashLayersToGrid`）**：彻底弃用会糊边的浮点 `ctx.scale`，而是按像素接缝实时增删整数行/列（并自动保护眼睛、暗面与着地脚），让每个像素块永远保持精确 `3×3` 锐利方块！
- **完整物理与生态剧场**：
  - 原生支持**拎起晃动、甩出抛掷弹跳、拖拽叠罗汉塔（Towers）**、点击戳一戳连击彩蛋；
  - 支持 **40+ 剧场动作与喂食**：甜甜圈、热咖啡、吃鱼、种花、追蝴蝶、小火炉、荧光棒应援、拉警报、冲浪墨镜、读书、打字点头/问号歪头/感叹号惊讶；
  - 右下角栖息地摆件支持**仙人掌 / 台灯 / 沙漏**切换；
  - 原生接收 `prism-rim-canvas.js` 的 `onComposerRimUpdate` → `stage.setRimLight(rim)`，鼠标掠过输入框时实时在宠物身上打出同色棱镜边缘反光！

## 2. 如何直接复用原版源码
1. 在页面引入 `source/dual-mascot-rig.js`（以及可选的 `source/prism-rim-canvas.js`）。
2. 在 `position: relative` 的输入框容器内放一个 `<div class="ag-cs-dual-stage"></div>`，配合 `preview.html` 中提取自原版 `style.css` 的舞台样式。
3. 调用 `const stage = window.__agDualMascotRig.mountDualMascotStage(stageEl, { camp: 'gemini', miniPileEnabled: false })`。
4. 按需调用公开 API：`stage.poke('clawd' | 'cat')`、`stage.feed('cat', 'donut' | 'coffee')`、`stage.triggerDemo('cheer' | 'fire' | 'butterfly' | 'plant' | 'eatFish' | 'slash:browser' | 'siren' | 'reset')`、`stage.setHabitatPreview('cactus' | 'lamp' | 'hourglass')`、`stage.onUserType(text)`、`stage.setRimLight(rim)`。
