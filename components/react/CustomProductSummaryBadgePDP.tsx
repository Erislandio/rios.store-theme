import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useProduct } from 'vtex.product-context'
import { ProductContextState } from 'vtex.product-context/react/ProductTypes'

const CSS_HANDLES = [
  'customProductSummaryBadgePdp',
  'customProductSummaryBadgePdp__discount',
  'customProductSummaryBadgePdp__new',
] as const

export default function CustomProductSummaryBadgePDP() {
  const { handles } = useCssHandles(CSS_HANDLES)
  const { product, selectedItem } = useProduct() as ProductContextState

  const seller = selectedItem?.sellers?.find((seller) => seller.sellerDefault)

  if (!seller) return null

  const { ListPrice, Price } = seller.commertialOffer

  const discountPercent =
    ListPrice !== Price
      ? Math.round(((ListPrice - Price) / ListPrice) * 100)
      : null

  const isNew = product?.productClusters?.filter(
    (cluster) => cluster?.name?.toLowerCase() === 'lançamentos'
  ) as any[]

  return (
    <div className={handles.customProductSummaryBadgePdp}>
      {isNew?.length > 0 && (
        <span className={handles.customProductSummaryBadgePdp__new}>Novo</span>
      )}
      {discountPercent && (
        <span className={handles.customProductSummaryBadgePdp__discount}>
          {discountPercent}% OFF
        </span>
      )}
    </div>
  )
}
