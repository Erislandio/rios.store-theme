import React from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'

export default function CustomComboPricePdp() {
  const { handles } = useCssHandles([
    'comboPriceContainer',
    'comboPriceText',
  ] as const)
  // const { product } = ProductSummaryContext.useProductSummary()

  return (
    <div className={applyModifiers(handles.comboPriceContainer, 'pdp')}>
      3 por R$ 23,70 | 6 por R$ 35,40
    </div>
  )
}
