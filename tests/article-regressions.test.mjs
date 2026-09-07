import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import ts from 'typescript';
import * as yaml from 'js-yaml';
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

test('SpongeBob styling remains mixed and repeatable on long input', () => {
  const input = 'a'.repeat(10000);
  const result = converters.toSpongeBobCase(input);
  assert.equal(result.length, input.length);
  assert.equal(result, converters.toSpongeBobCase(input));
  assert.match(result.slice(9000), /A/);
  assert.match(result.slice(9000), /a/);
});

test('updated YAML dependency preserves formatter round trips and error handling', () => {
  const component = fs.readFileSync(new URL('../components/tools/yaml-formatter.tsx', import.meta.url), 'utf8');
  const snippet = `export ${component.slice(component.indexOf('function processInput'), component.indexOf('export function YamlFormatterTool'))}`;
  const transpiled = ts.transpileModule(snippet, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const helpers = {};
  new Function('yaml', 'exports', transpiled)(yaml, helpers);
  const data = { label: 'café', enabled: false, values: [0, null, '001'], nested: { text: 'a: b' } };
  const formatted = helpers.processInput(JSON.stringify(data), 'json-to-yaml', '2');
  assert.equal(formatted.error, null);
  const restored = helpers.processInput(formatted.result, 'yaml-to-json', '2');
  assert.equal(restored.error, null);
  assert.deepEqual(JSON.parse(restored.result), data);
  assert.ok(helpers.processInput('invalid: [', 'yaml-to-json', '2').error);
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
