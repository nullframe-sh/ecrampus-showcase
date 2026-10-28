// Build the public renderer export from an explicitly pinned private checkout.
// No Electron main process, credentials, captured data or source maps are exported.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const source = path.resolve(process.argv[2] || '');
const destination = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const revision = '6c6621490afdb807955afef86631f2a9db4ebe4a'; // tag v2.5.0
const git = (...args) => execFileSync('git', ['-C', source, ...args], { encoding: 'utf8' }).trim();
if (git('rev-parse', 'HEAD') !== revision || git('status', '--porcelain', '--untracked-files=no')) {
  throw new Error('Expected the clean, pinned v2.5.0 source commit ' + revision);
}
const desktop = path.join(source, 'desktop');
const { build } = await import(pathToFileURL(path.join(desktop, 'node_modules/vite/dist/node/index.js')));
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'ecrampus-demo-'));
const posix = p => p.replaceAll('\\', '/');
const bootstrap = path.join(temp, 'bootstrap.js');
fs.writeFileSync(bootstrap, `import ${JSON.stringify(posix(path.join(destination, 'tools/demo-clock.js')))};\nimport ${JSON.stringify(posix(path.join(source, 'tests/ui/mockApi.js')))};\nimport ${JSON.stringify(posix(path.join(destination, 'tools/demo-adapter.js')))};\nimport ${JSON.stringify(posix(path.join(desktop, 'src/renderer/src/main.tsx')))};`);
const result = await build({
  configFile: false, root: path.join(desktop, 'src/renderer'), base: './', logLevel: 'warn',
  esbuild: { jsx: 'automatic', legalComments: 'none' },
  resolve: { alias: { '@renderer': path.join(desktop, 'src/renderer/src'), '@core': path.join(source, 'src') } },
  build: { write: false, sourcemap: false, assetsInlineLimit: 100_000_000, cssCodeSplit: false,
    rollupOptions: { output: { inlineDynamicImports: true } } },
  plugins: [{ name: 'demo-entry', transformIndexHtml: { order: 'pre', handler(html) {
    return html.replace('src="/src/main.tsx"', `src="${posix(bootstrap)}"`);
  } } }],
});
const output = result.output;
let js = output.find(item => item.type === 'chunk' && item.isEntry).code;
let css = output.filter(item => item.fileName.endsWith('.css')).map(item => item.source).join('\n');
const mime = { js: 'text/javascript', mjs: 'text/javascript', png: 'image/png', svg: 'image/svg+xml', jpg: 'image/jpeg',
  jpeg: 'image/jpeg', webp: 'image/webp', gif: 'image/gif', woff2: 'font/woff2', woff: 'font/woff' };
for (const item of output) {
  const ext = item.fileName.split('.').pop().toLowerCase();
  if (item.type !== 'asset' || !mime[ext]) continue;
  // Everything is inlined: the page must not fetch anything (CSP connect-src/img-src without hosts).
  const url = `data:${mime[ext]};base64,` + Buffer.from(item.source).toString('base64');
  js = js.replaceAll(JSON.stringify(item.fileName), JSON.stringify(url))
    .replaceAll(JSON.stringify(path.basename(item.fileName)), JSON.stringify(url))
    .replaceAll('./' + item.fileName, url).replaceAll('/' + item.fileName, url);
}
js = js.replaceAll('</script', '<\\/script');
// The release notes name the real class; the public demo uses the fictional class of the test data instead.
js = js.replaceAll('US_IT-86.1', 'US_IT-99.9');
const hash = crypto.createHash('sha256').update(js).digest('base64');
const csp = `default-src 'none'; script-src 'sha256-${hash}' data: blob:; style-src 'unsafe-inline'; img-src data: blob:; font-src data:; connect-src 'none'; frame-src blob:; worker-src data: blob:; object-src 'none'; base-uri 'none'; form-action 'none'`;
const html = `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>eCrampus 2.5.0 · Demo</title><meta name="description" content="Interaktive Demo von eCrampus 2.5.0 mit erfundenen Beispieldaten."><meta http-equiv="Content-Security-Policy" content="${csp}"><style>${css}\n${fs.readFileSync(path.join(destination, 'tools/demo.css'), 'utf8')}</style></head><body><aside class="demo-banner">eCrampus 2.5.0 · Demo <span>Erfundene Beispieldaten · Keine echte Anmeldung · Keine Netzwerkverbindung</span></aside><div id="root"></div><script type="module">${js}</script></body></html>`;
fs.writeFileSync(path.join(destination, 'index.html'), html);
fs.writeFileSync(path.join(destination, 'demo-version.json'), JSON.stringify({ version: '2.5.0', status: 'release', sourceCommit: revision, sourceTag: 'v2.5.0', data: 'fictional', sha256: crypto.createHash('sha256').update(html).digest('hex') }, null, 2) + '\n');
console.log('Built demo:', html.length, 'characters, source', revision);
