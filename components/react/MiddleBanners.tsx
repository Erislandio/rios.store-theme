import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Link } from 'vtex.render-runtime'

interface Props {
  items?: Array<{
    __editorItemTitle?: string
    description?: string
    link?: string
    textLink?: string
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
] as const

const MiddleBanners: StoreFrontFC<Props> = ({
  items = [],
  backgroundColor = '#FAFAFA',
}) => {
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <section className={handles.middleBanners}>
      <div style={{ backgroundColor }} className={handles.middleBannersWrapper}>
        {items.map((item, index) => (
          <Link key={index} className={handles.middleBannersItem} to={item.link ?? '#'}>
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
            <h3 className={handles.middleBannersItemTitle}>
              {item.__editorItemTitle}
            </h3>
            {item.description && (
              <p className={handles.middleBannersItemDescription}>
                {item.description}
              </p>
            )}
          </Link>
        ))}
      </div>
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
      items: {
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
        },
      },
    },
  },
}

export default MiddleBanners
