/* eslint-disable react/jsx-pascal-case */
import type { ReactNode } from 'react'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { useProduct } from 'vtex.product-context'
import type { ProductContextState } from 'vtex.product-context/react/ProductTypes'
import { useRuntime } from 'vtex.render-runtime'
import { Button, Dropdown, EXPERIMENTAL_Modal } from 'vtex.styleguide'

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

export const StarFill = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="19"
    viewBox="0 0 18 19"
    fill="none"
  >
    <path
      d="M13.325 7.15427C13.3239 7.15613 13.3226 7.15825 13.3211 7.16063C13.3169 7.16727 13.312 7.17477 13.3065 7.18321C13.3065 7.18322 13.3065 7.18322 13.3065 7.18323C13.2616 7.25106 13.1688 7.37921 12.9895 7.60058C12.8784 7.73765 12.7533 7.88727 12.608 8.05873L13.4707 6.45791L13.4724 6.4583C15.3163 6.87579 16.2375 7.08438 16.4572 7.78991L13.2341 8.79112C13.1668 8.57454 13.1288 8.34267 13.1254 8.10623C13.1247 8.06153 13.1253 8.01805 13.127 7.97587C13.127 7.97585 13.127 7.97584 13.127 7.97582C13.1341 7.79782 13.1602 7.64288 13.1917 7.51682C13.2294 7.36616 13.2748 7.25702 13.3033 7.19705C13.3033 7.19705 13.3033 7.19704 13.3033 7.19704C13.3127 7.17743 13.3202 7.16309 13.325 7.15427ZM13.325 7.15427C13.3293 7.14723 13.3312 7.14379 13.3311 7.14384C13.331 7.14388 13.3288 7.1474 13.325 7.15427ZM9.95281 8.69853C10.4454 9.07326 10.996 9.30109 11.4393 9.44027C11.1556 9.81506 10.8182 10.3438 10.6252 10.9642L10.6244 10.9669C10.4548 11.5139 10.4172 12.0675 10.4242 12.5131C10.0187 12.3826 9.52436 12.2727 8.99993 12.2727C8.47548 12.2727 7.98116 12.3826 7.57563 12.5132C7.58244 12.0677 7.54453 11.514 7.37445 10.9668C7.18151 10.3445 6.84428 9.81529 6.56036 9.44028C7.00217 9.30158 7.5506 9.07485 8.04244 8.70203L6.10987 6.1525L8.04244 8.70203C8.43964 8.40096 8.75773 8.03527 9.00005 7.70088C9.24143 8.03403 9.55783 8.39806 9.95281 8.69853L11.9361 6.09133L9.95281 8.69853ZM10.6666 15.7064C10.6666 15.7055 10.6669 15.701 10.6678 15.6932C10.6673 15.7006 10.6669 15.7049 10.6667 15.7061C10.6667 15.7065 10.6667 15.7066 10.6666 15.7066C10.6666 15.7066 10.6666 15.7065 10.6666 15.7064ZM13.3877 13.7876C13.3873 13.7875 13.387 13.7874 13.3866 13.7873C13.4022 13.791 13.4032 13.792 13.3877 13.7876ZM4.61181 13.7878C4.59614 13.7923 4.59706 13.7913 4.61275 13.7876C4.61243 13.7877 4.61212 13.7877 4.61181 13.7878ZM7.33216 15.6927C7.33299 15.7002 7.3333 15.7046 7.3333 15.7057C7.3333 15.7059 7.3333 15.706 7.33328 15.706C7.33326 15.706 7.33322 15.7058 7.33317 15.7054C7.33297 15.704 7.33259 15.6998 7.33216 15.6927ZM3.6536 10.16C3.65348 10.1599 3.65685 10.1584 3.66406 10.1556C3.65733 10.1586 3.65372 10.16 3.6536 10.16ZM4.66883 7.14451C4.66896 7.14455 4.67112 7.14806 4.67488 7.1549C4.67058 7.14789 4.66869 7.14446 4.66883 7.14451ZM7.286 4.80499C7.28601 4.80481 7.28905 4.80833 7.29509 4.81611C7.28901 4.80906 7.28599 4.80517 7.286 4.80499ZM10.7139 4.80499C10.7139 4.80517 10.7109 4.80906 10.7048 4.81611C10.7108 4.80833 10.7139 4.80481 10.7139 4.80499ZM14.3462 10.1602C14.3461 10.1602 14.3425 10.1588 14.3358 10.1558C14.343 10.1586 14.3464 10.1601 14.3462 10.1602Z"
      stroke="#3065E0"
      stroke-width="6.75"
    />
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
  'filterDropdownContainer',
  'filterTitle',
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
  const [filterReviews, setFilterReviews] = useState<Review[]>()
  const [dropdownValue, setDropdownValue] = useState<string>('old')

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

  useEffect(() => {
    let newData: Review[] = [...data.reviewsByProductId.data]

    const newArray = newData?.sort(
      (a, b) =>
        new Date(a.reviewDateTime).getTime() -
        new Date(b.reviewDateTime).getTime()
    )
    setFilterReviews(newArray)
  }, [data])

  const options = [
    { value: 'old', label: 'Mais antigos primeiro', disabled: false },
    { value: 'recent', label: 'Mais recentes primeiro', disabled: false },
    {
      value: 'bestRating',
      label: 'Melhores avaliações primeiro',
      disabled: false,
    },
    {
      value: 'worstRating',
      label: 'Piores avaliações primeiro',
      disabled: false,
    },
  ]

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    setDropdownValue(value)

    if (!filterReviews) return

    const sortFunctions: { [key: string]: (a: Review, b: Review) => number } = {
      old: (a, b) =>
        new Date(a.reviewDateTime).getTime() -
        new Date(b.reviewDateTime).getTime(),
      recent: (a, b) =>
        new Date(b.reviewDateTime).getTime() -
        new Date(a.reviewDateTime).getTime(),
      bestRating: (a, b) => b.rating - a.rating,
      worstRating: (a, b) => a.rating - b.rating,
    }

    const sortFunction = sortFunctions[value]
    if (sortFunction) {
      const newArray = [...filterReviews].sort(sortFunction)
      setFilterReviews(newArray)
    }
  }

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
      <div className={handles.filterDropdownContainer}>
        <span className={handles.filterTitle}>Organizar por</span>
        <Dropdown
          options={options}
          value={dropdownValue}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
            handleFilter(event)
          }
        />
      </div>
      <ul className={handles.reviewsContainerUsers}>
        {filterReviews?.map((item, index) => (
          <li className={handles.reviewsContainerUser} key={item.id + index}>
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
