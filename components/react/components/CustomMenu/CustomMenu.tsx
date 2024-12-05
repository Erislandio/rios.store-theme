import React, { useEffect, useState } from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { useDevice } from 'vtex.device-detector'
import { canUseDOM } from 'vtex.render-runtime'

import './CustomMenu.styles.css'
import CustomMenuMobile from './CustomMenuMobile'
import { MenuIcon } from './Icons'
import Menu from './Menu'
import MenuWrapper from './MenuContainer'

export const CSS_HANDLES = [
  'menuContainer',
  'menuItem',
  'submenu',
  'submenuItem',
  'menuLink',
  'menuBanner',
  'menuItemTitle',
  'menuItemSectionTitle',
  'menuItemSection',
  'menuItemInner',
  'menuItems',
  'submenuItems',
  'submenuItemsWrapper',
  'menuItemElement',
  'allDepartamentItem',
  'allDepartamentWrapperLevel1',
  'moreitems',
  'allDepartamentWrapperLevel2',
  'menuContainerItem',
  'allDepartamentBottom',
  'allDepartamentBottomDevider',
] as const

export interface MenuLink {
  text: string // Texto do link
  url: string // URL do link
  __editorItemTitle: string
  icon: string
}

interface Section {
  title: string
  url: string
  __editorItemTitle: string
  links: MenuLink[]
}

export interface MenuItem {
  __editorItemTitle: string // Título do item do menu
  banner?: string // URL do banner (opcional)
  sections?: Section[]
  icon: string
  moreItems: MenuLink[]
}

const DynamicMenu: StoreFrontFC<{
  departments: MenuItem[]
  others: MenuLink[]
}> = ({ departments = [], others }) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const [headerHeight, setHeaderHeight] = useState(0)

  useEffect(() => {
    const header = document.getElementsByClassName(
      'vtex-sticky-layout-0-x-wrapper--sticky-header'
    ) as unknown as HTMLDivElement[]

    if (header.length) {
      setHeaderHeight(header[0].offsetHeight)
    }
  }, [])

  const { device } = useDevice()

  if (device === 'phone' || device === 'tablet') {
    return <CustomMenuMobile others={others} departments={departments} />
  }

  return (
    <div className={handles.menuContainer}>
      <div className={applyModifiers(handles.menuItem, 'megamenu')}>
        <span className={handles.menuContainerItem}>
          <MenuIcon />
          Todos as categorias
        </span>
        <MenuWrapper
          isLoading={!canUseDOM}
          headerHeight={headerHeight}
          className={applyModifiers(handles.submenu, 'megamenu')}
          display=""
        >
          <ul>
            {departments.map((item, index) => (
              <Menu key={index} menu={item} />
            ))}
          </ul>
        </MenuWrapper>
      </div>
    </div>
  )
}

DynamicMenu.defaultProps = {
  departments: [],
  others: [],
}

DynamicMenu.schema = {
  title: 'Menu Dinâmico',
  type: 'object',
  properties: {
    others: {
      type: 'array',
      title: 'Outros links',
      items: {
        type: 'object',
        properties: {
          __editorItemTitle: {
            title: 'title',
            type: 'string',
            default: '',
          },
          icon: {
            type: 'string',
            title: 'Icone URL',
            widget: {
              'ui:widget': 'image-uploader',
            },
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
    departments: {
      type: 'array',
      title: '(TODOS OS DEPARTAMENTOS)',
      items: {
        type: 'object',
        properties: {
          __editorItemTitle: {
            title: 'title',
            type: 'string',
            default: '',
          },
          icon: {
            type: 'string',
            title: 'Icone URL',
            default: '',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
          url: {
            type: 'string',
            title: 'URL',
            default: '',
          },
          sections: {
            type: 'array',
            title: 'secão Submenu',
            items: {
              type: 'object',
              properties: {
                __editorItemTitle: {
                  type: 'string',
                  title: 'Titulo da seção',
                  default: 'Link',
                },
                url: {
                  type: 'string',
                  title: 'URL (apenas se não existir links)',
                  default: '',
                },
                links: {
                  type: 'array',
                  title: 'Links do Submenu',
                  items: {
                    type: 'object',
                    properties: {
                      __editorItemTitle: {
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
            },
          },
        },
      },
    },
  },
}

export default DynamicMenu
