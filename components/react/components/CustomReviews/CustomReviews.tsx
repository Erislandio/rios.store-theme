/* eslint-disable react/jsx-pascal-case */
import type { ReactNode } from 'react'
import React, { useState } from 'react'
import { useQuery } from 'react-apollo'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { useProduct } from 'vtex.product-context'
import type { ProductContextState } from 'vtex.product-context/react/ProductTypes'
import { useRuntime } from 'vtex.render-runtime'
import { Button, EXPERIMENTAL_Modal } from 'vtex.styleguide'

import GET_REVIEWS from './getReviews.gql'
import PROFILE from './profile.gql'

import './index.css'

function getDaysUntil(dateString: string): string {
  // Parse a string da data
  const [datePart, timePart] = dateString.split(' ')
  const [month, day, year] = datePart.split('/')
  const [hours, minutes, seconds] = timePart.split(':')

  // Cria um objeto Date
  const targetDate = new Date(
    parseInt(year, 10),
    parseInt(month, 10) - 1, // Mês em JavaScript é baseado em zero (0-11)
    parseInt(day, 10),
    parseInt(hours, 10),
    parseInt(minutes, 10),
    parseInt(seconds, 10)
  )

  // Obtém a data atual
  const currentDate = new Date()

  // Calcula a diferença em milissegundos
  const differenceMs = targetDate.getTime() - currentDate.getTime()

  // Converte milissegundos para dias e arredonda para baixo
  const days = Math.abs(Math.floor(differenceMs / (1000 * 60 * 60 * 24)))

  // Determina se a data é no passado ou no futuro
  const isPast = differenceMs < 0

  // Retorna a string formatada
  if (days === 0) {
    return 'Hoje'
  }

  if (days === 1) {
    return isPast ? 'Ontem' : 'Amanhã'
  }

  return isPast ? `${days} dias atrás` : `Em ${days} dias`
}

export const UserProfileIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="33"
    height="33"
    viewBox="0 0 33 33"
    fill="none"
  >
    <g clipPath="url(#clip0_915_30334)">
      <path
        d="M16.5 32.7656C12.2565 32.7656 8.18687 31.0799 5.18629 28.0793C2.18571 25.0788 0.5 21.0091 0.5 16.7656C0.5 12.5222 2.18571 8.4525 5.18629 5.45192C8.18687 2.45133 12.2565 0.765625 16.5 0.765625C20.7435 0.765625 24.8131 2.45133 27.8137 5.45192C30.8143 8.4525 32.5 12.5222 32.5 16.7656C32.5 21.0091 30.8143 25.0788 27.8137 28.0793C24.8131 31.0799 20.7435 32.7656 16.5 32.7656ZM18.194 16.4756C19.3025 16.0768 20.2347 15.2997 20.8266 14.2811C21.4185 13.2626 21.632 12.0678 21.4296 10.9073C21.2272 9.74677 20.6218 8.69486 19.7201 7.93678C18.8183 7.17871 17.678 6.76308 16.5 6.76308C15.3219 6.76308 14.1817 7.17871 13.2799 7.93678C12.3782 8.69486 11.7728 9.74677 11.5704 10.9073C11.368 12.0678 11.5815 13.2626 12.1734 14.2811C12.7653 15.2997 13.6975 16.0768 14.806 16.4756C11.442 17.2876 8.5 20.3156 8.5 22.7656C8.5 23.5556 8.79 24.7556 10.5 24.7556H22.5C24.21 24.7556 24.5 23.5556 24.5 22.7656C24.5 20.3176 21.56 17.2856 18.194 16.4756Z"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0_915_30334">
        <rect
          width="32"
          height="32"
          fill="white"
          transform="translate(0.5 0.765625)"
        />
      </clipPath>
    </defs>
  </svg>
)

const CSS_HANDLES = [
  'reviewsContainer',
  'reviewsContainerTitle',
  'reviewsContainerDescription',
  'reviewsContainerMetadata',
  'star',
  'starContainer',
  'reviewsContainerModal',
  'reviewsContainerMetadata1',
  'reviewsContainerMetadata1Title',
  'reviewsContainerMetadata1Media',
  'reviewsContainerMetadata1Total',
  'reviewsContainerMetadata1MediaValue',
  'reviewsContainerMetadata2Description',
  'reviewsContainerMetadata2',
  'reviewsContainerMetadata2Percentage',
  'starList',
  'starCount',
  'starCountValue',
  'starListUl',
  'reviewsContainerUsers',
  'reviewsContainerUserDate',
  'reviewsContainerUserName',
  'reviewsContainerUser1',
  'reviewsContainerUser',
  'reviewsContainerFooter',
  'reviewsContainerUserInfoDescription',
  'reviewsContainerUserInfo',
  'reviewsContainerUserInfoTitle',
  'reviewsContainerFooterTitle',
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
            {item}
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

function calculatePercentage(rating: ReviewAverage): string {
  const { average } = rating

  return `${(average / 5) * 100}%`
}

export default function CustomReviews({ children }: { children: ReactNode }) {
  const { product } = useProduct() as ProductContextState
  const { handles } = useCssHandles(CSS_HANDLES)
  const { navigate } = useRuntime()
  const [isOpen, setOpen] = useState(false)
  const { data: profile, loading: loadingProfile } = useQuery<{
    profile: { email: string; firstName: string; lastName: string }
  }>(PROFILE, {
    ssr: false,
  })

  const {
    loading,
    data = {
      averageRatingByProductId: {
        average: 0,
        total: 0,
        starsFive: 0,
        starsFour: 0,
        starsOne: 0,
        starsThree: 0,
        starsTwo: 0,
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

  const {
    average = 0,
    total = 0,
    starsFive = 0,
    starsFour = 0,
    starsOne = 0,
    starsThree = 0,
    starsTwo = 0,
  } = data.averageRatingByProductId

  const percentage = calculatePercentage({
    average,
    starsFive,
    starsFour,
    starsOne,
    starsThree,
    starsTwo,
    total,
  })

  const starCounts = [starsFive, starsFour, starsThree, starsTwo, starsOne]
  const starLabels = [
    '5 estrelas',
    '4 estrelas',
    '3 estrelas',
    '2 estrelas',
    '1 estrelas',
  ]

  const handleOpenModal = () => {
    if (!profile?.profile) {
      return navigate({
        to: `/login?returnUrl=${window.location.pathname}`,
      })
    }

    return setOpen(true)
  }

  return (
    <section
      className={applyModifiers(
        handles.reviewsContainer,
        loading ? 'loading' : ''
      )}
    >
      <h3 className={handles.reviewsContainerTitle}>Avaliações</h3>
      <p className={handles.reviewsContainerDescription}>
        O que os clientes estão dizendo sobre o produto
      </p>
      <div className={handles.reviewsContainerMetadata}>
        <div className={handles.reviewsContainerMetadata1}>
          <span className={handles.reviewsContainerMetadata1Title}>
            Média de avaliações
          </span>
          <span className={handles.reviewsContainerMetadata1Media}>
            <RenderStars star={average} />
            <span className={handles.reviewsContainerMetadata1MediaValue}>
              {average}
            </span>
          </span>
          <p className={handles.reviewsContainerMetadata1Total}>
            {total === 1 ? `(${total} Avaliação)` : `(${total} Avaliações)`}
          </p>
        </div>
        <div className={handles.reviewsContainerMetadata2}>
          <div className={handles.reviewsContainerMetadata2Percentage}>
            {percentage}
          </div>
          <p className={handles.reviewsContainerMetadata2Description}>
            Recomendam esse produto
          </p>
        </div>
        <div className={handles.starList}>
          <ul className={handles.starListUl}>
            {starCounts.map((count, index) => (
              <li
                key={5 - index}
                className={applyModifiers(handles.star, 'metadata')}
              >
                <span className={handles.starCount}>{starLabels[index]}</span>{' '}
                <RenderStars star={5 - index} />{' '}
                <span className={handles.starCountValue}>({count})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ul className={handles.reviewsContainerUsers}>
        {data?.reviewsByProductId?.data?.map((item) => (
          <li className={handles.reviewsContainerUser} key={item.id}>
            <div className={handles.reviewsContainerUser1}>
              <UserProfileIcon />
              <p className={handles.reviewsContainerUserName}>
                {item.reviewerName}
              </p>
              <RenderStars star={item.rating} />
              <p className={handles.reviewsContainerUserDate}>
                {getDaysUntil(item.reviewDateTime)}
              </p>
            </div>
            <div className={handles.reviewsContainerUserInfo}>
              <h6 className={handles.reviewsContainerUserInfoTitle}>
                {item.title}
              </h6>
              <p className={handles.reviewsContainerUserInfoDescription}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M21.546 5.87718C21.8272 6.15847 21.9852 6.53993 21.9852 6.93768C21.9852 7.33543 21.8272 7.71689 21.546 7.99818L10.303 19.2412C10.1544 19.3898 9.97805 19.5077 9.7839 19.5881C9.58976 19.6685 9.38167 19.7099 9.17153 19.7099C8.96138 19.7099 8.75329 19.6685 8.55915 19.5881C8.365 19.5077 8.1886 19.3898 8.04003 19.2412L2.45403 13.6562C2.31076 13.5178 2.19649 13.3523 2.11787 13.1693C2.03926 12.9863 1.99788 12.7895 1.99615 12.5903C1.99442 12.3911 2.03237 12.1936 2.10779 12.0092C2.18322 11.8249 2.29459 11.6574 2.43543 11.5166C2.57627 11.3757 2.74375 11.2644 2.92809 11.1889C3.11244 11.1135 3.30996 11.0756 3.50913 11.0773C3.7083 11.079 3.90513 11.1204 4.08813 11.199C4.27114 11.2776 4.43666 11.3919 4.57503 11.5352L9.17103 16.1312L19.424 5.87718C19.5633 5.73779 19.7287 5.62721 19.9108 5.55177C20.0928 5.47633 20.288 5.4375 20.485 5.4375C20.6821 5.4375 20.8772 5.47633 21.0593 5.55177C21.2413 5.62721 21.4067 5.73779 21.546 5.87718Z"
                    fill="#6E6E73"
                  />
                </svg>
                {item.text}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className={handles.reviewsContainerFooter}>
        <h5 className={handles.reviewsContainerFooterTitle}>
          Faça uma avaliação <br /> deste produto
        </h5>
        <Button isLoading={loadingProfile} onClick={() => handleOpenModal()}>
          {profile?.profile?.email ? 'Escrever avaliação' : 'Entrar'}
        </Button>
      </div>
      <EXPERIMENTAL_Modal isOpen={isOpen} onClose={() => setOpen(false)}>
        <div className={handles.reviewsContainerModal}>{children}</div>
      </EXPERIMENTAL_Modal>
    </section>
  )
}
