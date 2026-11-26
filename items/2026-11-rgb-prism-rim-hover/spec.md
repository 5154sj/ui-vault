# 鼠标靠近 / 悬浮 RGB 棱镜灯带边框（Proximity RGB Rim）

## 1. 设计精髓（为什么高级而不是“杀马特跑马灯”）
- **克制的暗黑基底 + 极细 1.5px 光带**：容器主体保持低饱和石墨黑（`#1A1A1D`），RGB 色彩只出现在 `1.5px` 精密切边与极淡的环境反射光晕上，正文区域保持绝对纯净可读。
- **双阶段交互反馈（周围靠近感应 + 悬浮漫游）**：
  - **周围靠近（Proximity）**：鼠标还没进框（距离边框 `<= 220px`），离鼠标最近的那一段弧线边缘就已经开始泛出棱镜色光，多卡片并排时移动鼠标能同时点亮相邻边界（类似 Fluent Reveal + 棱镜折射）。
  - **悬浮上方（Hover / Focus）**：鼠标进入容器后，RGB 色带平滑旋转流动，外缘叠加柔和环境光扩散（`blur(18px)`），内部表面叠加极轻的径向微光（`opacity ~0.08`）。
- **平滑插值阻尼（Lerp）**：对光晕中心与强度做帧间平滑过渡，避免鼠标快速划过时灯带生硬闪断。

## 2. 结构与实现原理（零依赖纯 CSS + 轻量 Pointer 追踪）
每个支持该效果的容器（`.rgb-rim-card`）由 4 层构成：
1. **外溢光晕层（`.rgb-rim-bloom`）**：位于容器正下方（`inset: -2px`），用 `conic-gradient` 旋转色带 + 径向 `mask-image`（锚定鼠标坐标 `--mx`, `--my`）+ `filter: blur(16px)` 实现贴合指针的外部 RGB 散射光。
2. **精准 1.5px 灯带层（`.rgb-rim-border`）**：用 `padding: 1.5px` + `mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)` + `mask-composite: exclude` 镂空中心，只留下完美的 1.5px 圆角边框；背景叠合流动 `conic-gradient` 与以指针为中心的 `radial-gradient` 遮罩，实现“靠近哪里、亮哪里”。
3. **表面微反射层（`.rgb-rim-sheen`）**：容器内层极淡的指针径向高光（`opacity: 0.08`），模拟玻璃/阳极氧化铝边缘漫反射。
4. **内容层（`.rgb-rim-content`）**：`#1A1A1D` 实底，保证内部文字、输入框、按钮清晰锐利。

## 3. 动效与交互参数
- **色带旋转**：`@property --rgb-angle` 连续从 `0deg → 360deg`（`4.5s linear infinite`），GPU 合成流畅不掉帧。
- **感应半径**：`proximityRadiusPx = 220px`，根据鼠标到矩形外边界的欧氏距离 `dist` 计算平滑衰减系数 `strength = clamp(1 - dist / radius, 0, 1)^1.6`。
- **悬浮增强**：鼠标位于容器内部时 `dist = 0`，灯带强度达到 `1.0`，同时可切换「仅局部聚光跟随」或「整圈流动 RGB 灯带」。

## 4. 适用场景
- AI 对话输入框 / Command Palette（如参考图中的 Antigravity Prompt Box）
- Bento Grid 仪表盘卡片 / 导航面板 / 暗黑设置项卡片
- 强调“交互触感与科技氛围”的工具栏、模态框与高亮 CTA 按钮

## 5. 复用忌讳（Anti-patterns）
- **切忌边框过粗（> 2.5px）或饱和度满溢到卡片内部**：会立刻显得廉价刺眼。
- **切忌在亮白背景上直接照搬同透明度**：浅色模式下需把环境光晕 opacity 降到 `0.25` 以下，且把色带改为柔和粉彩棱镜色。
- **切忌在几百个列表项上同时跑高模糊 `filter: blur()`**：应仅用于少量核心卡片（<= 12 个）或仅对感应半径内激活的卡片启用 bloom。
