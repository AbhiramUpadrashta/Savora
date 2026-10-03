/*
 * Savora — animated step-by-step install videos (Android, Windows, Mac).
 * Copyright (c) 2026 Bubbles Aro — MIT License
 */
(function (root) {
  'use strict';
  function dlg(title, text, buttons, primary) {
    return '<div class="gv-dlg"><b>' + title + '</b>' + text + '<div class="bt">' + buttons.map(function (b, i) { return '<span class="' + (i === primary ? 'p' : '') + '">' + b + '</span>'; }).join('') + '</div></div>';
  }
  var G = {
    android: { cls: 'android', phone: true, steps: [
      { cap: 'Tap “Download APK” on this website.', add: [['<div class="gv-dlg"><b>Savora</b>abhiramupadrashta.github.io<div class="bt"><span class="p">⬇ Download APK</span></div></div>', 14, 140, 180]], cur: [150, 212] },
      { cap: 'Chrome may warn about APK files. Tap “Download anyway”.', add: [[dlg('File might be harmful', 'Do you want to keep Savora.apk anyway?', ['Cancel', 'Download anyway'], 1), 10, 110, 184]], cur: [150, 200], clear: true },
      { cap: 'When it finishes, tap “Open” (or open it from notifications).', add: [['<div class="gv-dlg">✅ Savora.apk downloaded<div class="bt"><span class="p">Open</span></div></div>', 14, 300, 180]], cur: [170, 342], clear: true },
      { cap: 'First time only: Android blocks unknown apps. Tap “Settings”.', add: [[dlg('For your security…', 'your phone is not allowed to install unknown apps from this source.', ['Cancel', 'Settings'], 1), 10, 120, 184]], cur: [168, 212], clear: true },
      { cap: 'Turn ON “Allow from this source”, then press Back.', add: [['<div class="gv-dlg"><b>Install unknown apps</b>Chrome<div class="bt" style="justify-content:space-between"><span>Allow from this source</span><span class="p">ON</span></div></div>', 10, 110, 184]], cur: [170, 172], clear: true },
      { cap: 'Tap “Install”.', add: [[dlg('Savora', 'Do you want to install this app?', ['Cancel', 'Install'], 1), 10, 250, 184]], cur: [168, 336], clear: true },
      { cap: 'If Play Protect asks, tap “More details” → “Install anyway”. Savora is safe and open-source.', add: [[dlg('Unsafe app blocked?', 'Play Protect doesn\'t recognise this developer.<br><u>More details</u>', ['OK', 'Install anyway'], 1), 10, 110, 184]], cur: [160, 216], clear: true },
      { cap: 'Done! Open Savora and start cooking 👨‍🍳', add: [['<div style="text-align:center;padding-top:80px"><img src="img/logo.svg" width="96" style="border-radius:24px"><div style="font:700 20px Georgia;margin-top:10px">Savora</div><div style="color:#666;font-size:12px">Installed ✓</div></div>', 0, 0, 204]], clear: true }
    ] },
    windows: { cls: 'win', steps: [
      { cap: 'Download “Savora-Setup.exe” from this website and open it.', add: [['<div class="gv-file"><i>📦</i>Savora-Setup.exe</div>', 330, 150, 120]], cur: [388, 190] },
      { cap: 'Windows SmartScreen appears. Click “More info”.', add: [['<div class="gv-dlg" style="background:#0a5ea8;color:#fff"><b style="font-size:20px">Windows protected your PC</b>Microsoft Defender SmartScreen prevented an unrecognised app from starting.<br><u>More info</u><div class="bt"><span>Don\'t run</span></div></div>', 150, 90, 440]], cur: [192, 205], clear: true },
      { cap: 'Click “Run anyway”.', add: [['<div class="gv-dlg" style="background:#0a5ea8;color:#fff"><b style="font-size:20px">Windows protected your PC</b>App: Savora-Setup.exe<br>Publisher: Unknown publisher<div class="bt"><span style="background:#fff;color:#0a5ea8">Run anyway</span><span>Don\'t run</span></div></div>', 150, 90, 440]], cur: [470, 238], clear: true },
      { cap: 'Savora installs itself in a few seconds — no questions asked.', add: [['<div class="gv-dlg"><b>Installing Savora…</b><div style="height:8px;border-radius:6px;background:#eee;margin-top:10px"><div style="height:8px;width:80%;border-radius:6px;background:linear-gradient(90deg,#e9c267,#c0902e)"></div></div></div>', 200, 150, 340]], clear: true },
      { cap: 'Done! Savora opens automatically and sits in your Start menu.', add: [['<div style="text-align:center"><img src="img/logo.svg" width="110" style="border-radius:26px"><div style="font:700 24px Georgia;color:#fff;margin-top:10px">Savora</div></div>', 290, 110, 160]], clear: true }
    ] },
    mac: { cls: 'mac', steps: [
      { cap: 'Download “Savora-mac.zip” and double-click it in Downloads.', add: [['<div class="gv-bar-top"><b>Finder</b> File Edit View Go</div>', 0, 0, 760], ['<div class="gv-file"><i>🗜️</i>Savora-mac.zip</div>', 300, 130, 140]], cur: [368, 170] },
      { cap: 'Drag Savora into your Applications folder.', add: [['<div class="gv-file"><i><img src="img/logo.svg" width="50" style="border-radius:12px"></i>Savora</div>', 220, 150, 100], ['<div class="gv-file"><i>📁</i>Applications</div>', 460, 150, 110]], cur: [510, 190], clear: 1 },
      { cap: 'Open it. macOS says it can\'t verify the app — click “Done” (not Move to Bin).', add: [[dlg('“Savora” Not Opened', 'Apple could not verify “Savora” is free of malware…', ['Move to Bin', 'Done'], 1), 190, 110, 380]], cur: [520, 220], clear: 1 },
      { cap: 'Open the Apple menu → System Settings → Privacy & Security, scroll down.', add: [['<div class="gv-dlg" style="width:420px"><b>Privacy & Security</b>Security<br>“Savora” was blocked to protect your Mac.<div class="bt"><span class="p">Open Anyway</span></div></div>', 170, 100, 420]], cur: [520, 196], clear: 1 },
      { cap: 'Click “Open Anyway”, then “Open Anyway” again and enter your password.', add: [[dlg('Open “Savora”?', 'Only open if you trust its source. (Savora is free & open-source.)', ['Move to Bin', 'Open Anyway'], 1), 190, 120, 380]], cur: [520, 226], clear: 1 },
      { cap: 'Done! From now on Savora opens normally, and updates install themselves.', add: [['<div style="text-align:center"><img src="img/logo.svg" width="110" style="border-radius:26px"><div style="font:700 24px Georgia;margin-top:10px">Savora</div></div>', 300, 100, 160]], clear: 1 }
    ] }
  };
  function mount(el, key) {
    var g = G[key], i = -1, timer = null, playing = true;
    el.innerHTML = '<div class="gv"><div class="gv-screen ' + g.cls + '">' + (g.phone ? '<div class="gv-phone"><div class="gv-in" style="position:absolute;inset:0"></div><div class="gv-cursor"></div></div>' : '<div class="gv-in" style="position:absolute;inset:0"></div><div class="gv-cursor"></div>' + (key === 'mac' ? '<div class="gv-dock"><i>🗂️</i><i>🌐</i><i>⚙️</i><i><img src="img/logo.svg" width="30" style="border-radius:8px"></i></div>' : '')) + '</div>' +
      '<div class="gv-cap"><b>Step 1</b><span></span></div><div class="gv-ctrl"><button class="pp" aria-label="Play/pause">⏸</button><button class="nx" aria-label="Next">⏭</button><div class="gv-bar"><i></i></div></div></div>';
    var inn = el.querySelector('.gv-in'), cur = el.querySelector('.gv-cursor'), cap = el.querySelector('.gv-cap span'), n = el.querySelector('.gv-cap b'), bar = el.querySelector('.gv-bar i');
    function step() {
      i = (i + 1) % g.steps.length;
      var s = g.steps[i];
      if (i === 0 || s.clear) inn.innerHTML = '';
      (s.add || []).forEach(function (a) { var d = document.createElement('div'); d.className = 'gv-el'; d.style.left = a[1] + 'px'; d.style.top = a[2] + 'px'; d.style.width = a[3] + 'px'; d.innerHTML = a[0]; inn.appendChild(d); setTimeout(function () { d.classList.add('show'); }, 60); });
      cur.style.display = s.cur ? '' : 'none';
      if (s.cur) { setTimeout(function () { cur.style.left = (s.cur[0] - 13) + 'px'; cur.style.top = (s.cur[1] - 13) + 'px'; }, 300); setTimeout(function () { cur.classList.add('tap'); setTimeout(function () { cur.classList.remove('tap'); }, 250); }, 1400); }
      cap.textContent = s.cap; n.textContent = 'Step ' + (i + 1) + '/' + g.steps.length; bar.style.width = ((i + 1) / g.steps.length * 100) + '%';
      clearTimeout(timer); if (playing) timer = setTimeout(step, 3600);
    }
    el.querySelector('.pp').onclick = function () { playing = !playing; this.textContent = playing ? '⏸' : '▶'; clearTimeout(timer); if (playing) timer = setTimeout(step, 1200); };
    el.querySelector('.nx').onclick = function () { step(); };
    step();
    return function () { clearTimeout(timer); };
  }
  root.AKGuide = { mount: mount };
})(window);
