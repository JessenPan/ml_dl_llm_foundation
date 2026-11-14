# Watermelon Book coverage

This map refers to **Zhou Zhihua's _Machine Learning_**, commonly called the “Watermelon Book” (`西瓜书`). The current course now integrates all classic chapters into one expanded ML → DL → LLM route. It is a guided learning plan, not a promise to reproduce every page, proof, or exercise.

## Chapter map

| Book chapter | Current route | Status |
| --- | --- | --- |
| 1. Introduction (`绪论`) | Integrated route Week 1; project goals and learning vocabulary | Planned in main route |
| 2. Model evaluation and selection (`模型评估与选择`) | Integrated route Week 1; train/validation/test split, generalization, leakage, metrics, and cross-validation | Planned in main route |
| 3. Linear models (`线性模型`) | Integrated route Week 2; B0–B3 and M4: linear regression, logistic regression, loss, and regularization | Planned in main route |
| 4. Decision trees (`决策树`) | Integrated route Week 3 | Planned in main route |
| 5. Neural networks (`神经网络`) | Integrated route Week 15; M5–M6: MLP, backpropagation, optimization, and training stability | Planned in main route, with a DL focus |
| 6. Support vector machines (`支持向量机`) | Integrated route Week 5 | Planned in main route |
| 7. Bayesian classifiers (`贝叶斯分类器`) | Integrated route Week 4; B6/M3: conditional probability, Bayes, common distributions, MLE/MAP, and Naive Bayes | Planned in main route |
| 8. Ensemble learning (`集成学习`) | Integrated route Week 6 | Planned in main route |
| 9. Clustering (`聚类`) | Integrated route Week 7 | Planned in main route |
| 10. Dimensionality reduction and metric learning (`降维与度量学习`) | Integrated route Week 8; PCA foundation already appears in M1 | Planned in main route |
| 11. Feature selection and sparse learning (`特征选择与稀疏学习`) | Integrated route Week 9; L1/Lasso and L2/Ridge already appear in B8/M4 | Planned in main route |
| 12. Computational learning theory (`计算学习理论`) | Integrated route Week 10; generalization already appears in M4 | Planned in main route |
| 13. Semi-supervised learning (`半监督学习`) | Integrated route Week 11 | Planned in main route |
| 14. Probabilistic graphical models (`概率图模型`) | Integrated route Week 12 | Planned in main route |
| 15. Rule learning (`规则学习`) | Integrated route Week 13 | Planned in main route |
| 16. Reinforcement learning (`强化学习`) | Integrated route Week 14; later connected to RLHF boundaries | Planned in main route |

The current route also contains topics beyond the book: CNNs, RNNs/GRUs/LSTMs, Attention, Transformer blocks, autoregressive language modeling, prompt engineering, RAG, agents, inference, KV cache, LoRA, and a small decoder-only Transformer.

## What this means

The book content is now mixed into the same route. Earlier foundation modules are reused, and the missing classical chapters appear before or around the deep learning modules where their dependencies fit.

The route also includes Andrew Ng-inspired practice: start with a baseline, inspect errors, use train/dev/test carefully, compare learning curves, check distribution mismatch, and change one major factor at a time.

Coverage is a plan, not proof of mastery. A chapter becomes learned only after explanation, calculation, and at least one changed-condition exercise. See [INTEGRATED_ROUTE.md](INTEGRATED_ROUTE.md) for the canonical order.
