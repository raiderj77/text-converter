interface AnswerBlockProps {
  what: string
  who: string
  bottomLine: string
  lastUpdated: string
}

export default function AnswerBlock({ what, who, bottomLine, lastUpdated }: AnswerBlockProps) {
  return (
    <section
      aria-labelledby="quick-answer-heading"
      className="answer-block border-l-4 border-blue-600 bg-neutral-900/50 rounded-r-lg p-5 mb-6"
    >
      <h2 id="quick-answer-heading" className="sr-only">
        Quick Answer
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
        <div>
          <h3 className="block text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-1">
            What is this?
          </h3>
          <p className="text-sm leading-relaxed text-neutral-300 m-0">{what}</p>
        </div>
        <div>
          <h3 className="block text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-1">
            Who needs it?
          </h3>
          <p className="text-sm leading-relaxed text-neutral-300 m-0">{who}</p>
        </div>
        <div>
          <h3 className="block text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-1">
            Bottom line
          </h3>
          <p className="text-sm leading-relaxed text-neutral-300 m-0">{bottomLine}</p>
        </div>
      </div>
      <time
        dateTime={lastUpdated}
        className="block text-right text-xs text-neutral-500"
      >
        Last updated:{' '}
        {new Date(lastUpdated).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </time>
    </section>
  )
}
