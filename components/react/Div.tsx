import React from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { useDevice } from 'vtex.device-detector'

interface DivProps {
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
  justifyContent?: 'space-between' | 'center' | 'flex-start' | 'flex-end'
  width?: string
  background?: string
  gap?: string
  className?: string
  children?: React.ReactNode
  preserveMobileLayout?: boolean
  padding?: string
  paddingMobile?: string
  flexDirectionMobile?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  customClass?: string
}

const CSS_HANDLES = ['divContainer'] as const

const Div: StoreFrontFC<DivProps> = ({
  flexDirection = 'row',
  alignItems = 'stretch',
  width = 'auto',
  background = 'transparent',
  gap = '0',
  className = '',
  children,
  justifyContent = 'flex-start',
  preserveMobileLayout = false,
  padding = '0px',
  paddingMobile = '',
  flexDirectionMobile = 'column',
  customClass,
}) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const { isMobile } = useDevice()

  const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: isMobile
      ? (!preserveMobileLayout && flexDirectionMobile) ||
        flexDirectionMobile ||
        'column'
      : flexDirection,
    alignItems,
    width,
    background,
    gap,
    justifyContent,
    padding: isMobile ? paddingMobile || padding : padding,
  }

  return (
    <div
      style={style}
      className={`${applyModifiers(handles.divContainer, className)} ${
        customClass || ''
      }`}
    >
      {children}
    </div>
  )
}

Div.schema = {
  title: 'Seção',
  type: 'object',
  properties: {
    flexDirection: {
      type: 'string',
      enum: ['row', 'column', 'row-reverse', 'column-reverse'],
      default: 'row',
    },
    alignItems: {
      type: 'string',
      enum: ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'],
      default: 'stretch',
    },
    width: {
      type: 'string',
      default: 'auto',
    },
    background: {
      type: 'string',
      default: 'transparent',
    },
    gap: {
      type: 'string',
      default: '0',
    },
    justifyContent: {
      type: 'string',
      enum: [
        'flex-start',
        'flex-end',
        'center',
        'space-between',
        'space-around',
        'space-evenly',
      ],
      default: 'flex-start',
    },
    preserveMobileLayout: {
      type: 'boolean',
      default: false,
    },
    padding: {
      type: 'string',
      default: '0px',
    },
    paddingMobile: {
      type: 'string',
      default: '',
    },
    flexDirectionMobile: {
      type: 'string',
      enum: ['row', 'column', 'row-reverse', 'column-reverse'],
      default: 'column',
    },
  },
}

export default Div
