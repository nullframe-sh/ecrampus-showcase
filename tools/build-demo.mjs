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
const revision = '492068c1212760b70edf774e25b44741d01332a0';
const git = (...args) => execFileSync('git', ['-C', source, ...args], { encoding: 'utf8' }).trim();
if (git('rev-parse', 'HEAD') !== revision || git('status', '--porcelain', '--untracked-files=no')) {
  throw new Error('Expected the clean, pinned release/2.3.0 source commit ' + revision);
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
for (const item of output) {
  if (item.type !== 'asset' || !/\.(js|mjs)$/.test(item.fileName)) continue;
  const url = 'data:text/javascript;base64,' + Buffer.from(item.source).toString('base64');
  js = js.replaceAll('./' + item.fileName, url).replaceAll('/' + item.fileName, url);
}
js = js.replaceAll('</script', '<\\/script');
const hash = crypto.createHash('sha256').update(js).digest('base64');
const csp = `default-src 'none'; script-src 'sha256-${hash}' data: blob:; style-src 'unsafe-inline'; img-src data: blob:; font-src data:; connect-src 'none'; frame-src blob:; worker-src data: blob:; object-src 'none'; base-uri 'none'; form-action 'none'`;
const html = `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>eCrampus 2.3.0 – Vorschau</title><meta name="description" content="Interaktive Vorschau auf eCrampus 2.3.0 mit erfundenen Beispieldaten."><meta http-equiv="Content-Security-Policy" content="${csp}"><style>${css}\n${fs.readFileSync(path.join(destination, 'tools/demo.css'), 'utf8')}</style></head><body><aside class="demo-banner">eCrampus 2.3.0 · Vorschau <span>Erfundene Beispieldaten · Keine echte Anmeldung</span></aside><div id="root"></div><script type="module">${js}</script></body></html>`;
fs.writeFileSync(path.join(destination, 'index.html'), html);
fs.writeFileSync(path.join(destination, 'demo-version.json'), JSON.stringify({ version: '2.3.0', status: 'preview', sourceCommit: revision, sourceBranch: 'release/2.3.0', data: 'fictional', sha256: crypto.createHash('sha256').update(html).digest('hex') }, null, 2) + '\n');
console.log('Built preview:', html.length, 'characters, source', revision);
