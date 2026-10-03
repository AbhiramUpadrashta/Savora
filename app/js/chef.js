/*
 * Savora — Chef Kuber, the live cooking show.
 * The chef speaks every step (text-to-speech) and acts it out in an animated kitchen.
 * Copyright (c) 2026 Abhiram Upadrashta — MIT License
 */
(function (root) {
  'use strict';
  var EMO = [[/paneer|cheese/, '🧀'], [/chicken/, '🍗'], [/mutton|keema|meat/, '🥩'], [/fish|pomfret|seer/, '🐟'], [/prawn|shrimp/, '🦐'], [/crab/, '🦀'], [/egg/, '🥚'], [/onion|shallot/, '🧅'], [/tomato/, '🍅'], [/potato|aloo/, '🥔'],
    [/garlic/, '🧄'], [/ginger/, '🫚'], [/chilli|chili|pepper/, '🌶️'], [/carrot/, '🥕'], [/corn/, '🌽'], [/mushroom/, '🍄'], [/brinjal|baingan|eggplant/, '🍆'], [/cucumber/, '🥒'], [/spinach|palak|methi|leaves|mint|coriander|curry leaves|herb/, '🌿'],
    [/broccoli|cauliflower|gobi/, '🥦'], [/capsicum|bell/, '🫑'], [/rice/, '🍚'], [/flour|maida|atta|rava|besan|batter/, '🌾'], [/bread|pav|bun/, '🍞'], [/milk|cream|curd|yogurt|malai/, '🥛'], [/butter|ghee/, '🧈'], [/sugar|jaggery|syrup/, '🍯'], [/lemon|lime/, '🍋'],
    [/mango/, '🥭'], [/banana/, '🍌'], [/strawberr/, '🍓'], [/apple/, '🍎'], [/pineapple/, '🍍'], [/coconut/, '🥥'], [/watermelon/, '🍉'], [/grape/, '🍇'], [/orange|mosambi/, '🍊'], [/blueberr|berry|currant/, '🫐'], [/chocolate|cocoa|nutella|oreo|kitkat|fudge|brownie/, '🍫'],
    [/coffee/, '☕'], [/ice/, '🧊'], [/nut|cashew|almond|badam|pista|peanut/, '🥜'], [/noodle|pasta|spaghetti|maggi/, '🍝'], [/oil/, '🫗'], [/salt|masala|powder|spice|seeds|cumin|turmeric/, '🧂'], [/bean|chana|rajma|dal|lentil|moong|pea/, '🫘'], [/tea/, '🍵'], [/honey/, '🍯']];
  function emojiFor(text) { text = String(text).toLowerCase(); for (var i = 0; i < EMO.length; i++) if (EMO[i][0].test(text)) return EMO[i][1]; return '✨'; }

  var STATION = { chop: 'board', mix: 'bowl', whisk: 'bowl', marinate: 'bowl', blend: 'mixer', bake: 'oven', freeze: 'freezer', knead: 'dough', roll: 'dough', pour: 'pour', garnish: 'plate', serve: 'plate', rest: 'plate' };
  function station(act) { return STATION[act] || 'stove'; }

  // ------------------------------------------------------------------ the kitchen + chef (SVG)
  function sceneSVG(who) {
    return '<svg class="ck-scene" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">' +
      '<defs><linearGradient id="ckWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#26315e"/><stop offset="1" stop-color="#141b3a"/></linearGradient>' +
      '<linearGradient id="ckGold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#dfe6ff"/><stop offset=".5" stop-color="#4f6bed"/><stop offset="1" stop-color="#3c55d1"/></linearGradient>' +
      '<radialGradient id="ckFlame" cx="50%" cy="80%" r="60%"><stop offset="0" stop-color="#fff3a0"/><stop offset=".5" stop-color="#ffa21a"/><stop offset="1" stop-color="#ff4d1a" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="ckSteel" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8c9097"/><stop offset=".45" stop-color="#e6e8ec"/><stop offset="1" stop-color="#7d8188"/></linearGradient></defs>' +
      '<rect width="400" height="300" fill="url(#ckWall)"/>' +
      '<g opacity=".18" stroke="#4f6bed">' + Array.apply(null, Array(9)).map(function (_, i) { return '<line x1="' + (i * 50) + '" y1="0" x2="' + (i * 50) + '" y2="210"/>'; }).join('') + '<line x1="0" y1="70" x2="400" y2="70"/><line x1="0" y1="140" x2="400" y2="140"/></g>' +
      '<rect x="268" y="22" width="96" height="70" rx="8" fill="#0d1b2e" stroke="url(#ckGold)" stroke-width="4"/><line x1="316" y1="22" x2="316" y2="92" stroke="url(#ckGold)" stroke-width="3"/><circle cx="345" cy="45" r="11" fill="#dfe6ff" opacity=".8"/>' +
      '<rect x="0" y="210" width="400" height="90" fill="#e9edf9"/><rect x="0" y="206" width="400" height="10" fill="url(#ckGold)"/>' +
      // stove
      '<g class="st st-stove"><rect x="200" y="186" width="140" height="22" rx="4" fill="#1b1b1f"/><g class="ck-flame"><ellipse cx="270" cy="190" rx="30" ry="9" fill="url(#ckFlame)"/></g>' +
      '<g class="ck-pot"><path d="M222 140 h96 v42 q0 12 -12 12 h-72 q-12 0 -12 -12Z" fill="url(#ckSteel)"/><ellipse cx="270" cy="140" rx="48" ry="11" fill="#d9dce2"/><ellipse class="ck-food" cx="270" cy="142" rx="42" ry="8" fill="#c9803f"/><rect x="198" y="146" width="26" height="6" rx="3" fill="#2a2a2e"/><rect x="316" y="146" width="26" height="6" rx="3" fill="#2a2a2e"/></g>' +
      '<g class="ck-bubbles"><circle cx="252" cy="140" r="3" fill="#fff" opacity=".6"/><circle cx="276" cy="138" r="2.5" fill="#fff" opacity=".6"/><circle cx="292" cy="141" r="2" fill="#fff" opacity=".6"/></g>' +
      '<g class="ck-steam" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".45"><path d="M250 124 q-7 -9 0 -18 t0 -18"/><path d="M270 118 q-7 -9 0 -18 t0 -18"/><path d="M290 124 q-7 -9 0 -18 t0 -18"/></g>' +
      '<g class="ck-sizzle" fill="#ffd66b"><circle cx="240" cy="132" r="2"/><circle cx="300" cy="128" r="2"/><circle cx="262" cy="124" r="1.6"/><circle cx="284" cy="126" r="1.6"/></g>' +
      '<g class="ck-spoon"><rect x="266" y="78" width="7" height="70" rx="3" fill="#a8743a" transform="rotate(18 270 140)"/></g>' +
      '<g class="ck-whistle"><rect x="262" y="112" width="16" height="16" rx="3" fill="#2a2a2e"/><text x="286" y="100" font-size="16" fill="#fff">💨</text></g></g>' +
      // cutting board
      '<g class="st st-board"><rect x="206" y="178" width="136" height="26" rx="8" fill="#c89b62" stroke="#8a6231" stroke-width="3"/><text class="ck-item" x="250" y="196" font-size="30">🧅</text>' +
      '<g class="ck-knife"><rect x="286" y="120" width="10" height="50" rx="2" fill="#d9dce2" transform="rotate(-20 290 170)"/><rect x="290" y="96" width="8" height="28" rx="3" fill="#2a2a2e" transform="rotate(-20 290 170)"/></g>' +
      '<g class="ck-bits"><rect x="236" y="184" width="8" height="6" rx="2" fill="#f2f0ea"/><rect x="224" y="188" width="7" height="5" rx="2" fill="#f2f0ea"/><rect x="212" y="186" width="6" height="5" rx="2" fill="#f2f0ea"/></g></g>' +
      // mixing bowl
      '<g class="st st-bowl"><path d="M216 150 h108 q-6 56 -54 56 q-48 0 -54 -56Z" fill="url(#ckSteel)"/><ellipse cx="270" cy="150" rx="54" ry="12" fill="#e6e8ec"/><ellipse class="ck-food" cx="270" cy="152" rx="46" ry="8" fill="#e9d6a0"/>' +
      '<g class="ck-whisk"><rect x="266" y="84" width="7" height="46" rx="3" fill="#2a2a2e"/><path d="M262 128 q8 30 8 30 q0 0 8 -30 M258 130 q12 34 12 34 q0 0 12 -34" stroke="#c9ccd2" stroke-width="2" fill="none"/></g></g>' +
      // mixer / blender
      '<g class="st st-mixer"><g class="ck-jar"><path d="M242 96 h56 l-8 80 h-40Z" fill="rgba(220,235,255,.35)" stroke="#d9dce2" stroke-width="3"/><path class="ck-food" d="M248 140 h44 l-4 34 h-36Z" fill="#e9d6a0"/><rect x="240" y="88" width="60" height="10" rx="4" fill="#2a2a2e"/></g><rect x="236" y="176" width="68" height="32" rx="8" fill="url(#ckGold)"/><circle cx="270" cy="192" r="7" fill="#2a2a2e"/></g>' +
      // oven
      '<g class="st st-oven"><rect x="208" y="96" width="130" height="112" rx="10" fill="#26262b" stroke="url(#ckGold)" stroke-width="3"/><rect x="222" y="120" width="102" height="70" rx="8" fill="#130f0c"/><rect class="ck-glow" x="226" y="124" width="94" height="62" rx="6" fill="#ff8a1a" opacity=".35"/><rect class="ck-food" x="244" y="160" width="58" height="20" rx="4" fill="#d9a04a"/><circle cx="232" cy="108" r="5" fill="#4f6bed"/><circle cx="250" cy="108" r="5" fill="#4f6bed"/><text x="290" y="113" font-size="12" fill="#ffd66b" class="ck-timer">180°C</text></g>' +
      // freezer
      '<g class="st st-freezer"><rect x="214" y="70" width="118" height="138" rx="10" fill="#dfeaf5" stroke="#9fb4c9" stroke-width="3"/><rect x="224" y="82" width="98" height="110" rx="6" fill="#bcd7ef"/><rect class="ck-food" x="244" y="140" width="58" height="34" rx="6" fill="#f7eed2"/><g class="ck-snow" fill="#fff"><text x="232" y="110" font-size="16">❄</text><text x="296" y="126" font-size="12">❄</text><text x="262" y="102" font-size="10">❄</text></g></g>' +
      // dough & rolling pin
      '<g class="st st-dough"><rect x="206" y="182" width="136" height="22" rx="8" fill="#c89b62"/><ellipse class="ck-food" cx="270" cy="182" rx="44" ry="10" fill="#f1dca8"/><g class="ck-pin"><rect x="220" y="164" width="100" height="12" rx="6" fill="#d9a660"/><rect x="206" y="166" width="16" height="8" rx="4" fill="#a8743a"/><rect x="318" y="166" width="16" height="8" rx="4" fill="#a8743a"/></g></g>' +
      // pour
      '<g class="st st-pour"><path d="M246 118 h48 l-6 88 h-36Z" fill="rgba(255,255,255,.18)" stroke="rgba(255,255,255,.6)" stroke-width="3"/><rect class="ck-fill ck-food" x="252" y="160" width="36" height="42" fill="#e9b54a"/><g class="ck-jug"><path d="M296 60 h40 v40 q0 10 -10 10 h-20 q-10 0 -10 -10Z" fill="url(#ckSteel)"/><path d="M296 66 l-12 -4 l2 10Z" fill="#c9ccd2"/></g><rect class="ck-stream ck-food" x="284" y="70" width="5" height="90" rx="2" fill="#e9b54a"/></g>' +
      // final plate
      '<g class="st st-plate"><foreignObject x="190" y="70" width="190" height="142"><div xmlns="http://www.w3.org/1999/xhtml" class="ck-dish"></div></foreignObject><g class="ck-spark" fill="#ffe28a"><text x="200" y="80" font-size="18">✨</text><text x="354" y="96" font-size="14">✨</text><text x="330" y="200" font-size="16">✨</text></g></g>' +
      // flying ingredient
      '<text class="ck-fly" x="150" y="120" font-size="30">🧅</text>' +
      // ---- Chef Kuber
      (who === 'vennela' ? root.AKChefs.VENNELA : '<g class="ck-chef"><ellipse cx="96" cy="286" rx="58" ry="8" fill="rgba(0,0,0,.35)"/>' +
      '<path d="M44 290 Q44 196 96 190 Q148 196 148 290Z" fill="#fbfaf6"/><path d="M96 196 L96 290" stroke="#e7e3d9" stroke-width="2"/><circle cx="96" cy="222" r="4" fill="url(#ckGold)"/><circle cx="96" cy="244" r="4" fill="url(#ckGold)"/><circle cx="96" cy="266" r="4" fill="url(#ckGold)"/>' +
      '<path d="M66 196 L96 214 L126 196" fill="none" stroke="#4f6bed" stroke-width="7" stroke-linejoin="round"/>' +
      '<g class="ck-armL"><path d="M52 214 Q30 240 42 262" stroke="#fbfaf6" stroke-width="18" fill="none" stroke-linecap="round"/><circle cx="43" cy="264" r="10" fill="#e9b38a"/></g>' +
      '<g class="ck-armR"><path d="M140 214 Q170 214 186 190" stroke="#fbfaf6" stroke-width="18" fill="none" stroke-linecap="round"/><circle cx="188" cy="186" r="10" fill="#e9b38a"/></g>' +
      '<rect x="84" y="170" width="24" height="24" rx="6" fill="#e0a57c"/>' +
      '<g class="ck-head"><ellipse cx="96" cy="140" rx="42" ry="40" fill="#f0bf93"/><ellipse cx="54" cy="142" rx="8" ry="11" fill="#e9b38a"/><ellipse cx="138" cy="142" rx="8" ry="11" fill="#e9b38a"/>' +
      '<ellipse cx="72" cy="156" rx="9" ry="6" fill="#ff8f8f" opacity=".45"/><ellipse cx="120" cy="156" rx="9" ry="6" fill="#ff8f8f" opacity=".45"/>' +
      '<g class="ck-eyes"><ellipse cx="80" cy="134" rx="6" ry="7" fill="#2a1a12"/><ellipse cx="112" cy="134" rx="6" ry="7" fill="#2a1a12"/><circle cx="82" cy="131" r="2" fill="#fff"/><circle cx="114" cy="131" r="2" fill="#fff"/></g>' +
      '<path d="M72 122 q8 -6 16 -2 M104 120 q8 -4 16 2" stroke="#4a2a18" stroke-width="3.5" fill="none" stroke-linecap="round"/><ellipse cx="96" cy="146" rx="7" ry="6" fill="#e0a07a"/>' +
      '<path d="M96 156 q-14 -4 -26 6 q10 -2 14 2 q6 -4 12 -2 q6 -2 12 2 q4 -4 14 -2 q-12 -10 -26 -6Z" fill="#3a2214"/>' +
      '<g class="ck-mouth"><ellipse class="ck-m-open" cx="96" cy="166" rx="10" ry="7" fill="#7a2a22"/><path class="ck-m-smile" d="M84 164 q12 10 24 0" stroke="#7a2a22" stroke-width="3.5" fill="none" stroke-linecap="round"/></g>' +
      '<path d="M56 116 Q50 80 70 74 Q72 50 96 52 Q120 50 122 74 Q142 80 136 116Z" fill="#fff" stroke="#ece8de" stroke-width="2"/><rect x="58" y="102" width="76" height="16" rx="5" fill="url(#ckGold)"/><text x="89" y="115" font-size="11" fill="#5a3a0a" font-weight="bold">K</text></g></g>') +
      '</svg>';
  }

  // ------------------------------------------------------------------ voice (native TTS on Android, Web Speech elsewhere)
  var Voice = root.AKChefs.Voice, Voice0 = {
    on: true, rate: 1,
    native: function () { return root.Capacitor && root.Capacitor.Plugins && root.Capacitor.Plugins.TextToSpeech; },
    speak: function (text, onStart, onEnd) {
      var done = false; function end() { if (!done) { done = true; onEnd && onEnd(); } }
      if (!this.on) { onStart && onStart(); setTimeout(end, Math.min(9000, 1400 + text.length * 55)); return; }
      var tts = this.native();
      if (tts) { onStart && onStart(); tts.speak({ text: text, lang: 'en-IN', rate: this.rate, pitch: 1.05, volume: 1 }).then(end, end); return; }
      var ss = root.speechSynthesis;
      if (!ss) { onStart && onStart(); setTimeout(end, 1400 + text.length * 55); return; }
      ss.cancel();
      var u = new SpeechSynthesisUtterance(text);
      var vs = ss.getVoices(), pick = vs.find(function (v) { return /en-IN/i.test(v.lang); }) || vs.find(function (v) { return /en[-_](GB|US)/i.test(v.lang) && /male|daniel|rishi|google/i.test(v.name); }) || vs.find(function (v) { return /^en/i.test(v.lang); });
      if (pick) u.voice = pick;
      u.rate = this.rate; u.pitch = 1.02;
      u.onstart = function () { onStart && onStart(); };
      u.onend = end; u.onerror = end;
      ss.speak(u);
      setTimeout(end, 4000 + text.length * 120);             // safety net
    },
    stop: function () { var tts = this.native(); if (tts) tts.stop().catch(function () {}); if (root.speechSynthesis) root.speechSynthesis.cancel(); }
  };

  // ------------------------------------------------------------------ the player
  function Player(host, recipe, opts) {
    opts = opts || {};
    this.r = recipe; this.i = -1; this.playing = false; this.host = host; this.opts = opts;
    var C = root.AKChefs, who = C.CHEFS[opts.who] || C.CHEFS.kuber;
    Voice.lang = opts.lang === 'te' ? 'te' : 'en'; Voice.female = who.female;
    this.who = who; this.steps = C.script(recipe, opts);
    host.innerHTML = '<div class="ck"><div class="ck-stage">' + sceneSVG(opts.who) + '<div class="ck-sub"><span class="ck-step"></span><p class="ck-text"></p><p class="ck-en"></p></div><div class="ck-timer-b"></div></div>' +
      '<div class="ck-bar"><button class="ck-b" data-a="prev" aria-label="Previous step">⏮</button><button class="ck-b ck-main" data-a="play" aria-label="Play or pause">▶</button><button class="ck-b" data-a="next" aria-label="Next step">⏭</button>' +
      '<div class="ck-prog"><i></i></div><button class="ck-b" data-a="voice" aria-label="Voice on or off">🔊</button><button class="ck-b" data-a="speed" aria-label="Voice speed">1×</button><button class="ck-b" data-a="lang" aria-label="Language">' + (opts.lang === 'te' ? 'తె' : 'EN') + '</button><button class="ck-b" data-a="who" aria-label="Switch chef">' + (who.female ? '👩‍🍳' : '👨‍🍳') + '</button></div></div>';
    this.$ = function (s) { return host.querySelector(s); };
    this.$('.ck-dish').innerHTML = root.AKArt.draw(recipe);
    var self = this;
    host.querySelector('.ck-bar').addEventListener('click', function (e) {
      var b = e.target.closest('[data-a]'); if (!b) return;
      var a = b.dataset.a;
      if (a === 'play') self.playing ? self.pause() : self.play();
      if (a === 'next') self.go(self.i + 1);
      if (a === 'prev') self.go(Math.max(0, self.i - 1));
      if (a === 'voice') { Voice.on = !Voice.on; b.textContent = Voice.on ? '🔊' : '🔇'; if (!Voice.on) Voice.stop(); }
      if ((a === 'lang' || a === 'who') && self.opts.onSwitch) { self.pause(); self.opts.onSwitch(a); return; }
      if (a === 'speed') { Voice.rate = Voice.rate >= 1.5 ? 0.8 : Voice.rate + 0.35; b.textContent = (Math.round(Voice.rate * 10) / 10) + '×'; }
    });
    this.go(0, true);
  }
  Player.prototype.show = function (st) {
    var ck = this.host.querySelector('.ck'), k = st.act === 'intro' ? 'plate' : station(st.act);
    ck.className = 'ck act-' + st.act + ' at-' + k + (this.playing ? ' playing' : '');
    if (st.act === 'intro') this.$('.st-plate').classList.add('intro'); else this.$('.st-plate').classList.remove('intro');
    // ingredient that flies in / sits on the board
    var em = emojiFor(st.text + ' ' + (st.act === 'intro' ? this.r.ing.map(function (x) { return x.item; }).join(' ') : ''));
    this.$('.ck-fly').textContent = em; this.$('.ck-item').textContent = em;
    var fly = this.$('.ck-fly'); fly.classList.remove('go'); void fly.getBBox(); if (/add|mix|marinate|blend|whisk|pour|intro/.test(st.act)) fly.classList.add('go');
    // colour of what's cooking moves towards the dish colour
    var p = Math.max(0, this.i) / Math.max(1, this.steps.length - 1), base = (this.r.art && this.r.art.base) || '#c9803f';
    var col = root.AKArt.shade(base, 0.45 - p * 0.45);
    this.host.querySelectorAll('.ck-food').forEach(function (f) { f.setAttribute('fill', col); });
    this.$('.ck-step').textContent = st.act === 'intro' ? (this.opts.lang === 'te' ? this.who.te : this.who.name) : st.final ? 'Ready!' : 'Step ' + this.i + ' of ' + (this.steps.length - 2) + (st.min ? ' · ⏱ ' + st.min + ' min' : '');
    this.$('.ck-text').textContent = st.say + (Voice.missing ? ' 🔈' : '');
    this.$('.ck-en').textContent = st.say !== st.text && this.opts.lang === 'te' ? st.text : '';
    this.$('.ck-prog i').style.width = (p * 100) + '%';
    this.$('.ck-timer-b').textContent = st.min ? '⏱ ' + st.min + ' min' : '';
    if (this.opts.onStep) this.opts.onStep(this.i, st);
  };
  Player.prototype.go = function (i, silent) {
    if (i >= this.steps.length) { this.pause(); return; }
    this.i = i; clearTimeout(this.t);
    var st = this.steps[i], self = this, ck = this.host.querySelector('.ck');
    this.show(st);
    if (silent) return;
    Voice.stop();
    Voice.speak(st.say, function () { ck.classList.add('talking'); }, function () {
      ck.classList.remove('talking');
      if (self.playing && self.i === i) self.t = setTimeout(function () { self.go(i + 1); }, 1400);
    });
  };
  Player.prototype.play = function () {
    this.playing = true; this.$('.ck-main').textContent = '⏸'; this.host.querySelector('.ck').classList.add('playing');
    if (this.i >= this.steps.length - 1) this.i = -1;
    this.go(this.i < 0 ? 0 : this.i);
  };
  Player.prototype.pause = function () {
    this.playing = false; clearTimeout(this.t); Voice.stop();
    var ck = this.host.querySelector('.ck'); if (ck) ck.classList.remove('playing', 'talking');
    var m = this.$('.ck-main'); if (m) m.textContent = '▶';
  };
  Player.prototype.destroy = function () { this.pause(); this.host.innerHTML = ''; };

  root.AKChef = { Player: Player, Voice: Voice, emojiFor: emojiFor };
})(typeof window !== 'undefined' ? window : globalThis);
