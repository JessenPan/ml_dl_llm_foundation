# Integrated ML → DL → LLM route

This is the canonical expanded route. It combines the full classic 16-chapter scope of Zhou Zhihua's **Machine Learning** (the “Watermelon Book”) with the current mathematics, deep learning, and LLM route. Andrew Ng-inspired ideas are woven into the same modules.

There is one route. Topics are placed where their mathematics and dependencies make sense. The plan is about **26–30 weeks at 4–6 hours per week**, but mastery decides the pace. Some foundation weeks may be short; difficult topics may take longer.

The course does not claim to reproduce every book page, proof, video, or exercise. Each topic counts as learned only after an explanation, a small calculation or derivation, and a changed-condition exercise.

## Phase 0 · Foundation bridge

**B0–B8, before or alongside Weeks 1–4**

Use one small prediction problem to learn notation, vectors, matrices, loss, derivatives, probability, statistics, L1/L2 regularization, and gradient updates. See [FOUNDATION_BRIDGE.md](FOUNDATION_BRIDGE.md).

Andrew Ng-style teaching ideas start here: simple baselines, vectorization, cost functions, train/dev/test thinking, learning curves, and error analysis.

## Phase 1 · Classical ML foundations and the Watermelon Book

| Week | Main question | Watermelon Book | Andrew Ng-inspired concepts |
| --- | --- | --- | --- |
| 1 | What is a learning problem, and how do we measure it? | Ch. 1–2: introduction; model evaluation and selection | Baselines, train/dev/test, cross-validation, learning curves, bias/variance, error analysis, distribution mismatch |
| 2 | How can a model fit a number or a class? | Ch. 3: linear models | Linear/logistic regression, cost functions, gradient descent, feature engineering, vectorization, regularization |
| 3 | How can a model split data with useful questions? | Ch. 4: decision trees | Entropy, information gain, Gini, pruning, tree ensembles preview |
| 4 | How can probability describe class membership? | Ch. 7: Bayesian classifiers | Bayes rule, Naive Bayes, MLE/MAP, Bernoulli/Categorical/Gaussian models, class imbalance |
| 5 | What does a large margin mean? | Ch. 6: support vector machines | Margin, hinge loss, kernels, dual intuition, feature scaling |
| 6 | How can many weak models work together? | Ch. 8: ensemble learning | Bagging, random forest, boosting, AdaBoost, gradient boosting, error analysis |
| 7 | Can we find structure without labels? | Ch. 9: clustering | k-means, hierarchical clustering, DBSCAN, cluster evaluation, anomaly detection |
| 8 | Can we represent data with fewer useful directions? | Ch. 10: dimensionality reduction and metric learning | PCA/SVD, reconstruction, visualization, distance metrics, metric learning intuition |
| 9 | Which features should remain, and how can a model be sparse? | Ch. 11: feature selection and sparse learning | L1/Lasso, L2/Ridge, elastic net, coordinate/proximal intuition, feature scaling |
| 10 | Why can a model generalize, and when can it fail? | Ch. 12: computational learning theory | Hypothesis space, capacity, VC/PAC intuition, generalization bounds, human-level baseline |
| 11 | How can unlabeled data help? | Ch. 13: semi-supervised learning | Self-training, co-training, graph-based methods, pseudo-label risks, data-centric improvement |
| 12 | How can probability describe a whole system of variables? | Ch. 14: probabilistic graphical models | Bayesian networks, Markov networks, factorization, conditional independence, inference intuition |
| 13 | How can rules describe decisions? | Ch. 15: rule learning | Rule induction, covering, conflicts, interpretability, limits of hand-built rules |
| 14 | How can an agent learn from actions and rewards? | Ch. 16: reinforcement learning | MDP, return, value function, Q-function, Bellman equation, policy/value iteration; bridge to RLHF without equating them |

The book's Ch. 1–3, 5, 7, 10, and 11 reuse the foundation bridge and earlier modules. They still receive explicit lessons and exercises; reuse means less duplicated explanation, not removal.

Throughout Phase 1, use Andrew Ng's project habits: choose a baseline, inspect errors, separate train/dev/test distributions, change one major factor at a time, and record what the experiment can and cannot show.

## Phase 2 · Deep learning foundations

| Week | Main question | Topics |
| --- | --- | --- |
| 15 | How does a multilayer model learn? | MLP, activations, softmax, cross-entropy, vectorized forward/backward pass, backpropagation; Watermelon Ch. 5 |
| 16 | Why does training become unstable? | Initialization, mini-batches, gradient checking, dropout, L2 regularization, BatchNorm/LayerNorm, SGD with momentum, Adam, hyperparameter search |
| 17 | How can a model use local patterns? | CNN, convolution, pooling, receptive field, residual connections, transfer learning |
| 18 | How can a model process a sequence? | Embeddings, RNN, GRU, LSTM, teacher forcing, sequence loss, vanishing/exploding gradients |
| 19 | How can one position select information from another? | Query/key/value, scaled dot-product attention, masking, multi-head attention |
| 20 | How do attention layers form a Transformer? | Residual stream, normalization, feed-forward network, positional encoding, RoPE, encoder/decoder/decoder-only shapes |

## Phase 3 · LLM theory and applications

| Week | Main question | Topics |
| --- | --- | --- |
| 21 | How does text become a training problem? | Tokenization, IDs, embeddings, logits, autoregressive objective, teacher forcing, padding masks, perplexity |
| 22 | How do we ask a model for useful work? | Prompt engineering: clear instructions, roles, examples, iterative refinement, summarize, infer, transform, expand; prompt evaluation |
| 23 | How can a model use external knowledge? | Embeddings for retrieval, chunking, vector search, reranking, RAG, grounding, citation checks, retrieval evaluation |
| 24 | How can we adapt a model? | Pretraining vs SFT vs prompting, transfer learning, PEFT, LoRA, alignment concepts, preference data, RLHF/DPO boundaries |
| 25 | How does generation work after training? | Greedy/temperature/top-k/top-p sampling, prefill/decode, KV cache, latency and memory trade-offs, hallucination evaluation |
| 26 | How do we build reliable LLM systems? | Evaluation sets, task metrics, human review, failure analysis, data quality, tool use, agents, safety and responsible AI |

Andrew Ng-inspired LLM work stays connected to evaluation: a prompt, RAG system, or agent is not “working” because one example looks good. Define a test set, inspect failures, and check whether retrieved evidence supports the answer.

## Phase 4 · Integration and evidence

**Weeks 27–30 as needed**

- Build a tiny decoder-only Transformer on a very small dataset.
- Explain every shape from token IDs to loss and one parameter gradient.
- Compare at least one classical baseline, one neural baseline, and one Transformer setting.
- Run one changed-condition experiment: for example, remove positional information, change the mask, alter regularization, or change the retrieval context.
- Read selected formulas from the Watermelon Book, _Deep Learning_, Transformer papers, LoRA, and an LLM application paper.
- Record what the experiment proves, what it does not prove, and which evidence supports the next curriculum adjustment.

## Progress rule

Each module records four separate abilities:

1. **Intuition:** explain the idea in simple English.
2. **Notation and shape:** identify every object and dimension.
3. **Calculation or derivation:** solve a small example.
4. **Transfer:** solve a changed-condition problem or diagnose a failure.

English difficulty and mathematical difficulty are recorded separately. A learner may understand a formula but need simpler English, or understand the English but need more help with the derivation.
