import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = [
  'minicartBadgeContainer',
  'minicartBadgeText',
  'minicartBadgeContainerTitle',
] as const

export default function CustomMinicartBadge() {
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <div className={handles.minicartBadgeContainer}>
      <h5 className={handles.minicartBadgeContainerTitle}>Minha sacola</h5>
    </div>
  )
}
