import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

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
