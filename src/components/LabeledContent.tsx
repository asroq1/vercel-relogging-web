import Link from 'next/link'
import LinkIcon from '@/assets/icon_link.svg'
interface LabeledContentProps {
  label: string
  content: string
  linkLabel?: string
  type?: string
}

export default function LabeledContent({
  label,
  linkLabel,
  content,
  type,
}: LabeledContentProps) {
  return (
    <div className="flex items-center gap-2">
      <p className="flex min-h-[22px] min-w-[53px] items-center justify-center whitespace-nowrap rounded-sm border bg-green p-1 text-xs font-medium text-white">
        {label ?? '-'}
      </p>
      {type === 'link' ? (
        <Link
          rel="noopener noreferrer"
          target="_blank"
          className="flex items-center gap-1 text-sm font-bold text-blue-600 underline underline-offset-2"
          href={content}
        >
          <span>
            <LinkIcon />
          </span>{' '}
          {linkLabel}
        </Link>
      ) : (
        <p className="text-xs text-text">{content ?? '-'}</p>
      )}
    </div>
  )
}
