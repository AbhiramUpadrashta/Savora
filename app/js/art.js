/*
 * Savora — hand-drawn style food illustrations (SVG), one per dish, coloured from the recipe.
 * Copyright (c) 2026 Abhiram Upadrashta — MIT License
 */
(function (root) {
  'use strict';
  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) { return function () { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; }; }
  function shade(hex, f) {
    var n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    function c(x) { return Math.max(0, Math.min(255, Math.round(f < 0 ? x * (1 + f) : x + (255 - x) * f))); }
    return '#' + ((1 << 24) + (c(r) << 16) + (c(g) << 8) + c(b)).toString(16).slice(1);
  }
  var uid = 0;
  function grad(id, a, b) { return '<radialGradient id="' + id + '" cx="40%" cy="35%" r="75%"><stop offset="0" stop-color="' + a + '"/><stop offset="1" stop-color="' + b + '"/></radialGradient>'; }
  function lin(id, a, b) { return '<linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + a + '"/><stop offset="1" stop-color="' + b + '"/></linearGradient>'; }

  function plate(cx, cy, rx, ry) {
    return '<ellipse cx="' + cx + '" cy="' + (cy + 6) + '" rx="' + (rx + 4) + '" ry="' + (ry + 3) + '" fill="rgba(0,0,0,.28)"/>' +
      '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" fill="url(#pl' + uid + ')"/><ellipse cx="' + cx + '" cy="' + cy + '" rx="' + (rx * 0.78) + '" ry="' + (ry * 0.74) + '" fill="#f4f1ea"/>';
  }
  function bowl(cx, cy, w, fill, deep) {
    var h = deep ? 34 : 26;
    return '<ellipse cx="' + cx + '" cy="' + (cy + h + 4) + '" rx="' + (w * 0.8) + '" ry="7" fill="rgba(0,0,0,.3)"/>' +
      '<path d="M' + (cx - w) + ' ' + cy + ' Q' + (cx - w + 4) + ' ' + (cy + h + 6) + ' ' + cx + ' ' + (cy + h + 6) + ' Q' + (cx + w - 4) + ' ' + (cy + h + 6) + ' ' + (cx + w) + ' ' + cy + 'Z" fill="url(#bw' + uid + ')"/>' +
      '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + w + '" ry="' + (w * 0.3) + '" fill="#d9d4ca"/><ellipse cx="' + cx + '" cy="' + (cy + 1) + '" rx="' + (w - 5) + '" ry="' + (w * 0.3 - 4) + '" fill="' + fill + '"/>';
  }
  function leaves(r, cx, cy, spread, n) {
    var s = '';
    for (var i = 0; i < (n || 5); i++) { var x = cx + (r() - 0.5) * spread, y = cy + (r() - 0.5) * spread * 0.35, a = r() * 180; s += '<ellipse cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" rx="4" ry="2.2" fill="#3f9a3a" transform="rotate(' + a.toFixed(0) + ' ' + x.toFixed(1) + ' ' + y.toFixed(1) + ')"/>'; }
    return s;
  }
  function pieces(r, kind, color, cx, cy, spread, n) {
    var s = '';
    for (var i = 0; i < n; i++) {
      var x = cx + (r() - 0.5) * spread, y = cy + (r() - 0.5) * spread * 0.32, a = (r() * 60 - 30).toFixed(0), t = ' transform="rotate(' + a + ' ' + x.toFixed(1) + ' ' + y.toFixed(1) + ')"';
      if (kind === 'cube') s += '<rect x="' + (x - 5) + '" y="' + (y - 4) + '" width="10" height="8" rx="1.5" fill="' + color + '" stroke="' + shade(color, -0.25) + '" stroke-width=".8"' + t + '/>';
      else if (kind === 'egg') s += '<ellipse cx="' + x + '" cy="' + y + '" rx="7" ry="5" fill="#fff"/><circle cx="' + x + '" cy="' + y + '" r="3" fill="#f5b72a"/>';
      else if (kind === 'prawn') s += '<path d="M' + (x - 6) + ' ' + y + ' q6 -9 12 0 q-4 4 -8 2" stroke="#f08a5d" stroke-width="3.5" fill="none" stroke-linecap="round"' + t + '/>';
      else if (kind === 'bean' || kind === 'pea') s += '<ellipse cx="' + x + '" cy="' + y + '" rx="' + (kind === 'pea' ? 2.6 : 3.6) + '" ry="2.6" fill="' + color + '" stroke="' + shade(color, -0.3) + '" stroke-width=".6"/>';
      else if (kind === 'veg') s += '<rect x="' + (x - 3) + '" y="' + (y - 3) + '" width="6" height="5" rx="1" fill="' + ['#f08a2f', '#6cae3c', '#f2d04a', '#e9e2cc'][i % 4] + '"' + t + '/>';
      else if (kind === 'fillet') s += '<rect x="' + (x - 8) + '" y="' + (y - 4) + '" width="16" height="8" rx="4" fill="' + color + '"' + t + '/>';
      else s += '<ellipse cx="' + x + '" cy="' + y + '" rx="6" ry="4.5" fill="' + color + '" stroke="' + shade(color, -0.3) + '" stroke-width=".8"' + t + '/>';
    }
    return s;
  }
  function glass(cx, cy, fill, tall, extra) {
    var h = tall ? 88 : 70, w = 26;
    return '<ellipse cx="' + cx + '" cy="' + (cy + h + 2) + '" rx="30" ry="6" fill="rgba(0,0,0,.3)"/>' +
      '<path d="M' + (cx - w) + ' ' + cy + ' L' + (cx - w + 6) + ' ' + (cy + h) + ' L' + (cx + w - 6) + ' ' + (cy + h) + ' L' + (cx + w) + ' ' + cy + 'Z" fill="rgba(255,255,255,.18)" stroke="rgba(255,255,255,.55)" stroke-width="2"/>' +
      '<path d="M' + (cx - w + 3) + ' ' + (cy + 12) + ' L' + (cx - w + 8) + ' ' + (cy + h - 3) + ' L' + (cx + w - 8) + ' ' + (cy + h - 3) + ' L' + (cx + w - 3) + ' ' + (cy + 12) + 'Z" fill="' + fill + '"/>' +
      '<path d="M' + (cx - w + 6) + ' ' + (cy + 16) + ' L' + (cx - w + 10) + ' ' + (cy + h - 8) + '" stroke="rgba(255,255,255,.45)" stroke-width="3" stroke-linecap="round"/>' + (extra || '');
  }
  function straw(cx, cy) { return '<path d="M' + (cx + 8) + ' ' + (cy + 20) + ' L' + (cx + 18) + ' ' + (cy - 18) + '" stroke="#e8364f" stroke-width="4" stroke-linecap="round"/>'; }

  function draw(rec) {
    uid++;
    var a = rec.art || {}, k = a.kind || 'bowl', base = a.base || '#d9a04a', r = rng(hash(rec.id || rec.name)), s = '', cx = 100, cy = 88;
    var defs = grad('pl' + uid, '#ffffff', '#c9c6c0') + lin('bw' + uid, '#f7f5f0', '#bdb8ae') + grad('fd' + uid, shade(base, 0.25), shade(base, -0.2)) + lin('cr' + uid, shade(base, 0.2), shade(base, -0.25));
    var F = 'url(#fd' + uid + ')';
    switch (k) {
      case 'curry': case 'dal': case 'soup': case 'kheer': case 'chutney':
        s += bowl(cx, 70, k === 'chutney' ? 44 : 62, F, true);
        if (k === 'curry') s += pieces(r, a.piece || 'chunk', a.pc || shade(base, 0.35), cx, 72, 80, 7);
        if (a.cream || k === 'dal' || k === 'soup') s += '<path d="M72 70 q14 -8 28 0 t28 0" stroke="rgba(255,255,255,.75)" stroke-width="3" fill="none" stroke-linecap="round"/>';
        if (k === 'kheer') s += pieces(r, 'bean', '#c9a06a', cx, 72, 70, 8);
        s += leaves(r, cx, 70, 70, 5);
        break;
      case 'rice': case 'biryani': case 'bowl':
        s += bowl(cx, 72, 62, F, false);
        s += '<path d="M48 74 Q60 44 100 42 Q140 44 152 74Z" fill="' + F + '"/>';
        for (var g = 0; g < 38; g++) { var gx = 55 + r() * 90, gy = 48 + r() * 24; s += '<ellipse cx="' + gx.toFixed(1) + '" cy="' + gy.toFixed(1) + '" rx="3" ry="1.2" fill="' + (k === 'biryani' && g % 3 ? '#fff4d6' : shade(base, 0.45)) + '" transform="rotate(' + (r() * 180).toFixed(0) + ' ' + gx.toFixed(1) + ' ' + gy.toFixed(1) + ')"/>'; }
        if (k === 'biryani') s += pieces(r, a.piece || 'chunk', a.pc || '#b56a33', cx, 56, 60, 4) + '<path d="M70 50 q6 -4 12 0" stroke="#7a3c18" stroke-width="3" fill="none"/>';
        if (a.mix) s += pieces(r, 'veg', '#fff', cx, 58, 70, 10);
        s += leaves(r, cx, 50, 60, 4);
        break;
      case 'dry': case 'fry': case 'kebab': case 'egg': case 'omelette':
        s += plate(cx, cy, 78, 34);
        if (k === 'omelette') s += '<ellipse cx="100" cy="86" rx="46" ry="20" fill="' + F + '"/>' + pieces(r, 'veg', '#fff', 100, 86, 70, 12);
        else if (k === 'kebab') { for (var q = 0; q < 3; q++) s += '<line x1="46" y1="' + (74 + q * 9) + '" x2="154" y2="' + (70 + q * 9) + '" stroke="#b7b2a6" stroke-width="2"/>' + pieces(r, 'chunk', a.base, 100, 72 + q * 9, 90, 5); }
        else if (k === 'egg') s += pieces(r, 'egg', '#fff', 100, 86, 70, 5) + leaves(r, 100, 86, 60, 4);
        else { for (var p = 0; p < 16; p++) { var px = 55 + r() * 90, py = 74 + r() * 24; s += '<path d="M' + px.toFixed(1) + ' ' + py.toFixed(1) + ' q5 -7 11 -1 q2 6 -5 7 q-7 1 -6 -6Z" fill="' + (k === 'fry' ? shade(base, (r() - 0.5) * 0.3) : ['#' + base.slice(1), shade(base, 0.2), shade(base, -0.15)][p % 3]) + '"/>'; } s += leaves(r, 100, 84, 70, 5); }
        s += '<circle cx="150" cy="80" r="7" fill="#f4e35a" stroke="#cbb93a"/>';
        break;
      case 'dosa':
        s += plate(cx, cy + 4, 84, 32) + '<path d="M28 90 Q100 58 172 88 Q100 104 28 90Z" fill="' + F + '" stroke="' + shade(base, -0.3) + '" stroke-width="1.5"/>';
        for (var d = 0; d < 14; d++) s += '<circle cx="' + (45 + r() * 110).toFixed(1) + '" cy="' + (80 + r() * 10).toFixed(1) + '" r="' + (1 + r() * 2).toFixed(1) + '" fill="' + shade(base, -0.35) + '" opacity=".6"/>';
        if (a.top) s += pieces(r, 'veg', '#fff', 100, 82, 90, 10);
        s += '<ellipse cx="160" cy="104" rx="12" ry="6" fill="#f6f1e2"/><ellipse cx="42" cy="104" rx="12" ry="6" fill="#e0782c"/>';
        break;
      case 'idli': case 'vada': case 'laddoo':
        s += plate(cx, cy + 2, 76, 32);
        [[74, 84], [104, 80], [128, 90], [92, 96]].forEach(function (c, i) {
          if (k === 'vada') s += '<ellipse cx="' + c[0] + '" cy="' + c[1] + '" rx="17" ry="11" fill="' + F + '"/><ellipse cx="' + c[0] + '" cy="' + (c[1] - 1) + '" rx="5" ry="3" fill="' + shade(base, -0.4) + '"/>';
          else if (k === 'laddoo') s += '<circle cx="' + c[0] + '" cy="' + (c[1] - 4) + '" r="13" fill="' + F + '"/><circle cx="' + (c[0] - 4) + '" cy="' + (c[1] - 9) + '" r="3" fill="rgba(255,255,255,.4)"/>';
          else s += '<ellipse cx="' + c[0] + '" cy="' + c[1] + '" rx="18" ry="10" fill="' + F + '"/><ellipse cx="' + c[0] + '" cy="' + (c[1] - 3) + '" rx="14" ry="5" fill="rgba(255,255,255,.55)"/>';
        });
        break;
      case 'bread': case 'puri':
        s += plate(cx, cy + 4, 78, 32);
        for (var b = 0; b < 3; b++) s += '<ellipse cx="' + (86 + b * 12) + '" cy="' + (84 - b * 4) + '" rx="46" ry="' + (k === 'puri' ? 20 : 17) + '" fill="' + F + '" stroke="' + shade(base, -0.25) + '"/>';
        for (var sp = 0; sp < 12; sp++) s += '<circle cx="' + (80 + r() * 60).toFixed(1) + '" cy="' + (72 + r() * 14).toFixed(1) + '" r="' + (1.5 + r() * 2.5).toFixed(1) + '" fill="' + shade(base, -0.45) + '" opacity=".55"/>';
        break;
      case 'burger':
        s += plate(cx, 116, 70, 20) + '<path d="M56 96 h88 q0 12 -12 12 h-64 q-12 0 -12 -12Z" fill="#d9953a"/><rect x="52" y="86" width="96" height="11" rx="5" fill="' + (a.pc || '#8a4a25') + '"/><path d="M50 84 l100 0 l-6 6 l-8 -4 l-8 5 l-8 -5 l-8 5 l-8 -5 l-8 5 l-8 -5 l-8 5 l-8 -5 l-8 4Z" fill="#f2c233"/><path d="M52 80 q48 -8 96 0" stroke="#5aa83a" stroke-width="6" stroke-linecap="round"/><path d="M54 78 Q100 20 146 78Z" fill="' + F + '"/>';
        for (var se = 0; se < 9; se++) s += '<ellipse cx="' + (70 + r() * 60).toFixed(1) + '" cy="' + (52 + r() * 20).toFixed(1) + '" rx="2.4" ry="1.3" fill="#fff6d6"/>';
        break;
      case 'pizza':
        s += '<ellipse cx="100" cy="94" rx="80" ry="36" fill="rgba(0,0,0,.3)"/><ellipse cx="100" cy="88" rx="78" ry="34" fill="#d99a3f"/><ellipse cx="100" cy="87" rx="68" ry="28" fill="#c9412a"/><ellipse cx="100" cy="86" rx="64" ry="25" fill="#f3d27a"/>';
        s += pieces(r, 'veg', '#fff', 100, 86, 110, 14);
        for (var pc = 0; pc < 5; pc++) s += '<circle cx="' + (60 + r() * 80).toFixed(1) + '" cy="' + (76 + r() * 20).toFixed(1) + '" r="4" fill="#b8392a"/>';
        s += '<path d="M100 86 L168 80 M100 86 L60 110 M100 86 L70 62" stroke="#d99a3f" stroke-width="1.5"/>';
        break;
      case 'sandwich': case 'roll': case 'samosa': case 'taco':
        s += plate(cx, cy + 6, 76, 30);
        if (k === 'sandwich') s += '<path d="M52 98 L100 58 L148 98Z" fill="#f2d79a" stroke="#c99a4a" stroke-width="3"/><path d="M58 94 L100 64 L142 94" stroke="#5aa83a" stroke-width="4" fill="none"/><path d="M62 90 L100 68 L138 90" stroke="' + base + '" stroke-width="5" fill="none"/>';
        else if (k === 'roll') s += '<rect x="46" y="72" width="108" height="26" rx="13" fill="' + F + '" transform="rotate(-8 100 85)"/><ellipse cx="152" cy="78" rx="8" ry="13" fill="#f4e6c0" transform="rotate(-8 152 78)"/>' + pieces(r, 'veg', '#fff', 150, 78, 10, 4);
        else if (k === 'samosa') s += '<path d="M60 100 L84 56 L108 100Z" fill="' + F + '" stroke="' + shade(base, -0.3) + '" stroke-width="2"/><path d="M96 100 L122 58 L148 100Z" fill="' + F + '" stroke="' + shade(base, -0.3) + '" stroke-width="2"/>';
        else s += '<path d="M56 96 Q100 30 144 96Z" fill="#e8c26a"/>' + pieces(r, 'veg', '#fff', 100, 80, 60, 10) + '<path d="M60 94 Q100 44 140 94" stroke="#5aa83a" stroke-width="4" fill="none"/>';
        break;
      case 'pasta': case 'noodles':
        s += bowl(cx, 70, 62, '#f1e6c8', false);
        for (var n = 0; n < 14; n++) { var nx = 58 + r() * 84, ny = 54 + r() * 18; s += k === 'pasta' ? '<rect x="' + nx.toFixed(1) + '" y="' + ny.toFixed(1) + '" width="14" height="5" rx="2" fill="' + F + '" transform="rotate(' + (r() * 90 - 45).toFixed(0) + ' ' + nx.toFixed(1) + ' ' + ny.toFixed(1) + ')"/>' : '<path d="M' + nx.toFixed(1) + ' ' + ny.toFixed(1) + ' q10 -8 20 0 t20 0" stroke="' + base + '" stroke-width="3" fill="none"/>'; }
        s += pieces(r, 'veg', '#fff', 100, 62, 70, 8) + leaves(r, 100, 58, 50, 3);
        break;
      case 'fries':
        s += plate(cx, 110, 60, 20) + '<path d="M70 66 L130 66 L124 112 L76 112Z" fill="#d8322f"/>';
        for (var f = 0; f < 11; f++) s += '<rect x="' + (74 + f * 5) + '" y="' + (34 + r() * 16).toFixed(1) + '" width="6" height="40" rx="2" fill="#f2c233" stroke="#d99a1a" stroke-width=".8"/>';
        s += '<path d="M70 66 L130 66 L124 112 L76 112Z" fill="#e8413c"/><path d="M86 84 q14 10 28 0" stroke="#fff" stroke-width="3" fill="none"/>';
        break;
      case 'momos':
        s += plate(cx, cy + 4, 76, 30);
        [[74, 86], [100, 80], [126, 88], [88, 98], [114, 98]].forEach(function (c) { s += '<path d="M' + (c[0] - 14) + ' ' + (c[1] + 6) + ' Q' + c[0] + ' ' + (c[1] - 20) + ' ' + (c[0] + 14) + ' ' + (c[1] + 6) + 'Z" fill="' + F + '"/><path d="M' + (c[0] - 6) + ' ' + (c[1] - 4) + ' q6 -6 12 0" stroke="' + shade(base, -0.2) + '" fill="none"/>'; });
        s += '<ellipse cx="156" cy="104" rx="10" ry="5" fill="#c9412a"/>';
        break;
      case 'chaat':
        s += plate(cx, cy + 4, 78, 32);
        for (var c = 0; c < 6; c++) s += '<circle cx="' + (68 + (c % 3) * 32) + '" cy="' + (80 + Math.floor(c / 3) * 16) + '" r="12" fill="#e6b85a" stroke="#c9953f"/>';
        s += pieces(r, 'veg', '#fff', 100, 84, 90, 14) + '<path d="M60 80 q40 12 80 0" stroke="#7a3a1a" stroke-width="3" fill="none"/>';
        break;
      case 'shake': case 'lassi':
        s += glass(cx, 30, F, true, straw(cx, 30) + '<ellipse cx="' + cx + '" cy="36" rx="22" ry="8" fill="#fff"/><circle cx="' + (cx - 4) + '" cy="28" r="10" fill="#fffaf0"/>' + (k === 'shake' ? '<circle cx="' + (cx + 4) + '" cy="20" r="4" fill="#d8233a"/>' : ''));
        break;
      case 'mocktail': case 'juice':
        s += glass(cx, 36, F, false, straw(cx, 36) + (k === 'mocktail' ? '<circle cx="' + (cx + 22) + '" cy="44" r="10" fill="#b9e05a" stroke="#6fa02a" stroke-width="2"/><path d="M' + (cx - 16) + ' 48 l6 -10 l6 8" fill="#3f9a3a"/>' : '<circle cx="' + (cx + 20) + '" cy="42" r="9" fill="' + shade(base, 0.1) + '" stroke="#fff" stroke-width="2"/>') + '<rect x="' + (cx - 14) + '" y="60" width="9" height="9" rx="2" fill="rgba(255,255,255,.55)"/><rect x="' + (cx + 2) + '" y="72" width="9" height="9" rx="2" fill="rgba(255,255,255,.45)"/>');
        break;
      case 'coffee':
        s += glass(cx, 34, F, true, '<ellipse cx="' + cx + '" cy="42" rx="21" ry="6" fill="#f3e3c8"/>' + straw(cx, 34));
        break;
      case 'icecream': case 'sundae':
        if (k === 'sundae') s += glass(cx, 64, '#6b3a22', false);
        else s += '<path d="M78 84 L100 138 L122 84Z" fill="#d9a04a"/><path d="M82 92 L118 92 M86 104 L114 104 M90 116 L110 116" stroke="#b77a2a" stroke-width="2"/>';
        s += '<circle cx="88" cy="' + (k === 'sundae' ? 62 : 76) + '" r="18" fill="' + F + '"/><circle cx="112" cy="' + (k === 'sundae' ? 62 : 76) + '" r="18" fill="' + F + '"/><circle cx="100" cy="' + (k === 'sundae' ? 46 : 58) + '" r="18" fill="' + F + '"/><circle cx="94" cy="' + (k === 'sundae' ? 40 : 52) + '" r="5" fill="rgba(255,255,255,.45)"/><circle cx="100" cy="' + (k === 'sundae' ? 28 : 38) + '" r="5" fill="#d8233a"/>';
        break;
      case 'kulfi': case 'popsicle':
        s += '<rect x="94" y="100" width="12" height="40" rx="4" fill="#d9b27a"/><path d="M76 40 Q76 26 100 26 Q124 26 124 40 L120 104 Q100 112 80 104Z" fill="' + F + '"/>' + (k === 'kulfi' ? pieces(r, 'bean', '#9cc46a', 100, 42, 30, 6) : '<path d="M84 40 L84 98" stroke="rgba(255,255,255,.4)" stroke-width="5" stroke-linecap="round"/>');
        break;
      case 'cake': case 'mugcake':
        if (k === 'mugcake') { s += '<ellipse cx="100" cy="128" rx="40" ry="8" fill="rgba(0,0,0,.3)"/><rect x="66" y="64" width="68" height="62" rx="10" fill="#f4f1ea"/><path d="M134 80 q20 0 20 16 t-20 16" stroke="#f4f1ea" stroke-width="7" fill="none"/><ellipse cx="100" cy="64" rx="34" ry="9" fill="' + F + '"/><path d="M70 62 q30 -26 60 0" fill="' + F + '"/>'; break; }
        s += '<ellipse cx="100" cy="126" rx="70" ry="12" fill="rgba(0,0,0,.3)"/><ellipse cx="100" cy="120" rx="66" ry="12" fill="#e6e1d8"/><rect x="44" y="66" width="112" height="50" rx="4" fill="' + F + '"/><ellipse cx="100" cy="116" rx="56" ry="10" fill="' + shade(base, -0.25) + '"/><rect x="44" y="90" width="112" height="6" fill="#fff6e6" opacity=".85"/><ellipse cx="100" cy="66" rx="56" ry="12" fill="' + shade(base, 0.3) + '"/>';
        for (var cr = 0; cr < 7; cr++) s += '<circle cx="' + (58 + cr * 14) + '" cy="' + (62 + (cr % 2) * 5) + '" r="5" fill="#fffaf0"/>';
        s += '<circle cx="86" cy="58" r="4" fill="#d8233a"/><circle cx="114" cy="60" r="4" fill="#d8233a"/>';
        break;
      case 'cupcake': case 'cookie': case 'brownie': case 'barfi': case 'halwa': case 'jalebi':
        s += plate(cx, cy + 8, 76, 30);
        if (k === 'cupcake') [[76, 70], [124, 70]].forEach(function (c) { s += '<path d="M' + (c[0] - 16) + ' ' + (c[1] + 10) + ' L' + (c[0] - 12) + ' ' + (c[1] + 34) + ' L' + (c[0] + 12) + ' ' + (c[1] + 34) + ' L' + (c[0] + 16) + ' ' + (c[1] + 10) + 'Z" fill="#e8413c"/><path d="M' + (c[0] - 18) + ' ' + (c[1] + 12) + ' Q' + c[0] + ' ' + (c[1] - 30) + ' ' + (c[0] + 18) + ' ' + (c[1] + 12) + 'Z" fill="' + F + '"/>'; });
        else if (k === 'cookie') [[74, 90], [104, 84], [130, 94]].forEach(function (c) { s += '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="16" fill="' + F + '"/>' + pieces(r, 'bean', '#4a2a1a', c[0], c[1], 22, 4); });
        else if (k === 'jalebi') for (var j = 0; j < 4; j++) s += '<path d="M' + (70 + j * 18) + ' ' + (90 + (j % 2) * 8) + ' m-10 0 a10 10 0 1 0 20 0 a6 6 0 1 0 -12 0 a3 3 0 1 0 6 0" stroke="' + base + '" stroke-width="5" fill="none"/>';
        else if (k === 'halwa') s += '<path d="M56 96 Q100 40 144 96Z" fill="' + F + '"/>' + pieces(r, 'bean', '#c9a06a', 100, 76, 50, 7);
        else [[70, 76], [102, 72], [84, 94], [118, 92]].forEach(function (c) { s += '<path d="M' + c[0] + ' ' + c[1] + ' l24 -6 l10 10 l-24 6Z" fill="' + shade(base, 0.2) + '"/><path d="M' + c[0] + ' ' + c[1] + ' l24 -6 l0 12 l-24 6Z" fill="' + F + '"/>' + (k === 'barfi' ? '<circle cx="' + (c[0] + 14) + '" cy="' + (c[1] - 1) + '" r="2" fill="#b9d48a"/>' : ''); });
        break;
      default:
        s += bowl(cx, 70, 60, F, false) + leaves(r, cx, 66, 60, 5);
    }
    // warm vignette + steam for hot dishes
    var hot = /curry|dal|soup|rice|biryani|kheer|halwa|bowl|coffee/.test(k) && !/Cold|Iced|Frappe|Brew/.test(rec.name);
    var steam = hot ? '<g opacity=".5" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"><path d="M84 36 q-6 -8 0 -16 t0 -16"/><path d="M100 30 q-6 -8 0 -16 t0 -16"/><path d="M116 36 q-6 -8 0 -16 t0 -16"/></g>' : '';
    return '<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + rec.name.replace(/"/g, '') + '"><defs>' + defs +
      '<radialGradient id="bg' + uid + '" cx="50%" cy="40%" r="75%"><stop offset="0" stop-color="' + shade(base, -0.55) + '"/><stop offset="1" stop-color="#120d08"/></radialGradient></defs>' +
      '<rect width="200" height="150" fill="url(#bg' + uid + ')"/><circle cx="100" cy="80" r="70" fill="' + base + '" opacity=".12"/>' + s + steam + '</svg>';
  }
  root.AKArt = { draw: draw, shade: shade };
})(typeof window !== 'undefined' ? window : globalThis);
