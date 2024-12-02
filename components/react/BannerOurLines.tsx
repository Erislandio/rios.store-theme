import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useDevice } from 'vtex.device-detector'
import { SliderLayout } from 'vtex.slider-layout'

interface BannerOurLines {
  image: string
  imageMobile: string
  title: string
  text: string
  imagesCarousel: ImagesCarousel[]
}

interface ImagesCarousel {
  imageOurLines: string
}

const CSS_HANDLES = [
  'bannerOurLinesContainer',
  'bannerOurLinesTitle',
  'bannerOurLines',
  'textsContainer',
  'bannerOurLinesImage',
  'carouselImageContainer',
  'carouselImage',
] as const

const BannerOurLines: StoreFrontFC<{
  bannerData: BannerOurLines
}> = ({ bannerData }) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const { isMobile } = useDevice()
  return (
    <div className={handles.bannerOurLinesContainer}>
      <div className={handles.textsContainer}>
        <h3 className={handles.bannerOurLinesTitle}>{bannerData.title}</h3>
        <p className={handles.bannerOurLines}>{bannerData.text}</p>
      </div>
      <img
        className={handles.bannerOurLinesImage}
        alt={bannerData.title}
        title={bannerData.title}
        src={isMobile ? bannerData.imageMobile : bannerData.image}
        loading="eager"
      />
      <SliderLayout
        fullWidth={true}
        showNavigationArrows="always"
        showPaginationDots="always"
        infinite={true}
        itemsPerPage={{
          desktop: 5,
          tablet: 2,
          phone: 1,
        }}
      >
        {bannerData.imagesCarousel.map((item) => (
          <div className={handles.carouselImageContainer}>
            <img
              className={handles.carouselImage}
              // alt={item.__editorItemTitle}
              // title={item.__editorItemTitle}
              src={item.imageOurLines}
              loading="eager"
            />
          </div>
        ))}
      </SliderLayout>
    </div>
  )
}

// bannerOurLines.defaultProps = {
//   bannerData: {},
//   title: 'Banner com texto',
// }

BannerOurLines.schema = {
  title: 'Banner com texto - Conteúdo',
  type: 'object',
  properties: {
    bannerData: {
      type: 'object',
      title: 'Categorias',
      properties: {
        image: {
          type: 'string',
          title: 'Image - Desktop',
          default: '',
          widget: {
            'ui:widget': 'image-uploader',
          },
        },
        imageMobile: {
          type: 'string',
          title: 'Image - Mobile',
          default: '',
          widget: {
            'ui:widget': 'image-uploader',
          },
        },
        title: {
          title: 'title',
          type: 'string',
          default: '',
        },
        text: {
          title: 'Texto',
          default: '',
        },
        imagesCarousel: {
          type: 'array',
          title: 'Carrosel de imagens',
          items: {
            imageOurLines: {
              type: 'string',
              title: 'Image - Desktop',
              default: '',
              widget: {
                'ui:widget': 'image-uploader',
              },
            },
          },
        },
      },
    },
  },
}

export default BannerOurLines
