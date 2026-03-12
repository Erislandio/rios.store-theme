import type { KitItem } from '../../typings/product-kit'

export function extractImageUrl(
  imageTag: string,
  width: number,
  height: number
): string {
  const match = imageTag.match(/src="([^"]+)"/)

  if (!match) return ''

  let url = match[1]

  url = url.replace(/^~\//, '/')
  url = url.replace(/#width#/g, String(width))
  url = url.replace(/#height#/g, String(height))

  const startIndex = url.indexOf('/arquivos')

  if (startIndex === -1) {
    return url
  }

  return url.substring(startIndex)
}

export function getVariationValue(
  item: KitItem,
  variationName: string
): string | null {
  const variation = item.variations?.find(
    (v) => v.name.toLowerCase() === variationName.toLowerCase()
  )

  return variation?.values?.[0] ?? null
}

export function getAvailableSizes(items: KitItem[]): string[] {
  const sizes = new Set<string>()

  items.forEach((item) => {
    const size = getVariationValue(item, 'tamanho')

    if (size) sizes.add(size)
  })

  return Array.from(sizes)
}

export function getAvailableColors(
  items: KitItem[]
): { name: string; hex: string }[] {
  const colorMap = new Map<string, string>()

  items.forEach((item) => {
    const color = getVariationValue(item, 'cor')

    if (color && !colorMap.has(color)) {
      const colorImage = item.images.find(
        (img) => img.imageLabel?.toLowerCase() === 'cor'
      )

      colorMap.set(color, colorImage?.imageUrl ?? '')
    }
  })

  return Array.from(colorMap.entries()).map(([name, hex]) => ({ name, hex }))
}

export function findItemBySizeAndColor(
  items: KitItem[],
  size: string | null,
  color: string | null
): KitItem | undefined {
  return items.find((item) => {
    const itemSize = getVariationValue(item, 'tamanho')
    const itemColor = getVariationValue(item, 'cor')

    const sizeMatch = !size || itemSize === size
    const colorMatch = !color || itemColor === color

    return sizeMatch && colorMatch
  })
}
