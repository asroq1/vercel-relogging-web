'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import CloseIcon from '@/assets/icon_close.svg'

interface ReportModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (reason: string) => Promise<any>
}

const ReportModal = ({ isOpen, onClose, onSubmit }: ReportModalProps) => {
  const [mounted, setMounted] = useState(false)
  const [reason, setReason] = useState('')

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(reason)
    setReason('')
    onClose()
  }

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />

      {/* 모달 컨텐츠 */}
      <div className="relative w-full max-w-md rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">신고하기</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <CloseIcon width={24} height={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">신고 사유</label>
            <textarea
              value={reason}
              onChange={(e) => {
                if (e.target.value.length <= 200) {
                  setReason(e.target.value)
                }
              }}
              placeholder="신고 사유를 적어주세요. 신고 내용은 신중히 검토한 뒤 필요한 조치를 취하겠습니다."
              className="h-32 w-full resize-none rounded-lg border border-gray-300 p-3 text-sm focus:border-green focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="flex-1 rounded-lg bg-green py-3 text-white hover:bg-green/90"
              onClick={handleSubmit}
            >
              신고하기
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg bg-gray-200 py-3 text-gray-700 hover:bg-gray-300"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  )

  if (!mounted || !isOpen) return null

  return createPortal(
    modalContent,
    document.getElementById('portal-root') as HTMLElement,
  )
}

export default ReportModal
