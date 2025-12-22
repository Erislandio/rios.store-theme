import React from 'react'
import { SearchPageContext } from 'vtex.search-page-context'

interface Props {
  image: string
}

const CustomDepartmentBanner: StoreFrontFC<Props> = ({ image }) => {
  const { searchQuery } = SearchPageContext.useSearchPage() as {
    searchQuery: {
      data: {
        searchMetadata: {
          titleTag: string
        }
      }
    }
  }

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
        src={image}
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
    image: {
      title: 'Image',
      type: 'string',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
  },
}

export default CustomDepartmentBanner
