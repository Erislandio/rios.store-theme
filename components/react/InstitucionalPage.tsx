import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useDevice } from 'vtex.device-detector'
import { Link } from 'vtex.render-runtime'

const CSS_HANDLES = [
  'institucionalWrapper',
  'institucionalBreadcrumb',
  'institucionalBreadcrumbLink',
  'institucionalBreadcrumbSeparator',
  'institucionalBreadcrumbCurrent',
  'institucionalBanner',
  'institucionalContent',
  'institucionalTitle',
  'institucionalBreadcrumbContainer',
  'institucionalText',
] as const

interface BreadcrumbItem {
  label: string
  link?: string
}

interface Props {
  bannerDesktop: string
  bannerMobile: string
  title: string
  text: string
  breadcrumbs: BreadcrumbItem[]
}

const InstitucionalPage: StoreFrontFC<Props> = ({
  bannerDesktop,
  bannerMobile,
  title,
  text,
  breadcrumbs = [],
}) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const { isMobile } = useDevice()

  const hasBanner = bannerDesktop || bannerMobile

  return (
    <div className={handles.institucionalWrapper}>
      {breadcrumbs.length > 0 && (
        <nav className={handles.institucionalBreadcrumb}>
          <div className={handles.institucionalBreadcrumbContainer}>
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1

              return (
                <React.Fragment key={index}>
                  {index > 0 && (
                    <span className={handles.institucionalBreadcrumbSeparator}>
                      /
                    </span>
                  )}
                  {!isLast && item.link ? (
                    <Link
                      to={item.link}
                      className={handles.institucionalBreadcrumbLink}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className={handles.institucionalBreadcrumbCurrent}>
                      {item.label}
                    </span>
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </nav>
      )}

      {hasBanner && (
        <>
          {bannerDesktop && !isMobile && (
            <img
              src={bannerDesktop}
              alt={title}
              className={`${handles.institucionalBanner} institucionalBanner--desktop`}
              loading="eager"
            />
          )}
          {bannerMobile && isMobile && (
            <img
              src={bannerMobile}
              alt={title}
              className={`${handles.institucionalBanner} institucionalBanner--mobile`}
              loading="eager"
            />
          )}
        </>
      )}

      {(title || text) && (
        <div className={handles.institucionalContent}>
          {title && <h1 className={handles.institucionalTitle}>{title}</h1>}
          {text && (
            <div
              className={handles.institucionalText}
              dangerouslySetInnerHTML={{
                __html: text,
              }}
            ></div>
          )}
        </div>
      )}
    </div>
  )
}

InstitucionalPage.defaultProps = {
  bannerDesktop: '',
  bannerMobile: '',
  title: 'Sobre a Rios',
  text: '',
  breadcrumbs: [{ label: 'Home', link: '/' }, { label: 'Sobre nós' }],
}

InstitucionalPage.schema = {
  title: 'Página Institucional',
  description:
    'Banner + breadcrumb + título e texto para páginas institucionais',
  type: 'object',
  properties: {
    bannerDesktop: {
      type: 'string',
      title: 'Banner Desktop',
      widget: { 'ui:widget': 'image-uploader' },
    },
    bannerMobile: {
      type: 'string',
      title: 'Banner Mobile',
      widget: { 'ui:widget': 'image-uploader' },
    },
    title: {
      type: 'string',
      title: 'Título da página',
    },
    text: {
      type: 'string',
      title: 'Texto',
      widget: { 'ui:widget': 'textarea' },
    },
    breadcrumbs: {
      type: 'array',
      title: 'Breadcrumb',
      items: {
        type: 'object',
        properties: {
          __editorItemTitle: {
            type: 'string',
            title: 'Identificador',
          },
          label: {
            type: 'string',
            title: 'Texto',
          },
          link: {
            type: 'string',
            title: 'Link (deixe vazio para o item atual)',
          },
        },
      },
    },
  },
}

export default InstitucionalPage
