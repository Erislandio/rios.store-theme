import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useDevice } from 'vtex.device-detector'

interface BannerNotFound {
  image: string
  imageMobile: string
  title: string
  text: string
}

const CSS_HANDLES = [
  'bannerNotFoundContainer',
  'bannerNotFoundTitle',
  'bannerNotFoundText',
  'notFoundTextsContainer',
  'bannerNotFoundImage',
  'text404',
  'notFoundLink',
] as const

const NotFoundBanner: StoreFrontFC<{
  bannerData: BannerNotFound
}> = ({ bannerData }) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const { isMobile } = useDevice()

  return (
    <div className={handles.bannerNotFoundContainer}>
      <div className={handles.notFoundTextsContainer}>
        <h2 className={handles.text404}>404</h2>
        <h3 className={handles.bannerNotFoundTitle}>{bannerData.title}</h3>
        <p className={handles.bannerNotFoundText}>{bannerData.text}</p>
        <a href="/" className={handles.notFoundLink}>
          Retorne á página inicial
        </a>
      </div>
      <img
        className={handles.bannerNotFoundImage}
        alt={bannerData.title}
        title={bannerData.title}
        src={isMobile ? bannerData.imageMobile : bannerData.image}
        loading="eager"
      />
    </div>
  )
}

NotFoundBanner.schema = {
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
      },
    },
  },
}

export default NotFoundBanner
