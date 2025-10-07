import React from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { Link } from 'vtex.render-runtime'
import useDatalayer from './hooks/useDatalayer'

interface Props {
  items?: Array<{
    icon?: string
    link?: string
    __editorItemTitle?: string
    image?: string
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

const BrandBanners: StoreFrontFC<Props> = ({ items = [] }) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const { pushToDataLayer } = useDatalayer()

  return (
    <section className={applyModifiers(handles.middleBanners, 'brand')}>
      <div className={handles.middleBannersWrapper}>
        {items.slice(0, 3).map((item, index) => (
          <Link
            key={index}
            className={handles.middleBannersItem}
            to={item.link ?? '#'}
            onClick={() => pushToDataLayer({
              event: 'banner_click',
              banner_name: item.__editorItemTitle,
              banner_link: item.link
            })}
          >
            {item.image && (
              <img
                width={422}
                height={400}
                loading="lazy"
                className={handles.middleBannersItemIcon}
                src={item.image}
                alt={item.__editorItemTitle || `Image ${index + 1}`}
              />
            )}
            <div className={handles.middleBannersItemContent}>
              {item.icon ? (
                <img
                  width={120}
                  height={60}
                  loading="lazy"
                  style={{
                    objectFit: 'cover'
                  }}
                  className={applyModifiers(handles.middleBannersItemIcon, 'icon')}
                  src={item.icon}
                  alt={item.__editorItemTitle || `Icon ${index + 1}`}
                />
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

BrandBanners.schema = {
  title: 'Banner Marcas',
  description: 'Componente de banner de marcas',
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
          icon: {
            title: 'Icon URL',
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

export default BrandBanners
