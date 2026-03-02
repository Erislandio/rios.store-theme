import React from 'react'
import { useDevice } from 'vtex.device-detector'

interface Props {
  image: string
  mobileImage: string
  showImageMobile: boolean
  showImageDesktop: boolean
}

const CustomDepartmentBanner: StoreFrontFC<Props> = ({
  image,
  mobileImage,
  showImageMobile,
  showImageDesktop,
}) => {
  const { isMobile } = useDevice()

  if (!image) {
    return null
  }

  return (
    <div
      id="customBannerCategory"
      className="pontodamoda-custom-components-0-x-divContainer pontodamoda-custom-components-0-x-divContainer--department-banner "
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        width: '100%',
        background: 'transparent',
        gap: '0px',
        justifyContent: 'flex-start',
        padding: '0px',
      }}
    >
      {isMobile
        ? showImageMobile && (
            <img
              title=""
              src={mobileImage}
              alt="Banner Department"
              className="vtex-store-components-3-x-imageElement vtex-store-components-3-x-imageElement--department-banner-image"
              loading="eager"
              width={'100%'}
            />
          )
        : showImageDesktop && (
            <img
              title=""
              src={image}
              alt="Banner Department"
              className="vtex-store-components-3-x-imageElement vtex-store-components-3-x-imageElement--department-banner-image"
              loading="eager"
              width={'100%'}
            />
          )}
    </div>
  )
}

CustomDepartmentBanner.schema = {
  title: 'Banner de categoria',
  description: 'Componente de reguagem de vantagens',
  type: 'object',
  properties: {
    image: {
      title: 'Image',
      type: 'string',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    mobileImage: {
      title: 'Mobile Image',
      type: 'string',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    showImageMobile: {
      title: 'Show Image Mobile',
      type: 'boolean',
      default: true,
    },
    showImageDesktop: {
      title: 'Show Image Desktop',
      type: 'boolean',
      default: true,
    },
  },
}

export default CustomDepartmentBanner
