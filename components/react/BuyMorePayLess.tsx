import React from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { useDevice } from 'vtex.device-detector'
import { Link } from 'vtex.render-runtime'
import { SliderLayout } from 'vtex.slider-layout'

interface Props {
  items?: Array<{
    link?: string
    __editorItemTitle?: string
    image?: string
    items: Array<{
      __editorItemTitle?: string
      value?: string
      quantity?: string
    }>
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

  'middleBannersWrapperMobile',
] as const

const BuyMorePayLess: StoreFrontFC<Props> = ({ items = [], title }) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const { isMobile } = useDevice()

  console.log(items)

  if (isMobile) {
    return (
      <section
        className={applyModifiers(handles.middleBanners, 'buyMorePayLess')}
      >
        <h2 className={handles.middleBannersTitle}>{title}</h2>
        <div className={handles.middleBannersWrapperMobile}>
          <SliderLayout
            infinite
            itemsPerPage={2}
            showNavigationArrows="always"
            showPaginationDots="never"
          >
            {items.map((item, index) => (
              <Link
                key={index}
                className={handles.middleBannersItem}
                style={{
                  minWidth: 'unset',
                }}
                to={item.link ?? '#'}
              >
                {item.image && (
                  <img
                    width={170}
                    height={175}
                    loading="lazy"
                    className={handles.middleBannersItemIcon}
                    src={item.image}
                    alt={item.__editorItemTitle || `Image ${index + 1}`}
                  />
                )}
                <div className={handles.middleBannersItemContent}>
                  <Link
                    to={item.link}
                    className={handles.middleBannersItemTitle}
                  >
                    {item.__editorItemTitle}
                  </Link>
                  {item.items?.slice(0, 3)?.map((item, index) => (
                    <p
                      key={index}
                      className={handles.middleBannersItemsubTitle}
                    >
                      <strong
                        className={applyModifiers(
                          handles.middleBannersItemsubTitle,
                          'quantity'
                        )}
                      >
                        {item.quantity}
                      </strong>{' '}
                      {item.__editorItemTitle}{' '}
                      <strong
                        className={applyModifiers(
                          handles.middleBannersItemsubTitle,
                          'value'
                        )}
                      >
                        {item.value}
                      </strong>
                    </p>
                  ))}
                </div>
              </Link>
            ))}
          </SliderLayout>
        </div>
      </section>
    )
  }

  return (
    <section
      className={applyModifiers(handles.middleBanners, 'buyMorePayLess')}
    >
      <h2 className={handles.middleBannersTitle}>{title}</h2>
      <div className={handles.middleBannersWrapper}>
        {items.map((item, index) => (
          <Link
            key={index}
            className={handles.middleBannersItem}
            to={item.link ?? '#'}
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
                  {item.__editorItemTitle} {item.value} {item.quantity}
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
              properties: {
                __editorItemTitle: {
                  title: 'Label',
                  type: 'string',
                },
                value: {
                  type: 'string',
                  title: 'Valor',
                },
                quantity: {
                  type: 'string',
                  title: 'Quantidade',
                },
              },
            },
          },
        },
      },
    },
  },
}

export default BuyMorePayLess
