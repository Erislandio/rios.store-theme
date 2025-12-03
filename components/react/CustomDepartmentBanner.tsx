import React from 'react'
import { useDevice } from 'vtex.device-detector'
import { SearchPageContext } from 'vtex.search-page-context'

interface Props {
  desktopImage: string
  mobileImage: string
}

const CustomDepartmentBanner: StoreFrontFC<Props> = ({
  desktopImage,
  mobileImage,
}) => {
  const { isMobile } = useDevice()
  const { searchQuery } = SearchPageContext.useSearchPage() as {
    searchQuery: {
      data: {
        searchMetadata: {
          titleTag: string
        }
      }
    }
  }

  if (!desktopImage || !mobileImage) {
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
        width: 'auto',
        background: 'transparent',
        gap: '0px',
        justifyContent: 'flex-start',
        padding: '0px',
      }}
    >
      <h1 className="vtex-search-result-3-x-galleryTitle--layout t-heading-1">
        {searchQuery?.data?.searchMetadata?.titleTag ?? ''}
      </h1>
      <img
        title=""
        src={isMobile ? mobileImage : desktopImage}
        alt="Banner Department"
        className="vtex-store-components-3-x-imageElement vtex-store-components-3-x-imageElement--department-banner-image"
        loading="eager"
      />
    </div>
  )
}

CustomDepartmentBanner.schema = {
  title: 'Banner de categoria',
  description: 'Componente de reguagem de vantagens',
  type: 'object',
  properties: {
    mobileImage: {
      title: 'Mobile image',
      type: 'string',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    desktopImage: {
      title: 'Mobile image',
      type: 'string',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
  },
}

export default CustomDepartmentBanner
