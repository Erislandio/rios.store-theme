import React from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { useDevice } from 'vtex.device-detector'
import { Link } from 'vtex.render-runtime'
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
  'middleBannersItemContent',
] as const

const FooterBanners: StoreFrontFC<Props> = ({ items = [] }) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const { pushToDataLayer } = useDatalayer()

  const { isMobile } = useDevice()

  return (
    <section className={applyModifiers(handles.middleBanners, '3-banners')}>
      <div className={handles.middleBannersWrapper}>
        {items.slice(0, 3).map((item, index) => (
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
            {isMobile
              ? item.image && (
                  <img
                    width={358}
                    height={index === 1 ? 212 : 425}
                    loading="lazy"
                    className={handles.middleBannersItemIcon}
                    src={item.image}
                    alt={item.__editorItemTitle || `Image ${index + 1}`}
                  />
                )
              : item.image && (
                  <img
                    width={index === 1 ? 628 : 320}
                    height={448}
                    loading="lazy"
                    className={handles.middleBannersItemIcon}
                    src={item.image}
                    alt={item.__editorItemTitle || `Image ${index + 1}`}
                  />
                )}
            <div className={handles.middleBannersItemContent}>
              <span className={handles.middleBannersItemsubTitle}>
                {item.subTitle}
              </span>
              <h3 className={handles.middleBannersItemTitle}>
                {item.__editorItemTitle}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

FooterBanners.schema = {
  title: '3 Banners',
  description: 'Componente de 3 banners',
  type: 'object',
  properties: {
    items: {
      title: 'Banners',
      type: 'array',
      maxItems: 3,
      minItems: 3,
      items: {
        maxItems: 3,
        minItems: 3,
        type: 'object',
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

export default FooterBanners
