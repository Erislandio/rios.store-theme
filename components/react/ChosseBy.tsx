import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Link } from 'vtex.render-runtime'

interface Props {
  title: string
  items: {
    __editorItemTitle: string
    link: string
  }[]
}

const CSS_HANDLES = [
  'chosseByContainer',
  'chosseByTitle',
  'chosseByItems',
  'chosseByItem',
  'chosseByItemLink',
] as const

const ChosseBy: StoreFrontFC<Props> = ({ title, items = [] }) => {
  const { handles } = useCssHandles(CSS_HANDLES)

  if (!title || !items || items.length === 0) return null

  return (
    <div className={handles.chosseByContainer}>
      <h2 className={handles.chosseByTitle}>{title}</h2>
      <div className={handles.chosseByItems}>
        {items.map((item, index) => (
          <Link key={index} to={item.link} className={handles.chosseByItemLink}>
            <span className={handles.chosseByItem}>
              {item.__editorItemTitle}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

ChosseBy.defaultProps = {
  title: 'Escolha por',
  items: [],
}

ChosseBy.schema = {
  title: 'Escolha por',
  description: 'Escolha por',
  type: 'object',
  properties: {
    title: {
      type: 'string',
      title: 'Title',
      description: 'Compre por tamanho',
    },
    items: {
      type: 'array',
      title: 'Items',
      description: 'Items',
      items: {
        type: 'object',
        properties: {
          __editorItemTitle: {
            type: 'string',
            title: 'Title',
            description: 'Title',
          },
          link: {
            type: 'string',
            title: 'Link',
            description: 'Link',
            default: '#',
          },
        },
      },
    },
  },
}

export default ChosseBy
