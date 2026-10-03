/*
 * Savora — the chefs: Chef Kuber (English) and Chef Vennela (Telugu / English),
 * natural-sounding voices and conversational narration.
 * Copyright (c) 2026 Abhiram Upadrashta — MIT License
 */
(function (root) {
  'use strict';
  var CHEFS = { kuber: { name: 'Chef Kuber', te: 'చెఫ్ కుబేర్', female: false }, vennela: { name: 'Chef Vennela', te: 'చెఫ్ వెన్నెల', female: true } };

  // ------------------------------------------------------------------ Chef Vennela (same rig as Kuber so every animation works)
  var VENNELA = '<g class="ck-chef"><ellipse cx="96" cy="286" rx="58" ry="8" fill="rgba(0,0,0,.35)"/>' +
    '<path d="M46 290 Q48 206 96 192 Q144 206 146 290Z" fill="#8e1537"/>' +
    '<path d="M58 204 Q100 232 140 290 L124 290 Q90 240 52 214Z" fill="#c2185b"/><path d="M56 208 Q98 236 132 290" stroke="url(#ckGold)" stroke-width="5" fill="none"/>' +
    '<path d="M70 224 Q96 216 122 224 L128 290 L64 290Z" fill="#fbfaf6"/><path d="M70 224 Q96 216 122 224" stroke="#e9d8a8" stroke-width="3" fill="none"/><text x="89" y="262" font-size="14" fill="#d4a843">✦</text>' +
    '<rect x="87" y="170" width="18" height="26" rx="6" fill="#d9987a"/><path d="M80 192 Q96 208 112 192" stroke="url(#ckGold)" stroke-width="4" fill="none"/><circle cx="96" cy="203" r="4" fill="#c2185b" stroke="#f3dc92"/>' +
    '<g class="ck-armL"><path d="M54 214 Q32 240 42 262" stroke="#d9987a" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M35 248 l13 4 M34 254 l13 4" stroke="#f3dc92" stroke-width="3"/><circle cx="43" cy="264" r="9" fill="#d9987a"/></g>' +
    '<g class="ck-armR"><path d="M138 214 Q168 214 184 190" stroke="#d9987a" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M170 202 l9 -10 M175 206 l9 -10" stroke="#f3dc92" stroke-width="3"/><circle cx="186" cy="186" r="9" fill="#d9987a"/></g>' +
    '<g class="ck-head"><path d="M54 150 Q46 94 96 90 Q146 94 138 150 Q144 188 130 200 L62 200 Q48 188 54 150Z" fill="#1b110d"/>' +
    '<circle cx="96" cy="80" r="19" fill="#1b110d"/><g fill="#fffdf4">' + [[-22, 0], [-16, -12], [-5, -20], [8, -20], [18, -12], [23, 0]].map(function (p) { return '<circle cx="' + (96 + p[0]) + '" cy="' + (82 + p[1]) + '" r="4"/>'; }).join('') + '</g>' +
    '<ellipse cx="96" cy="142" rx="38" ry="42" fill="#e8ae8a"/>' +
    '<path d="M57 134 Q60 98 96 97 Q132 98 135 134 Q122 110 98 111 L96 104 L94 111 Q70 110 57 134Z" fill="#1b110d"/>' +
    '<ellipse cx="58" cy="146" rx="6" ry="9" fill="#d9987a"/><ellipse cx="134" cy="146" rx="6" ry="9" fill="#d9987a"/>' +
    '<path d="M52 156 h12 l-6 13Z M128 156 h12 l-6 13Z" fill="url(#ckGold)"/><circle cx="58" cy="171" r="2.5" fill="#f3dc92"/><circle cx="134" cy="171" r="2.5" fill="#f3dc92"/>' +
    '<circle cx="96" cy="120" r="3.4" fill="#c2185b"/><ellipse cx="74" cy="158" rx="8" ry="5" fill="#ff8f9a" opacity=".45"/><ellipse cx="118" cy="158" rx="8" ry="5" fill="#ff8f9a" opacity=".45"/>' +
    '<g class="ck-eyes"><ellipse cx="81" cy="138" rx="5.5" ry="6.5" fill="#1f130e"/><ellipse cx="111" cy="138" rx="5.5" ry="6.5" fill="#1f130e"/><circle cx="83" cy="135" r="1.8" fill="#fff"/><circle cx="113" cy="135" r="1.8" fill="#fff"/>' +
    '<path d="M74 133 l-4 -3 M77 131 l-2 -4 M118 133 l4 -3 M115 131 l2 -4" stroke="#1f130e" stroke-width="1.6" stroke-linecap="round"/></g>' +
    '<path d="M72 126 q9 -6 18 -1 M102 125 q9 -5 18 1" stroke="#2a1812" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M96 142 q-3 8 1 10" stroke="#c98a6a" stroke-width="2" fill="none"/>' +
    '<g class="ck-mouth"><ellipse class="ck-m-open" cx="96" cy="166" rx="8" ry="6" fill="#a0183a"/><path class="ck-m-smile" d="M85 163 q11 9 22 0 q-11 3 -22 0Z" fill="#c0264a"/></g>' +
    '<path d="M62 104 Q96 84 130 104" stroke="url(#ckGold)" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="96" cy="93" r="4" fill="#c2185b" stroke="#f3dc92" stroke-width="1.5"/></g></g>';

  // ------------------------------------------------------------------ Telugu narration
  var TE = [[/ginger-garlic paste/, 'అల్లం వెల్లుల్లి ముద్ద'], [/green chill/, 'పచ్చిమిర్చి'], [/curry leaves/, 'కరివేపాకు'], [/coriander leaves|coriander$/, 'కొత్తిమీర'], [/chilli powder|red chilli/, 'కారం'], [/garam masala/, 'గరం మసాలా'],
    [/onion|shallot/, 'ఉల్లిపాయలు'], [/tomato/, 'టమాటాలు'], [/garlic/, 'వెల్లుల్లి'], [/ginger/, 'అల్లం'], [/mustard/, 'ఆవాలు'], [/cumin|jeera/, 'జీలకర్ర'], [/turmeric/, 'పసుపు'], [/salt/, 'ఉప్పు'], [/ghee/, 'నెయ్యి'], [/butter/, 'వెన్న'], [/oil/, 'నూనె'],
    [/cream|malai/, 'క్రీమ్'], [/curd|yogurt/, 'పెరుగు'], [/milk/, 'పాలు'], [/rice/, 'బియ్యం'], [/dal|lentil/, 'పప్పు'], [/water|stock/, 'నీళ్లు'], [/sugar/, 'పంచదార'], [/jaggery/, 'బెల్లం'], [/tamarind/, 'చింతపండు'], [/coconut/, 'కొబ్బరి'],
    [/paneer/, 'పనీర్'], [/chicken/, 'చికెన్'], [/mutton|keema/, 'మటన్'], [/fish/, 'చేప ముక్కలు'], [/prawn/, 'రొయ్యలు'], [/egg/, 'గుడ్లు'], [/potato|aloo/, 'బంగాళాదుంపలు'], [/peas|matar/, 'బఠానీలు'], [/spinach|palak/, 'పాలకూర'], [/cashew/, 'జీడిపప్పు'],
    [/cardamom/, 'యాలకులు'], [/lemon|lime/, 'నిమ్మరసం'], [/capsicum/, 'క్యాప్సికం'], [/carrot/, 'క్యారెట్'], [/vegetable|veggies/, 'కూరగాయలు'], [/pepper/, 'మిరియాలు'], [/mint/, 'పుదీనా'], [/flour|maida|atta|besan/, 'పిండి'], [/batter/, 'పిండి'], [/dough/, 'పిండి ముద్ద'],
    [/bread|pav|bun/, 'బ్రెడ్'], [/noodle|pasta|maggi|vermicelli/, 'నూడుల్స్'], [/ice cream/, 'ఐస్ క్రీమ్'], [/chocolate|cocoa/, 'చాక్లెట్'], [/mango/, 'మామిడి'], [/banana/, 'అరటిపండు'], [/rava|semolina/, 'రవ్వ'], [/cheese/, 'చీజ్'], [/masala|spice/, 'మసాలా'], [/cauliflower|gobi/, 'క్యాలీఫ్లవర్'], [/mushroom/, 'మష్రూమ్స్']];
  function teWords(text) {
    var t = String(text).toLowerCase(), found = [];
    TE.forEach(function (p) { var m = t.search(p[0]); if (m >= 0 && found.every(function (f) { return f.w !== p[1]; })) found.push({ at: m, w: p[1] }); });
    found.sort(function (a, b) { return a.at - b.at; });
    return found.slice(0, 3).map(function (f) { return f.w; });
  }
  var TT = {
    chop: 'ముందుగా {X} ని చిన్న ముక్కలుగా కట్ చేసుకోండి.', fry: 'బాణలిలో నూనె వేడి చేసి, {X} వేసి చక్కగా వేయించండి.', saute: '{X} వేసి, బంగారు రంగు వచ్చే వరకు బాగా వేయించండి.', add: '{X} వేసి, అన్నీ బాగా కలపండి.',
    stir: '{X} వేసి, అడుగు అంటకుండా నెమ్మదిగా కలుపుతూ ఉండండి.', simmer: 'మూత పెట్టి, సన్నని మంట మీద ఉడకనివ్వండి.', boil: '{X} ని బాగా మరిగించండి.', pressure: '{X} ని కుక్కర్‌లో పెట్టి, మెత్తగా అయ్యే వరకు ఉడికించండి.',
    blend: '{X} ని మిక్సీలో వేసి మెత్తగా రుబ్బుకోండి.', marinate: '{X} కి మసాలాలు, ఉప్పు బాగా పట్టించి, కాసేపు నాననివ్వండి.', mix: 'ఒక గిన్నెలో {X} వేసి బాగా కలుపుకోండి.', whisk: '{X} ని నురుగు వచ్చే వరకు బాగా గిలకొట్టండి.',
    bake: 'ఓవెన్‌లో పెట్టి, బంగారు రంగు వచ్చే వరకు బేక్ చేయండి.', freeze: 'ఫ్రీజర్‌లో పెట్టి, బాగా సెట్ అవ్వనివ్వండి.', knead: '{X} ని మెత్తని ముద్దలా బాగా పిసకండి.', roll: 'చిన్న ఉండలు చేసి, గుండ్రంగా వత్తుకోండి.',
    pour: '{X} ని మెల్లగా పోయండి.', steam: 'ఆవిరి మీద చక్కగా ఉడికించండి.', grill: '{X} ని అంచులు కాస్త నల్లగా అయ్యే వరకు గ్రిల్ చేయండి.', garnish: 'చివరగా కొత్తిమీరతో అలంకరించండి. వేడి వేడిగా వడ్డించండి!',
    serve: 'అంతే! వేడి వేడిగా వడ్డించండి.', rest: 'కాసేపు అలాగే ఉంచండి.' };
  var TE_OPEN = ['', 'సరే, ', 'ఇప్పుడు, ', 'తర్వాత, ', 'బాగుంది! ఇప్పుడు '];
  function teStep(s, i) {
    var w = teWords(s.text), x = w.length ? w.join(', ') : 'అన్నీ';
    var line = (TT[s.act] || '{X} తో ఈ స్టెప్ చేయండి.').replace('{X}', x);
    if (s.min > 2 && !/garnish|serve|rest/.test(s.act)) line += ' సుమారు ' + s.min + ' నిమిషాలు పడుతుంది.';
    return (i > 1 && !/garnish|serve/.test(s.act) ? TE_OPEN[i % TE_OPEN.length] : '') + line;
  }

  // ------------------------------------------------------------------ English narration — conversational, not robotic
  var EN_OPEN = ['', 'Alright, ', 'Now, ', 'Next, ', 'Okay, ', 'Perfect. Now, ', 'Good. '];
  function enStep(s, i) {
    var t = s.text;
    if (i > 1 && !/garnish|serve/.test(s.act)) { var o = EN_OPEN[i % EN_OPEN.length]; if (o) t = o + t.charAt(0).toLowerCase() + t.slice(1); }
    if (s.min >= 5 && !/\d+\s*(minute|min)/i.test(s.text)) t += ' This takes about ' + s.min + ' minutes.';
    return t.replace(/–/g, ' to ').replace(/½/g, ' half ').replace(/¼/g, ' quarter ').replace(/(\d)°C/g, '$1 degrees');
  }

  function script(r, o) {
    var who = CHEFS[o.who] || CHEFS.kuber, te = o.lang === 'te';
    var intro = te ? 'నమస్కారం! నేను ' + who.te + '. ఈ రోజు మనం కలిసి ' + r.name + ' చేద్దాం. ముందుగా కావలసిన పదార్థాలు రెడీ చేసుకుందాం. పదండి!'
      : 'Hi there! I\'m ' + who.name + ', and today we\'re cooking ' + r.name + ' together. ' + (r.desc || '') + ' Let\'s get our ingredients ready.';
    var outro = te ? 'మన ' + r.name + ' రెడీ! వేడి వేడిగా ఎంజాయ్ చేయండి. హ్యాపీ కుకింగ్!' : 'And that\'s it — our ' + r.name + ' is ready! Serve it hot, and enjoy. Happy cooking!';
    var list = [{ act: 'intro', text: intro, min: 0 }].concat(r.steps, [{ act: 'serve', text: outro, min: 0, final: true }]);
    return list.map(function (s, i) {
      var say = i === 0 || s.final ? s.text : te ? teStep(s, i) : enStep(s, i);
      return { act: s.act, text: s.text, min: s.min, final: s.final, say: say };
    });
  }

  // ------------------------------------------------------------------ voice: best natural voice per language & chef, spoken sentence by sentence
  var FEM = /female|woman|veena|neerja|swara|shruti|heera|samantha|zira|aria|jenny|sonia|karen|moira|tessa|fiona|kalpana|lekha|google uk english female|google us english/i;
  var MAL = /\bmale\b|rishi|prabhat|daniel|ravi|guy|ryan|alex|hemant|mohan|google uk english male|fred|arthur/i;
  function pick(lang, female) {
    var ss = root.speechSynthesis; if (!ss) return null;
    var re = lang === 'te' ? /^te/i : /^en/i, best = null, bs = -1;
    ss.getVoices().forEach(function (v) {
      if (!re.test(v.lang)) return;
      var s = 0;
      if (/natural|neural|premium|enhanced|online/i.test(v.name)) s += 6;
      if (/en[-_]IN|te[-_]IN/i.test(v.lang)) s += 3;
      if (/google/i.test(v.name)) s += 2;
      if (female ? FEM.test(v.name) : MAL.test(v.name)) s += 4;
      if (female ? MAL.test(v.name) : FEM.test(v.name)) s -= 4;
      if (s > bs) { bs = s; best = v; }
    });
    return best;
  }
  var Voice = {
    on: true, rate: 1, lang: 'en', female: false, missing: false, _t: [],
    native: function () { return root.Capacitor && root.Capacitor.Plugins && root.Capacitor.Plugins.TextToSpeech; },
    speak: function (text, onStart, onEnd) {
      var self = this, done = false; function end() { if (!done) { done = true; onEnd && onEnd(); } }
      var wait = function () { onStart && onStart(); self._t.push(setTimeout(end, Math.min(12000, 1600 + text.length * 60))); };
      if (!this.on) return wait();
      var tts = this.native(), lang = this.lang === 'te' ? 'te-IN' : 'en-IN';
      if (tts) { onStart && onStart(); tts.speak({ text: text, lang: lang, rate: this.rate * 0.95, pitch: this.female ? 1.1 : 0.95, volume: 1, category: 'playback' }).then(function () { self.missing = false; end(); }, function () { self.missing = self.lang === 'te'; self._t.push(setTimeout(end, Math.min(12000, 1600 + text.length * 60))); }); return; }
      var ss = root.speechSynthesis; if (!ss) return wait();
      var v = pick(this.lang, this.female);
      this.missing = this.lang === 'te' && !v;
      if (this.missing) return wait();                 // no Telugu voice on this device: subtitles only
      ss.cancel();
      var parts = text.match(/[^.!?।]+[.!?।]*\s*/g) || [text], n = 0;
      parts.forEach(function (p, k) {
        var u = new SpeechSynthesisUtterance(p.trim()); u.voice = v; u.lang = v.lang;
        u.rate = self.rate * (self.lang === 'te' ? 0.92 : 0.96); u.pitch = self.female ? 1.08 : 0.96;
        if (k === 0) u.onstart = function () { onStart && onStart(); };
        u.onend = u.onerror = function () { if (++n >= parts.length) end(); };
        ss.speak(u);
      });
      this._t.push(setTimeout(end, 5000 + text.length * 130));        // safety net
    },
    stop: function () { this._t.forEach(clearTimeout); this._t = []; var tts = this.native(); if (tts) tts.stop().catch(function () {}); if (root.speechSynthesis) root.speechSynthesis.cancel(); }
  };
  if (root.speechSynthesis) { root.speechSynthesis.getVoices(); root.speechSynthesis.onvoiceschanged = function () { root.speechSynthesis.getVoices(); }; }

  root.AKChefs = { CHEFS: CHEFS, VENNELA: VENNELA, script: script, Voice: Voice, teWords: teWords };
})(typeof window !== 'undefined' ? window : globalThis);
