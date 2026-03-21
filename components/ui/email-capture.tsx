'use client'

import { useState } from 'react'
import { cx } from '@/lib/utils'
import { useTheme } from '@/components/layout/theme-provider'

interface EmailCaptureProps {
  headline: string
  subtext: string
  buttonText: string
  source: string
  leadMagnet: string
  variant?: 'inline' | 'banner'
}

export default function EmailCapture({
  headline,
  subtext,
  buttonText,
  source,
  leadMagnet,
  variant = 'inline',
}: EmailCaptureProps) {
  const { isDark } = useTheme()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async () => {
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address')
      return
    }
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source, leadMagnet }),
      })

      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMsg('Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div
        className={cx(
          'rounded-2xl border p-6 text-center',
          isDark ? 'border-green-500/30 bg-green-950/30' : 'border-green-200 bg-green-50',
          variant === 'banner' ? 'w-full' : ''
        )}
        role="status"
        aria-live="polite"
      >
        <span className="text-2xl">✓</span>
        <p className={cx('font-medium mt-2', isDark ? 'text-green-300' : 'text-green-800')}>
          Check your inbox — your templates are on the way.
        </p>
      </div>
    )
  }

  return (
    <div
      className={cx(
        'rounded-2xl border p-6 shadow-sm',
        isDark ? 'bg-neutral-900 border-white/10' : 'bg-white border-black/10',
        variant === 'banner' ? 'w-full' : ''
      )}
      role="complementary"
      aria-label="Get free templates"
    >
      <p className={cx('font-bold text-lg mb-1', isDark ? 'text-white' : 'text-gray-900')}>
        {headline}
      </p>
      <p className={cx('text-sm mb-4', isDark ? 'text-neutral-400' : 'text-gray-500')}>
        {subtext}
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor={`email-${source}`} className="sr-only">
          Email address
        </label>
        <input
          id={`email-${source}`}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="your@email.com"
          disabled={status === 'loading'}
          aria-describedby={errorMsg ? `error-${source}` : undefined}
          className={cx(
            'flex-1 px-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 disabled:opacity-50',
            isDark
              ? 'border-white/10 bg-neutral-950 text-white placeholder-neutral-500 focus:ring-white/20'
              : 'border-black/10 bg-neutral-50 text-gray-900 placeholder-gray-400 focus:ring-blue-500'
          )}
        />
        <button
          onClick={handleSubmit}
          disabled={status === 'loading'}
          aria-busy={status === 'loading'}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-xl text-sm transition-colors"
        >
          {status === 'loading' ? 'Sending...' : buttonText}
        </button>
      </div>
      {errorMsg && (
        <p id={`error-${source}`} className="text-red-500 text-xs mt-2" role="alert">
          {errorMsg}
        </p>
      )}
      <p className={cx('text-xs mt-3', isDark ? 'text-neutral-500' : 'text-gray-400')}>
        No spam. Unsubscribe anytime. We never sell your data.
      </p>
    </div>
  )
}
