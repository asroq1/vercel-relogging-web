interface LabeledContentProps {
  label: string
  content: string
}

export default function LabeledContent({
  label,
  content,
}: LabeledContentProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="border-green- whitespace-nowrap rounded-md border bg-green p-1 text-xs font-semibold text-white">
        {label ?? '-'}
      </span>
      <span className="text-xs text-text">{content ?? '-'}</span>
    </div>
  )
}
