import Link from 'next/link'

interface ILinkPatterns {
  url: RegExp
  email: RegExp
  phone: RegExp
}

interface ILinkStyles {
  link: string
  hover: string
}

const patterns: ILinkPatterns = {
  url: /(https?:\/\/[^\s]+)/g,
  email: /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,
  phone: /(\d{2,3}-\d{3,4}-\d{4})/g,
}

const styles: ILinkStyles = {
  link: 'text-blue-600',
  hover: 'hover:underline',
}

type LinkElement = string | JSX.Element

// 컨텐츠 안의 URL, 이메일, 전화번호를 링크로 변환하는 함수

export function linkifyContent(content: string | undefined): LinkElement[] {
  let elements: LinkElement[] = [content || '']

  Object.entries(patterns).forEach(([type, pattern]) => {
    elements = elements.flatMap((element) => {
      if (typeof element === 'string') {
        const parts = element.split(pattern)
        return parts.map((part, i): LinkElement => {
          if (part.match(pattern)) {
            switch (type) {
              case 'url':
                return (
                  <Link
                    key={`url-${i}`}
                    href={part}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.link} ${styles.hover}`}
                  >
                    {part}
                  </Link>
                )
              case 'email':
                return (
                  <Link
                    key={`email-${i}`}
                    href={`mailto:${part}`}
                    className={`${styles.link} ${styles.hover}`}
                  >
                    {part}
                  </Link>
                )
              case 'phone':
                return (
                  <Link
                    key={`phone-${i}`}
                    href={`tel:${part}`}
                    className={`${styles.link} ${styles.hover}`}
                  >
                    {part}
                  </Link>
                )
              default:
                return part
            }
          }
          return part
        }) as LinkElement[]
      }
      return element
    })
  })

  return elements
}
