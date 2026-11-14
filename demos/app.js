(() => {
  'use strict';

  const $ = id => document.getElementById(id);
  const colors = { ink: '#202b2a', muted: '#596662', grid: '#ccd7cd', accent: '#147d6a', key: '#81918a', paper: '#eef1e9' };
  const keys = [[1, 0], [0, 1], [-1, 0]];
  const values = keys.map(v => [...v]);
  const attention = { angle: 0, mask: false, position: 1 };
  const training = { w: [2, 1.2], history: [[2, 1.2]], step: 0, eta: 0.15, rotation: -35, timer: null, stopped: false };
  const fixed = (n, digits = 3) => (Math.abs(n) < 0.5 * 10 ** -digits ? 0 : n).toFixed(digits);
  const vectorText = v => `[${v.map(x => fixed(x)).join(', ')}]`;
  const loss = w => 0.5 * (w[0] ** 2 + 4 * w[1] ** 2);
  const gradient = w => [w[0], 4 * w[1]];

  function canvasContext(id) {
    const canvas = $(id);
    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height) return null;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    const ctx = canvas.getContext('2d');
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.font = '12px system-ui, sans-serif';
    return { ctx, width, height };
  }

  function line(ctx, start, end, color, width = 1, dash = []) {
    ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = width; ctx.setLineDash(dash);
    ctx.moveTo(...start); ctx.lineTo(...end); ctx.stroke(); ctx.setLineDash([]);
  }

  function arrow(ctx, start, end, color, width = 2, dash = []) {
    line(ctx, start, end, color, width, dash);
    const angle = Math.atan2(end[1] - start[1], end[0] - start[0]);
    const head = 7;
    ctx.beginPath(); ctx.fillStyle = color;
    ctx.moveTo(...end);
    ctx.lineTo(end[0] - head * Math.cos(angle - 0.4), end[1] - head * Math.sin(angle - 0.4));
    ctx.lineTo(end[0] - head * Math.cos(angle + 0.4), end[1] - head * Math.sin(angle + 0.4));
    ctx.closePath(); ctx.fill();
  }

  function attentionState() {
    const angle = attention.angle * Math.PI / 180;
    const q = [Math.cos(angle), Math.sin(angle)];
    const scores = keys.map((k, j) => attention.mask && j >= attention.position ? -Infinity : (q[0] * k[0] + q[1] * k[1]) / Math.sqrt(2));
    const max = Math.max(...scores);
    const exp = scores.map(s => Math.exp(s - max));
    const denominator = exp.reduce((a, b) => a + b, 0);
    const weights = exp.map(e => e / denominator);
    const output = [0, 1].map(d => weights.reduce((sum, p, j) => sum + p * values[j][d], 0));
    return { q, scores, weights, output };
  }

  function drawAttention(state) {
    const surface = canvasContext('attention-canvas');
    if (!surface) return;
    const { ctx, width, height } = surface;
    const scale = Math.min((width - 80) / 2.5, (height - 82) / 2.5);
    const center = [width / 2, height / 2 + 4];
    const point = v => [center[0] + v[0] * scale, center[1] - v[1] * scale];
    ctx.strokeStyle = colors.grid; ctx.lineWidth = 1;
    ctx.setLineDash([3, 5]); ctx.beginPath(); ctx.arc(...center, scale, 0, 2 * Math.PI); ctx.stroke(); ctx.setLineDash([]);
    line(ctx, point([-1.25, 0]), point([1.25, 0]), colors.grid);
    line(ctx, point([0, -1.2]), point([0, 1.2]), colors.grid);
    ctx.fillStyle = colors.muted; ctx.font = '11px system-ui, sans-serif';
    ctx.textAlign = 'right'; ctx.fillText('第 1 维', width - 15, center[1] + 34);
    ctx.textAlign = 'left'; ctx.fillText('第 2 维', center[0] + 13, 21);
    ctx.fillText('0', center[0] - 14, center[1] + 16);
    ctx.textAlign = 'center';
    keys.forEach((k, j) => {
      const visible = !attention.mask || j < attention.position;
      arrow(ctx, center, point(k), visible ? colors.key : '#bac5bc', 1.5, visible ? [] : [2, 4]);
      const end = point(k);
      ctx.fillStyle = visible ? colors.muted : '#7b877f';
      const label = `k${['₁', '₂', '₃'][j]}${visible ? '' : ' ×'}`;
      ctx.fillText(label, end[0], end[1] + (j === 1 ? -15 : 24));
    });
    arrow(ctx, center, point(state.q), colors.accent, 3);
    const qEnd = point(state.q);
    ctx.font = '600 14px system-ui, sans-serif'; ctx.fillStyle = colors.accent;
    // Offset the query label tangentially, separating it from each fixed key label.
    const tangent = [-state.q[1], -state.q[0]];
    ctx.fillText('q', qEnd[0] + tangent[0] * 20 + state.q[0] * 10, qEnd[1] + tangent[1] * 20 - state.q[1] * 10 + 4);
    if (Math.hypot(...state.output) > 0.001) arrow(ctx, center, point(state.output), colors.ink, 2, [5, 4]);
    const oEnd = point(state.output);
    ctx.fillStyle = colors.ink; ctx.font = '600 12px system-ui, sans-serif';
    ctx.fillText('o', oEnd[0] + 11, oEnd[1] + 17);
    ctx.beginPath(); ctx.fillStyle = colors.ink; ctx.arc(...center, 3, 0, Math.PI * 2); ctx.fill();
    $('attention-canvas').setAttribute('aria-label', `查询 q=${vectorText(state.q)}；加权输出 o=${vectorText(state.output)}。三个键分别为 [1,0]、[0,1]、[-1,0]。`);
  }

  function updateAttention(announce = false) {
    const state = attentionState();
    $('query-angle-value').textContent = `${attention.angle}°`;
    $('query-vector').textContent = `q = ${vectorText(state.q)}`;
    $('query-position').disabled = !attention.mask;
    $('mask-help').textContent = attention.mask ? `位置 ${attention.position} 只能读取 1–${attention.position}；未来位置权重为 0。` : '当前可读取全部 3 个位置。';
    state.scores.forEach((s, j) => {
      $(`score-${j}`).textContent = Number.isFinite(s) ? fixed(s) : '−∞';
      $(`weight-${j}`).textContent = `${(state.weights[j] * 100).toFixed(1)}%`;
      $(`bar-${j}`).style.width = `${state.weights[j] * 100}%`;
    });
    $('attention-output').textContent = vectorText(state.output);
    if (announce) $('attention-status').textContent = `查询方向 ${attention.angle} 度，权重 ${state.weights.map(w => `${(w * 100).toFixed(1)}%`).join('、')}，输出 ${vectorText(state.output)}。`;
    drawAttention(state);
  }

  function drawGradient() {
    const surface = canvasContext('gradient-canvas');
    if (!surface) return;
    const { ctx, width, height } = surface;
    const theta = training.rotation * Math.PI / 180;
    const raw = (x, y, z) => {
      const horizontal = x * Math.cos(theta) - y * Math.sin(theta);
      const depth = x * Math.sin(theta) + y * Math.cos(theta);
      const scaledZ = z * 0.32;
      return [horizontal, -depth * 0.55 - scaledZ * 0.835, depth * 0.835 - scaledZ * 0.55];
    };
    const vertices = [];
    const divisions = 20;
    for (let i = 0; i <= divisions; i++) {
      vertices[i] = [];
      for (let j = 0; j <= divisions; j++) {
        const x = -3 + 6 * i / divisions, y = -3 + 6 * j / divisions;
        vertices[i][j] = { x, y, z: loss([x, y]), raw: raw(x, y, loss([x, y])) };
      }
    }
    const all = vertices.flat().map(v => v.raw).concat([raw(-3.3, 0, 0), raw(3.3, 0, 0), raw(0, -3.3, 0), raw(0, 3.3, 0)]);
    const minX = Math.min(...all.map(p => p[0])), maxX = Math.max(...all.map(p => p[0]));
    const minY = Math.min(...all.map(p => p[1])), maxY = Math.max(...all.map(p => p[1]));
    const scale = Math.min((width - 64) / (maxX - minX), (height - 70) / (maxY - minY));
    const mapRaw = p => [(p[0] - (minX + maxX) / 2) * scale + width / 2, (p[1] - (minY + maxY) / 2) * scale + height / 2];
    const project = (x, y, z) => mapRaw(raw(x, y, z));

    // The wire mesh is an orthographic projection of the actual loss function.
    // Draw tiles from far to near with translucent fills to retain trajectory visibility.
    const tiles = [];
    for (let i = 0; i < divisions; i++) for (let j = 0; j < divisions; j++) {
      const corners = [vertices[i][j], vertices[i + 1][j], vertices[i + 1][j + 1], vertices[i][j + 1]];
      tiles.push({ corners, depth: corners.reduce((s, p) => s + p.raw[2], 0) / 4, z: corners.reduce((s, p) => s + p.z, 0) / 4 });
    }
    tiles.sort((a, b) => b.depth - a.depth);
    for (const tile of tiles) {
      const pts = tile.corners.map(p => mapRaw(p.raw));
      ctx.beginPath(); ctx.moveTo(...pts[0]); pts.slice(1).forEach(p => ctx.lineTo(...p)); ctx.closePath();
      ctx.fillStyle = `rgba(42, 119, 94, ${0.025 + (1 - tile.z / 22.5) * 0.10})`;
      ctx.fill(); ctx.strokeStyle = 'rgba(77, 118, 95, 0.22)'; ctx.lineWidth = 0.6; ctx.stroke();
    }
    const origin = project(0, 0, 0);
    arrow(ctx, origin, project(3.35, 0, 0), colors.key, 1);
    arrow(ctx, origin, project(0, 3.35, 0), colors.key, 1);
    arrow(ctx, project(-3, -3, 0), project(-3, -3, 22.5), colors.key, 1);
    ctx.fillStyle = colors.muted; ctx.font = '12px system-ui, sans-serif'; ctx.textAlign = 'center';
    const xLabel = project(3.35, 0, 0), yLabel = project(0, 3.35, 0), zLabel = project(-3, -3, 22.5);
    const safeLabel = (text, p, dy = 0) => ctx.fillText(text, Math.max(17, Math.min(width - 17, p[0])), Math.max(18, Math.min(height - 12, p[1] + dy)));
    safeLabel('w₁', xLabel, 17); safeLabel('w₂', yLabel, 17); safeLabel('L', zLabel, -8);
    // The complete trajectory is highlighted over the translucent mesh for study.
    const insideHistory = training.history.filter(w => w.every(v => Math.abs(v) <= 3));
    if (insideHistory.length) {
      ctx.beginPath(); ctx.setLineDash([]); ctx.lineWidth = 2.5; ctx.strokeStyle = colors.accent;
      insideHistory.forEach((w, i) => { const p = project(...w, loss(w)); i ? ctx.lineTo(...p) : ctx.moveTo(...p); }); ctx.stroke();
      const start = project(...insideHistory[0], loss(insideHistory[0]));
      ctx.beginPath(); ctx.arc(...start, 4, 0, Math.PI * 2); ctx.fillStyle = colors.paper; ctx.fill(); ctx.strokeStyle = colors.accent; ctx.lineWidth = 1.5; ctx.stroke();
    }
    if (training.w.every(v => Math.abs(v) <= 3)) {
      const current = project(...training.w, loss(training.w));
      line(ctx, project(...training.w, 0), current, colors.accent, 1, [3, 4]);
      ctx.beginPath(); ctx.arc(...current, 5.5, 0, 2 * Math.PI); ctx.fillStyle = colors.accent; ctx.fill();
      ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2; ctx.stroke();
    } else {
      ctx.fillStyle = '#8a4a1a'; ctx.textAlign = 'left'; ctx.font = '12px system-ui, sans-serif';
      ctx.fillText('当前参数已越出曲面显示范围', 15, height - 15);
    }
    ctx.beginPath(); ctx.arc(...origin, 2.5, 0, Math.PI * 2); ctx.fillStyle = colors.ink; ctx.fill();
    $('gradient-canvas').setAttribute('aria-label', `损失曲面 L=½(w₁²+4w₂²)。已更新 ${training.step} 步，参数 ${vectorText(training.w)}，损失 ${fixed(loss(training.w), 6)}。`);
  }

  function status(text, warning = false) {
    $('gradient-status').textContent = text;
    $('gradient-status').classList.toggle('warning', warning);
  }

  function updateGradient() {
    $('learning-rate-value').textContent = training.eta.toFixed(2);
    $('surface-rotation-value').textContent = `${training.rotation}°`;
    $('stability-hint').textContent = training.eta < 0.5 ? '0 < η < 0.5：这个曲面上的固定步长更新会收敛。' : training.eta === 0.5 ? 'η = 0.5：第二个参数会等幅振荡，无法到达谷底。' : 'η > 0.5：第二个参数的振幅逐步增大，出现发散。';
    $('stability-hint').style.color = training.eta >= 0.5 ? '#8a4a1a' : colors.muted;
    $('step-value').textContent = String(training.step);
    $('parameter-value').textContent = vectorText(training.w);
    $('gradient-value').textContent = vectorText(gradient(training.w));
    $('loss-value').textContent = fixed(loss(training.w), 6);
    $('gradient-step').disabled = training.stopped || training.timer !== null;
    $('gradient-play').disabled = training.stopped;
    $('gradient-play').textContent = training.timer === null ? '播放' : '暂停';
    drawGradient();
  }

  function pause(announce = false) {
    if (training.timer !== null) window.clearInterval(training.timer);
    training.timer = null;
    if (announce && !training.stopped) status(`已暂停在第 ${training.step} 步。可以调整学习率后继续。`);
    updateGradient();
  }

  function step(announce = true) {
    if (training.stopped) return;
    const g = gradient(training.w);
    training.w = training.w.map((w, i) => w - training.eta * g[i]);
    training.history.push([...training.w]);
    training.step += 1;
    const norm = Math.hypot(...gradient(training.w));
    if (training.w.some(v => Math.abs(v) > 3)) {
      training.stopped = true; pause();
      status(`第 ${training.step} 步已越出 |w₁|、|w₂| ≤ 3 的显示范围；实际参数 ${vectorText(training.w)} 已保留。请重置后比较其他学习率。`, true);
    } else if (norm < 1e-4) {
      training.stopped = true; pause(); status(`已停止：梯度范数 ${norm.toExponential(2)} < 10⁻⁴，参数已接近谷底。`);
    } else if (training.step >= 80) {
      training.stopped = true; pause(); status('已完成 80 步。观察当前结果，重置后可比较另一种学习率。');
    } else if (announce) {
      status(`第 ${training.step} 步：沿负梯度更新，损失为 ${fixed(loss(training.w), 6)}。`);
    }
    updateGradient();
  }

  $('query-angle').addEventListener('input', e => { attention.angle = Number(e.target.value); updateAttention(); });
  $('query-angle').addEventListener('change', () => updateAttention(true));
  $('causal-mask').addEventListener('change', e => { attention.mask = e.target.checked; updateAttention(true); });
  $('query-position').addEventListener('change', e => { attention.position = Number(e.target.value); updateAttention(true); });
  $('learning-rate').addEventListener('input', e => { training.eta = Number(e.target.value); updateGradient(); });
  $('surface-rotation').addEventListener('input', e => { training.rotation = Number(e.target.value); updateGradient(); });
  $('gradient-step').addEventListener('click', () => step());
  $('gradient-play').addEventListener('click', () => {
    if (training.timer !== null) { pause(true); return; }
    if (training.stopped) return;
    status('正在逐步更新。可暂停，或调整学习率观察下一步。');
    training.timer = window.setInterval(() => step(false), 450);
    updateGradient();
  });
  $('gradient-reset').addEventListener('click', () => {
    pause(); training.w = [2, 1.2]; training.history = [[2, 1.2]]; training.step = 0; training.stopped = false;
    status('已回到 [2, 1.2]，保留当前学习率与观察角度。'); updateGradient();
  });

  const tabs = [$('tab-attention'), $('tab-gradient')];
  function selectTab(index) {
    if (index === 0 && training.timer !== null) pause(true);
    tabs.forEach((tab, i) => {
      tab.classList.toggle('active', i === index);
      tab.setAttribute('aria-selected', String(i === index)); tab.tabIndex = i === index ? 0 : -1;
      $(tab.getAttribute('aria-controls')).hidden = i !== index;
    });
    updateAttention(); updateGradient();
  }
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => selectTab(i));
    tab.addEventListener('keydown', e => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
      e.preventDefault();
      const next = e.key === 'Home' ? 0 : e.key === 'End' ? 1 : 1 - i;
      selectTab(next); tabs[next].focus();
    });
  });
  window.addEventListener('resize', () => { updateAttention(); updateGradient(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden && training.timer !== null) pause(true); });
  updateAttention(); updateGradient();
})();
