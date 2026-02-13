import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useDevice } from 'vtex.device-detector'
import { SliderLayout } from 'vtex.slider-layout'

interface Props {
  items: {
    __editorItemTitle: string
    image: string
    title: string
    description: string
    actionLabel: string
    actionLink: string
  }[]
  title: string
}

const Blog: StoreFrontFC<Props> = ({ items = [], title }) => {
  const { isMobile } = useDevice()
  const { handles } = useCssHandles([
    'BlogContainer',
    'BlogWrapper',
    'BlogTitle',
    'BlogItem',
    'BlogItemImage',
    'BlogItemTitle',
    'BlogItemDescription',
    'BlogItemAction',
  ] as const)

  if (!items.length) return null

  if (isMobile && items.length > 2) {
    return (
      <div className={handles.BlogContainer}>
        <h2 className={handles.BlogTitle}>{title}</h2>
        <SliderLayout
          itemsPerPage={2}
          showNavigationArrows="always"
          showPaginationDots="never"
        >
          {items.map((item, index) => (
            <div key={index} className={handles.BlogItem}>
              <img
                src={item.image}
                alt={item.title}
                title={item.title}
                loading="lazy"
                width={170}
                height={102}
                className={handles.BlogItemImage}
              />
              <h3 className={handles.BlogItemTitle}>{item.title}</h3>
              <p className={handles.BlogItemDescription}>{item.description}</p>
              <a
                href={item.actionLink}
                className={handles.BlogItemAction}
                target="_blank"
              >
                {item.actionLabel}
              </a>
            </div>
          ))}
        </SliderLayout>
      </div>
    )
  }

  return (
    <div className={handles.BlogContainer}>
      <h2 className={handles.BlogTitle}>{title}</h2>
      <div className={handles.BlogWrapper}>
        {items.map((item, index) => (
          <div key={index} className={handles.BlogItem}>
            <img
              src={item.image}
              alt={item.title}
              title={item.title}
              loading="lazy"
              width={420}
              height={252}
              className={handles.BlogItemImage}
            />
            <h3 className={handles.BlogItemTitle}>{item.title}</h3>
            <p className={handles.BlogItemDescription}>{item.description}</p>
            <a
              href={item.actionLink}
              className={handles.BlogItemAction}
              target="_blank"
            >
              {item.actionLabel}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

Blog.defaultProps = {
  items: [],
  title: 'Nosso blog',
}

Blog.schema = {
  title: 'Blog',
  properties: {
    title: {
      type: 'string',
      title: 'Título',
      description: 'Título',
      required: true,
    },
    items: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          __editorItemTitle: {
            type: 'string',
            title: 'Title',
            description: 'Title',
            required: true,
          },
          image: {
            type: 'string',
            title: 'Image',
            description: 'Image',
            required: true,
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
          title: {
            type: 'string',
            title: 'Título',
            description: 'Título',
            required: true,
          },
          description: {
            type: 'string',
            title: 'Descrição',
            description: 'Descrição',
            required: true,
          },
          actionLabel: {
            type: 'string',
            title: 'Texto botão',
            description: 'Texto botão',
          },
          actionLink: {
            type: 'string',
            title: 'Link',
          },
        },
      },
    },
  },
}

export default Blog
