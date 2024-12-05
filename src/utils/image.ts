export const validateImage = (file: File) => {
  const MAX_SIZE = 5 * 1024 * 1024 // 5MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif']

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('지원하지 않는 파일 형식입니다.')
  }

  if (file.size > MAX_SIZE) {
    throw new Error('파일 크기는 5MB를 초과할 수 없습니다.')
  }

  return true
}
