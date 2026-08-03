import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function loadCronHelpers() {
  const source = fs.readFileSync(
    path.join(root, "components/tools/cron-expression-builder.tsx"),
    "utf8",
  );
  const snippet = source.slice(
    source.indexOf("type FieldMode"),
    source.indexOf("export function CronExpressionBuilderTool"),
  );
  const output = ts.transpileModule(snippet, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const testModule = { exports: {} };
  new Function("module", "exports", output)(testModule, testModule.exports);
  return testModule.exports;
}

const {
  CRON_PREVIEW_YEARS,
  describeExpression,
  expandCronField,
  fieldToExpression,
  getNextExecutions,
  matchesCron,
  matchesField,
  normalizeRange,
  parseExpressionField,
} = loadCronHelpers();

test("restricted day-of-month and day-of-week fields use Unix cron OR semantics", () => {
  const firstOrMonday = "0 0 1 * 1".split(" ");

  assert.equal(matchesCron(new Date(2026, 7, 1, 0, 0), firstOrMonday), true);
  assert.equal(matchesCron(new Date(2026, 7, 3, 0, 0), firstOrMonday), true);
  assert.equal(matchesCron(new Date(2026, 7, 4, 0, 0), firstOrMonday), false);
  assert.equal(matchesCron(new Date(2026, 5, 1, 0, 0), firstOrMonday), true);

  const mondaysOnly = "0 0 * * 1".split(" ");
  assert.equal(matchesCron(new Date(2026, 7, 3, 0, 0), mondaysOnly), true);
  assert.equal(matchesCron(new Date(2026, 7, 1, 0, 0), mondaysOnly), false);

  const runs = getNextExecutions(
    "0 0 1 * 1",
    5,
    new Date(2026, 6, 31, 23, 59),
  );
  assert.deepEqual(
    runs.map((date) => [date.getMonth(), date.getDate()]),
    [[7, 1], [7, 3], [7, 10], [7, 17], [7, 24]],
  );
  assert.equal(
    describeExpression(firstOrMonday),
    "Runs at 12:00 AM on the 1st day of the month or on Monday",
  );
});

test("wildcard steps begin at each cron field's actual minimum", () => {
  assert.deepEqual(expandCronField("*/2", 1, 7), [1, 3, 5, 7]);
  assert.equal(matchesField(1, "*/2", 1, 31), true);
  assert.equal(matchesField(2, "*/2", 1, 31), false);
  assert.equal(matchesField(3, "*/2", 1, 31), true);
  assert.equal(matchesField(1, "*/2", 1, 12), true);
  assert.equal(matchesField(2, "*/2", 1, 12), false);
  assert.equal(matchesField(0, "*/2", 0, 59), true);
  assert.equal(matchesField(1, "*/2", 0, 59), false);

  const stepField = {
    mode: "step",
    specific: [1],
    rangeStart: 1,
    rangeEnd: 31,
    stepBase: 1,
    stepInterval: 2,
  };
  assert.equal(fieldToExpression(stepField, 1, 31), "*/2");
  assert.equal(fieldToExpression(stepField, 0, 59), "1-59/2");

  const oddDaysInOddMonths = "0 0 */2 */2 *".split(" ");
  assert.equal(matchesCron(new Date(2027, 0, 1, 0, 0), oddDaysInOddMonths), true);
  assert.equal(matchesCron(new Date(2027, 0, 2, 0, 0), oddDaysInOddMonths), false);
  assert.equal(matchesCron(new Date(2027, 1, 1, 0, 0), oddDaysInOddMonths), false);
  assert.equal(matchesCron(new Date(2027, 2, 3, 0, 0), oddDaysInOddMonths), true);
});

test("non-minimum steps and reverse ranges serialize as valid portable cron", () => {
  const minuteDef = { key: "minute", label: "Minute", min: 0, max: 59 };
  const nonMinimumStep = parseExpressionField("3-59/10", minuteDef);
  assert.equal(nonMinimumStep.mode, "step");
  assert.equal(nonMinimumStep.stepBase, 3);
  assert.equal(nonMinimumStep.stepInterval, 10);
  assert.equal(fieldToExpression(nonMinimumStep, 0, 59), "3-59/10");

  const legacyStep = parseExpressionField("3/10", minuteDef);
  assert.equal(fieldToExpression(legacyStep, 0, 59), "3-59/10");

  const reverseRange = parseExpressionField("20-10", minuteDef);
  assert.deepEqual(
    [reverseRange.rangeStart, reverseRange.rangeEnd],
    [10, 20],
  );
  assert.equal(fieldToExpression(reverseRange, 0, 59), "10-20");
  assert.deepEqual(normalizeRange(50, 5, 0, 59), [5, 50]);

  const reverseRangeField = {
    mode: "range",
    specific: [0],
    rangeStart: 50,
    rangeEnd: 5,
    stepBase: 0,
    stepInterval: 1,
  };
  assert.equal(fieldToExpression(reverseRangeField, 0, 59), "5-50");

  // A shorter imported range/step cannot be represented by the builder's
  // through-maximum step control, so it is preserved as an equivalent list.
  const shortStep = parseExpressionField("3-20/5", minuteDef);
  assert.equal(fieldToExpression(shortStep, 0, 59), "3,8,13,18");
});

test("descriptions accurately explain lists, ranges, and steps in every field", () => {
  const cases = [
    ["0,15,30,45 * * * *", "Runs at minutes 0, 15, 30, and 45 of every hour every day"],
    ["10-20 * * * *", "Runs at every minute from 10 through 20 of every hour every day"],
    ["3-59/10 * * * *", "Runs every 10 minutes from minute 3 through 59 of every hour every day"],
    ["5 1,13 * * *", "Runs at minute 5 during the 1 AM and 1 PM hours every day"],
    ["0 9-17 * * *", "Runs at minute 0 during every hour from 9 AM through 5 PM every day"],
    ["0 3-23/10 * * *", "Runs at minute 0 during every 10 hours of the day from 3 AM through 11 PM every day"],
    ["0 0 1,15,31 * *", "Runs at 12:00 AM on the 1st, 15th, and 31st days of the month"],
    ["0 0 10-20 * *", "Runs at 12:00 AM on every day of the month from the 10th through the 20th"],
    ["0 0 3-31/10 * *", "Runs at 12:00 AM on every 10 days of the month from the 3rd through the 31st"],
    ["0 0 * * 1,3,5", "Runs at 12:00 AM on Monday, Wednesday, and Friday"],
    ["0 0 * * 1-5", "Runs at 12:00 AM on every day from Monday through Friday"],
    ["0 0 * * 1-6/2", "Runs at 12:00 AM on every 2 days of the week from Monday through Saturday"],
    ["0 0 * 1,6,12 *", "Runs at 12:00 AM every day in January, June, and December"],
    ["0 0 * 3-5 *", "Runs at 12:00 AM every day from March through May"],
    ["0 0 * 2-12/3 *", "Runs at 12:00 AM every day in every 3 months from February through December"],
  ];

  for (const [expression, expected] of cases) {
    assert.equal(describeExpression(expression.split(" ")), expected, expression);
  }

  assert.equal(
    describeExpression("0 0 1 * 1".split(" ")),
    "Runs at 12:00 AM on the 1st day of the month or on Monday",
  );
  assert.equal(describeExpression("0 0 20-10 * *".split(" ")), "Invalid cron expression");
});

test("annual previews return five deterministic future executions", () => {
  const runs = getNextExecutions(
    "0 0 1 1 *",
    5,
    new Date(2026, 7, 1, 12, 34, 56),
  );

  assert.deepEqual(runs.map((date) => date.getFullYear()), [2027, 2028, 2029, 2030, 2031]);
  assert.ok(runs.every((date) => (
    date.getMonth() === 0 &&
    date.getDate() === 1 &&
    date.getHours() === 0 &&
    date.getMinutes() === 0
  )));
});

test("leap-day previews efficiently span enough years for five executions", () => {
  assert.equal(CRON_PREVIEW_YEARS, 32);
  const runs = getNextExecutions(
    "0 0 29 2 *",
    5,
    new Date(2026, 7, 1, 12, 34, 56),
  );

  assert.deepEqual(runs.map((date) => date.getFullYear()), [2028, 2032, 2036, 2040, 2044]);
  assert.ok(runs.every((date) => (
    date.getMonth() === 1 &&
    date.getDate() === 29 &&
    date.getHours() === 0 &&
    date.getMinutes() === 0
  )));
  assert.deepEqual(
    getNextExecutions("0 0 30 2 *", 5, new Date(2026, 7, 1, 12, 34, 56)),
    [],
  );
});

test("DST previews omit gaps and include repeated fall-back instants in real-time order", () => {
  const componentPath = path.join(root, "components/tools/cron-expression-builder.tsx");
  const probe = `
    const fs = require("node:fs");
    const ts = require("typescript");
    const source = fs.readFileSync(${JSON.stringify(componentPath)}, "utf8");
    const snippet = source.slice(
      source.indexOf("type FieldMode"),
      source.indexOf("export function CronExpressionBuilderTool"),
    );
    const output = ts.transpileModule(snippet, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText;
    const testModule = { exports: {} };
    new Function("module", "exports", output)(testModule, testModule.exports);
    const { getNextExecutions } = testModule.exports;
    const summarize = (dates) => dates.map((date) => ({
      iso: date.toISOString(),
      offset: date.getTimezoneOffset(),
      wall: [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes()],
    }));
    const result = {
      fall: summarize(getNextExecutions(
        "0,30 1 * * *",
        4,
        new Date("2026-11-01T04:59:00.000Z"),
      )),
      boundary: summarize(getNextExecutions(
        "0 1 * * *",
        1,
        new Date("2026-11-01T05:59:30.000Z"),
      )),
      spring: summarize(getNextExecutions(
        "30 2 * * *",
        1,
        new Date("2026-03-08T05:00:00.000Z"),
      )),
    };
    process.stdout.write(JSON.stringify(result));
  `;
  const result = JSON.parse(execFileSync(process.execPath, ["-e", probe], {
    cwd: root,
    encoding: "utf8",
    env: { ...process.env, TZ: "America/New_York" },
  }));

  assert.deepEqual(
    result.fall.map((run) => run.iso),
    [
      "2026-11-01T05:00:00.000Z",
      "2026-11-01T05:30:00.000Z",
      "2026-11-01T06:00:00.000Z",
      "2026-11-01T06:30:00.000Z",
    ],
  );
  assert.deepEqual(result.fall.map((run) => run.offset), [240, 240, 300, 300]);
  assert.deepEqual(
    result.fall.map((run) => run.wall),
    [
      [2026, 11, 1, 1, 0],
      [2026, 11, 1, 1, 30],
      [2026, 11, 1, 1, 0],
      [2026, 11, 1, 1, 30],
    ],
  );
  assert.equal(result.boundary[0].iso, "2026-11-01T06:00:00.000Z");
  assert.deepEqual(result.spring[0], {
    iso: "2026-03-09T06:30:00.000Z",
    offset: 240,
    wall: [2026, 3, 9, 2, 30],
  });
});
