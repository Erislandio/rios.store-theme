import React, { useEffect, useRef, useState } from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { useDevice } from 'vtex.device-detector'
import { Link } from 'vtex.render-runtime'

import useDatalayer from '../../hooks/useDatalayer'
import CustomMenuMobile from './MenuMobile'

export type SubMenuItem = {
  __editorItemTitle: string
  href: string
  isTitle?: boolean
  seeAll?: boolean
}

export type MenuItem = {
  __editorItemTitle: string
  href?: string
  newTab?: boolean
  subMenu?: SubMenuItem[]
}

export type MainMenu = {
  __editorItemTitle: string
  menu: MenuItem[]
  image?: string
  href: string
}

type Props = {
  items: MainMenu[]
  delay: any // opcional - tempo em ms
}

const CSS_HANDLES = [
  'menuContainer',
  'menuItem',
  'menuLabel',
  'dropdown',
  'dropdownItem',
  'submenu',
  'submenuItemLink',
  'submenuWrapper',
  'submenuItem',
  'submenuImage',
  'submenuImageContainer',
  'dropdownItemWrapper',
  'submenuItemUl',
  'menuLabelWrapper',
  'menuImageContainerWrapper',
  'menuImageContainer',
  'menuLabelWrapperContainer',
] as const

const DropdownItem: React.FC<{
  menu: MenuItem
  handles: Record<string, string>
}> = ({ menu, handles }) => {
  return (
    <div key={menu.__editorItemTitle} className={handles.dropdownItem}>
      <div className={handles.dropdownItemWrapper}>
        <div className={handles.menuLabelWrapper}>
          {menu.href ? (
            <Link
              to={menu.href}
              className={applyModifiers(handles.menuLabel, 'title')}
            >
              {menu.__editorItemTitle}
            </Link>
          ) : (
            <h6 className={applyModifiers(handles.menuLabel, 'title')}>
              {menu.__editorItemTitle}
            </h6>
          )}
          {menu.subMenu?.map((subMenu) => (
            <Link
              to={subMenu.href}
              className={applyModifiers(
                handles.menuLabel,
                subMenu.isTitle ? 'title' : subMenu.seeAll ? 'seeAll' : 'item'
              )}
            >
              {subMenu.__editorItemTitle}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

const Menu: StoreFrontFC<Props> = ({ items }) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const { pushToDataLayer } = useDatalayer()

  const [activeMenu, setActiveMenu] = useState<number | null>(null)
  const timeoutRef = useRef<any>(null)

  const { isMobile } = useDevice()

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  if (isMobile) {
    return <CustomMenuMobile departments={items} />
  }

  const handleMenuEnter = (index: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    setActiveMenu(index)
    pushToDataLayer({
      event: 'mainMenuHover',
      mainMenuTitle: items[index].__editorItemTitle,
      mainMenuPosition: index + 1,
    })
  }

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null)
    }, 300)
  }

  return (
    <nav className={handles.menuContainer}>
      {items.map((mainItem, mainIndex) => (
        <div
          key={mainItem.__editorItemTitle}
          className={handles.menuItem}
          onMouseEnter={() => handleMenuEnter(mainIndex)}
          onMouseLeave={handleMenuLeave}
        >
          <div className={handles.menuLabelWrapperContainer}>
            {mainItem.href ? (
              <Link
                to={mainItem.href}
                className={handles.menuLabel}
                style={{
                  textDecoration: 'none',
                  color: '#27272a',
                  cursor: 'pointer',
                }}
              >
                {mainItem.__editorItemTitle}
              </Link>
            ) : (
              <h5 className={handles.menuLabel}>
                {mainItem.__editorItemTitle}
              </h5>
            )}

            <div className={handles.menuImageContainerWrapper}>
              {mainItem.menu.length > 0 && (
                <div
                  className={applyModifiers(
                    handles.dropdown,
                    activeMenu === mainIndex ? 'active' : ''
                  )}
                >
                  <div className={handles.submenu}>
                    <div className={handles.submenuWrapper}>
                      {mainItem.menu.map((menu) => (
                        <DropdownItem
                          key={menu.__editorItemTitle}
                          menu={menu}
                          handles={handles}
                        />
                      ))}
                    </div>
                    <div className={handles.menuImageContainer}>
                      {mainItem.image && (
                        <img
                          src={mainItem.image}
                          alt={mainItem.__editorItemTitle}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </nav>
  )
}

Menu.schema = {
  title: 'Menu',
  type: 'object',
  properties: {
    items: {
      title: 'Menu Items',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          __editorItemTitle: {
            title: 'Label',
            type: 'string',
          },
          href: {
            title: 'Link URL',
            type: 'string',
          },
          image: {
            title: 'Image URL',
            type: 'string',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
          menu: {
            title: 'Menu',
            type: 'array',
            items: {
              type: 'object',
              properties: {
                isTitle: {
                  title: 'é titulo',
                  type: 'boolean',
                },
                __editorItemTitle: {
                  title: 'Label',
                  type: 'string',
                },
                href: {
                  title: 'Link URL',
                  type: 'string',
                },
                newTab: {
                  title: 'Abrir em nova aba?',
                  type: 'boolean',
                  default: false,
                },
                subMenu: {
                  title: 'Submenu',
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      isTitle: {
                        title: 'é titulo?',
                        type: 'boolean',
                      },
                      __editorItemTitle: {
                        title: 'Label',
                        type: 'string',
                      },
                      href: {
                        title: 'Link URL',
                        type: 'string',
                      },
                      newTab: {
                        title: 'Abrir em nova aba?',
                        type: 'boolean',
                        default: false,
                      },
                      seeAll: {
                        title: 'é Ver todos?',
                        type: 'boolean',
                        default: false,
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
    delay: {
      title: 'Delay (ms)',
      type: 'number',
      default: 200,
    },
  },
}

export default Menu
