# 数学与模型符号字典

读公式时，先问三件事：**这个符号指什么对象？它的形状是什么？这一步操作改变了什么？** 不要求一次背完本页；遇到符号再查，并在具体例子中使用。

本项目默认单个样本或 token 为**行向量**，多个样本或 token 沿行堆叠。标量用普通小写字母，向量可用小写字母，矩阵通常用大写字母；字体只是辅助，局部定义和形状标注优先。

## B0：单个输入的预测式

在房价教学例子 $\hat y=wx+b$ 中，以下四个对象都是**标量**：各自只有一个数，没有向量或矩阵的行列轴。本式没有索引。字母的含义以本节局部定义为准。

| 符号 | 读法 | 本例含义与单位 |
| --- | --- | --- |
| $x$ | 英文字母 x | 输入面积，平方米；本例为单个数 |
| $w$ | 英文字母 w | 参数、面积系数，万元/平方米；不是概率 |
| $b$ | 英文字母 b | 参数、固定项（bias，偏置），万元 |
| $\hat y$ | y hat，y 帽 | 预测价格，万元；帽子表示预测，不保证等于实际价格 |

$wx$ 表示两个标量相乘，先乘再加 $b$。单次预测时固定 $w,b$，替换 $x$；训练时可以调整 $w,b$。固定项是模型假设的一部分，不意味着现实中零面积房屋有这个价格。

## B2: predictions for several samples

In this unitless teaching example, \(X=[[1,2],[3,4],[2,1]]\), \(\mathbf{w}=[2,3]\), and \(b=1\).

| Symbol | Read as | Meaning and shape |
| --- | --- | --- |
| \(X\) | capital X | Input matrix, 3 × 2: three samples as rows, two features as columns |
| \(\mathbf{w}\) | w | Shared weights as a row vector, 1 × 2 |
| \(\mathbf{w}^{T}\) | w transpose | Same weights as a column vector, 2 × 1 |
| \(X\mathbf{w}^{T}\) | X times w transpose | Matrix multiplication; one dot product for each row of X; output 3 × 1 |
| \(b\) | b | Scalar bias; add the same value to every entry of the 3 × 1 product |
| \(\hat{\mathbf{y}}\) | y hat | Prediction column, 3 × 1, in the same sample order as X |

Here \(\hat{\mathbf{y}}=X\mathbf{w}^{T}+b\) uses scalar broadcasting: the addition means adding b to each product entry. This explicit column output does not change the convention that input samples occupy rows.

## B3: signed prediction error

For one sample, define \(e=\hat y-y\). This is prediction minus actual target. Some sources use the opposite sign, so check the definition.

| Symbol | Read as | Meaning and shape |
| --- | --- | --- |
| \(y\) | y | Actual observed target; scalar for this regression example |
| \(\hat y\) | y hat | Model prediction for the same sample; scalar |
| \(e\) | e | Signed prediction error; scalar, with the same units as y |

Multiply the inputs by their weights and add the bias to get \(\hat y\); then subtract the observed target \(y\) to get \(e\). A negative e means the prediction is too low; a positive e means it is too high; zero means it matches this target. The current numerical examples are unitless teaching data.

### Squared error and mean squared error

The squared error for one sample is \(e^2=(\hat y-y)^2\), a nonnegative scalar. Parentheses matter: when e is -4, its square is \((-4)^2=16\).

Mean squared error (MSE) is the average of squared errors across the specified samples. In the three-sample teaching example, predictions [9,19,8] and assigned targets [10,16,8] give errors [-1,3,0]:

\[
\mathrm{MSE}=\frac{(-1)^2+3^2+0^2}{3}.
\]

The denominator is 3 because all three samples are included. MSE is one scalar loss: a number used to measure prediction error. With physical targets, squared error and MSE have squared target units; this example is unitless.

## B4: average slope before derivatives

\(L(b)\), read “L of b,” is the scalar MSE when b is the varying scalar input. Hold the observed inputs, weights, and targets fixed. The parentheses indicate a function input, not multiplication.

Average slope is change in loss divided by change in b. For the interval from b=0 to b=1:

\[
\text{average slope}=\frac{L(1)-L(0)}{1-0}
=\frac{10/3-3}{1}=\frac13.
\]

Subtract in the same order in numerator and denominator; the two b values must differ. This is a slope over an interval, not the derivative at a point. In this toy example all quantities are unitless; with physical quantities the slope has loss units per unit of b.

### Derivative at one bias value

\(L'(1)\), read “L prime at one,” is the derivative of L with respect to its scalar input b, evaluated at b=1. It is a scalar local rate of change, with loss units per unit of b (unitless here). It is not the value L(1) itself. Other weights, inputs, and targets stay fixed.

For the smooth teaching loss \(L(b)=b^2-2b/3+3\), average slopes from b=1 over intervals that shrink to zero approach 4/3; hence \(L'(1)=4/3\). The numerical table illustrates this fact; a finite table alone does not prove a limit. With a positive derivative, a sufficiently small increase in b increases loss and a sufficiently small decrease lowers it. This is local information and does not guarantee improvement for an arbitrary finite step.

### One-parameter gradient descent

\[
b_{\text{new}}=b_{\text{old}}-\eta L'(b_{\text{old}}).
\]

All objects here are scalars. The labels “old” and “new” identify bias values before and after one update. Eta, \(\eta>0\), is the learning rate: it scales the derivative and controls the parameter change. It is not generally the parameter-change magnitude itself. With only one adjustable parameter, gradient descent uses its derivative; the other weights and observed data stay fixed.

For old bias 1, derivative 4/3, and eta 0.1, the learner's pending calculation is \(1-0.1\times4/3\). An overly large learning rate can raise the loss; the derivative describes local change. Correction note: the teaching loss expands to \(b^2-2b/3+3\); the previous coefficient -4/3 was an algebra typo, while the slope table and derivative at 1 were correct.

## 数、向量、矩阵与张量

| 符号 | 常见读法与含义 | 类型、形状或例子 |
|---|---|---|
| $\mathbb R$ | 实数集合 | $a\in\mathbb R$ 表示 $a$ 是标量 |
| $\in$ | 属于 | $x\in\mathbb R^{1\times d}$：$x$ 是实数行向量 |
| $x$ | 向量或局部定义的变量 | 本项目向量默认 $1\times d$，不只凭大小写判断 |
| $X\in\mathbb R^{n\times d}$ | $n$ 行、$d$ 列的实数矩阵 | 行可以是样本，也可以是 token；看上下文 |
| $\mathcal X\in\mathbb R^{B\times n\times d}$ | 三阶张量 | 例如批大小、序列长度、特征维度 |
| $X_{ij}$ | $X$ 的第 $i$ 行、第 $j$ 列元素 | 标量；本项目数学下标默认从 1 开始 |
| $x_i$ | 第 $i$ 个对象或第 $i$ 个分量 | 含义可能不同，必须结合局部定义 |
| $x^{(i)}$ | 常用于第 $i$ 个样本 | 括号上标通常是编号而非幂；有些资料用它标层数，先看定义 |
| $X_{i,:}$ | 第 $i$ 行所有列 | 数学解释为 $1\times d$；代码切片可能去掉该轴 |
| $X^\top$ | $X$ 转置 | 若 $X:n\times d$，则 $X^\top:d\times n$ |
| $I_d$ | $d$ 阶单位矩阵 | $d\times d$；对角线为 1，其余为 0 |
| $\mathbf 0,\mathbf 1$ | 全零、全一对象 | 形状必须另行指定 |
| $\operatorname{diag}(v)$ | 以 $v$ 为对角线的矩阵 | 长度为 $d$ 的向量生成 $d\times d$ 矩阵 |

“阶数”“形状”“秩”不是同一件事：张量阶数指轴的个数；形状是各轴长度；矩阵的秩 $\operatorname{rank}(X)$ 指线性独立行或列的最大数目。工程文档里的 “tensor rank” 有时指轴数，要先核对语境。

## 运算与几何

| 符号 | 读法与意义 | 形状、直觉或约束 |
|---|---|---|
| $AB$ | 矩阵乘法 | $(m\times k)(k\times n)\to m\times n$；内维度相等 |
| $qk^\top$ | 两个行向量的点积 | $(1\times d)(d\times1)\to1\times1$，视为标量 |
| $A\odot B$ | 逐元素乘法 | 默认形状一致；有广播时明确说明 |
| $|a|$ | 标量 $a$ 的绝对值 | 对矩阵使用单竖线还可能表示行列式，需看上下文 |
| $\lVert x\rVert_1$ | $x$ 的一范数 | $\sum_j|x_j|$；与平方 L2 惩罚的几何性质不同 |
| $\lVert x\rVert_2$ | $x$ 的二范数、欧氏长度 | $\sqrt{\sum_jx_j^2}$，结果为非负标量 |
| $\lVert x\rVert_2^2$ | 二范数的平方 | $\sum_jx_j^2$；Ridge 常使用这个量作为惩罚 |
| $\lVert X\rVert_F$ | $X$ 的 Frobenius 范数 | $\sqrt{\sum_{ij}X_{ij}^2}$ |
| $\sum_{i=1}^n a_i$ | 从 $i=1$ 到 $n$ 求和 | $i$ 是临时下标，不是一个固定参数 |
| $\prod_{i=1}^n a_i$ | 从 $i=1$ 到 $n$ 连乘 | 常在联合概率或似然中出现 |
| $\exp(z)=e^z$ | 自然指数函数 | 本身不代表概率，还需适当归一化 |
| $\ln z$ | 自然对数 | $z>0$；与 $\exp$ 互为反函数 |
| $\log z$ | 对数 | 本项目无特别声明时指自然对数；信息论可能使用底 2 |
| $\sqrt d$ | $d$ 的平方根 | Attention 中常用于得分缩放 |
| $\propto$ | 正比于 | 省略的归一化常数可能依赖其他变量 |
| $\approx$ | 近似相等 | 可能来自四舍五入、数值估计或建模假设 |
| $\arg\min_\theta L(\theta)$ | 使损失最小的参数 | 返回参数；$\min_\theta L(\theta)$ 返回最小损失值 |
| $\arg\max_\theta \mathcal L(\theta)$ | 使目标最大的参数 | MLE 中常最大化似然；与最大值本身不同 |

代码中的 `*` 常表示逐元素乘法，`@` 常表示矩阵乘法；不能把纸面公式的相邻书写直接翻译成 `*`。

## 微积分、梯度与反向传播

设 $f:\mathbb R^d\to\mathbb R$，$y:\mathbb R^d\to\mathbb R^m$。以下定义固定分量顺序，避免不同教材的 Jacobian 布局差异。

| 符号 | 含义 | 本项目约定 |
|---|---|---|
| $\frac{df}{dx}$ | 单变量函数的导数 | 描述局部变化率 |
| $\frac{\partial f}{\partial x_j}$ | 偏导数 | 改变 $x_j$，其他坐标暂时固定 |
| $\nabla_x f$ | $f$ 对 $x$ 的梯度 | 由偏导数组成；与被求导参数同形状 |
| $\frac{\partial L}{\partial W}$ | 损失对参数矩阵的梯度 | 元素为 $\partial L/\partial W_{ij}$，与 $W$ 同形状 |
| $J_y(x)$ | Jacobian、雅可比矩阵 | $[J_y]_{ij}=\partial y_i/\partial x_j$，形状 $m\times d$ |
| $H_f(x)$ | Hessian、海森矩阵 | $[H_f]_{ij}=\partial^2 f/(\partial x_i\partial x_j)$，形状 $d\times d$ |
| $\eta$ | eta，学习率 | 标量步长；不是越大越好 |
| $\theta$ | theta，所有待训练参数的统称 | 可以是多个矩阵、向量组成的集合 |
| $\lambda$ | lambda，常表示正则强度 | 在 $L+\lambda R$ 中平衡拟合与惩罚；在线代中也常表示特征值 |
| $L(\theta)$ | 总损失或批次平均损失 | 标量；求和还是平均必须明示 |
| $\ell(\hat y,y)$ | 单个样本或 token 的损失 | 标量；具体定义依任务而定 |
| $\hat y$ | y hat，预测值 | 与目标 $y$ 区分；可能是数值或分布 |

梯度下降写为：

$$\theta_{t+1}=\theta_t-\eta\nabla_\theta L(\theta_t).$$

读作：“新参数等于旧参数减去学习率乘以当前位置的梯度。”下标 $t$ 是更新步数。对可微函数，在梯度非零、方向长度按欧氏范数衡量时，负梯度方向是局部最陡下降方向；有限步长不保证损失一定下降。

对于行向量 $x:1\times d$、$y:1\times m$，按上述 Jacobian 定义，局部变化满足 $\Delta y\approx\Delta x J_y^\top$。若 $g_y=\nabla_y L:1\times m$，则链式法则给出：

$$g_x=g_yJ_y\in\mathbb R^{1\times d}.$$

一个常用检查：$Z=XW$，其中 $X:n\times d$、$W:d\times h$、上游梯度 $G=\partial L/\partial Z:n\times h$，则

$$\frac{\partial L}{\partial W}=X^\top G\in\mathbb R^{d\times h},\qquad\frac{\partial L}{\partial X}=GW^\top\in\mathbb R^{n\times d}.$$

这些公式假设 $L$ 对 $X,W$ 的这条依赖经过 $Z$；若存在其他路径，还要把各路径贡献相加。

## 概率、统计与信息论

| 符号 | 读法与含义 | 关键区别 |
|---|---|---|
| $P(A)$ | 事件 $A$ 的概率 | 位于 $[0,1]$ |
| $p(x)$ | 概率质量或概率密度 | 连续密度的数值可以大于 1；区间积分才是概率 |
| $p(y\mid x)$ | 给定 $x$ 时 $y$ 的条件分布 | 竖线读“在……条件下” |
| $X\sim p$ | 随机变量 $X$ 服从分布 $p$ | 此处 $X$ 是随机变量，不是默认的输入矩阵 |
| $\mathbb E_{X\sim p}[f(X)]$ | 按分布 $p$ 求期望 | 离散情况为 $\sum_xp(x)f(x)$，连续情况用积分 |
| $\operatorname{Var}(X)$ | $X$ 的方差 | $\mathbb E[(X-\mathbb EX)^2]$ |
| $\bar x$ | x bar，样本均值 | $\frac1n\sum_i x_i$，由有限观测计算；与总体期望区分 |
| $\operatorname{Cov}(X,Y)$ | 协方差 | $\mathbb E[(X-\mathbb EX)(Y-\mathbb EY)]$，反映线性共同变化 |
| $\rho_{XY}$ | rho，Pearson 相关系数 | $\operatorname{Cov}(X,Y)/(\sigma_X\sigma_Y)$；要求两个方差有限且非零，取值在 $[-1,1]$ |
| $\operatorname{Bernoulli}(p)$ | 伯努利分布 | 0/1 结果，取 1 的概率为 $p$；sigmoid 常用于输出这个概率参数 |
| $\operatorname{Categorical}(p_1,\ldots,p_K)$ | 类别分布 | $K$ 类概率非负且总和为 1；softmax 常用于生成这组参数 |
| $\mathcal N(\mu,\sigma^2)$ | 均值 $\mu$、方差 $\sigma^2$ 的正态分布 | 标准差为 $\sigma$ |
| $p_\theta(y\mid x)$ | 参数为 $\theta$ 的条件模型 | 参数下标不是一个样本序号 |
| $H(p)$ | 分布 $p$ 的熵 | 离散情况为 $-\sum_xp(x)\log p(x)$ |
| $H(p,q)$ | $p$ 对 $q$ 的交叉熵 | $-\sum_xp(x)\log q(x)$ |
| $D_{\mathrm{KL}}(p\|q)$ | KL 散度 | $\sum_xp(x)\log[p(x)/q(x)]$，一般不对称 |
| $-\log p_\theta(y\mid x)$ | 负对数似然，NLL | 正确目标被赋予更高概率时，这个损失更小 |

对离散分布有 $H(p,q)=H(p)+D_{\mathrm{KL}}(p\|q)$。若 $p(x)>0$ 而 $q(x)=0$，相应交叉熵和 KL 散度可为无穷大。采用自然对数时信息量单位为 nat；采用底 2 时单位为 bit。

LLM 常用的自回归分解和训练目标是：

$$p_\theta(x_{1:T})=\prod_{t=1}^T p_\theta(x_t\mid x_{<t}),\qquad L=-\frac1T\sum_{t=1}^T\log p_\theta(x_t\mid x_{<t}).$$

读作：“序列概率分解成每一步在已有前缀下的条件概率；训练最小化目标 token 的平均负对数概率。”实际训练还要说明起始标记、哪些位置计入损失，以及 padding 的处理方式。

## Attention 与 Transformer

| 符号 | 含义 | 单序列、单头的默认形状 |
|---|---|---|
| $n$ | 序列长度 | 标量；其他场景可能表示样本数 |
| $B$ | 批大小 | 标量；批轴可添加在所有张量之前 |
| $d_{\text{model}}$ | 模型隐藏表示的宽度 | 每个 token 的特征数 |
| $d_k,d_v$ | 查询/键的宽度，值的宽度 | 标量；两者不必相同 |
| $Q=XW_Q$ | Query，查询 | $n\times d_k$ |
| $K=XW_K$ | Key，键 | $n\times d_k$ |
| $V=XW_V$ | Value，值 | $n\times d_v$ |
| $S=QK^\top/\sqrt{d_k}$ | 缩放后的匹配得分 | $n\times n$ |
| $M$ | 加性掩码 | $n\times n$；允许位置为 0，禁止位置为 $-\infty$ |
| $P=\operatorname{softmax}_{\text{row}}(S+M)$ | 注意力权重矩阵 | $n\times n$；每个有效行的和为 1 |
| $O=PV$ | 注意力输出 | $n\times d_v$ |
| $h$ | 注意力头数 | 各头学习不同投影；不是序列长度 |
| $W_O$ | 多头拼接后的输出投影 | 常为 $(h d_v)\times d_{\text{model}}$ |
| $\tau$ | tau，温度 | $\tau>0$；$\operatorname{softmax}(s/\tau)$ 可调分布集中程度 |

softmax 对一行得分 $s$ 的第 $j$ 个分量定义为：

$$\operatorname{softmax}(s)_j=\frac{e^{s_j}}{\sum_k e^{s_k}}=\frac{e^{s_j-c}}{\sum_k e^{s_k-c}}.$$

常取 $c=\max_k s_k$ 改善数值稳定性。softmax 在 Attention 中沿“键的位置”归一化；在输出层则常沿“词表”归一化。两者计算形式相同，对象与含义不同。

## 同一个字母，可能是不同对象

| 写法 | 容易混淆的含义 | 判断办法 |
|---|---|---|
| $X$ | 数据矩阵 / 随机变量 | 看是否有矩阵形状，还是 $X\sim p$ 等概率表述 |
| $P$ | 事件概率记号 / 注意力权重矩阵 | 本节 $P:n\times n$；$P(A)$ 表示事件概率 |
| $A$ | 一般矩阵 / 注意力权重 | 查局部定义；有些资料用 $AV$ 表示注意力输出 |
| $W$ | 线性层参数 / 多个参数的统称 | 先标注具体形状 |
| $\sigma$ | 标准差 / sigmoid / 奇异值 | 分别看概率分布、函数输入、SVD 上下文 |
| $H$ | 熵 / Hessian / 隐藏状态 | 看参数、下标和形状，不能靠字母猜 |
| $T$、$\top$ | 序列长度 / 转置 | 本项目转置写 $\top$，避免把上标 T 与长度混淆 |
| $d$ | 特征维度 / 微分记号的一部分 | $d_k$ 是维度；$df/dx$ 中的 $d$ 是微分记号 |

每次引入新公式，先在公式下写一行“对象 → 含义 → 形状”，再计算。回到[首课](../lessons/01-tensor-to-attention.md)可以立即练习这套读法。
