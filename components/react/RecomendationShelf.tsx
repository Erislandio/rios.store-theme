import React from 'react'
import { useQuery } from 'react-apollo'
import { useCssHandles } from 'vtex.css-handles'
import { useProduct } from 'vtex.product-context'
import type {
  Product,
  ProductContextState,
} from 'vtex.product-context/react/ProductTypes'
import { ProductSummaryCustom } from 'vtex.product-summary'
import { ExtensionPoint } from 'vtex.render-runtime'
import { SliderLayout } from 'vtex.slider-layout'

import RECOMMENDATION_QUERY from './graphql/getRecommendations.gql'

export default function RecomendationShelf() {
  const { product } = useProduct() as ProductContextState
  const { handles } = useCssHandles([
    'recommendationShelf',
    'recommendationShelfTitle',
  ] as const)

  const { data, loading } = useQuery<{ productRecommendations: Product[] }>(
    RECOMMENDATION_QUERY,
    {
      fetchPolicy: 'cache-first',
      variables: {
        slug: product?.linkText,
      },
      skip: !product?.linkText,
    }
  )

  if (loading || !data?.productRecommendations?.length) {
    return null
  }

  return (
    <section className={handles.recommendationShelf}>
      <h4 className={handles.recommendationShelfTitle}>Você vai gostar</h4>
      <SliderLayout
        showNavigationArrows="desktopOnly"
        itemsPerPage={{
          desktop: 4,
          tablet: 2,
          phone: 1,
        }}
        centerMode={{
          desktop: 'disabled',
          tablet: 'disabled',
          phone: 'to-the-left',
          mobile: 'to-the-left',
        }}
        centerModeSlidesGap={16}
        showPaginationDots="never"
      >
        {data?.productRecommendations
          ?.filter((item) =>
            item.items.some(
              (element) => element.sellers[0].commertialOffer.AvailableQuantity
            )
          )
          .map((item) => (
            <ExtensionPoint
              id="product-summary.shelf"
              key={item.productId}
              product={ProductSummaryCustom.mapCatalogProductToProductSummary(
                item,
                'FIRST_AVAILABLE',
                400
              )}
            />
          ))}
      </SliderLayout>
    </section>
  )
}
