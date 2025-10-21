import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Link } from 'vtex.render-runtime'
import { SliderLayout } from 'vtex.slider-layout'

interface DepartmentCarouselProps {
  items: Array<{
    link: string
    imageUrl: string
    __editorItemTitle: string
  }>
}

const CSS_HANDLES = [
  'departmentCarousel',
  'departmentCarouselItem',
  'departmentCarouselItemImage',
  'departmentCarouselItemTitle',
] as const

const DepartmentCarousel: StoreFrontFC<DepartmentCarouselProps> = ({
  items,
}) => {
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <section className={handles.departmentCarousel}>
      <SliderLayout
        fullWidth
        infinite
        showNavigationArrows="always"
        showPaginationDots="never"
        itemsPerPage={{
          desktop: 7,
          tablet: 5,
          mobile: 3,
        }}
      >
        {items.map((item, index) => (
          <div key={index} className={handles.departmentCarouselItem}>
            <Link
              to={item.link}
              style={{
                textDecoration: 'none',
              }}
            >
              <img
                className={handles.departmentCarouselItemImage}
                src={item.imageUrl}
                alt={item.__editorItemTitle}
                width={140}
                height={206}
                loading="lazy"
              />
              <h4 className={handles.departmentCarouselItemTitle}>
                {item.__editorItemTitle}
              </h4>
            </Link>
          </div>
        ))}
      </SliderLayout>
    </section>
  )
}

DepartmentCarousel.schema = {
  title: 'Department Carousel',
  type: 'object',
  properties: {
    items: {
      title: 'Items',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          link: {
            title: 'Link',
            type: 'string',
          },
          imageUrl: {
            title: 'Image URL',
            type: 'string',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
          __editorItemTitle: {
            title: 'Item Title',
            type: 'string',
          },
        },
      },
    },
  },
}

export default DepartmentCarousel
