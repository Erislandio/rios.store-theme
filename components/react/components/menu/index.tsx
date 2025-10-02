import React, { Fragment, useState } from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { Link } from 'vtex.render-runtime'

type SubMenuItem = {
  __editorItemTitle: string
  href: string
}

type MenuItem = {
  __editorItemTitle: string
  subMenu: SubMenuItem[]
  href?: string
}

type MainMenu = {
  __editorItemTitle: string
  image: string
  menu: MenuItem[]
}

type Props = {
  items: MainMenu[]
}

const CSS_HANDLES = [
  'menuContainer',
  'menuItem',
  'menuLabel',
  'dropdown',
  'dropdownItem',
  'submenu',
  'submenuItemLink',
  'submenuItem',
  'submenuImage',
  'submenuImageContainer',
  'submenuItemUl',
] as const

const ArrowIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M10 16L14 12L10 8"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

const ArrowIconWhite = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M10 16L14 12L10 8"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

const Menu: StoreFrontFC<Props> = ({ items }) => {
  const { handles } = useCssHandles(CSS_HANDLES)

  const [activeMenu, setActiveMenu] = useState<number | null>(null)
  const [activeSubMenu, setActiveSubMenu] = useState<number | null>(null)

  return (
    <nav className={handles.menuContainer}>
      {items.map((mainItem, mainIndex) => (
        <div
          key={mainItem.__editorItemTitle}
          className={handles.menuItem}
          onMouseEnter={() => setActiveMenu(mainIndex)}
          onMouseLeave={() => {
            setActiveMenu(null)
            setActiveSubMenu(null)
          }}
        >
          <span className={handles.menuLabel}>
            {mainItem.__editorItemTitle}
          </span>

          <div
            className={applyModifiers(
              handles.dropdown,
              activeMenu === mainIndex ? 'active' : ''
            )}
          >
            {mainItem.menu.map((menu, menuIndex) => (
              <div
                key={menu.__editorItemTitle}
                className={handles.dropdownItem}
                onMouseEnter={() => {
                  setActiveSubMenu(menuIndex)
                  setActiveMenu(mainIndex)
                }}
                onMouseLeave={() => {
                  setActiveSubMenu(null)
                }}
              >
                {menu.href ? (
                  <Link to={menu.href} className={handles.menuLabel}>
                    {menu.__editorItemTitle}
                    {activeSubMenu === menuIndex ? (
                      <ArrowIconWhite />
                    ) : (
                      <ArrowIcon />
                    )}
                  </Link>
                ) : (
                  <Fragment>
                    <span className={handles.menuLabel}>
                      {menu.__editorItemTitle}{' '}
                      {activeSubMenu === menuIndex ? (
                        <ArrowIconWhite />
                      ) : (
                        <ArrowIcon />
                      )}
                    </span>
                    <div className={handles.submenu}>
                      {activeSubMenu === menuIndex ? (
                        <Fragment>
                          <ul className={handles.submenuItemUl}>
                            {menu.subMenu.map((sub) => (
                              <li className={handles.submenuItem}>
                                <Link
                                  key={sub.__editorItemTitle}
                                  to={sub.href}
                                  className={handles.submenuItemLink}
                                >
                                  {sub.__editorItemTitle}
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <div className={handles.submenuImageContainer}>
                            <img
                              loading="lazy"
                              src={mainItem.image}
                              alt={mainItem.__editorItemTitle}
                              width={316}
                              height={452}
                              className={handles.submenuImage}
                            />
                          </div>
                        </Fragment>
                      ) : null}
                    </div>
                  </Fragment>
                )}
              </div>
            ))}
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
          },
          menu: {
            title: 'Menu',
            type: 'array',
            items: {
              type: 'object',
              properties: {
                __editorItemTitle: {
                  title: 'Label',
                  type: 'string',
                },
                subMenu: {
                  title: 'Sub Menu',
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

export default Menu
