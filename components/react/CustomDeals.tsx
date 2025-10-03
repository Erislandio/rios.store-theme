import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

interface Props {
  items?: Array<{
    __editorItemTitle?: string
    description?: string
    icon?: string
  }>
  backgroundColor?: string
}

const CSS_HANDLES = [
  'customDeals',
  'customDealsItem',
  'customDealsItemIcon',
  'customDealsItemTitle',
  'customDealsItemDescription',
  'customDealsWrapper',
] as const

const CustomDeals: StoreFrontFC<Props> = ({ items = [], backgroundColor = '#FAFAFA' }) => {
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <section className={handles.customDeals}>
      <div style={{ backgroundColor }} className={handles.customDealsWrapper}>
        {items.map((item, index) => (
          <div key={index} className={handles.customDealsItem}>
            {item.icon && (
              <img
                width={21}
                height={21}
                loading="lazy"
                className={handles.customDealsItemIcon}
                src={item.icon}
                alt={item.__editorItemTitle || `Icon ${index + 1}`}
              />
            )}
            <h3 className={handles.customDealsItemTitle}>
              {item.__editorItemTitle}
            </h3>
            {item.description && (
              <p className={handles.customDealsItemDescription}>
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

CustomDeals.schema = {
  title: 'Reguagem de vantagens',
  description: 'Componente de reguagem de vantagens',
  type: 'object',
  properties: {
    backgroundColor: {
      title: 'Cor de fundo',
      type: 'string',
      default: '#FAFAFA',
      widget: {
        'ui:widget': 'color-picker',
      },
    },
    items: {
      title: 'Vantagens',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          __editorItemTitle: {
            title: 'Label',
            type: 'string',
          },
          description: {
            title: 'Description',
            type: 'string',
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

export default CustomDeals
