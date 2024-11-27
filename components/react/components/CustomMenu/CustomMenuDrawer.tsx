import React from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { Drawer, DrawerCloseButton, DrawerTrigger } from 'vtex.store-drawer'
import { Arrow } from './Icons'

import { Link } from 'vtex.render-runtime'
// import './CustomMenu.styles.css'

const CSS_HANDLES = [
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
  'drawerHeader',
  'drawerHeaderClose',
  'drawerHeaderCloseButton',
  'drawerHeaderCloseContainer',
  'childrenContainer',
  'drawerTagLink',
  'drawerUl',
  'drawerLi',
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

export default function CustomMenuDrawer({
  departments,
  others = [],
}: {
  departments: MenuItem[]
  others: MenuLink[]
}) {
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <section className={applyModifiers(handles.menuContainer, 'mobile')}>
      <h3>Todos os departamentos</h3>
      <ul>
        {departments.map((item) => {
          return (
            <li>
              <DrawerTrigger customPixelEventId={item.__editorItemTitle}>
                <span>
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
                </span>
                <Arrow />
              </DrawerTrigger>
              <Drawer
                position="left"
                customPixelEventId={item.__editorItemTitle}
                customIcon={<span></span>}
                renderingStrategy="lazy"
                slideDirection="leftToRight"
                header={
                  <section className={handles.drawerHeaderCloseContainer}>
                    <div className={handles.drawerHeaderClose}>
                      <DrawerCloseButton text={item.__editorItemTitle} />
                    </div>
                    <div className={handles.drawerHeaderCloseButton}>
                      <DrawerCloseButton />
                    </div>
                  </section>
                }
              >
                <ul className={handles.drawerUl}>
                  {item?.sections?.map((section) => {
                    return (
                      <li
                        key={section.__editorItemTitle}
                        className={handles.drawerLi}
                      >
                        {section.url ? (
                          <Link
                            className={handles.drawerTagLink}
                            to={section.url}
                          >
                            {section.__editorItemTitle}
                          </Link>
                        ) : (
                          <DrawerTrigger
                            customPixelEventId={section.__editorItemTitle}
                          >
                            <span>{section.__editorItemTitle}</span>
                            <Arrow />
                          </DrawerTrigger>
                        )}
                        <Drawer
                          position="left"
                          customPixelEventId={section.__editorItemTitle}
                          customIcon={<span></span>}
                          renderingStrategy="lazy"
                          slideDirection="leftToRight"
                          header={
                            <section
                              className={handles.drawerHeaderCloseContainer}
                            >
                              <div className={handles.drawerHeaderClose}>
                                <DrawerCloseButton
                                  text={section.__editorItemTitle}
                                />
                              </div>
                              <div className={handles.drawerHeaderCloseButton}>
                                <DrawerCloseButton />
                              </div>
                            </section>
                          }
                        >
                          <ul className={handles.drawerUl}>
                            {section?.links?.map((link) => {
                              return (
                                <li
                                  className={handles.drawerLi}
                                  key={link.__editorItemTitle}
                                >
                                  <Link
                                    to={link.url}
                                    className={handles.drawerTagLink}
                                  >
                                    {link.__editorItemTitle}
                                  </Link>
                                </li>
                              )
                            })}
                          </ul>
                        </Drawer>
                      </li>
                    )
                  })}
                </ul>
              </Drawer>
            </li>
          )
        })}
      </ul>
      <div className={handles.allDepartamentBottomDevider}></div>
      <div className={handles.allDepartamentBottom}>
        <ul>
          {others.map((element) => (
            <li key={element.__editorItemTitle}>
              <Link to={element.url} fetchPage>
                <span>
                  {element.icon && (
                    <img
                      loading="eager"
                      src={element.icon}
                      alt={`Icon for ${element.__editorItemTitle}`}
                      width={24}
                      height={24}
                    />
                  )}
                  {element.__editorItemTitle}
                </span>
                <Arrow />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

CustomMenuDrawer.defaultProps = {
  items: [],
  departments: [],
  others: [],
}

CustomMenuDrawer.schema = {
  title: 'Menu Dinâmico',
  type: 'object',
  properties: {
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
    },
  },
}
