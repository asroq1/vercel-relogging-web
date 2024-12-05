// components/LoadingSpinner.tsx
interface LoadingSpinnerProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

export default function LoadingSpinner({
  className = '',
  size = 'sm',
  color = 'white',
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  }

  return (
    <div
      className={`inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent ${sizeClasses[size]} ${className} `}
      style={{
        borderTopColor: color,
        borderLeftColor: color,
        borderBottomColor: color,
      }}
    />
  )
}
