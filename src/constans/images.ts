const DEFAULT_IMAGES = [
  '/randomImage/r1.png',
  '/randomImage/r2.png',
  '/randomImage/r3.png',
  '/randomImage/r4.png',
  '/randomImage/r5.png',
  '/randomImage/r6.png',
  '/randomImage/r7.png',
  '/randomImage/r8.png',
  '/randomImage/r9.png',
  '/randomImage/r10.png',
] as const

export const getRandomDefaultImage = () => {
  const randomIndex = Math.floor(Math.random() * DEFAULT_IMAGES.length)
  return DEFAULT_IMAGES[randomIndex]
}
