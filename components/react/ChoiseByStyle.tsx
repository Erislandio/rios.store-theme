import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Link } from 'vtex.render-runtime'

interface Props {
  items: Array<{
    __editorItemTitle: string
    image: string
    actionLabel: string
    actionLink: string
  }>
}

const ChoiseByStyle: StoreFrontFC<Props> = ({ items = [] }) => {
  const { handles } = useCssHandles([
    'choiseByStyleContainer',
    'choiseByStyleItem',
    'choiseByStyleTitle',
    'choiseByStyleImage',
    'choiseByStyleLink',
  ] as const)

  if (!items.length) {
    return null
  }

  return (
    <div className={handles.choiseByStyleContainer}>
      {items.map((item) => (
        <div
          key={item.__editorItemTitle}
          title={item.__editorItemTitle}
          className={handles.choiseByStyleItem}
        >
          <img
            className={handles.choiseByStyleImage}
            title={item.__editorItemTitle}
            src={item.image}
            alt={item.__editorItemTitle}
            width={330}
            height={251}
            loading="lazy"
          />
          <h5
            title={item.__editorItemTitle}
            className={handles.choiseByStyleTitle}
          >
            {item.__editorItemTitle}
          </h5>
          <Link
            target="_blank"
            to={item.actionLink}
            className={handles.choiseByStyleLink}
          >
            {item.actionLabel ?? 'Comprar'}
          </Link>
        </div>
      ))}
    </div>
  )
}

ChoiseByStyle.defaultProps = {
  items: [],
}

ChoiseByStyle.schema = {
  title: 'Escolha por Estilo',
  properties: {
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

export default ChoiseByStyle
