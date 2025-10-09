import React, { useState } from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { useDevice } from 'vtex.device-detector'
import { Link } from 'vtex.render-runtime'
import useDatalayer from '../../hooks/useDatalayer'
import CustomMenuMobile from './MenuMobile'

export type SubMenuItem = {
  __editorItemTitle: string
  href: string
}

export type MenuItem = {
  __editorItemTitle: string
  subMenu: SubMenuItem[]
  href?: string
}

export type MainMenu = {
  __editorItemTitle: string
  image: string
  menu: MenuItem[]
}

type Props = {
  items: MainMenu[]
  delay?: any // opcional - tempo em ms
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

const ArrowIcon: React.FC<{ color?: string }> = ({ color = 'black' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M10 16L14 12L10 8"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const Submenu: React.FC<{
  menu: MenuItem
  mainItem: MainMenu
  handles: Record<string, string>
}> = ({ menu, mainItem, handles }) => (
  <div className={handles.submenu}>
    <ul className={handles.submenuItemUl}>
      {menu.subMenu.map((sub) => (
        <li key={sub.__editorItemTitle} className={handles.submenuItem}>
          <Link to={sub.href} className={handles.submenuItemLink}>
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
  </div>
)

const DropdownItem: React.FC<{
  menu: MenuItem
  menuIndex: number
  mainItem: MainMenu
  mainIndex: number
  activeSubMenu: number | null
  setActiveMenu: (index: number | null) => void
  setActiveSubMenu: (index: number | null) => void
  handles: Record<string, string>
  delay: any
}> = ({
  menu,
  menuIndex,
  mainItem,
  mainIndex,
  activeSubMenu,
  setActiveMenu,
  setActiveSubMenu,
  handles,
}) => {
  const isActive = activeSubMenu === menuIndex
  const arrowColor = isActive ? 'white' : 'black'

  const { pushToDataLayer } = useDatalayer()

  const handleEnter = () => {
    setActiveSubMenu(menuIndex)
    setActiveMenu(mainIndex)
    pushToDataLayer({
      event: 'menuItemHover',
      menuItemTitle: menu.__editorItemTitle,
      menuItemLink: menu.href,
      menuPosition: `${mainIndex + 1}-${menuIndex + 1}`,
    })
  }

  const handleLeave = () => {
    setActiveSubMenu(null)
  }

  return (
    <div
      key={menu.__editorItemTitle}
      className={handles.dropdownItem}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {menu.href ? (
        <Link
          to={menu.href}
          className={handles.menuLabel}
          onClick={() =>
            pushToDataLayer({
              event: 'menuItemClick',
              menuItemTitle: menu.__editorItemTitle,
              menuItemLink: menu.href,
              menuPosition: `${mainIndex + 1}-${menuIndex + 1}`,
            })
          }
        >
          {menu.__editorItemTitle}
          <ArrowIcon color={arrowColor} />
        </Link>
      ) : (
        <>
          <span className={handles.menuLabel}>
            {menu.__editorItemTitle}
            <ArrowIcon color={arrowColor} />
          </span>
          {isActive && (
            <Submenu menu={menu} mainItem={mainItem} handles={handles} />
          )}
        </>
      )}
    </div>
  )
}

const Menu: StoreFrontFC<Props> = ({ items, delay = 200 }) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const { pushToDataLayer } = useDatalayer()

  const [activeMenu, setActiveMenu] = useState<number | null>(null)
  const [activeSubMenu, setActiveSubMenu] = useState<number | null>(null)

  const { isMobile } = useDevice()

  if (isMobile) {
    return <CustomMenuMobile departments={items} />
  }

  const handleMenuEnter = (index: number) => {
    setActiveMenu(index)
    pushToDataLayer({
      event: 'mainMenuHover',
      mainMenuTitle: items[index].__editorItemTitle,
      mainMenuPosition: index + 1,
    })
  }

  const handleMenuLeave = () => {
    setActiveMenu(null)
    setActiveSubMenu(null)
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
              <DropdownItem
                key={menu.__editorItemTitle}
                menu={menu}
                menuIndex={menuIndex}
                mainItem={mainItem}
                mainIndex={mainIndex}
                activeSubMenu={activeSubMenu}
                setActiveMenu={setActiveMenu}
                setActiveSubMenu={setActiveSubMenu}
                handles={handles}
                delay={delay}
              />
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
    delay: {
      title: 'Delay (ms)',
      type: 'number',
      default: 200,
    },
  },
}

export default Menu
