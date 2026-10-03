/*
 * Savora — "Check for Updates" with an animated bubble overlay.
 * Desktop (Mac/Windows): downloads & installs in place. Android: downloads the new APK to install.
 * Copyright (c) 2026 Abhiram Upadrashta — MIT License
 */
(function (root) {
  'use strict';
  var REPO = 'AbhiramUpadrashta/Savora';
  var nat = root.akNative || null, cap = root.Capacitor && root.Capacitor.isNativePlatform && root.Capacitor.isNativePlatform();
  var platform = nat ? nat.platform : cap ? 'android' : 'web';
  var ASSET = platform === 'darwin' ? 'Savora-mac.zip' : platform === 'win32' ? 'Savora-Setup.exe' : 'Savora.apk';
  function version() { return (nat && nat.version) || root.AK_VERSION || '1.0.0'; }
  function newer(a, b) { a = a.split('.').map(Number); b = b.split('.').map(Number); for (var i = 0; i < 3; i++) { if ((a[i] || 0) !== (b[i] || 0)) return (a[i] || 0) > (b[i] || 0); } return false; }

  var box = null;
  function overlay(state) {
    box = box || document.getElementById('upd');
    box.hidden = false;
    var pct = state.pct == null ? null : Math.max(0, Math.min(100, state.pct)), C = 2 * Math.PI * 64;
    box.innerHTML = '<div class="card2"><div class="ring"><svg viewBox="0 0 150 150"><defs><linearGradient id="ug" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e3e9ff"/><stop offset=".5" stop-color="#7f9bff"/><stop offset="1" stop-color="#3c55d1"/></linearGradient></defs>' +
      '<circle class="tr" cx="75" cy="75" r="64" fill="none" stroke-width="10"/>' +
      (pct == null ? '<g class="spin"><circle class="pg" cx="75" cy="75" r="64" fill="none" stroke-width="10" stroke-dasharray="' + C + '" stroke-dashoffset="' + C * 0.72 + '"/></g>'
        : '<circle class="pg" cx="75" cy="75" r="64" fill="none" stroke-width="10" stroke-dasharray="' + C + '" stroke-dashoffset="' + C * (1 - pct / 100) + '"/>') +
      '</svg><div class="pot"><span>' + (state.icon || '🍲') + '</span></div>' + (pct != null ? '<div class="pct">' + Math.round(pct) + '%</div>' : '') +
      '<div class="sparkle">' + [18, 40, 62, 84, 106, 128].map(function (x, i) { return '<i style="left:' + x + 'px;top:' + (90 + (i % 3) * 12) + 'px;animation-delay:' + (i * 0.25) + 's"></i>'; }).join('') + '</div></div>' +
      '<h3 class="gold">' + state.title + '</h3><p>' + (state.text || '') + '</p><div class="acts">' + (state.buttons || []).map(function (b, i) { return '<button class="btn ' + (i ? '' : 'gold') + '" data-i="' + i + '">' + b[0] + '</button>'; }).join('') + '</div></div>';
    box.querySelectorAll('[data-i]').forEach(function (btn) { btn.onclick = function () { state.buttons[+btn.dataset.i][1](); }; });
  }
  function close() { if (box) box.hidden = true; }

  async function latest() {
    try {
      var r = await fetch('https://api.github.com/repos/' + REPO + '/releases/latest', { cache: 'no-store', headers: { Accept: 'application/vnd.github+json' } });
      if (r.ok) { var j = await r.json(), a = (j.assets || []).find(function (x) { return x.name === ASSET; }); return { v: String(j.tag_name).replace(/^v/, ''), url: a ? a.browser_download_url : 'https://github.com/' + REPO + '/releases/latest/download/' + ASSET, notes: j.body || '' }; }
    } catch (e) { /* offline */ }
    return null;
  }

  async function check(user) {
    if (user) overlay({ title: 'Checking for updates', text: 'Looking for the newest recipes & features…', icon: '🔎' });
    var rel = await latest();
    if (!rel) { if (user) overlay({ title: 'Can\'t reach the server', text: 'Please check your internet connection and try again.', icon: '📡', buttons: [['OK', close]] }); return; }
    if (!newer(rel.v, version())) { if (user) overlay({ title: 'You\'re up to date', text: 'Savora ' + version() + ' is the latest version. ✨', icon: '👑', pct: 100, buttons: [['Great!', close]] }); return; }
    overlay({ title: 'Savora ' + rel.v + ' is here!', text: 'You have ' + version() + '. ' + (rel.notes ? rel.notes.split('\n')[0].slice(0, 120) : 'New recipes, fixes and improvements.'), icon: '🎁',
      buttons: [['Update now', function () { install(rel); }], ['Later', close]] });
  }

  function install(rel) {
    if (platform === 'darwin' || platform === 'win32') {
      overlay({ title: 'Downloading update', text: 'Savora ' + rel.v, pct: 0, icon: '🍲' });
      nat.onUpdate(function (s) {
        if (s.stage === 'download') overlay({ title: 'Downloading update', text: s.text || ('Savora ' + rel.v), pct: s.pct, icon: '🍲' });
        else if (s.stage === 'install') overlay({ title: 'Installing…', text: 'Chef Kuber is plating your new version', icon: '👨‍🍳' });
        else if (s.stage === 'restart') overlay({ title: 'Restarting', text: 'See you in a second!', pct: 100, icon: '✨' });
        else if (s.stage === 'error') overlay({ title: 'Update didn\'t finish', text: s.text, icon: '⚠️', buttons: [['Open download page', function () { nat.open('https://abhiramupadrashta.github.io/Savora/#download'); close(); }], ['Close', close]] });
      });
      nat.update(rel.url, rel.v);
      return;
    }
    if (platform === 'android') {
      overlay({ title: 'Downloading Savora ' + rel.v, text: 'The new APK is downloading. When it finishes, tap it and choose <b>Update</b> — your favourites stay safe.', icon: '📲' });
      var B = root.Capacitor.Plugins.Browser;
      setTimeout(function () {
        var apk = rel.url;   // the release file itself — works no matter where the website lives
        if (B) B.open({ url: apk }); else root.open(apk, '_system');
        overlay({ title: 'Almost there!', text: 'Open the downloaded <b>Savora</b> update from your notifications and tap <b>Update</b>.', icon: '✅', pct: 100, buttons: [['Done', close]] });
      }, 1600);
      return;
    }
    overlay({ title: 'Updating', text: 'Loading the newest version…', icon: '✨' });
    setTimeout(function () { location.reload(); }, 1200);
  }

  root.AKUpdate = { check: check, version: version, platform: platform, close: close };
})(window);
