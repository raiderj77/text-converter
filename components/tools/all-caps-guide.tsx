"use client";

import { useState, useEffect } from "react";

type ContextType = "email" | "social" | "code" | "legal" | "design" | "safety";

interface ContextExample {
  type: ContextType;
  name: string;
  example: string;
  analysis: string;
  recommendation: "Appropriate" | "Use Caution" | "Avoid";
  score: number; // 1-10, higher = more appropriate
}

const initialExamples: ContextExample[] = [
  {
    type: "email",
    name: "Professional Email",
    example: "I NEED THIS REPORT BY 5 PM TODAY",
    analysis: "Seems aggressive and unprofessional. Can damage working relationships.",
    recommendation: "Avoid",
    score: 2,
  },
  {
    type: "social",
    name: "Social Media Post",
    example: "OMG YOU GUYS HAVE TO SEE THIS!!!",
    analysis: "Appears shouty and attention-seeking. May annoy followers.",
    recommendation: "Use Caution",
    score: 4,
  },
  {
    type: "code",
    name: "Programming Constant",
    example: "MAX_RETRY_COUNT = 3",
    analysis: "Standard convention for constants in most programming languages.",
    recommendation: "Appropriate",
    score: 10,
  },
  {
    type: "legal",
    name: "Legal Document",
    example: "TERMS AND CONDITIONS",
    analysis: "Standard practice for headings and defined terms in legal documents.",
    recommendation: "Appropriate",
    score: 9,
  },
  {
    type: "design",
    name: "Website Headline",
    example: "BREAKING NEWS",
    analysis: "Creates visual hierarchy and emphasis. Effective for short phrases.",
    recommendation: "Appropriate",
    score: 8,
  },
  {
    type: "safety",
    name: "Warning Sign",
    example: "DANGER: HIGH VOLTAGE",
    analysis: "Critical for safety information. Needs immediate visual attention.",
    recommendation: "Appropriate",
    score: 10,
  },
];

const contextRules = [
  {
    context: "Email & Messaging",
    rules: [
      "Avoid all caps in professional emails",
      "Use sparingly in personal messages",
      "Consider bold or italics instead",
      "Exception: VERY important warnings",
    ],
    icon: "📧",
  },
  {
    context: "Social Media",
    rules: [
      "Use for emphasis, not entire posts",
      "Limit to 1-2 words at a time",
      "Consider your audience's tolerance",
      "Alternative: emojis for excitement",
    ],
    icon: "📱",
  },
  {
    context: "Code & Programming",
    rules: [
      "Use for constants (MAX_RETRIES)",
      "Use for SQL keywords (SELECT, FROM)",
      "Use for environment variables",
      "Follow language conventions",
    ],
    icon: "💻",
  },
  {
    context: "Design & Typography",
    rules: [
      "Effective for short headlines",
      "Creates visual hierarchy",
      "Use for logos and branding",
      "Consider readability for long text",
    ],
    icon: "🎨",
  },
];

export function AllCapsGuideTool() {
  const [inputText, setInputText] = useState("This is important information");
  const [convertedExamples, setConvertedExamples] = useState<ContextExample[]>(initialExamples);
  const [copiedType, setCopiedType] = useState<ContextType | null>(null);
  const [analysisResult, setAnalysisResult] = useState({
    score: 0,
    recommendation: "Analyzing...",
    reasoning: "",
  });

  // Update examples when input changes
  useEffect(() => {
    if (!inputText.trim()) {
      setConvertedExamples(initialExamples);
      return;
    }

    const updated = initialExamples.map(example => ({
      ...example,
      example: inputText.toUpperCase(),
    }));

    setConvertedExamples(updated);
  }, [inputText]);

  // Analyze the input text
  useEffect(() => {
    if (!inputText.trim()) {
      setAnalysisResult({
        score: 0,
        recommendation: "Enter text to analyze",
        reasoning: "",
      });
      return;
    }

    const text = inputText;
    const wordCount = text.split(/\s+/).length;
    const charCount = text.length;
    const capsRatio = (text.match(/[A-Z]/g) || []).length / Math.max(1, text.match(/[a-zA-Z]/g)?.length || 1);
    
    let score = 5;
    let reasoning = "";
    
    // Analysis logic
    if (wordCount > 10 && capsRatio > 0.8) {
      score = 2;
      reasoning = "Long text in all caps reduces readability by 10-20%. Consider using sentence case for better readability.";
    } else if (wordCount <= 3 && capsRatio > 0.8) {
      score = 8;
      reasoning = "Short phrases in all caps can be effective for emphasis or headings.";
    } else if (capsRatio > 0.9) {
      score = 3;
      reasoning = "Nearly all caps text is generally interpreted as shouting in digital communication.";
    } else if (capsRatio < 0.1) {
      score = 7;
      reasoning = "Mostly lowercase text is standard for readable communication.";
    } else {
      score = 5;
      reasoning = "Mixed case text follows standard writing conventions.";
    }

    let recommendation = "";
    if (score >= 8) recommendation = "Appropriate";
    else if (score >= 5) recommendation = "Use Caution";
    else recommendation = "Avoid";

    setAnalysisResult({
      score,
      recommendation,
      reasoning,
    });
  }, [inputText]);

  const handleCopy = async (text: string, type: ContextType) => {
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
    "This is urgent",
    "Sale ends today",
    "Warning: system update",
    "New product launch",
    "Important meeting tomorrow",
    "Error: connection failed",
  ];

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-400";
    if (score >= 5) return "text-yellow-400";
    return "text-red-400";
  };

  const getRecommendationColor = (rec: string) => {
    if (rec === "Appropriate") return "bg-green-500/20 text-green-400";
    if (rec === "Use Caution") return "bg-yellow-500/20 text-yellow-400";
    return "bg-red-500/20 text-red-400";
  };

  return (
    <div className="rounded-xl border border-white/10 bg-neutral-900 p-4">
      {/* Input Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Enter text to analyze all caps appropriateness:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to analyze all caps usage..."
            className="flex-1 rounded-lg border border-white/10 bg-neutral-950 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => setInputText(inputText.toUpperCase())}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/5 transition-colors"
          >
            TO UPPERCASE
          </button>
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

      {/* Analysis Result */}
      <div className="mb-6 rounded-xl border border-white/10 bg-neutral-950 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">All Caps Analysis</h3>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${getRecommendationColor(analysisResult.recommendation)}`}>
            {analysisResult.recommendation}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">
              <span className={getScoreColor(analysisResult.score)}>
                {analysisResult.score}/10
              </span>
            </div>
            <div className="text-xs text-neutral-400 mt-1">Appropriateness Score</div>
          </div>
          
          <div className="flex-1 max-w-md">
            <p className="text-sm text-neutral-300">{analysisResult.reasoning}</p>
          </div>
        </div>

        {/* Score breakdown */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { label: "Length", value: inputText.split(/\s+/).length > 10 ? "Long" : "Short", good: inputText.split(/\s+/).length <= 10 },
            { label: "Caps Ratio", value: `${Math.round((inputText.match(/[A-Z]/g) || []).length / Math.max(1, inputText.match(/[a-zA-Z]/g)?.length || 1) * 100)}%`, good: (inputText.match(/[A-Z]/g) || []).length / Math.max(1, inputText.match(/[a-zA-Z]/g)?.length || 1) < 0.5 },
            { label: "Context", value: "General", good: true },
          ].map((metric, idx) => (
            <div key={idx} className="rounded-lg border border-white/10 p-3">
              <div className="text-xs text-neutral-400">{metric.label}</div>
              <div className={`text-sm font-medium ${metric.good ? "text-green-400" : "text-red-400"}`}>
                {metric.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Context Examples Grid */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-3">All Caps in Different Contexts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {convertedExamples.map((item) => (
            <div
              key={item.type}
              className="rounded-xl border border-white/10 bg-neutral-950 p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    {item.type === "email" && <span className="text-blue-400">📧</span>}
                    {item.type === "social" && <span className="text-purple-400">📢</span>}
                    {item.type === "code" && <span className="text-green-400 font-bold">{"</>"}</span>}
                    {item.type === "legal" && <span className="text-yellow-400">⚖️</span>}
                    {item.type === "design" && <span className="text-pink-400">🎨</span>}
                    {item.type === "safety" && <span className="text-red-400">⚠️</span>}
                    <h3 className="text-sm font-semibold">{item.name}</h3>
                  </div>
                  <div className={`mt-2 px-2 py-1 rounded-full text-xs font-medium inline-block ${getRecommendationColor(item.recommendation)}`}>
                    {item.recommendation}
                  </div>
                </div>
                <div className="text-2xl font-bold">
                  <span className={getScoreColor(item.score)}>
                    {item.score}/10
                  </span>
                </div>
              </div>

              {/* Example Text */}
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
                <div className="p-3 bg-black rounded-lg text-sm font-mono tracking-wider overflow-x-auto">
                  {item.example}
                </div>
              </div>

              {/* Analysis */}
              <div className="mt-3">
                <p className="text-xs text-neutral-400">{item.analysis}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Context Rules */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-3">Rules by Context</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contextRules.map((context) => (
            <div
              key={context.context}
              className="rounded-xl border border-white/10 bg-neutral-950 p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{context.icon}</span>
                <h4 className="text-sm font-semibold">{context.context}</h4>
              </div>
              <ul className="space-y-2">
                {context.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-xs text-neutral-400">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Best Practices */}
      <div className="rounded-xl border border-white/10 bg-neutral-950 p-4">
        <h3 className="text-sm font-semibold mb-3">All Caps Best Practices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-medium mb-2 text-green-400">Do:</h4>
            <ul className="space-y-2">
              {[
                "Use for acronyms (NASA, FBI)",
                "Use for short headlines in design",
                "Use for constants in code",
                "Use for safety warnings",
                "Use for legal document headings",
                "Use for brand logos when appropriate",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                  <span className="text-xs text-neutral-400">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-medium mb-2 text-red-400">Don't:</h4>
            <ul className="space-y-2">
              {[
                "Write entire emails in all caps",
                "Use for long paragraphs of text",
                "Use in customer service messages",
                "Use in academic or formal writing",
                "Use to express anger or frustration",
                "Use without considering accessibility",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                  <span className="text-xs text-neutral-400">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
