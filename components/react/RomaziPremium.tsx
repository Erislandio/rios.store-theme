import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Slide, Slider } from 'vtex.slider'
import { IconCaret } from 'vtex.store-icons'

interface RomaziPremiumLines {
  backgroundImage: string
  backgroundImageMobile: string
  title: string
  text: string
  imagesCarousel: string
  harmonizeColors: HarmonizeColors[]
}

interface HarmonizeColors {
  colors: string
}

const CSS_HANDLES = ['romaziPremiumContainer'] as const

const RomaziPremium: StoreFrontFC<{
  lines: RomaziPremiumLines[]
}> = ({ lines = [] }) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const [currentLine, setCurrentLine] = useState<RomaziPremiumLines>(lines[0])
  const [currentSlide, setCurrentSlide] = useState(1)

  useEffect(() => {
    if (lines.length) {
      setCurrentLine(lines[0])
    }
  }, [lines])

  const perPage = {
    1300: 1,
    1100: 1,
    900: 1,
    700: 1,
    300: 1,
  }

  const arrowRender = ({ orientation, onClick }: any) => {
    // const { gap, cssHandles } = this.props
    const containerClasses = classNames('pointer z-1 flex absolute', {
      [`vtex-shelf-1-x-arrow pointer z-1 flex absolute vtex-shelf-1-x-arrowLeft left-0 ph3`]:
        orientation === 'left',
      [`vtex-shelf-1-x-arrow pointer z-1 flex absolute vtex-shelf-1-x-arrowRight right-0 ph3`]:
        orientation === 'right',
    })
    return (
      <div className={containerClasses} onClick={onClick}>
        <IconCaret orientation={orientation} thin size={20} />
      </div>
    )
  }

  return (
    <div className={handles.romaziPremiumContainer}>
      <div>
        <img
          src="https://romazi.vtexassets.com/assets/vtex.file-manager-graphql/images/5c594b09-11c0-4fdd-ac1b-9824f9e91aa1___59c1bbdcaa3e0347247b07044821a8aa.png"
          alt="Romazi Premium Logo"
        />
      </div>
      <div>
        <img src={currentLine.backgroundImage} alt="backgroundImage" />
      </div>
      <div>
        <Slider
          currentSlide={currentSlide}
          onChangeSlide={setCurrentSlide}
          easing="ease"
          perPage={perPage}
          arrowRender={arrowRender}
        >
          {lines.map((item) => (
            <Slide>
              <img
                // className={}
                // alt={item.__editorItemTitle}
                // title={item.__editorItemTitle}
                src={item.imagesCarousel}
                loading="eager"
              />
            </Slide>
          ))}
        </Slider>
      </div>
      <div>
        <h3>{currentLine.title}</h3>
        <p>{currentLine.text}</p>
        <button>Conhecer a linha</button>
        <div>
          <p>cores que harmonizam</p>
        </div>
      </div>
    </div>
  )
}

// RomaziPremium.defaultProps = {
//   bannerData: {},
//   title: 'Banner com texto',
// }

RomaziPremium.schema = {
  title: 'Banner com texto - Conteúdo',
  type: 'object',
  properties: {
    lines: {
      type: 'array',
      title: 'Romazi premium - linhas',
      items: {
        backgroundImage: {
          type: 'string',
          title: 'Image de fundo - Desktop',
          default: '',
          widget: {
            'ui:widget': 'image-uploader',
          },
        },
        backgroundImageMobile: {
          type: 'string',
          title: 'Image de fundo - Mobile',
          default: '',
          widget: {
            'ui:widget': 'image-uploader',
          },
        },
        title: {
          title: 'titulo',
          type: 'string',
          default: '',
        },
        text: {
          title: 'Texto',
          default: '',
        },
        imagesCarousel: {
          type: 'string',
          title: 'Carrosel de imagens',
          default: '',
          widget: {
            'ui:widget': 'image-uploader',
          },
        },
        harmonizeColors: {
          type: 'array',
          title: 'Cores que Harmonizam',
          items: {
            type: 'string',
            title: 'Cores',
            default: '',
          },
        },
      },
    },
  },
}

export default RomaziPremium
