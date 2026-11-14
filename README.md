# ML / DL / LLM · 数学与机制学习空间

从“看懂公式”走到“知道它为什么这样写，并能自己推出来”。

这是面向“读懂 ML 教材、DL/LLM 论文背后的数学”的个人学习项目。根据最新反馈，当前从基础符号和具体例子逐步建立理解，再进入深度学习与 LLM。

**Learning language:** Lessons use simple English, short sentences, small examples, and visual explanations. Standard technical terms stay unchanged, even when they are difficult. Each new term is explained in simple English.

## 从这里开始

1. 从 [基础桥接](curriculum/FOUNDATION_BRIDGE.md) 开始：对照六块数学范围，从一条预测式读懂符号。
2. 浏览 [整合课程路线](curriculum/INTEGRATED_ROUTE.md)，了解完整的 ML → DL → LLM 顺序；[起点诊断](curriculum/DIAGNOSTIC.md)按需抽题。
3. 想提前看终点时，打开 [Attention 预览课](lessons/01-tensor-to-attention.md)。
4. 在浏览器打开 [互动实验室](demos/index.html)，操作 Attention 和 3D 梯度下降演示。
5. 遇到不熟悉的记号，查 [符号字典](glossary/SYMBOLS.md)。

如果你指的是周志华的《机器学习》（“西瓜书”），现在 16 个经典章节都会混入同一条主线；查看[章节覆盖表](curriculum/WATERMELON_BOOK_MAP.md)。课程还会加入 Andrew Ng 风格的 error analysis、bias/variance、vectorization、CNN/RNN、prompting、RAG、agents 和 LLM evaluation。

实验室不需要安装依赖，可直接双击 `demos/index.html`。也可在项目目录运行 `python3 -m http.server 8000`，然后打开 `http://localhost:8000/demos/`。停止服务按 Ctrl+C。课件与路线为 Markdown，建议在 Codex 或编辑器中阅读。

## 学习主线

| 阶段 | 周次 | 核心问题 |
| --- | --- | --- |
| 数学与模型接轨 | 1–3 | 张量怎样表达数据？梯度怎样传播？概率怎样变成损失？ |
| 从 ML 到神经网络 | 4–7 | 模型怎样学习？为什么会过拟合、梯度消失或训练不稳？ |
| Attention 与 Transformer | 8–11 | token 怎样交换信息？每层公式和形状怎样连接？ |
| LLM 训练与使用 | 12–14 | 自回归目标、推理缓存与微调分别改变什么？ |
| 综合推导与验证 | 15–16 | 能否逐式解释并验证一个微型 Transformer？ |

课程现在是整合后的约 26–30 周路线；每周 4–6 小时只是初始估计。**以掌握证据进阶，不以看完材料进阶。** CNN / RNN、RLHF / DPO 的深度推导等仍可按兴趣加深，但不再作为另一条课程路线。

## 每次怎样学

平时只需说 **“开始学习”** 和 **“结束学习”**；“继续上次”“今天到这”也可以。开始时接上次记录，过程中随时说“太难”“太简单”“换个图”“今天有点累”。结束时保存本次结果和下次起点，不要求额外考试或填写表格。

助手会记录实际作答、使用了什么提示、明确表达的体感，并据此调整难度或补充内容。重要节点会在回复过程中保存；忘说结束时，下次从最近已保存的检查点继续。完整说明见 [学习流程](progress/LEARNING_PROTOCOL.md)。

一节课围绕一个问题展开：直觉与预测 → 图像与观察 → 符号和公式 → 小例子推导 → 变式练习 → 用自己的话复述。

可以直接对本项目中的助手说：

- “从基础桥接 B0 开始，先用具体数字解释符号。”
- “开始起点诊断，一次问我一题。”
- “预览 Attention，先让我预测权重。”
- “解释这个公式，逐个标明符号、形状和运算。”
- “用可以拖动的图解释梯度为什么指向上升最快的方向。”
- “给我一道变式题，先不要告诉我答案。”
- “继续上次学习”或“复习已经学过的内容”。

## 学习助手与记录

[AGENTS.md](AGENTS.md) 是项目的默认教学约定；[角色设计](agents/ROLES.md) 定义主讲、课程规划、可视化、数学审校、练习复习的协作方式。角色按任务需要使用，不是后台常驻服务。

[学习状态](progress/LEARNING_STATE.md) 保存最新进度和下一步；[逐次学习记录](progress/sessions/README.md) 保存过程、体感、表现和调整；[复习队列](progress/REVIEW_QUEUE.md) 建议在学后第 1 / 3 / 7 / 14 天主动回忆，不自动创建提醒。

## 当前已准备与后续建设

已初始化：项目教学规则、基础范围对照与桥接计划、整合 ML → DL → LLM 路线、起点诊断、Watermelon Book 章节映射、Attention 预览课、符号字典、Attention / 3D 梯度下降演示、学习记录与[课件模板](templates/LESSON.md)。

后续课件与更多演示会随学习进度编写。课程路线中的可视化建议是建设计划；当前可运行内容以 `demos/` 为准。初始化本身不代表已完成任何学习模块。
