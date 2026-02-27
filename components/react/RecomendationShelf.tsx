import React from 'react'
import { useQuery } from 'react-apollo'
import { useCssHandles } from 'vtex.css-handles'
import { useDevice } from 'vtex.device-detector'
import { useProduct } from 'vtex.product-context'
import type {
  Product,
  ProductContextState,
} from 'vtex.product-context/react/ProductTypes'
import { ProductSummaryCustom } from 'vtex.product-summary'
import { ExtensionPoint } from 'vtex.render-runtime'

import RECOMMENDATION_QUERY from './graphql/getRecommendations.gql'

export default function RecomendationShelf() {
  const { product } = useProduct() as ProductContextState
  const { isMobile } = useDevice()
  const { handles } = useCssHandles([
    'recommendationShelf',
    'recommendationShelfTitle',
    'recommendationShelfWrapper',
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

  if (isMobile) {
    return (
      <section className={handles.recommendationShelf}>
        <h4 className={handles.recommendationShelfTitle}>
          VOCÊ VIU E AMOU! #LEVA
        </h4>
        <div className={handles.recommendationShelfWrapper}>
          {data?.productRecommendations
            ?.filter((item) =>
              item.items.some(
                (element) =>
                  element.sellers[0].commertialOffer.AvailableQuantity
              )
            )
            .slice(0, 4)
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
        </div>
      </section>
    )
  }

  return (
    <section className={handles.recommendationShelf}>
      <h4 className={handles.recommendationShelfTitle}>
        VOCÊ VIU E AMOU! #LEVA
      </h4>

      <div className={handles.recommendationShelfWrapper}>
        {data?.productRecommendations
          ?.filter((item) =>
            item.items.some(
              (element) => element.sellers[0].commertialOffer.AvailableQuantity
            )
          )
          .slice(0, 8)
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
      </div>
    </section>
  )
}
