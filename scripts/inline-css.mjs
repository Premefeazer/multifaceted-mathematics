// Build step for the live site: inlines the two stylesheets into index.html so the first paint needs no extra request.
// Usage: node scripts/inline-css.mjs index.html _site/index.html
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const SHEETS = ['css/tokens.css', 'css/styles.css'];

export function inlineCss(html, read) {
  return SHEETS.reduce((out, href) => {
    const tag = `<link rel="stylesheet" href="${href}">`;
    if (!out.includes(tag)) throw new Error(`index.html has no ${tag}`); // fail the deploy rather than ship an unstyled page
    return out.replace(tag, () => `<style>\n${read(href).trim()}\n</style>`);
  }, html);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [src, dest] = process.argv.slice(2);
  writeFileSync(dest, inlineCss(readFileSync(src, 'utf8'), (p) => readFileSync(p, 'utf8')));
}
