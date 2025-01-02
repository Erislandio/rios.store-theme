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

export const ArrowIconSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="16"
    viewBox="0 0 18 16"
    fill="none"
  >
    <path
      d="M1.22363 6.77847C0.661183 6.77847 0.205228 7.23443 0.205228 7.79688C0.205228 8.35932 0.661183 8.81528 1.22363 8.81528V6.77847ZM16.8804 8.517C17.2781 8.11928 17.2781 7.47447 16.8804 7.07675L10.3993 0.595663C10.0016 0.197951 9.35674 0.197951 8.95903 0.595663C8.56132 0.993375 8.56132 1.63819 8.95903 2.03591L14.72 7.79688L8.95903 13.5578C8.56132 13.9556 8.56132 14.6004 8.95903 14.9981C9.35674 15.3958 10.0016 15.3958 10.3993 14.9981L16.8804 8.517ZM1.22363 8.81528H16.1602V6.77847H1.22363V8.81528Z"
      fill="white"
    />
  </svg>
)

const CSS_HANDLES = [
  'bannerOurLinesContainer',
  'bannerOurLinesTitle',
  'bannerOurLines',
  'textsContainer',
  'bannerOurLinesImage',
  'carouselImageContainer',
  'carouselImage',
  'iconOurLines',
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
        navigationStep={1}
        infinite={true}
        itemsPerPage={{
          desktop: 4,
          tablet: 2,
          phone: 1,
        }}
      >
        {bannerData.imagesCarousel.map((item, index) => (
          <div key={index} className={handles.carouselImageContainer}>
            <>
              <img
                className={handles.carouselImage}
                // alt={item.__editorItemTitle}
                // title={item.__editorItemTitle}
                src={item.imageOurLines}
                loading="eager"
              />
              <div className={handles.iconOurLines}>
                <ArrowIconSvg />
              </div>
            </>
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
