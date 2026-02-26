"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cx } from "@/lib/utils";
import { toSnakeCase, toKebabCase, toCamelCase, toPascalCase, toConstantCase } from "@/lib/conversions";
import { useTheme } from "@/components/layout/theme-provider";

export function SnakeKebabConverterTool() {
  const { isDark } = useTheme();
  const [text, setText] = useState("");
  const [toast, setToast] = useState("");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [preserveCase, setPreserveCase] = useState(false);

  // Load saved text on mount
  useEffect(() => {
    const saved = localStorage.getItem("fmc_snake_kebab_text");
    if (saved) setText(saved);
  }, []);

  // Persist text changes
  useEffect(() => {
    localStorage.setItem("fmc_snake_kebab_text", text);
  }, [text]);

  // Ctrl/Cmd+K focuses input
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const snakeCase = useMemo(() => {
    if (!text.trim()) return "";
    if (preserveCase) {
      return text
        .trim()
        .replace(/[^a-zA-Z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "");
    }
    return toSnakeCase(text);
  }, [text, preserveCase]);

  const kebabCase = useMemo(() => {
    if (!text.trim()) return "";
    if (preserveCase) {
      return text
        .trim()
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }
    return toKebabCase(text);
  }, [text, preserveCase]);

  const camelCase = useMemo(() => toCamelCase(text), [text]);
  const pascalCase = useMemo(() => toPascalCase(text), [text]);
  const constantCase = useMemo(() => toConstantCase(text), [text]);

  const copyToClipboard = async (content: string, label: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setToast(`Copied ${label} to clipboard`);
      setTimeout(() => setToast(""), 2000);
    } catch (err) {
      setToast("Failed to copy");
      setTimeout(() => setToast(""), 2000);
    }
  };

  const clearText = () => {
    setText("");
    inputRef.current?.focus();
  };

  const loadExample = () => {
    setText("User Authentication Service");
    setPreserveCase(false);
  };

  const conversions = [
    {
      id: "snake",
      label: "snake_case",
      value: snakeCase,
      description: "Lowercase with underscores between words",
      emoji: "🐍",
      usage: "Python, Ruby, database column names",
    },
    {
      id: "kebab",
      label: "kebab-case",
      value: kebabCase,
      description: "Lowercase with hyphens between words",
      emoji: "🍢",
      usage: "URLs, CSS classes, package names",
    },
    {
      id: "camel",
      label: "camelCase",
      value: camelCase,
      description: "First word lowercase, subsequent words capitalized",
      emoji: "🐫",
      usage: "JavaScript, Java, C# variables",
    },
    {
      id: "pascal",
      label: "PascalCase",
      value: pascalCase,
      description: "Every word capitalized, no separators",
      emoji: "🏛️",
      usage: "JavaScript/TypeScript classes, C# classes",
    },
    {
      id: "constant",
      label: "CONSTANT_CASE",
      value: constantCase,
      description: "Uppercase with underscores",
      emoji: "🔧",
      usage: "Constants, environment variables, config",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Toast notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      )}

      {/* Input section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label htmlFor="input" className="text-sm font-medium">
            Input Text
          </label>
          <div className="flex gap-2">
            <button
              onClick={loadExample}
              className="rounded-lg border border-white/10 px-3 py-1 text-xs hover:bg-white/5 transition-colors"
            >
              Load Example
            </button>
            <button
              onClick={clearText}
              className="rounded-lg border border-white/10 px-3 py-1 text-xs hover:bg-white/5 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
        <textarea
          ref={inputRef}
          id="input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here (e.g., 'User Authentication Service')..."
          className={cx(
            "min-h-[120px] w-full resize-y rounded-xl border border-white/10 bg-neutral-900 p-4 font-mono text-sm placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
            isDark ? "text-white" : "text-black"
          )}
          autoFocus
        />
        <div className="flex items-center justify-between text-xs text-neutral-400">
          <span>{text.length} characters</span>
          <span>{text.trim().split(/\s+/).filter(Boolean).length} words</span>
        </div>
      </div>

      {/* Options */}
      <div className="rounded-xl border border-white/10 bg-neutral-900 p-4">
        <h3 className="text-sm font-semibold">Conversion Options</h3>
        <div className="mt-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={preserveCase}
              onChange={(e) => setPreserveCase(e.target.checked)}
              className="h-4 w-4 rounded border-white/10 bg-neutral-800 text-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm">Preserve original case (don't force lowercase)</span>
          </label>
        </div>
        <p className="mt-2 text-xs text-neutral-400">
          When enabled, words keep their original capitalization (e.g., "UserAuth" → "User_Auth").
          When disabled, all output is lowercase (e.g., "UserAuth" → "user_auth").
        </p>
      </div>

      {/* Comparison table */}
      <div className="overflow-hidden rounded-xl border border-white/10">
        <div className="bg-neutral-900 p-4">
          <h3 className="text-sm font-semibold">snake_case vs kebab-case Comparison</h3>
          <p className="mt-1 text-xs text-neutral-400">
            Side-by-side comparison of the two most common separator-based naming conventions.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-white/10">
          <div className="p-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">🐍</span>
              <h4 className="font-semibold">snake_case</h4>
            </div>
            <div className="mt-3 space-y-3">
              <div>
                <div className="text-xs text-neutral-400">Best for:</div>
                <ul className="mt-1 text-xs space-y-1">
                  <li>• Python variable and function names</li>
                  <li>• Ruby method names</li>
                  <li>• Database column names</li>
                  <li>• File names on Unix/Linux</li>
                  <li>• Configuration keys</li>
                </ul>
              </div>
              <div>
                <div className="text-xs text-neutral-400">Examples:</div>
                <div className="mt-1 font-mono text-sm bg-neutral-950 p-2 rounded">
                  user_auth_service<br/>
                  api_key_validation<br/>
                  max_retry_count<br/>
                  is_logged_in
                </div>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">🍢</span>
              <h4 className="font-semibold">kebab-case</h4>
            </div>
            <div className="mt-3 space-y-3">
              <div>
                <div className="text-xs text-neutral-400">Best for:</div>
                <ul className="mt-1 text-xs space-y-1">
                  <li>• URLs and URL slugs</li>
                  <li>• CSS class names</li>
                  <li>• npm package names</li>
                  <li>• HTML attributes (data-*)</li>
                  <li>• Command-line arguments</li>
                </ul>
              </div>
              <div>
                <div className="text-xs text-neutral-400">Examples:</div>
                <div className="mt-1 font-mono text-sm bg-neutral-950 p-2 rounded">
                  user-auth-service<br/>
                  api-key-validation<br/>
                  max-retry-count<br/>
                  is-logged-in
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Output cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {conversions.map((conv) => (
          <div
            key={conv.id}
            className="rounded-2xl border border-white/10 bg-neutral-900 p-4 flex flex-col"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">{conv.emoji}</span>
                <div>
                  <h3 className="text-sm font-semibold">{conv.label}</h3>
                  <p className="text-xs text-neutral-400">{conv.usage}</p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(conv.value, conv.label)}
                disabled={!conv.value}
                className="rounded-lg border border-white/10 px-3 py-1 text-xs hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Copy
              </button>
            </div>
            <p className="mt-2 text-xs text-neutral-400">{conv.description}</p>
            <div className="mt-4 flex-1">
              <div
                className={cx(
                  "min-h-[80px] w-full rounded-lg border border-white/5 bg-neutral-950 p-3 font-mono text-sm overflow-auto",
                  isDark ? "text-white" : "text-black"
                )}
              >
                {conv.value || (
                  <span className="text-neutral-500">Converted text will appear here...</span>
                )}
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-neutral-400">
              <span>{conv.value.length} characters</span>
              <button
                onClick={() => {
                  setText(conv.value);
                  inputRef.current?.focus();
                }}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Apply to Input
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Use case examples */}
      <div className="rounded-xl border border-white/10 bg-neutral-900 p-4">
        <h3 className="text-sm font-semibold">When to Use Each Format</h3>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              format: "snake_case",
              when: "Python/Ruby code, database columns, Unix filenames",
              example: "user_profile_picture_url",
              reason: "Underscores are more readable than hyphens in code editors",
            },
            {
              format: "kebab-case",
              when: "URLs, CSS classes, package names, CLI commands",
              example: "user-profile-picture-url",
              reason: "Hyphens are URL-safe and work in CSS selectors",
            },
            {
              format: "camelCase",
              when: "JavaScript variables, Java methods, JSON keys",
              example: "userProfilePictureUrl",
              reason: "Standard for JavaScript ecosystem, no separators needed",
            },
            {
              format: "CONSTANT_CASE",
              when: "Environment variables, configuration constants, enums",
              example: "USER_PROFILE_PICTURE_URL",
              reason: "Clearly distinguishes constants from variables",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-lg border border-white/5 bg-neutral-950 p-3"
            >
              <div className="flex items-center gap-2">
                <div className="font-mono text-sm font-semibold">{item.format}</div>
                <div className="text-xs text-neutral-400">• {item.when}</div>
              </div>
              <div className="mt-2 font-mono text-sm bg-black/20 p-2 rounded">
                {item.example}
              </div>
              <div className="mt-2 text-xs text-neutral-400">{item.reason}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}