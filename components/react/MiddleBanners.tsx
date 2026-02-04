import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useDevice } from 'vtex.device-detector'
import { Link } from 'vtex.render-runtime'
import { SliderLayout } from 'vtex.slider-layout'
import useDatalayer from './hooks/useDatalayer'

interface Props {
  items?: Array<{
    __editorItemTitle?: string
    description?: string
    link?: string
    textLink?: string
    image?: string
    subTitle: string
  }>
  backgroundColor?: string
}

const CSS_HANDLES = [
  'middleBanners',
  'middleBannersItem',
  'middleBannersItemIcon',
  'middleBannersItemTitle',
  'middleBannersItemDescription',
  'middleBannersWrapper',
  'middleBannersItemsubTitle',
  'fade',
  'middleBannersItemContent',
] as const

const MiddleBanners: StoreFrontFC<Props> = ({ items = [] }) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const { pushToDataLayer } = useDatalayer()
  const { isMobile } = useDevice()

  const itemToRender = items.slice(0, 3).map((item, index) => (
    <Link
      key={index}
      className={handles.middleBannersItem}
      to={item.link ?? '#'}
      onClick={() =>
        pushToDataLayer({
          event: 'bannerClick',
          bannerTitle: item.__editorItemTitle,
          bannerLink: item.link,
          bannerPosition: index + 1,
        })
      }
    >
      {item.image && (
        <img
          width={502}
          height={562}
          loading="lazy"
          className={handles.middleBannersItemIcon}
          src={item.image}
          alt={item.__editorItemTitle || `Image ${index + 1}`}
        />
      )}
      <div className={handles.middleBannersItemContent}>
        <h3 className={handles.middleBannersItemTitle}>
          {item.__editorItemTitle}
        </h3>
        <span className={handles.middleBannersItemDescription}>
          {item.textLink ?? 'Comprar'}
        </span>
      </div>
      <div className={handles.fade}></div>
    </Link>
  ))

  return (
    <section className={handles.middleBanners}>
      {isMobile ? (
        <SliderLayout
          itemsPerPage={{ desktop: 3, tablet: 3, phone: 1 }}
          showNavigationArrows="never"
          showPaginationDots="always"
          navigationStep={'page'}
          centerModeSlidesGap={16}
        >
          {itemToRender}
        </SliderLayout>
      ) : (
        <div className={handles.middleBannersWrapper}>
          <>{itemToRender}</>
        </div>
      )}
    </section>
  )
}

MiddleBanners.schema = {
  title: 'Banner Meio',
  description: 'Componente de banner do meio',
  type: 'object',
  properties: {
    items: {
      title: 'Banners',
      type: 'array',
      maxItems: 3,
      minItems: 3,
      items: {
        type: 'object',
        maxItems: 3,
        minItems: 3,
        properties: {
          __editorItemTitle: {
            title: 'Label',
            type: 'string',
          },
          subTitle: {
            title: 'Titulo topo',
            type: 'string',
          },
          link: {
            title: 'Link',
            type: 'string',
          },
          textLink: {
            title: 'Texto do link',
            type: 'string',
            default: 'Comprar',
          },
          image: {
            title: 'Image URL',
            type: 'string',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
          mobileImage: {
            title: 'Image URL Mobile',
            type: 'string',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
        },
      },
    },
  },
}

export default MiddleBanners
