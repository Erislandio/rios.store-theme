import React, { useEffect, useState } from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { useDevice } from 'vtex.device-detector'
import { Link, useRuntime } from 'vtex.render-runtime'
import { Dropdown } from 'vtex.styleguide'

interface CustomMenuInstitucionalProps {
  menuTitle: string
  url: string
}

const CSS_HANDLES = [
  'menuInstitucionalContainer',
  'menuInstitucionalLink',
  'menuInstitucionalMobileContainer',
] as const

const CustomMenuInstitucional: StoreFrontFC<{
  menuInstitucional: CustomMenuInstitucionalProps[]
}> = ({ menuInstitucional = [] }) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const { isMobile } = useDevice()
  const [dropdownValue, setDropdownValue] = useState<string | undefined>('')
  const { route, navigate } = useRuntime()
  const { path } = route

  const options = menuInstitucional.map((item) => {
    return {
      value: item.url,
      label: item.menuTitle,
      disabled: false,
    }
  })

  useEffect(() => {
    const option = options.find((item) => item?.value === path)

    setDropdownValue(option?.value)
  }, [])

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target

    navigate({
      to: value,
    })
  }

  if (isMobile) {
    return (
      <div className={handles.menuInstitucionalMobileContainer}>
        <Dropdown
          options={options}
          value={dropdownValue}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
            handleFilter(event)
          }
        />
      </div>
    )
  }

  return (
    <div className={handles.menuInstitucionalContainer}>
      {menuInstitucional.map((item, index) => (
        <Link
          className={
            item.url === path
              ? applyModifiers(handles.menuInstitucionalLink, 'active')
              : handles.menuInstitucionalLink
          }
          key={index}
          to={item.url}
        >
          {item.menuTitle}
        </Link>
      ))}
    </div>
  )
}

CustomMenuInstitucional.schema = {
  title: 'Menu institucional',
  type: 'object',
  properties: {
    menuInstitucional: {
      type: 'array',
      title: 'itens do menu',
      items: {
        type: 'object',
        properties: {
          menuTitle: {
            title: 'title',
            type: 'string',
            default: '',
          },
          url: {
            type: 'string',
            title: 'URL',
            default: '',
          },
        },
      },
    },
  },
}

export default CustomMenuInstitucional
