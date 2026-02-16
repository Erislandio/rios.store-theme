import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

export default function CustomComboPrice() {
  const { handles } = useCssHandles([
    'comboPriceContainer',
    'comboPriceText',
  ] as const)
  // const { product } = ProductSummaryContext.useProductSummary()

  return (
    <div className={handles.comboPriceContainer}>
      3 por R$ 23,70 | 6 por R$ 35,40
    </div>
  )
}
