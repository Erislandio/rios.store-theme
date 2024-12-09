import React from 'react'
import { Link } from 'vtex.render-runtime'
import type { MenuLink } from './CustomMenu'
import { Arrow } from './Icons'

import './CustomMenu.styles.css'

export default function CustomMenuOthers({
  others = {
    __editorItemTitle: '',
    icon: '',
    text: '',
    url: '',
  },
}: {
  others: MenuLink
}) {
  return (
    <li>
      <Link to={others.url} fetchPage>
        <span>
          {others.icon && (
            <img
              loading="eager"
              src={others.icon}
              alt={`Icon for ${others.__editorItemTitle}`}
              width={24}
              height={24}
            />
          )}
          {others.__editorItemTitle}
        </span>
        <Arrow />
      </Link>
    </li>
  )
}
