import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Link } from 'vtex.render-runtime'
import { SliderLayout } from 'vtex.slider-layout'

interface PodCastI {
  image: string
  __editorItemTitle: string
  description: string
  date: string
  url: string
}

const Arrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      d="M1.0415 10.1312C1.0415 5.18363 5.05228 1.17285 9.99984 1.17285C14.9474 1.17285 18.9582 5.18363 18.9582 10.1312C18.9582 15.0787 14.9474 19.0895 9.99984 19.0895C5.05228 19.0895 1.0415 15.0787 1.0415 10.1312ZM9.99984 2.42285C5.74264 2.42285 2.2915 5.87399 2.2915 10.1312C2.2915 14.3884 5.74264 17.8395 9.99984 17.8395C14.257 17.8395 17.7082 14.3884 17.7082 10.1312C17.7082 5.87399 14.257 2.42285 9.99984 2.42285Z"
      fill="#505257"
    />
    <path
      d="M5.41305 10.3395C5.41305 9.99434 5.69287 9.71452 6.03805 9.71452H13.538C13.8832 9.71452 14.163 9.99434 14.163 10.3395C14.163 10.6847 13.8832 10.9645 13.538 10.9645H6.03805C5.69287 10.9645 5.41305 10.6847 5.41305 10.3395Z"
      fill="#505257"
    />
    <path
      d="M9.3461 6.14758C9.59018 5.9035 9.98591 5.9035 10.23 6.14758L13.98 9.89758C14.2241 10.1417 14.2241 10.5374 13.98 10.7815L10.23 14.5315C9.98591 14.7755 9.59018 14.7755 9.3461 14.5315C9.10203 14.2874 9.10203 13.8917 9.3461 13.6476L12.6542 10.3395L9.3461 7.03146C9.10203 6.78738 9.10203 6.39165 9.3461 6.14758Z"
      fill="#505257"
    />
  </svg>
)

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M1.4585 8.04785C1.4585 7.70267 1.73832 7.42285 2.0835 7.42285H17.9168C18.262 7.42285 18.5418 7.70267 18.5418 8.04785V16.7979C18.5418 17.6033 17.8889 18.2562 17.0835 18.2562H2.91683C2.11142 18.2562 1.4585 17.6033 1.4585 16.7979V8.04785ZM2.7085 8.67285V16.7979C2.7085 16.9129 2.80176 17.0062 2.91683 17.0062H17.0835C17.1986 17.0062 17.2918 16.9129 17.2918 16.7979V8.67285H2.7085Z"
      fill="#505257"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M2.91683 3.67285C2.80177 3.67285 2.7085 3.76613 2.7085 3.88119V7.42285H17.2918V3.88119C17.2918 3.76612 17.1986 3.67285 17.0835 3.67285H2.91683ZM1.4585 3.88119C1.4585 3.07577 2.11141 2.42285 2.91683 2.42285H17.0835C17.8889 2.42285 18.5418 3.07578 18.5418 3.88119V8.04785C18.5418 8.39303 18.262 8.67285 17.9168 8.67285H2.0835C1.73832 8.67285 1.4585 8.39303 1.4585 8.04785V3.88119Z"
      fill="#505257"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M6.66683 1.17285C7.01201 1.17285 7.29183 1.45267 7.29183 1.79785V5.13119C7.29183 5.47636 7.01201 5.75619 6.66683 5.75619C6.32165 5.75619 6.04183 5.47636 6.04183 5.13119V1.79785C6.04183 1.45267 6.32165 1.17285 6.66683 1.17285Z"
      fill="#505257"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M13.3335 1.17285C13.6787 1.17285 13.9585 1.45267 13.9585 1.79785V5.13119C13.9585 5.47636 13.6787 5.75619 13.3335 5.75619C12.9883 5.75619 12.7085 5.47636 12.7085 5.13119V1.79785C12.7085 1.45267 12.9883 1.17285 13.3335 1.17285Z"
      fill="#505257"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11.0418 14.2979C11.0418 13.9527 11.3217 13.6729 11.6668 13.6729H14.1668C14.512 13.6729 14.7918 13.9527 14.7918 14.2979C14.7918 14.643 14.512 14.9229 14.1668 14.9229H11.6668C11.3217 14.9229 11.0418 14.643 11.0418 14.2979Z"
      fill="#505257"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5.2085 14.2979C5.2085 13.9527 5.48832 13.6729 5.8335 13.6729H8.3335C8.67867 13.6729 8.9585 13.9527 8.9585 14.2979C8.9585 14.643 8.67867 14.9229 8.3335 14.9229H5.8335C5.48832 14.9229 5.2085 14.643 5.2085 14.2979Z"
      fill="#505257"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11.0418 10.9645C11.0418 10.6193 11.3217 10.3395 11.6668 10.3395H14.1668C14.512 10.3395 14.7918 10.6193 14.7918 10.9645C14.7918 11.3097 14.512 11.5895 14.1668 11.5895H11.6668C11.3217 11.5895 11.0418 11.3097 11.0418 10.9645Z"
      fill="#505257"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5.2085 10.9645C5.2085 10.6193 5.48832 10.3395 5.8335 10.3395H8.3335C8.67867 10.3395 8.9585 10.6193 8.9585 10.9645C8.9585 11.3097 8.67867 11.5895 8.3335 11.5895H5.8335C5.48832 11.5895 5.2085 11.3097 5.2085 10.9645Z"
      fill="#505257"
    />
  </svg>
)

const CSS_HANDLES = [
  'podCastContainer',
  'podCastContainerLi',
  'podCastContainerUl',
  'podCastContainerItem',
  'podCastContainerTitle',
  'podCastContainerDescription',
  'podCastContainerIcon',
  'podCastContainerItemDevider',
  'podCastContainerDate',
  'categoryContainerTitleh2',
  'podCastContainerTitleAndCalendar',
  'podCastContainerLink',
  'podCastContainerDescriptionSeeMore',
] as const

const PodCast: StoreFrontFC<{ podCast: PodCastI[]; title: string }> = ({
  podCast = [],
  title = 'Conteúdo exclusivo',
}) => {
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <section className={handles.podCastContainer}>
      <h3 className={handles.categoryContainerTitleh2}>{title}</h3>
      <SliderLayout
        showNavigationArrows="always"
        showPaginationDots="always"
        fullWidth
        navigationStep={'page'}
        itemsPerPage={{
          desktop: 3,
          tablet: 2,
          phone: 1,
        }}
      >
        {podCast.map((podCast) => {
          return (
            <div
              className={handles.podCastContainerLi}
              key={podCast.__editorItemTitle}
            >
              <Link
                target="_blank"
                to={podCast.url}
                className={handles.podCastContainerLink}
              >
                <img
                  loading="lazy"
                  src={podCast.image}
                  alt={`Icon for ${podCast.__editorItemTitle}`}
                  width={452}
                  height={240}
                  className={handles.podCastContainerIcon}
                />
                <div className={handles.podCastContainerItem}>
                  <div className={handles.podCastContainerTitleAndCalendar}>
                    <h5 className={handles.podCastContainerTitle}>
                      {podCast.__editorItemTitle}
                    </h5>
                    {podCast.date ? (
                      <div className={handles.podCastContainerDate}>
                        <CalendarIcon />
                        {podCast.date}
                      </div>
                    ) : null}
                  </div>
                  <p className={handles.podCastContainerDescription}>
                    {podCast.description}
                    <span
                      className={handles.podCastContainerDescriptionSeeMore}
                    >
                      Ver Mais
                      <Arrow />
                    </span>
                  </p>
                </div>
              </Link>
            </div>
          )
        })}
      </SliderLayout>
    </section>
  )
}

PodCast.defaultProps = {
  title: 'Conteúdo exclusivo',
  podCast: [],
}

PodCast.schema = {
  title: 'Podcast',
  type: 'object',
  properties: {
    title: {
      title: 'title',
      type: 'string',
      default: 'Conteúdo exclusivo',
    },
    podCast: {
      type: 'array',
      title: 'Podcast',
      items: {
        type: 'object',
        properties: {
          __editorItemTitle: {
            title: 'title',
            type: 'string',
            default: '',
          },
          image: {
            type: 'string',
            title: 'image',
            default: '',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
          url: {
            type: 'string',
            title: 'link',
            default: '',
          },
          date: {
            type: 'string',
            title: 'Data',
            default: '',
          },
          description: {
            type: 'string',
            title: 'descrição',
            default: '',
          },
        },
      },
    },
  },
}

export default PodCast
