/*
 * Savora — app shell: home, categories, grid, recipe page (Chef Kuber / written recipe), favourites, settings.
 * Copyright (c) 2026 Abhiram Upadrashta — MIT License
 */
(function () {
  'use strict';
  var ALL = window.__AK.R, BY = {};
  ALL.forEach(function (r) { BY[r.id] = r; });
  var CATS = [
    ['south', '🍛', 'South Indian'], ['north', '🫓', 'North Indian'], ['veg', '🥗', 'Veg'], ['nonveg', '🍗', 'Non-Veg'], ['vegan', '🌱', 'Vegan'], ['paneer', '🧀', 'Paneer Specials'],
    ['eggs', '🥚', 'Egg Specials'], ['bachelor', '🎒', 'Bachelor Food'], ['fast', '🍔', 'Fast Food'], ['biryani', '👑', 'Biryanis'], ['rice', '🍚', 'Rice & Pulao'], ['breakfast', '🍳', 'Breakfast'],
    ['snacks', '🥟', 'Snacks & Starters'], ['drinks', '🥤', 'Cool Drinks'], ['icecream', '🍨', 'Ice Creams'], ['cakes', '🎂', 'Cakes & Bakes'], ['sweets', '🍮', 'Indian Sweets'], ['soups', '🍲', 'Soups & Salads'],
    ['chinese', '🥡', 'Indo-Chinese'], ['dal', '🥣', 'Dals & Sambar'], ['bread', '🫓', 'Breads & Parathas'], ['nvspecial', '🔥', 'Non-Veg Specials'], ['curry', '🍲', 'Curries & Gravies']
  ];
  var CN = {}; CATS.forEach(function (c) { CN[c[0]] = c; });
  var count = {}; ALL.forEach(function (r) { r.cats.forEach(function (c) { count[c] = (count[c] || 0) + 1; }); });

  // ------------------------------------------------------------------ small persistent prefs (per device)
  function load(k, d) { try { var v = localStorage.getItem('ak.' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem('ak.' + k, JSON.stringify(v)); } catch (e) { /* private mode */ } }
  var favs = load('favs', []), diet = load('diet', 'all'), prefs = load('prefs', { theme: 'light', voice: true, rate: 1, auto: true }); prefs.who = prefs.who || 'kuber'; prefs.lang = prefs.lang || 'en';
  if (prefs.themeV !== 2) { prefs.theme = 'light'; prefs.themeV = 2; save('prefs', prefs); }   // Savora 1.2: new Bubbles Aro theme for everyone
  document.documentElement.dataset.theme = prefs.theme;
  AKChef.Voice.on = prefs.voice; AKChef.Voice.rate = prefs.rate;

  var view = document.getElementById('view'), q = document.getElementById('q'), player = null;
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function dot(r) { return '<span class="dot ' + (r.diet === 'nonveg' ? 'nv' : r.diet === 'vegan' ? 'vg' : r.diet === 'egg' ? 'eg' : '') + '" title="' + r.diet + '"><i></i></span>'; }
  function dietOk(r) { return diet === 'all' || (diet === 'veg' && (r.diet === 'veg' || r.diet === 'vegan')) || (diet === 'vegan' && r.diet === 'vegan') || (diet === 'nonveg' && (r.diet === 'nonveg' || r.diet === 'egg')) || (diet === 'egg' && r.diet === 'egg'); }

  // lazily draw the food art when a card scrolls into view
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { var el = e.target; el.innerHTML = AKArt.draw(BY[el.dataset.id]); io.unobserve(el); } }); }, { rootMargin: '200px' }) : null;
  function card(r) {
    return '<a class="card" href="#/r/' + r.id + '"><div class="pic" data-id="' + r.id + '"></div>' + dot(r) +
      '<button class="fav" data-fav="' + r.id + '" aria-label="Favourite">' + (favs.indexOf(r.id) >= 0 ? '❤️' : '🤍') + '</button>' +
      '<div class="bd"><h3>' + esc(r.name) + '</h3><div class="fl">' + esc(r.flav) + '</div><div class="ft"><span>🔥 ' + r.kcal + ' kcal</span><span>⏱ ' + r.time + ' min</span><span>' + r.level + '</span></div></div></a>';
  }
  function hydrate(root) { root.querySelectorAll('.pic[data-id]').forEach(function (p) { if (io) io.observe(p); else p.innerHTML = AKArt.draw(BY[p.dataset.id]); }); }
  function grid(list, title, sub) {
    var shown = 0, PAGE = 48;
    view.innerHTML = '<div class="sec"><div><h2 class="gold">' + title + '</h2><small style="color:var(--mut)">' + (sub || '') + '</small></div></div>' + dietChips() + '<div class="grid" id="g"></div><button class="btn more" id="more">Show more</button>';
    var g = document.getElementById('g'), more = document.getElementById('more');
    function page() {
      var chunk = list.slice(shown, shown + PAGE); shown += chunk.length;
      var tmp = document.createElement('div'); tmp.innerHTML = chunk.map(card).join(''); hydrate(tmp);
      while (tmp.firstChild) g.appendChild(tmp.firstChild);
      more.style.display = shown < list.length ? '' : 'none';
    }
    if (!list.length) g.outerHTML = '<div class="empty">No recipes here yet — try another filter. 🍽️</div>';
    else page();
    more.onclick = page;
    if (io) { var auto = new IntersectionObserver(function (e) { if (e[0].isIntersecting && shown < list.length) page(); }); auto.observe(more); }
  }
  function dietChips() {
    return '<div class="chips" id="diet" style="margin:4px 0 14px">' + [['all', 'All'], ['veg', '🟢 Veg'], ['vegan', '🌱 Vegan'], ['egg', '🥚 Egg'], ['nonveg', '🔴 Non-Veg']].map(function (d) { return '<button class="chip' + (diet === d[0] ? ' on' : '') + '" data-diet="' + d[0] + '">' + d[1] + '</button>'; }).join('') + '</div>';
  }

  // ------------------------------------------------------------------ views
  function home() {
    var now = new Date(), day = Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 864e5), picks = [], pool = ALL.filter(dietOk);
    var seed = (day * 2654435761) >>> 0; for (var i = 0; i < 10; i++) picks.push(pool[(seed + i * 7919) % pool.length]);
    var sp = picks[0], dstr = now.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' });
    var quick = pool.filter(function (r) { return r.cats.indexOf('bachelor') >= 0; }).slice(day % 20, day % 20 + 10);
    view.innerHTML = '<section class="hero"><div class="chips" style="margin-bottom:12px"><span class="chip on">👑 ' + ALL.length + '+ recipes</span><span class="chip">🗣️ Chef Kuber cooks live</span></div>' +
      '<h1>What\'s cooking <span class="gold">today?</span></h1><p>South Indian, North Indian, biryanis, paneer, eggs, fast food, cool drinks, ice creams, cakes and quick bachelor meals — with a chef who cooks along with you.</p>' +
      '<a class="today" href="#/r/' + sp.id + '"><div class="pic">' + AKArt.draw(sp) + '</div><div class="tx"><small>⭐ Today\'s special · ' + dstr + '</small><b>' + esc(sp.name) + '</b><span>' + esc(sp.flav) + ' · 🔥 ' + sp.kcal + ' kcal · ⏱ ' + sp.time + ' min</span></div></a>' +
      '<a class="btn gold" href="#/r/' + sp.id + '">▶ Cook today\'s special</a>' +
      '<svg class="chefmini" viewBox="0 0 200 200"><circle cx="100" cy="110" r="70" fill="#4f6bed" opacity=".15"/><ellipse cx="100" cy="115" rx="44" ry="42" fill="#f0bf93"/><path d="M58 92 Q52 50 76 44 Q78 18 100 20 Q122 18 124 44 Q148 50 142 92Z" fill="#fff"/><rect x="60" y="80" width="80" height="16" rx="5" fill="#4f6bed"/><ellipse cx="84" cy="112" rx="6" ry="7" fill="#2a1a12"/><ellipse cx="116" cy="112" rx="6" ry="7" fill="#2a1a12"/><path d="M100 132 q-14 -4 -26 6 q12 -2 26 -2 q14 0 26 2 q-12 -10 -26 -6Z" fill="#3a2214"/><path d="M88 142 q12 10 24 0" stroke="#7a2a22" stroke-width="4" fill="none" stroke-linecap="round"/></svg></section>' +
      '<div class="sec"><h2>Categories</h2><a href="#/cats">See all</a></div><div class="cats">' + CATS.slice(0, 12).map(catTile).join('') + '</div>' +
      '<div class="sec"><h2>Today\'s picks</h2></div><div class="row" id="pk">' + picks.map(card).join('') + '</div>' +
      '<div class="sec"><h2>🎒 Bachelor quickies</h2><a href="#/c/bachelor">More</a></div><div class="row" id="bq">' + quick.map(card).join('') + '</div>';
    hydrate(view);
  }
  function catTile(c) { return '<a class="cat" href="#/c/' + c[0] + '"><div class="ic">' + c[1] + '</div><b>' + c[2] + '</b><small>' + (count[c[0]] || 0) + ' recipes</small></a>'; }
  function cats() { view.innerHTML = '<div class="sec"><h2 class="gold">All categories</h2></div><div class="cats">' + CATS.map(catTile).join('') + '</div>'; }
  function category(id) { var c = CN[id] || [id, '🍽️', id]; grid(ALL.filter(function (r) { return r.cats.indexOf(id) >= 0 && dietOk(r); }), c[1] + ' ' + c[2], (count[id] || 0) + ' recipes'); }
  function search(term) {
    term = term.toLowerCase().trim(); if (!term) return home();
    var words = term.split(/\s+/);
    var res = ALL.filter(function (r) { var hay = (r.name + ' ' + r.flav + ' ' + r.cats.join(' ') + ' ' + r.diet + ' ' + r.ing.map(function (x) { return x.item; }).join(' ')).toLowerCase(); return dietOk(r) && words.every(function (w) { return hay.indexOf(w) >= 0; }); });
    res.sort(function (a, b) { return (a.name.toLowerCase().indexOf(term) < 0) - (b.name.toLowerCase().indexOf(term) < 0); });
    grid(res, 'Results for “' + esc(term) + '”', res.length + ' recipes');
  }
  function favorites() { grid(favs.map(function (id) { return BY[id]; }).filter(Boolean), '❤️ Your favourites', favs.length ? 'Saved on this device' : 'Tap 🤍 on any recipe to save it here'); }

  // servings scaler: understands 1, 1½, ½, 250 g, 2 cups…
  var FR = { '½': 0.5, '¼': 0.25, '¾': 0.75, '⅓': 1 / 3 };
  function scaleQ(qs, k) {
    if (!qs || k === 1) return qs;
    return qs.replace(/(\d+)?([½¼¾⅓])?/, function (m, n, f) {
      if (!m) return m; var v = (n ? +n : 0) + (f ? FR[f] : 0); v *= k;
      var whole = Math.floor(v), rest = v - whole, fr = rest > 0.62 ? '¾' : rest > 0.4 ? '½' : rest > 0.15 ? '¼' : '';
      if (rest > 0.87) { whole++; fr = ''; }
      return (whole || !fr ? whole : '') + fr;
    });
  }
  function nutrition(r) {
    var p = r.diet === 'nonveg' ? 0.3 : r.diet === 'egg' ? 0.24 : /paneer|dal|chana|rajma|soya|tofu/i.test(r.name) ? 0.2 : 0.1;
    var f = /fry|butter|cream|malai|cake|ice|halwa|laddoo|pakora|65|fries/i.test(r.name) ? 0.42 : 0.3, c = 1 - p - f;
    return { p: Math.round(r.kcal * p / 4), f: Math.round(r.kcal * f / 9), c: Math.round(r.kcal * c / 4) };
  }
  function recipe(id) {
    var r = BY[id]; if (!r) return home();
    var serves = r.serves, tab = load('tab', 'chef');
    var n = nutrition(r);
    view.innerHTML = '<div class="rp"><div><div id="show"></div></div><div>' + '<div class="chips" style="margin-bottom:8px">' + r.cats.filter(function (c) { return CN[c]; }).slice(0, 4).map(function (c) { return '<a class="chip" href="#/c/' + c + '">' + CN[c][1] + ' ' + CN[c][2] + '</a>'; }).join('') + '</div>' +
      '<h1>' + esc(r.name) + '</h1><p style="color:var(--mut);margin:6px 0 0">' + esc(r.desc || r.flav) + '</p>' +
      '<div class="meta"><div><b>' + r.kcal + '</b><small>kcal / serving</small></div><div><b>' + r.time + '</b><small>minutes</small></div><div><b>' + r.level.split(' ')[0] + '</b><small>difficulty</small></div><div><b>' + esc(r.flav.split(' · ')[0]) + '</b><small>flavour</small></div></div>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn gold" id="start">▶ Start — cook with Chef</button><button class="btn" id="fv">' + (favs.indexOf(r.id) >= 0 ? '❤️ Saved' : '🤍 Save') + '</button><button class="btn" id="share">📤 Share</button></div>' +
      '<div class="tabsw"><button data-t="chef">' + (prefs.who === 'vennela' ? '👩‍🍳 Chef Vennela' : '👨‍🍳 Chef Kuber') + '</button><button data-t="data">📖 Written recipe</button></div><div id="pane"></div></div></div>';
    function drawPane() {
      document.querySelectorAll('.tabsw button').forEach(function (b) { b.classList.toggle('on', b.dataset.t === tab); });
      var pane = document.getElementById('pane'), show = document.getElementById('show');
      if (tab === 'chef') {
        if (!player) { player = new AKChef.Player(show, r, { who: prefs.who, lang: prefs.lang, onSwitch: function (a) { if (a === 'who') prefs.who = prefs.who === 'vennela' ? 'kuber' : 'vennela'; else prefs.lang = prefs.lang === 'te' ? 'en' : 'te'; save('prefs', prefs); player.destroy(); player = null; drawPane(); } }); }
        pane.innerHTML = '<p style="color:var(--mut)">Press <b>▶</b> and ' + (prefs.who === 'vennela' ? 'Chef Vennela' : 'Chef Kuber') + ' will speak and cook each step live. Use ⏮ ⏭ to move between steps, 🔊 for voice, 1× for speed, EN/తె for English or Telugu and 👨‍🍳/👩‍🍳 to switch chefs.' + (prefs.lang === 'te' && !window.Capacitor && AKChef.Voice.missing ? ' <b>No Telugu voice is installed on this device, so Telugu shows as subtitles.</b>' : '') + ' Prefer reading? Switch to <b>Written recipe</b>.</p>' +
          '<div class="nut"><div><b>' + r.kcal + '</b>kcal</div><div><b>' + n.p + 'g</b>protein</div><div><b>' + n.c + 'g</b>carbs</div><div><b>' + n.f + 'g</b>fat</div></div>';
      } else {
        if (!player) { show.innerHTML = '<div class="pic">' + AKArt.draw(r) + '</div>'; }
        var k = serves / r.serves;
        pane.innerHTML = '<div class="sec" style="margin-top:4px"><h3>🧺 Ingredients</h3><span class="srv"><button id="m">−</button><b id="sv">' + serves + '</b> servings<button id="p">+</button></span></div>' +
          '<ul class="ings">' + r.ing.map(function (x, i) { return '<li data-i="' + i + '"><span class="e">' + AKChef.emojiFor(x.item) + '</span><span class="q">' + esc(scaleQ(x.q, k)) + '</span><span>' + esc(x.item) + '</span></li>'; }).join('') + '</ul>' +
          '<div class="sec"><h3>👩‍🍳 Method</h3><small style="color:var(--mut)">⏱ ' + r.time + ' min total</small></div><ol class="steps">' + r.steps.map(function (s) { return '<li>' + esc(s.text) + (s.min ? ' <small>· ⏱ ' + s.min + ' min</small>' : '') + '</li>'; }).join('') + '</ol>' +
          '<div class="nut"><div><b>' + r.kcal + '</b>kcal</div><div><b>' + n.p + 'g</b>protein</div><div><b>' + n.c + 'g</b>carbs</div><div><b>' + n.f + 'g</b>fat</div></div><p style="color:var(--mut);font-size:12px">Nutrition values are approximate, per serving.</p>';
        pane.querySelectorAll('.ings li').forEach(function (li) { li.onclick = function () { li.classList.toggle('done'); }; });
        document.getElementById('m').onclick = function () { if (serves > 1) { serves--; drawPane(); } };
        document.getElementById('p').onclick = function () { if (serves < 20) { serves++; drawPane(); } };
      }
    }
    document.querySelectorAll('.tabsw button').forEach(function (b) { b.onclick = function () { tab = b.dataset.t; save('tab', tab); drawPane(); }; });
    document.getElementById('start').onclick = function () { tab = 'chef'; save('tab', tab); drawPane(); player.play(); document.getElementById('show').scrollIntoView({ behavior: 'smooth', block: 'start' }); };
    document.getElementById('fv').onclick = function () { toggleFav(r.id); this.textContent = favs.indexOf(r.id) >= 0 ? '❤️ Saved' : '🤍 Save'; };
    document.getElementById('share').onclick = function () {
      var t = r.name + ' — ' + r.ing.map(function (x) { return (x.q ? x.q + ' ' : '') + x.item; }).join(', ') + '\n\nFrom Savora: https://abhiramupadrashta.github.io/Savora/';
      if (navigator.share) navigator.share({ title: r.name, text: t }).catch(function () {}); else if (navigator.clipboard) navigator.clipboard.writeText(t).then(function () { alert('Recipe copied ✓'); });
    };
    drawPane();
    window.scrollTo(0, 0);
  }
  function settings() {
    var v = AKUpdate.version();
    view.innerHTML = '<div class="set"><div style="text-align:center;padding:10px 0"><img src="icon.svg" alt="" style="width:86px;border-radius:22px;box-shadow:0 10px 30px rgba(79,107,237,.35)"><h2 class="gold" style="margin-top:10px">Savora</h2><small style="color:var(--mut)">Version ' + v + ' · ' + ALL.length + ' recipes</small></div>' +
      '<div class="box"><h3>Updates</h3><div class="it"><div>Check for updates<small>Get new recipes and features instantly</small></div><button class="btn gold" id="chk">⟳ Check now</button></div>' +
      '<div class="it"><div>Check automatically<small>Once a day when the app opens</small></div><label class="sw"><input type="checkbox" id="auto"' + (prefs.auto ? ' checked' : '') + '><span></span></label></div></div>' +
      '<div class="box"><h3>Your chef</h3><div class="it"><div>Chef<small>Kuber speaks English · Vennela speaks Telugu & English</small></div><div class="chips"><button class="chip' + (prefs.who === 'kuber' ? ' on' : '') + '" data-who="kuber">👨‍🍳 Kuber</button><button class="chip' + (prefs.who === 'vennela' ? ' on' : '') + '" data-who="vennela">👩‍🍳 Vennela</button></div></div>' +
      '<div class="it"><div>Language<small>What the chef speaks</small></div><div class="chips"><button class="chip' + (prefs.lang === 'en' ? ' on' : '') + '" data-lg="en">English</button><button class="chip' + (prefs.lang === 'te' ? ' on' : '') + '" data-lg="te">తెలుగు</button></div></div>' +
      '<div class="it"><div>Voice<small>The chef reads every step aloud</small></div><label class="sw"><input type="checkbox" id="voice"' + (prefs.voice ? ' checked' : '') + '><span></span></label></div>' +
      '<div class="it"><div>Speaking speed<small>' + prefs.rate + '×</small></div><input type="range" id="rate" min="0.6" max="1.6" step="0.1" value="' + prefs.rate + '"></div></div>' +
      '<div class="box"><h3>Look & feel</h3><div class="it"><div>Theme<small>Bright bubbles, or calm night</small></div><div class="chips"><button class="chip' + (prefs.theme === 'light' ? ' on' : '') + '" data-th="light">☀️ Bubble</button><button class="chip' + (prefs.theme === 'dark' ? ' on' : '') + '" data-th="dark">🌙 Night</button></div></div>' +
      '<div class="it"><div>Default food type<small>Filter used everywhere</small></div>' + dietChips() + '</div></div>' +
      '<div class="box"><h3>About</h3><div class="it"><div>Powered by Bubbles Aro<small>© 2026 Bubbles Aro · MIT License · free forever</small></div><a class="btn" href="https://abhiramupadrashta.github.io/" target="_blank" rel="noopener">Bubbles Aro ↗</a></div>' +
      '<div class="it"><div>Website & support<small>Downloads, install help and donations</small></div><a class="btn" href="https://abhiramupadrashta.github.io/Savora/" target="_blank" rel="noopener">Open ↗</a></div></div></div>';
    document.getElementById('chk').onclick = function () { AKUpdate.check(true); };
    document.getElementById('auto').onchange = function (e) { prefs.auto = e.target.checked; save('prefs', prefs); };
    document.getElementById('voice').onchange = function (e) { prefs.voice = e.target.checked; AKChef.Voice.on = prefs.voice; save('prefs', prefs); };
    document.getElementById('rate').onchange = function (e) { prefs.rate = +e.target.value; AKChef.Voice.rate = prefs.rate; save('prefs', prefs); settings(); };
    view.querySelectorAll('[data-who]').forEach(function (b) { b.onclick = function () { prefs.who = b.dataset.who; if (prefs.who === 'vennela' && !load('pickedLang', 0)) prefs.lang = 'te'; save('prefs', prefs); settings(); }; });
    view.querySelectorAll('[data-lg]').forEach(function (b) { b.onclick = function () { prefs.lang = b.dataset.lg; save('pickedLang', 1); save('prefs', prefs); settings(); }; });
    view.querySelectorAll('[data-th]').forEach(function (b) { b.onclick = function () { prefs.theme = b.dataset.th; save('prefs', prefs); document.documentElement.dataset.theme = prefs.theme; settings(); }; });
  }
  function toggleFav(id) { var i = favs.indexOf(id); if (i >= 0) favs.splice(i, 1); else favs.unshift(id); save('favs', favs); }

  // ------------------------------------------------------------------ routing & events
  function route() {
    if (player) { player.destroy(); player = null; }
    var h = location.hash.slice(1) || '/', parts = h.split('/');
    document.querySelectorAll('[data-nav]').forEach(function (a) { a.classList.toggle('on', a.dataset.nav === (parts[1] || 'home') || (!parts[1] && a.dataset.nav === 'home')); });
    if (parts[1] === 'c') category(parts[2]);
    else if (parts[1] === 'r') recipe(decodeURIComponent(parts[2]));
    else if (parts[1] === 'cats') cats();
    else if (parts[1] === 'fav') favorites();
    else if (parts[1] === 'settings') settings();
    else if (parts[1] === 's') search(decodeURIComponent(parts[2] || ''));
    else home();
  }
  window.addEventListener('hashchange', route);
  var st = null;
  q.addEventListener('input', function () { clearTimeout(st); st = setTimeout(function () { location.hash = q.value.trim() ? '#/s/' + encodeURIComponent(q.value.trim()) : '#/'; }, 250); });
  document.addEventListener('click', function (e) {
    var f = e.target.closest('[data-fav]');
    if (f) { e.preventDefault(); toggleFav(f.dataset.fav); f.textContent = favs.indexOf(f.dataset.fav) >= 0 ? '❤️' : '🤍'; return; }
    var d = e.target.closest('[data-diet]');
    if (d) { diet = d.dataset.diet; save('diet', diet); route(); }
  });
  var lastDay = new Date().toDateString();
  document.addEventListener('visibilitychange', function () { if (!document.hidden && new Date().toDateString() !== lastDay) { lastDay = new Date().toDateString(); if ((location.hash || '#/') === '#/') route(); } });
  route();
  if (prefs.auto && AKUpdate.platform !== 'web' && Date.now() - load('lastChk', 0) > 20 * 3600e3) setTimeout(function () { save('lastChk', Date.now()); AKUpdate.check(false); }, 5000);
  if (window.speechSynthesis) speechSynthesis.getVoices();
})();
