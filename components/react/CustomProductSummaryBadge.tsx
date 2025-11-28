import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useDevice } from 'vtex.device-detector'
import { ProductSummaryContext } from 'vtex.product-summary-context'

const Icon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="13"
    height="12"
    viewBox="0 0 13 12"
    fill="none"
  >
    <circle cx="6.87014" cy="2.49929" r="2.35577" fill="#FCD200" />
    <circle cx="3.10092" cy="9.40956" r="2.35577" fill="#00579C" />
    <circle cx="10.6394" cy="9.40956" r="2.35577" fill="#DC2626" />
  </svg>
)

const CSS_HANDLES = ['customProductSummaryBadge'] as const

export default function CustomProductSummaryBadge() {
  const { isMobile } = useDevice()
  const { product } = ProductSummaryContext.useProductSummary()

  const hasColorVariation = product?.skuSpecifications?.filter(
    (spec) => spec?.field?.name?.toLowerCase() === 'cor'
  )

  const { handles } = useCssHandles(CSS_HANDLES)

  if (hasColorVariation.length <= 1) return null

  return (
    <div className={handles.customProductSummaryBadge}>
      {isMobile ? '' : ' Variação de cores'}
      <Icon />
    </div>
  )
}
