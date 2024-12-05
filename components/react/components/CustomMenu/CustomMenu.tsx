import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { useDevice } from 'vtex.device-detector'
import { Link, canUseDOM } from 'vtex.render-runtime'

import './CustomMenu.styles.css'
import CustomMenuMobile from './CustomMenuMobile'
import { useMouseSpeedDebouncer } from './hooks/useMouseSpeedBebouncer'
import { useUrlChange } from './hooks/useUrlChange'
import { MenuIcon } from './icons'
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

const submenuReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SHOW_SUBMENU':
      return {
        hasBeenActive: true,
        isActive: true,
      }

    case 'HIDE_SUBMENU':
      return {
        ...state,
        isActive: false,
      }

    case 'DISABLE_ON_MOUNT_BEHAVIOR_FLAG':
      return {
        ...state,
        onMountBehavior: 'closed',
      }

    default:
      return state
  }
}

const MenuItemComponent = ({
  item,
  index,
  headerHeight,
  onMountBehavior = '',
}: {
  item: MenuItem
  index: number
  headerHeight: number
  onMountBehavior: string
}) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const closeTimeout = useRef<number | null>(null)

  const [isHovered, setHovered] = useState(false)

  const [{ isActive, onMountBehavior: onMountBehaviorFlag }, dispatch] =
    useReducer(submenuReducer, {
      hasBeenActive: onMountBehavior === 'open',
      isActive: onMountBehavior === 'open',
      onMountBehavior,
    })

  const setActive = useCallback(
    (value: boolean) => {
      if (value !== isActive) {
        dispatch({ type: value ? 'SHOW_SUBMENU' : 'HIDE_SUBMENU' })
      }
    },
    [isActive]
  )

  const disableIsOpenOnMountFlag = useCallback(() => {
    if (onMountBehaviorFlag === 'open') {
      dispatch({ type: 'DISABLE_ON_MOUNT_BEHAVIOR_FLAG' })
    }
  }, [onMountBehaviorFlag])

  useUrlChange(() => {
    if (isActive) setActive(false)
  }, [isActive, setActive])

  const debouncedSetActive = useMouseSpeedDebouncer(setActive, {
    delay: 200,
    maxSpeed: 450,
  })

  useEffect(
    function guaranteeClosing() {
      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current)
      }

      // if a menu is still active but is not hovered for at least 400ms, close it
      if (isActive && !isHovered && onMountBehaviorFlag !== 'open') {
        closeTimeout.current = window.setTimeout(() => {
          setActive(false)
        }, 400)
      }

      return () => {
        closeTimeout.current && clearTimeout(closeTimeout.current)
      }
    },
    [isActive, isHovered, setActive, onMountBehaviorFlag]
  )

  return (
    <div
      key={index}
      className={handles.menuItem}
      onMouseEnter={() => {
        debouncedSetActive(true)
        setHovered(true)
        disableIsOpenOnMountFlag()
      }}
      onMouseLeave={() => {
        debouncedSetActive(false)
        setHovered(false)
      }}
    >
      <span className={handles.menuContainerItem}>
        {item.__editorItemTitle}
      </span>
      <MenuWrapper
        isLoading={!canUseDOM}
        className={handles.submenu}
        headerHeight={headerHeight}
        display="flex"
      >
        {isActive ? (
          <div className={handles.menuItemSection}>
            {item.banner && (
              <img
                loading="eager"
                src={item.banner}
                alt={`Banner for ${item.__editorItemTitle}`}
                className={handles.menuBanner}
              />
            )}
            <section className={handles.menuItemInner}>
              <h3 className={handles.menuItemSectionTitle}>
                {item.icon && (
                  <img
                    loading="eager"
                    src={item.icon}
                    alt={`Icon for ${item.__editorItemTitle}`}
                    width={24}
                    height={24}
                  />
                )}
                {item.__editorItemTitle}
              </h3>
              <div className={handles.submenuItemsWrapper}>
                {item?.sections?.map((section, sectionIndex) => (
                  <ul key={sectionIndex} className={handles.submenuItems}>
                    {section.links.map((link, linkIndex) => (
                      <li
                        key={linkIndex}
                        className={applyModifiers(
                          handles.menuItemElement,
                          linkIndex === 0 ? 'title' : 'element'
                        )}
                      >
                        {linkIndex === 0 ? (
                          <h5 className={handles.menuItemTitle}>
                            {link.__editorItemTitle}
                          </h5>
                        ) : (
                          <Link
                            className={handles.menuLink}
                            to={link.url}
                            fetchPage
                          >
                            {link.__editorItemTitle}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                ))}
                <ul className={handles.moreitems}>
                  {item?.moreItems?.map((link) => (
                    <li key={link.__editorItemTitle}>
                      <Link to={link.url}>{link.__editorItemTitle}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        ) : null}
      </MenuWrapper>
    </div>
  )
}

const DynamicMenu: StoreFrontFC<{
  items: MenuItem[]
  departments: MenuItem[]
  others: MenuLink[]
}> = ({ items = [], departments = [], others }) => {
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
          Todos os departamentos
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
      {items.map((item, index) => (
        <MenuItemComponent
          onMountBehavior=""
          key={index}
          item={item}
          index={index}
          headerHeight={headerHeight}
        />
      ))}
    </div>
  )
}

DynamicMenu.defaultProps = {
  items: [],
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
    items: {
      type: 'array',
      title: 'Itens do Menu',
      items: {
        type: 'object',
        properties: {
          __editorItemTitle: {
            title: 'title',
            type: 'string',
            default: '',
          },
          banner: {
            type: 'string',
            title: 'URL do Banner',
            default: '',
            widget: {
              'ui:widget': 'image-uploader',
            },
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
          moreItems: {
            type: 'array',
            title: 'Mais itens do MENU',
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
