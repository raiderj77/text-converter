import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { CronExpressionBuilderTool } from "@/components/tools/cron-expression-builder";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

const tool = getToolBySlug("cron-expression-builder")!;
const pageUrl = buildUrl("/cron-expression-builder");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "cron expression builder", "cron generator", "cron expression generator",
    "cron schedule builder", "crontab generator", "cron job generator",
    "cron expression online", "cron builder online", "crontab builder",
    "cron expression maker", "cron schedule generator", "visual cron builder",
  ],
  openGraph: {
    title: tool.title,
    description: tool.description,
    url: pageUrl,
    type: "website",
  },
};

const faqItems = [
  {
    question: "What is a cron expression?",
    answer:
      "A cron expression is a string of five fields separated by spaces that defines a schedule for automated tasks. The fields represent minute (0-59), hour (0-23), day of month (1-31), month (1-12), and day of week (0-6, where 0 is Sunday). Cron expressions are used by Unix/Linux cron daemons, CI/CD pipelines, cloud schedulers, and task automation systems.",
  },
  {
    question: "What does the asterisk (*) mean in cron?",
    answer:
      "The asterisk (*) is a wildcard that means \"every possible value\" for that field. For example, * in the minute field means every minute, and * in the day of week field means every day. It's the most common character in cron expressions and is used when you don't want to restrict that particular time unit.",
  },
  {
    question: "What does the slash (/) mean in cron?",
    answer:
      "The slash (/) defines step values. For example, */5 in the minute field means \"every 5 minutes\" (0, 5, 10, 15...). You can also combine it with a starting value: 3/10 in the minute field means \"every 10 minutes starting at minute 3\" (3, 13, 23, 33, 43, 53).",
  },
  {
    question: "How do I schedule a job for weekdays only?",
    answer:
      "Use 1-5 in the day of week field. For example, 0 9 * * 1-5 runs at 9:00 AM Monday through Friday. In cron, 0 = Sunday, 1 = Monday, ..., 5 = Friday, 6 = Saturday. Some systems also accept SUN, MON, TUE, etc.",
  },
  {
    question: "What is the difference between 5-field and 6-field cron?",
    answer:
      "Standard Unix cron uses 5 fields (minute, hour, day of month, month, day of week). Some systems add a 6th field for seconds at the beginning (e.g., Spring, Quartz) or for year at the end. This tool builds standard 5-field cron expressions, which are the most widely supported format.",
  },
  {
    question: "Can I use cron expressions in cloud services?",
    answer:
      "Yes. AWS EventBridge (CloudWatch Events), Google Cloud Scheduler, Azure Functions, GitHub Actions, Vercel Cron, and most CI/CD platforms support cron expressions for scheduling. Some services use a slightly modified syntax, but the 5-field format built by this tool is the standard that most platforms accept.",
  },
  {
    question: "What does 0 0 1 * * mean?",
    answer:
      "This expression means \"at midnight (00:00) on the 1st day of every month.\" Breaking it down: minute=0, hour=0, day of month=1, month=* (every month), day of week=* (any day of week).",
  },
  {
    question: "Is my data sent to a server?",
    answer:
      "No. The cron expression builder runs entirely in your browser using JavaScript. Nothing is sent to any server. Your expressions are saved in your browser's local storage for convenience.",
  },
];

export default function CronExpressionBuilderPage() {
  return (
    <>
      <WebAppSchema
        name="Free Cron Expression Builder"
        description={tool.description}
        url={pageUrl}
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Cron Expression Builder", href: "/cron-expression-builder" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-4 text-xs text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-neutral-200 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-neutral-200" aria-current="page">Cron Expression Builder</li>
          </ol>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free Cron Expression Builder
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Build cron expressions visually with an interactive builder. Choose
          presets or configure each field individually with specific values,
          ranges, and step intervals. See a natural language description and the
          next 5 execution times instantly. Free, no signup, works entirely in
          your browser.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        <div className="mt-4">
          <CronExpressionBuilderTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="cron-expression-builder" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Build Cron Expressions Online
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Start with a preset.</strong> Click
              any preset button like &quot;Daily at Midnight&quot; or &quot;Every Weekday&quot; to
              instantly populate the builder with a common schedule.
            </p>
            <p>
              <strong className="text-neutral-200">2. Customize each field.</strong> For
              each time field (minute, hour, day of month, month, day of week),
              choose between Every (*), Specific values, Range, or Step intervals.
              The cron expression updates in real time.
            </p>
            <p>
              <strong className="text-neutral-200">3. Read the description.</strong> The
              natural language description below the expression tells you exactly
              when your job will run, like &quot;Runs at 3:00 AM every Monday.&quot;
            </p>
            <p>
              <strong className="text-neutral-200">4. Verify with execution times.</strong> Check
              the &quot;Next 5 Execution Times&quot; section to confirm your schedule matches
              your expectations. Then copy the expression with one click.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Understanding Cron Expressions for Task Scheduling
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              Cron is the time-based job scheduler that has been part of Unix
              and Linux systems since the 1970s. Despite its age, cron remains
              the standard way to schedule recurring tasks across virtually
              every server, cloud platform, and CI/CD pipeline. Understanding
              cron syntax is a fundamental skill for backend developers, DevOps
              engineers, and system administrators.
            </p>
            <p>
              <strong className="text-neutral-200">The five-field format</strong> is
              elegant in its simplicity. Each field constrains when a job runs:
              minute (0-59), hour (0-23), day of month (1-31), month (1-12), and
              day of week (0-6). An asterisk means &quot;every,&quot; a comma separates
              specific values, a hyphen defines ranges, and a slash sets step
              intervals. With just these four operators, you can express nearly
              any recurring schedule.
            </p>
            <p>
              <strong className="text-neutral-200">Modern cloud platforms</strong> have
              adopted cron syntax as the standard for scheduled triggers. AWS
              EventBridge uses cron expressions to trigger Lambda functions.
              Google Cloud Scheduler and Azure Logic Apps accept the same format.
              GitHub Actions, GitLab CI, and Vercel all support cron-based
              scheduling for workflows and serverless functions. Learning cron
              once gives you scheduling capability across all major platforms.
            </p>
            <p>
              <strong className="text-neutral-200">Common pitfalls</strong> include
              confusing the day of week numbering (0 is Sunday in standard cron,
              but some systems start with Monday), forgetting that month and day
              of month are 1-indexed while minute and hour are 0-indexed, and
              not accounting for timezone differences between the server and the
              intended schedule. Always verify your expression against the next
              execution times.
            </p>
            <p>
              Visual cron builders like this one eliminate syntax errors by
              letting you select values interactively. The natural language
              description confirms your intent, and the next execution times
              serve as a final validation. Whether you are setting up database
              backups, report generation, cache clearing, or deployment
              pipelines, getting the cron expression right the first time saves
              debugging time and prevents missed or duplicate job runs.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="cron-expression-builder" />

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {faqItems.map((faq) => (
              <div
                key={faq.question}
                className="rounded-xl border border-white/10 bg-neutral-900 p-4"
              >
                <h3 className="text-sm font-semibold">{faq.question}</h3>
                <p className="mt-2 text-sm text-neutral-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slot="before-footer" page="cron-expression-builder" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Tools</h2>
          <p className="mt-2 text-sm text-neutral-400">
            Build cron schedules here, then use our other developer tools for
            timestamps, encoding, and formatting.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              href="/unix-timestamp-converter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🕐</div>
              <div className="mt-1 text-sm font-semibold">Unix Timestamp</div>
              <p className="mt-1 text-xs text-neutral-400">Convert epoch time to human dates</p>
            </Link>
            <Link
              href="/json-formatter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">{"{ }"}</div>
              <div className="mt-1 text-sm font-semibold">JSON Formatter</div>
              <p className="mt-1 text-xs text-neutral-400">Format, validate & beautify JSON</p>
            </Link>
            <Link
              href="/yaml-formatter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">📝</div>
              <div className="mt-1 text-sm font-semibold">YAML Formatter</div>
              <p className="mt-1 text-xs text-neutral-400">Format & validate YAML configs</p>
            </Link>
            <Link
              href="/regex-tester"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">⚙️</div>
              <div className="mt-1 text-sm font-semibold">Regex Tester</div>
              <p className="mt-1 text-xs text-neutral-400">Test regular expressions live</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
