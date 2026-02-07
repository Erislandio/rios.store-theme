import React from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { Link } from 'vtex.render-runtime'
import useDatalayer from './hooks/useDatalayer'

interface Props {
  items?: Array<{
    link?: string
    __editorItemTitle?: string
    image?: string
    items?: string[]
  }>
  title?: string
}

const CSS_HANDLES = [
  'middleBanners',
  'middleBannersItem',
  'middleBannersItemIcon',
  'middleBannersTitle',
  'middleBannersItemTitle',
  'middleBannersItemDescription',
  'middleBannersWrapper',
  'middleBannersItemsubTitle',
  'middleBannersItemContent',
] as const

const BuyMorePayLess: StoreFrontFC<Props> = ({ items = [], title }) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const { pushToDataLayer } = useDatalayer()

  return (
    <section
      className={applyModifiers(handles.middleBanners, 'buyMorePayLess')}
    >
      <h2 className={handles.middleBannersTitle}>{title}</h2>
      <div className={handles.middleBannersWrapper}>
        {items.slice(0, 3).map((item, index) => (
          <Link
            key={index}
            className={handles.middleBannersItem}
            to={item.link ?? '#'}
            onClick={() =>
              pushToDataLayer({
                event: 'banner_click',
                banner_name: item.__editorItemTitle,
                banner_link: item.link,
              })
            }
          >
            {item.image && (
              <img
                width={440}
                height={533}
                loading="lazy"
                className={handles.middleBannersItemIcon}
                src={item.image}
                alt={item.__editorItemTitle || `Image ${index + 1}`}
              />
            )}
            <div className={handles.middleBannersItemContent}>
              <Link to={item.link} className={handles.middleBannersItemTitle}>
                {item.__editorItemTitle}
              </Link>
              {item.items?.slice(0, 3)?.map((item, index) => (
                <p key={index} className={handles.middleBannersItemsubTitle}>
                  {item}
                </p>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

BuyMorePayLess.defaultProps = {
  title: 'Compre mais pague menos',
  items: [],
}

BuyMorePayLess.schema = {
  title: 'Compre mais pague menos',
  description: 'Componente de compre mais pague menos',
  type: 'object',
  properties: {
    title: {
      title: 'Título',
      type: 'string',
      default: 'Compre mais pague menos',
    },
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
          items: {
            title: 'Combos',
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
      },
    },
  },
}

export default BuyMorePayLess
