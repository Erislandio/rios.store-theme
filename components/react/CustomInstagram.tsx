import React from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { useDevice } from 'vtex.device-detector'
import { Link } from 'vtex.render-runtime'
import { SliderLayout } from 'vtex.slider-layout'
import useDatalayer from './hooks/useDatalayer'

interface Props {
  items?: Array<{
    link?: string
    __editorItemTitle?: string
    image?: string
  }>
  link: string
  title: string
  instagram: string
}

const CSS_HANDLES = [
  'customInstagram',
  'customInstagramItem',
  'customInstagramItemIcon',
  'customInstagramItemTitle',
  'customInstagramItemDescription',
  'customInstagramWrapper',
  'customInstagramItemsubTitle',
  'customInstagramItemContent',
  'customInstagramTitle',
  'instagramLink',
] as const

const CustomInstagram: StoreFrontFC<Props> = ({
  items = [],
  instagram = '@lojaspontodamoda',
  title = 'Siga-nos no Instagram',
  link = 'https://www.instagram.com/lojaspontodamoda/',
}) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const { pushToDataLayer } = useDatalayer()
  const { isMobile } = useDevice()

  const elementsToShow = isMobile ? items.slice(0, 100) : items.slice(0, 5)

  return (
    <section className={applyModifiers(handles.customInstagram, 'instagram')}>
      <h3 className={handles.customInstagramTitle}>{title}</h3>
      <a
        className={handles.instagramLink}
        href={link}
        target="_blank"
        rel="noreferrer"
        onClick={() =>
          pushToDataLayer({
            event: 'instagram_click',
            instagram_handle: instagram,
            instagram_link: link,
          })
        }
      >
        {instagram}
      </a>
      {isMobile ? (
        <div
          style={{
            marginTop: isMobile ? '16px' : '0px',
          }}
        >
          <SliderLayout
            infinite
            fullWidth
            showNavigationArrows="never"
            showPaginationDots="never"
            centerMode={{
              phone: 'to-the-left',
              mobile: 'to-the-left',
              tablet: 'disabled',
            }}
            itemsPerPage={{
              phone: 1,
              mobile: 1,
              tablet: 3,
            }}
            centerModeSlidesGap={16}
          >
            {elementsToShow.map((item, index) => (
              <Link
                onClick={() =>
                  pushToDataLayer({
                    event: 'instagram_image_click',
                    image_name: item.__editorItemTitle,
                    image_link: item.link,
                  })
                }
                key={index}
                className={handles.customInstagramItem}
                to={item.link ?? '#'}
              >
                {item.image && (
                  <img
                    width={247}
                    height={309}
                    loading="lazy"
                    className={handles.customInstagramItemIcon}
                    src={item.image}
                    alt={item.__editorItemTitle || `Image ${index + 1}`}
                  />
                )}
              </Link>
            ))}
          </SliderLayout>
        </div>
      ) : (
        <div className={handles.customInstagramWrapper}>
          {elementsToShow.map((item, index) => (
            <Link
              onClick={() =>
                pushToDataLayer({
                  event: 'instagram_image_click',
                  image_name: item.__editorItemTitle,
                  image_link: item.link,
                })
              }
              key={index}
              className={handles.customInstagramItem}
              to={item.link ?? '#'}
            >
              {item.image && (
                <img
                  width={247}
                  height={309}
                  loading="lazy"
                  className={handles.customInstagramItemIcon}
                  src={item.image}
                  alt={item.__editorItemTitle || `Image ${index + 1}`}
                />
              )}
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}

CustomInstagram.schema = {
  title: 'Instagram',
  description: 'Componente de banner de Instagram',
  type: 'object',
  properties: {
    title: {
      title: 'Título',
      type: 'string',
      default: 'Siga-nos no Instagram',
    },
    instagram: {
      title: 'Instagram',
      type: 'string',
      default: '@lojaspontodamoda',
    },
    link: {
      title: 'Link do Instagram',
      type: 'string',
      default: 'https://www.instagram.com/lojaspontodamoda/',
    },
    items: {
      title: 'Banners',
      type: 'array',
      maxItems: 5,
      minItems: 5,
      items: {
        type: 'object',
        maxItems: 5,
        minItems: 5,
        properties: {
          __editorItemTitle: {
            title: 'Label',
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
        },
      },
    },
  },
}

export default CustomInstagram
