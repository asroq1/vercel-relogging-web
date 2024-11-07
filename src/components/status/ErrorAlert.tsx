import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ErrorAlertProps {
  error?: Error | string
  onRetry?: () => void
}

export function ErrorAlert({ error, onRetry }: ErrorAlertProps) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>에러가 발생했습니다</AlertTitle>
      <AlertDescription>
        {error instanceof Error
          ? error.message
          : error || '데이터를 불러오는데 실패했습니다.'}
      </AlertDescription>
      {onRetry && (
        <div className="mt-4">
          <Button variant="outline" onClick={onRetry} size="sm">
            다시 시도
          </Button>
        </div>
      )}
    </Alert>
  )
}
