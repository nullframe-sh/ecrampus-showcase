// Browser-only adjustments. The renderer itself remains the pinned original.
try { localStorage.setItem('ecrampus.lastSeenVersion', '2.5.0'); } catch {}
const api = window.api;
window.api = new Proxy(api, { get(target, name) {
  if (name === 'getAppInfo') return async () => ({ ok: true, data: { version: '2.5.0', packaged: true, backgroundChecks: true } });
  if (name === 'checkForUpdates') return async () => ({ ok: true, data: { status: 'up-to-date', version: '2.5.0' } });
  return target[name];
} });
// Native embedded web views cannot be exported to a browser. Explain the boundary
// in their empty stage instead of showing the test harness's endless spinner.
const decorate = () => {
  for (const note of document.querySelectorAll('.embedded-note:not([data-demo])')) {
    note.dataset.demo = 'true';
    note.replaceChildren();
    const title = document.createElement('strong');
    title.textContent = 'Diese Ansicht öffnet sich in der Desktop-App';
    const detail = document.createElement('p');
    detail.textContent = 'simpleclub und das Lernzeitkonto nutzen dort eigene Webansichten. In dieser Demo werden keine externen Dienste geladen und keine Zugangsdaten benötigt.';
    note.append(title, detail);
  }
};
new MutationObserver(decorate).observe(document.documentElement, { childList: true, subtree: true });
