import React from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { Link } from 'vtex.render-runtime'

import type { MenuItem } from './CustomMenu'
import { CSS_HANDLES } from './CustomMenu'
import { Arrow } from './Icons'

export default function Menu({ menu }: { menu: MenuItem }) {
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <li className={handles.allDepartamentItem}>
      <span>
        {menu.icon && (
          <img
            loading="eager"
            src={menu.icon}
            alt={`Icon for ${menu.__editorItemTitle}`}
            width={24}
            height={24}
          />
        )}
        {menu.__editorItemTitle}
      </span>
      <Arrow />
      <section className={handles.allDepartamentWrapperLevel1}>
        <h4>{menu.__editorItemTitle}</h4>
        <ul>
          {menu.sections?.map((item) => {
            if (item.url) {
              return (
                <Link to={item.url} key={item.title} fetchPage>
                  {item.__editorItemTitle}
                </Link>
              )
            }

            return (
              <li key={item.__editorItemTitle}>
                {item.__editorItemTitle} <Arrow />
                <section
                  className={applyModifiers(
                    handles.allDepartamentWrapperLevel1,
                    'level2'
                  )}
                >
                  <h4>{item.__editorItemTitle}</h4>
                  <ul>
                    {item.links?.map((link) => {
                      if (!link.url || !link.__editorItemTitle) {
                        return
                      }

                      return (
                        <Link
                          to={link.url}
                          fetchPage
                          key={link.__editorItemTitle}
                        >
                          {link.__editorItemTitle}
                        </Link>
                      )
                    })}
                  </ul>
                </section>
              </li>
            )
          })}
        </ul>
      </section>
    </li>
  )
}
