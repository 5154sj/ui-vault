# Obsidian Prism 原版 300Hz GPU Canvas 棱镜灯带（`prism-rim-canvas.js`）

> **上游开源归属与许可声明**：原版核心源码 [source/prism-rim-canvas.js](./source/prism-rim-canvas.js) 来自开源项目 **Obsidian Prism**（作者：RMvdesi，仓库：https://github.com/RMvdesi/obsidian-prism），采用 **GNU GPL-3.0-only** 协议。完整许可证与声明已原样保留在 `source/LICENSE`、`source/NOTICE` 与 `source/THIRD_PARTY_NOTICES.md`。

## 1. 原版核心技术架构（为什么如此丝滑且省性能）
- **零 StyleRecalc 2D Canvas 描边**：传统 CSS 变量方案（每帧写 `--mx/--my`）会触发浏览器频繁样式重算；原版直接在每个 `[data-ag-cs-prism-box="1"]` 容器上挂载一层 `pointer-events: none` 的 `<canvas class="ag-cs-prism-rim-cv">`，通过 `ctx.translate(gx, gy)` 复用缓存的 `RadialGradient` 绘制 `1.45px` 圆角边框，实现 300Hz 级极低开销跟手。
- **三种光学模式**：
  1. **Prism Rim 标准棱镜灯带（`data-ag-cs-prism-box="1"`）**：鼠标靠近卡片外沿 `280px` 范围内即触发径向 `240px` 棱镜光带，支持 `default`（白核 → 蓝 → 紫 → 红 → 金）、`warm`、`cobalt`、`iris`、`amber`、`mono` 共 6 套亮/暗双色板。
  2. **Mirror 镜面光标倒影（`data-ag-cs-prism-mirror="1"`）**：在容器内部叠加柔光涂抹 + 双层低透明度虚焦光标倒影（玻璃折射偏移 `+3.2px, +4.2px`）+ 银白高光描边。
  3. **Reflect Bottom 底部反光（`data-ag-cs-prism-reflect="bottom"`）**：通过 `destination-in` 垂直遮罩，仅在卡片下沿映射下方指针的柔和棱镜反射光。
- **闲置自动回收 VRAM**：离场清除画布 `1800ms` 后自动把 `canvas.width = canvas.height = 0` 释放显存，切后台/失焦即刻停帧。

## 2. 如何直接复用原版源码
1. 引入 `source/prism-rim-canvas.js`（挂载全局 `window.__agPrismRimCanvas.createPrismRimCanvasController`）。
2. 给需要灯带的容器加上 `position: relative` 和 `data-ag-cs-prism-box="1"`，并加上 `.ag-cs-prism-rim-cv { position: absolute; inset: -1px; width: calc(100% + 2px); height: calc(100% + 2px); border-radius: inherit; pointer-events: none; z-index: 7; }`。
3. 初始化 `createPrismRimCanvasController(...)` 并将 `window` 的 `pointermove` 转发给 `ctl.onPointerMove`。
4. 如同时配合 `dual-mascot-rig.js`，将 `onComposerRimUpdate` 回调直接连到 `mascotStage.setRimLight(rim)` 即可实现灯带与像素宠物身体反光联动！
