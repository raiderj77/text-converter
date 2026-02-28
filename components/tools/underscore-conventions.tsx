"use client";

import { useState, useEffect } from "react";

type UnderscoreType = "single_prefix" | "double_prefix" | "dunder" | "trailing" | "snake_case" | "constant";

interface UnderscoreExample {
  type: UnderscoreType;
  name: string;
  example: string;
  description: string;
  language: string;
  commonIn: string[];
}

const initialExamples: UnderscoreExample[] = [
  {
    type: "single_prefix",
    name: "Single Underscore Prefix",
    example: "_private_variable",
    description: "Protected/internal use variable. Convention for 'internal use only'.",
    language: "Python",
    commonIn: ["Python", "JavaScript (convention)", "Ruby"],
  },
  {
    type: "double_prefix",
    name: "Double Underscore Prefix",
    example: "__private_mangled",
    description: "Triggers name mangling in Python. Prevents accidental overriding.",
    language: "Python",
    commonIn: ["Python"],
  },
  {
    type: "dunder",
    name: "Dunder Methods",
    example: "__init__",
    description: "Special/magic methods in Python. Called automatically by the language.",
    language: "Python",
    commonIn: ["Python"],
  },
  {
    type: "trailing",
    name: "Trailing Underscore",
    example: "class_",
    description: "Avoids naming conflicts with keywords or built-ins.",
    language: "Python",
    commonIn: ["Python", "C++", "Rust"],
  },
  {
    type: "snake_case",
    name: "snake_case Naming",
    example: "user_profile_picture",
    description: "Standard naming convention with underscores between words.",
    language: "Python",
    commonIn: ["Python", "Ruby", "PHP", "Rust"],
  },
  {
    type: "constant",
    name: "UPPER_SNAKE_CASE",
    example: "MAX_RETRY_COUNT",
    description: "Constants in uppercase with underscores between words.",
    language: "Multiple",
    commonIn: ["Python", "JavaScript", "Java", "C++", "Go"],
  },
];

const languageConventions = [
  {
    language: "Python",
    icon: "🐍",
    conventions: [
      "`_variable` — protected/internal",
      "`__private` — name mangling",
      "`__init__` — dunder methods",
      "`variable_` — avoid keywords",
      "snake_case — standard",
      "CONSTANT_NAME — constants",
    ],
  },
  {
    language: "JavaScript",
    icon: "⚡",
    conventions: [
      "`CONSTANT_NAME` — constants",
      "`_private` — convention only",
      "`#private` — true private (ES2022+)",
      "camelCase — standard",
      "No dunder methods",
    ],
  },
  {
    language: "Java",
    icon: "☕",
    conventions: [
      "`CONSTANT_NAME` — constants",
      "`mVariable` — member variables",
      "camelCase — standard",
      "`private` keyword — true privacy",
      "No underscore conventions",
    ],
  },
  {
    language: "C++",
    icon: "⚙️",
    conventions: [
      "`m_variable` — member variables",
      "`_variable` — avoid (reserved)",
      "`g_variable` — globals",
      "snake_case or camelCase",
      "Leading underscore reserved",
    ],
  },
];

export function UnderscoreConventionsTool() {
  const [inputText, setInputText] = useState("userProfilePicture");
  const [convertedExamples, setConvertedExamples] = useState<UnderscoreExample[]>(initialExamples);
  const [copiedType, setCopiedType] = useState<UnderscoreType | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Python");

  // Update examples when input changes
  useEffect(() => {
    if (!inputText.trim()) {
      setConvertedExamples(initialExamples);
      return;
    }

    const baseName = inputText.trim();
    const words = baseName.split(/(?=[A-Z])/).filter(Boolean).map(w => w.toLowerCase());
    const snakeCase = words.join("_");
    const upperSnake = words.join("_").toUpperCase();

    const updated = initialExamples.map(example => {
      let newExample = example.example;
      
      switch (example.type) {
        case "single_prefix":
          newExample = `_${snakeCase}`;
          break;
        case "double_prefix":
          newExample = `__${snakeCase}`;
          break;
        case "dunder":
          newExample = `__${snakeCase}__`;
          break;
        case "trailing":
          newExample = `${snakeCase}_`;
          break;
        case "snake_case":
          newExample = snakeCase;
          break;
        case "constant":
          newExample = upperSnake;
          break;
      }

      return {
        ...example,
        example: newExample,
      };
    });

    setConvertedExamples(updated);
  }, [inputText]);

  const handleCopy = async (text: string, type: UnderscoreType) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleExampleClick = (example: string) => {
    setInputText(example);
  };

  const quickExamples = [
    "userProfilePicture",
    "maxRetryCount",
    "className",
    "privateKey",
    "apiEndpoint",
    "databaseConnection",
  ];

  return (
    <div className="rounded-xl border border-white/10 bg-neutral-900 p-4">
      {/* Input Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Enter a variable name to see underscore conventions:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="e.g., userProfilePicture or maxRetryCount"
            className="flex-1 rounded-lg border border-white/10 bg-neutral-950 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => setInputText("")}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/5 transition-colors"
          >
            Clear
          </button>
        </div>
        
        {/* Quick Examples */}
        <div className="mt-3">
          <p className="text-xs text-neutral-400 mb-2">Quick examples:</p>
          <div className="flex flex-wrap gap-2">
            {quickExamples.map((example) => (
              <button
                key={example}
                onClick={() => handleExampleClick(example)}
                className="rounded-lg border border-white/10 px-3 py-1 text-xs hover:bg-white/5 transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Language Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Select language to see specific conventions:
        </label>
        <div className="flex flex-wrap gap-2">
          {languageConventions.map((lang) => (
            <button
              key={lang.language}
              onClick={() => setSelectedLanguage(lang.language)}
              className={`rounded-lg border px-3 py-2 text-sm transition-colors flex items-center gap-2 ${
                selectedLanguage === lang.language
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-white/10 hover:bg-white/5"
              }`}
            >
              <span>{lang.icon}</span>
              {lang.language}
            </button>
          ))}
        </div>
      </div>

      {/* Underscore Examples Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {convertedExamples.map((item) => (
          <div
            key={item.type}
            className="rounded-xl border border-white/10 bg-neutral-950 p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  {item.type === "single_prefix" && <span className="text-blue-400">🛡️</span>}
                  {item.type === "double_prefix" && <span className="text-purple-400">🔐</span>}
                  {item.type === "dunder" && <span className="text-yellow-400">⚡</span>}
                  {item.type === "trailing" && <span className="text-orange-400">⚠️</span>}
                  {item.type === "snake_case" && <span className="text-green-400">🐍</span>}
                  {item.type === "constant" && <span className="text-red-400 font-bold">C</span>}
                  <h3 className="text-sm font-semibold">{item.name}</h3>
                </div>
                <p className="mt-2 text-xs text-neutral-400">{item.description}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs px-2 py-1 bg-neutral-800 rounded">
                    {item.language}
                  </span>
                  <span className="text-xs text-neutral-500">
                    Common in: {item.commonIn.join(", ")}
                  </span>
                </div>
              </div>
            </div>

            {/* Example Code */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-neutral-400">Example:</span>
                <button
                  onClick={() => handleCopy(item.example, item.type)}
                  className="flex items-center gap-1 rounded-lg border border-white/10 px-2 py-1 text-xs hover:bg-white/5 transition-colors"
                >
                  {copiedType === item.type ? (
                    <>
                      <span>✓</span> Copied
                    </>
                  ) : (
                    <>
                      <span>📋</span> Copy
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3 bg-black rounded-lg text-sm font-mono overflow-x-auto">
                {item.example}
              </pre>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Language Conventions */}
      <div className="rounded-xl border border-white/10 bg-neutral-950 p-4">
        <h3 className="text-sm font-semibold mb-3">
          {selectedLanguage} Underscore Conventions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {languageConventions
            .find(lang => lang.language === selectedLanguage)
            ?.conventions.map((conv, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-white/10 p-3"
              >
                <code className="text-sm font-mono">{conv.split(" — ")[0]}</code>
                <p className="mt-1 text-xs text-neutral-400">
                  {conv.split(" — ")[1]}
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* Usage Tips */}
      <div className="mt-6 rounded-xl border border-white/10 bg-neutral-950 p-4">
        <h3 className="text-sm font-semibold mb-3">When to Use Each Underscore Type</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-blue-400 mt-0.5">🛡️</span>
            <div>
              <p className="text-sm font-medium">Single Underscore Prefix (`_variable`)</p>
              <p className="text-xs text-neutral-400">
                Use when: Variable/method is for internal use within module/class. Other developers
                should avoid using it directly. Python won't import it with `from module import *`.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-purple-400 mt-0.5">🔐</span>
            <div>
              <p className="text-sm font-medium">Double Underscore Prefix (`__private`)</p>
              <p className="text-xs text-neutral-400">
                Use when: You want to prevent accidental overriding in subclasses (Python only).
                Not for true privacy — use `#private` in JavaScript or `private` keyword in Java.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-yellow-400 mt-0.5">⚡</span>
            <div>
              <p className="text-sm font-medium">Dunder Methods (`__init__`)</p>
              <p className="text-xs text-neutral-400">
                Use when: Implementing Python's special methods. Don't create your own dunder
                methods unless you're extending Python's behavior (like creating a new container type).
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-400 mt-0.5">🐍</span>
            <div>
              <p className="text-sm font-medium">snake_case (`variable_name`)</p>
              <p className="text-xs text-neutral-400">
                Use when: Writing Python, Ruby, or Rust code. Follows language conventions.
                More readable than camelCase for long, descriptive names.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
