import assert from "node:assert/strict";
import { createHash, createHmac } from "node:crypto";
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import test from "node:test";
import ts from "typescript";
import { hmacMd5, md5 } from "../lib/md5.js";

const root = path.resolve(import.meta.dirname, "..");
const componentPath = path.join(root, "components/tools/hash-generator.tsx");
const source = fs.readFileSync(componentPath, "utf8");

function loadHashExports() {
  const output = ts.transpileModule(source, {
    compilerOptions: {
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const testModule = { exports: {} };
  const requireFromComponent = createRequire(componentPath);
  const loadDependency = (specifier) => {
    if (specifier === "@/lib/utils") return { cx: (...values) => values.filter(Boolean).join(" ") };
    if (specifier === "@/components/layout/theme-provider") {
      return { useTheme: () => ({ isDark: false }) };
    }
    if (specifier === "@/lib/md5") return { hmacMd5, md5 };
    return requireFromComponent(specifier);
  };
  new Function("require", "module", "exports", output)(
    loadDependency,
    testModule,
    testModule.exports,
  );
  return testModule.exports;
}

const { copyToClipboard, hashBytes } = loadHashExports();
const algorithms = new Map([
  ["MD5", "md5"],
  ["SHA-1", "sha1"],
  ["SHA-256", "sha256"],
  ["SHA-384", "sha384"],
  ["SHA-512", "sha512"],
]);

function exactBuffer(bytes) {
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
}

test("file hashing and file HMAC preserve exact raw bytes for every algorithm", async () => {
  const bytes = Uint8Array.from([0xff, 0x00, 0x80, 0x41, 0xf0, 0x9f, 0x98, 0x80]);
  const buffer = exactBuffer(bytes);
  const key = "k\u00e9y\ud83d\udd11";

  for (const [webAlgorithm, nodeAlgorithm] of algorithms) {
    assert.equal(
      await hashBytes(webAlgorithm, buffer),
      createHash(nodeAlgorithm).update(bytes).digest("hex"),
      `${webAlgorithm} raw file hash`,
    );
    assert.equal(
      await hashBytes(webAlgorithm, buffer, key),
      createHmac(nodeAlgorithm, key).update(bytes).digest("hex"),
      `${webAlgorithm} raw file HMAC`,
    );
  }
});

test("file HMAC requires a key and invalidates results when its configuration changes", () => {
  const handleFile = source.slice(
    source.indexOf("const handleFile"),
    source.indexOf("const clearAll"),
  );
  const missingKeyGuard = handleFile.indexOf("if (hmacMode && !hmacKey)");
  const fileRead = handleFile.indexOf("file.arrayBuffer()");

  assert.ok(missingKeyGuard >= 0 && missingKeyGuard < fileRead);
  assert.match(handleFile, /const activeHmacKey = hmacMode \? hmacKey : null/);
  assert.match(handleFile, /hashBytes\(algo, buffer, activeHmacKey\)/);
  assert.match(source, /const invalidateFileResults = useCallback/);
  assert.match(source, /invalidateFileResults\(\); setHmacMode/);
  assert.match(source, /invalidateFileResults\(\); setHmacKey/);
  assert.match(source, /Enter an HMAC secret key before selecting a file/);
  assert.match(source, /hmacMode \? "File HMAC Results" : "File Checksums"/);
});

test("clipboard success is reported only after the write resolves", async () => {
  const writes = [];
  assert.equal(
    await copyToClipboard("digest", async (value) => {
      writes.push(value);
    }),
    true,
  );
  assert.deepEqual(writes, ["digest"]);
  assert.equal(
    await copyToClipboard("digest", async () => {
      throw new DOMException("Permission denied", "NotAllowedError");
    }),
    false,
  );

  const copyText = source.slice(
    source.indexOf("const copyText"),
    source.indexOf("const compareMatches"),
  );
  assert.match(copyText, /const succeeded = await copyToClipboard\(text\)/);
  assert.match(copyText, /if \(!succeeded\)/);
  assert.match(source, /Copy failed\. Select the value and copy it manually\./);
  assert.match(source, /role="alert"/);
});
