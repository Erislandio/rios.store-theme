import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Link } from 'vtex.render-runtime'
import { SliderLayout } from 'vtex.slider-layout'

interface Props {
  title?: string
  items?: Array<{
    __editorItemTitle: string
    link: string
    imageUrl: string
  }>
}

const CSS_HANDLES = [
  'categoryListContainer',
  'categoryListTitle',
  'categoryListItems',
  'categoryListItemImage',
  'categoryListItemLink',
  'categoryListItemTitle',
] as const

const CustomCategoryList: StoreFrontFC<Props> = ({ items, title }) => {
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <section className={handles.categoryListContainer}>
      <h2 className={handles.categoryListTitle}>{title}</h2>
      <SliderLayout
        itemsPerPage={{ desktop: 3, tablet: 2, phone: 2 }}
        showNavigationArrows="desktopOnly"
        showPaginationDots="never"
        fullWidth
        navigationStep={'page'}
      >
        {items?.map((item, index) => (
          <div className={handles.categoryListItems} key={index}>
            <Link to={item.link} className={handles.categoryListItemLink}>
              <img
                width={422}
                height={603}
                loading="lazy"
                src={item.imageUrl}
                alt={item.__editorItemTitle}
                className={handles.categoryListItemImage}
              />
              <h5 className={handles.categoryListItemTitle}>
                {item.__editorItemTitle}
              </h5>
            </Link>
          </div>
        )) || null}
      </SliderLayout>
    </section>
  )
}

CustomCategoryList.schema = {
  title: 'Lista de Categorias',
  type: 'object',
  properties: {
    title: {
      title: 'Title',
      type: 'string',
      default: 'Shop by Category',
    },
    items: {
      title: 'Items',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          __editorItemTitle: {
            title: 'Title',
            type: 'string',
            default: 'Category Title',
          },
          link: {
            title: 'Link',
            type: 'string',
            default: '/category-link',
          },
          imageUrl: {
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

export default CustomCategoryList
