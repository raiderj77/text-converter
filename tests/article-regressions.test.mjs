import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import ts from 'typescript';
import { selectPublishedArticles, validateArticles } from '../lib/article-validation.js';

const catalog = JSON.parse(fs.readFileSync(new URL('../content/articles.json', import.meta.url), 'utf8'));
const source = fs.readFileSync(new URL('../lib/conversions.ts', import.meta.url), 'utf8');
const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const loaded = { exports: {} };
new Function('module', 'exports', output)(loaded, loaded.exports);
const converters = loaded.exports;

test('every published article example matches the shipped converter', () => {
  for (const article of selectPublishedArticles(catalog)) {
    for (const example of article.examples) {
      const conversion = converters.conversions.find(({ id }) => id === example.conversion);
      assert.ok(conversion, example.conversion);
      assert.equal(conversion.fn(example.input), example.output, `${article.slug}: ${example.conversion}(${example.input})`);
    }
  }
});

test('identifier conversion preserves common word boundaries across formats', () => {
  for (const input of ['HTTPServer', 'http_server', 'http-server', ' http server ']) {
    assert.equal(converters.toSnakeCase(input), 'http_server');
    assert.equal(converters.toCamelCase(input), 'httpServer');
    assert.equal(converters.toPascalCase(input), 'HttpServer');
    assert.equal(converters.toKebabCase(input), 'http-server');
    assert.equal(converters.toDotCase(input), 'http.server');
    assert.equal(converters.toConstantCase(input), 'HTTP_SERVER');
  }
  assert.equal(converters.toCamelCase('customerId'), 'customerId');
  assert.equal(converters.toSnakeCase(''), '');
  assert.equal(converters.toCamelCase('---'), '');
});

test('draft articles are excluded and publication fails closed without evidence', () => {
  const valid = structuredClone(catalog[0]);
  assert.deepEqual(validateArticles([valid]), []);
  assert.equal(selectPublishedArticles([{ slug: 'draft-only', status: 'draft' }]).length, 0);
  for (const change of [{ reviewed: false }, { sources: [] }, { examples: [] }, { reviewedAt: '2099-01-01' }, { publishedAt: '2026-02-30' }, { status: 'ready' }, { slug: '../escape' }, { sections: [] }]) {
    assert.throws(() => selectPublishedArticles([{ ...valid, ...change }]), /Article validation failed/);
  }
  assert.throws(() => selectPublishedArticles([valid, valid]), /unique, safe slug/);
  assert.throws(() => selectPublishedArticles([{ ...valid, sources: [{ ...valid.sources[0], url: 'javascript:alert(1)' }] }]), /HTTPS/);
});
