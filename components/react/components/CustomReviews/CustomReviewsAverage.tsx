/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import { useQuery } from 'react-apollo'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { useProduct } from 'vtex.product-context'
import type { ProductContextState } from 'vtex.product-context/react/ProductTypes'

import GET_REVIEWS from './getReviews.gql'

import './index.css'

const CSS_HANDLES = [
  'reviewsContainerMetadata1',
  'reviewsContainerMetadata1Title',
  'reviewsContainerMetadata1Media',
  'reviewsContainerMetadata1MediaValue',
  'reviewsContainerMetadata1Total',
  'starContainer',
  'star',
] as const

function RenderStars({ star }: { star: number }) {
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <ul className={handles.starContainer}>
      {['★', '★', '★', '★', '★'].map((item, index) => {
        if (index + 1 <= star) {
          return (
            <li key={index} className={applyModifiers(handles.star, 'filed')}>
              {item}
            </li>
          )
        }

        return (
          <li key={index} className={applyModifiers(handles.star, 'empty')}>
            ☆
          </li>
        )
      })}
    </ul>
  )
}

export interface Review {
  title: string
  text: string
  reviewerName: string
  reviewDateTime: string
  approved: boolean
  id: string
  rating: number
}

export interface ReviewAverage {
  average: number
  starsFive: number
  starsFour: number
  starsThree: number
  starsTwo: number
  starsOne: number
  total: number
}

export default function CustomReviewsAverage() {
  const { product } = useProduct() as ProductContextState
  const { handles } = useCssHandles(CSS_HANDLES)

  const {
    data = {
      averageRatingByProductId: {
        average: 0,
        total: 0,
      },
      reviewsByProductId: {
        data: [],
      },
    },
  } = useQuery<{
    reviewsByProductId: { data: Review[] }
    averageRatingByProductId: ReviewAverage
  }>(GET_REVIEWS, {
    fetchPolicy: 'cache-first',
    skip: !product?.productId,
    ssr: false,
    variables: {
      productId: product?.productId,
      orderBy: 'ASC',
    },
  })

  const { average = 0, total = 0 } = data.averageRatingByProductId

  return (
    <>
      {total >= 1 && (
        <div className={handles.reviewsContainerMetadata1}>
          <span className={handles.reviewsContainerMetadata1Media}>
            <RenderStars star={average} />
          </span>
          <span className={handles.reviewsContainerMetadata1MediaValue}>
            {average.toFixed(1)}
          </span>
          <p className={handles.reviewsContainerMetadata1Total}>
            {total === 1 ? `(${total} Avaliação)` : `(${total} Avaliações)`}
          </p>
        </div>
      )}
    </>
  )
}
