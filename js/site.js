/* Savora website. © 2026 Abhiram Upadrashta — MIT */
(function () {
  'use strict';
  var ua = navigator.userAgent, os = /Android/i.test(ua) ? 'android' : /Windows/i.test(ua) ? 'windows' : /Mac/i.test(ua) ? 'mac' : 'android';
  var best = { android: 'dlAndroid', windows: 'dlWin', mac: 'dlMac' }[os];
  var el = document.getElementById(best); if (el) { el.classList.add('best'); el.parentNode.insertBefore(el, el.parentNode.firstChild); }
  // install videos
  var stop = null, host = document.getElementById('guide');
  function show(k) { if (stop) stop(); document.querySelectorAll('.gtabs button').forEach(function (b) { b.classList.toggle('on', b.dataset.g === k); }); stop = AKGuide.mount(host, k); }
  document.querySelectorAll('.gtabs button').forEach(function (b) { b.onclick = function () { show(b.dataset.g); }; });
  show(os);
  // donation QR (the UPI details live only inside the code)
  var UPI = 'upi://pay?pa=upadrashtaabhiram123-4@okicici&pn=Abhi%20Ram%20upadrashta&tn=Savora%20support&cu=INR';
  if (window.QRCode) new QRCode(document.getElementById('qr'), { text: UPI, width: 512, height: 512, correctLevel: QRCode.CorrectLevel.M });
  // play demo videos when visible
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.preload = 'auto'; e.target.play().catch(function () {}); } else e.target.pause(); }); }, { threshold: 0.4 });
    document.querySelectorAll('video').forEach(function (v) { io.observe(v); });
  }
})();
