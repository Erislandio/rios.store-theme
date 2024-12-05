import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
// import { useDevice } from 'vtex.device-detector'
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
    width="26"
    height="24"
    viewBox="0 0 26 24"
    fill="none"
  >
    <path
      id="Arrow 1"
      d="M1.54688 10.5783C0.703427 10.5783 0.0196764 11.262 0.0196764 12.1055C0.0196764 12.9489 0.703427 13.6327 1.54688 13.6327V10.5783ZM25.0257 13.1854C25.6221 12.589 25.6221 11.622 25.0257 11.0256L15.3066 1.30654C14.7102 0.710136 13.7433 0.710136 13.1469 1.30654C12.5505 1.90295 12.5505 2.86992 13.1469 3.46633L21.786 12.1055L13.1469 20.7446C12.5505 21.341 12.5505 22.308 13.1469 22.9044C13.7433 23.5008 14.7102 23.5008 15.3066 22.9044L25.0257 13.1854ZM1.54688 13.6327H23.9458V10.5783H1.54688V13.6327Z"
      fill="#3F3F3F"
    />
  </svg>
)

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="18"
    viewBox="0 0 16 18"
    fill="none"
  >
    <path
      d="M14.12 15.645H2.24181V6.31215H14.12M11.5747 0.373047V2.06993H4.78714V0.373047H3.09025V2.06993H2.24181C1.30004 2.06993 0.544922 2.82505 0.544922 3.76682V15.645C0.544922 16.0951 0.7237 16.5267 1.04193 16.8449C1.36016 17.1631 1.79177 17.3419 2.24181 17.3419H14.12C14.5701 17.3419 15.0017 17.1631 15.3199 16.8449C15.6381 16.5267 15.8169 16.0951 15.8169 15.645V3.76682C15.8169 3.31678 15.6381 2.88517 15.3199 2.56694C15.0017 2.24871 14.5701 2.06993 14.12 2.06993H13.2716V0.373047M12.4231 9.70593H8.18091V13.9481H12.4231V9.70593Z"
      fill="#3F3F3F"
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
  'podCastArrowContainer',
] as const

const ExclusiveContent: StoreFrontFC<{
  podCast: PodCastI[]
  title: string
}> = ({ podCast = [], title = 'Conteúdo exclusivo' }) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  // const { isMobile } = useDevice()

  return (
    <section className={handles.podCastContainer}>
      <h3 className={handles.categoryContainerTitleh2}>{title}</h3>
      <SliderLayout
        showNavigationArrows="desktopOnly"
        showPaginationDots="always"
        fullWidth
        // centerMode={isMobile ? 'to-the-left' : 'disabled'}
        // centerModeSlidesGap={18}
        navigationStep={'page'}
        itemsPerPage={{
          desktop: 4,
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
                  </p>
                  <div className={handles.podCastArrowContainer}>
                    <span
                      className={handles.podCastContainerDescriptionSeeMore}
                    >
                      <Arrow />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
      </SliderLayout>
    </section>
  )
}

ExclusiveContent.defaultProps = {
  title: 'Conteúdo exclusivo',
  podCast: [],
}

ExclusiveContent.schema = {
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

export default ExclusiveContent
