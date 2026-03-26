import { getToolBySlug } from '@/lib/config'
import AnswerBlock from './AnswerBlock'

const audienceMap: Record<string, string> = {
  'Text Tools': 'Writers, students, bloggers, and anyone who needs to quickly transform text formatting without manual retyping.',
  'Analysis': 'Content creators, SEO professionals, students, and editors who need to analyze text metrics and readability.',
  'Font Styles': 'Social media managers, marketers, and anyone who wants stylized text for bios, posts, and captions.',
  'Developer': 'Software developers, DevOps engineers, and technical writers who need quick formatting and conversion utilities.',
  'Encoding': 'Developers, security professionals, and power users who work with encoded data and character conversions.',
  'Generators': 'Developers, designers, content creators, and anyone who needs to quickly generate text, codes, or identifiers.',
}

interface ToolAnswerBlockProps {
  slug: string
  lastUpdated?: string
}

export default function ToolAnswerBlock({ slug, lastUpdated = '2026-03-25' }: ToolAnswerBlockProps) {
  const tool = getToolBySlug(slug)
  if (!tool) return null

  const who = audienceMap[tool.category] || 'Anyone who works with text and needs a fast, free browser-based tool.'

  return (
    <AnswerBlock
      what={tool.description}
      who={who}
      bottomLine="100% free, runs entirely in your browser — no signup, no data sent to any server."
      lastUpdated={lastUpdated}
    />
  )
}
