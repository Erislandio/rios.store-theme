import React, { useEffect, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useDevice } from 'vtex.device-detector'
import { Dots, Slide, Slider, SliderContainer } from 'vtex.slider'

interface RomaziPremiumLines {
  backgroundImage: string
  backgroundImageMobile: string
  title: string
  text: string
  text2?: string
  imagesCarousel: string
  harmonizeColors: string[]
}

// interface HarmonizeColors {
//   colors: string
// }

const CSS_HANDLES = [
  'romaziPremiumContainer',
  'romaziPremiumLogoContainer',
  'romaziPremiumTextsContainer',
  'romaziPremiumLogo',
  'romaziPremiumTitle',
  'romaziPremiumText',
  'romaziPremiumButton',
  'romaziPremiumBackgroundImageContainer',
  'romaziPremiumBackgroundImage',
  'romaziPremiumSlider',
  'romaziPremiumHarmonizeContainer',
  'romaziPremiumHarmonizeTitle',
  'harmonizeColors',
  'harmonizeColorsContainer',
  'logoSoulsContainer',
  'logoSouls',
  'dots',
  'dotsActive',
  'romaziPremiumSlide',
  'romaziPremiumSlideActive',
  'romaziPremiumCustomSlider',
  'romaziPremiumSliderImage',
  'romaziImageContainer',
  'dotsContainer',
  'romaziPremiumSlidePrev',
] as const

const RomaziPremium: StoreFrontFC<{
  lines: RomaziPremiumLines[]
}> = ({ lines = [] }) => {
  console.log('🚀 ~ lines:', lines)
  const { handles } = useCssHandles(CSS_HANDLES)
  const [currentLine, setCurrentLine] = useState<RomaziPremiumLines>(lines[0])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLastSlide, setIsLastSlide] = useState(false)
  const [isFirstSlide, setIsFirstSlide] = useState(false)
  const { isMobile } = useDevice()

  useEffect(() => {
    if (lines.length) {
      setCurrentLine(lines[0])
    }
  }, [lines])

  useEffect(() => {
    setCurrentLine(lines[currentSlide])

    setIsFirstSlide(currentSlide === 0)
    setIsLastSlide(currentSlide === lines.length - 1)
  }, [currentSlide, lines])

  const perPage = {
    1025: 3,
    900: 1,
    700: 1,
    300: 1,
  }

  if (!lines.length) {
    return null
  }

  const setSlideByOrientation = (orientation: string) => {
    if (!isFirstSlide && orientation === 'left') {
      setCurrentSlide((prevState) => prevState - 1)

      return
    }

    if (!isLastSlide && orientation === 'right') {
      setCurrentSlide((prevState) => prevState + 1)
    }
  }

  // const arrowRender = ({ orientation, onClick }: any) => {
  //   // const { gap, cssHandles } = this.props
  //   const containerClasses = classNames('pointer z-1 flex absolute', {
  //     [`vtex-shelf-1-x-arrow pointer z-1 flex absolute vtex-shelf-1-x-arrowLeft left-0 ph3`]:
  //       orientation === 'left',
  //     [`vtex-shelf-1-x-arrow pointer z-1 flex absolute vtex-shelf-1-x-arrowRight right-0 ph3`]:
  //       orientation === 'right',
  //   })
  //   return (
  //     <div
  //       className={containerClasses}
  //       onClick={() => {
  //         onClick()
  //         setSlideByOrientation(orientation)
  //       }}
  //     >
  //       <IconCaret orientation={orientation} thin size={20} />
  //     </div>
  //   )
  // }

  return (
    <div className={handles.romaziPremiumContainer}>
      <div className={handles.romaziPremiumLogoContainer}>
        <img
          className={handles.romaziPremiumLogo}
          src="https://romazi.vtexassets.com/assets/vtex.file-manager-graphql/images/5c594b09-11c0-4fdd-ac1b-9824f9e91aa1___59c1bbdcaa3e0347247b07044821a8aa.png"
          alt="Romazi Premium Logo"
        />
      </div>
      <div className={handles.romaziPremiumBackgroundImageContainer}>
        <img
          className={handles.romaziPremiumBackgroundImage}
          src={
            isMobile
              ? currentLine.backgroundImageMobile
              : currentLine.backgroundImage
          }
          alt="backgroundImage"
        />
      </div>
      <div className={handles.romaziPremiumSlider}>
        <SliderContainer>
          <Slider
            className={handles.romaziPremiumCustomSlider}
            currentSlide={currentSlide}
            onChangeSlide={() => {}}
            easing="ease"
            perPage={perPage}
            centerMode="center"
          >
            {lines.map((item, index) => (
              <Slide
                key={index}
                sliderTransitionDuration={500}
                style={{ overflow: 'visible' }}
                className={
                  currentSlide === index
                    ? handles.romaziPremiumSlideActive
                    : currentSlide - 1 === index
                    ? handles.romaziPremiumSlidePrev
                    : handles.romaziPremiumSlide
                }
              >
                <img
                  className={handles.romaziPremiumSliderImage}
                  alt={item.imagesCarousel}
                  // title={item.__editorItemTitle}
                  src={item.imagesCarousel}
                  loading="eager"
                  style={{
                    width: currentSlide === index ? '100%' : '75%',
                  }}
                />
              </Slide>
            ))}
          </Slider>
          <div className={handles.dotsContainer}>
            <button
              onClick={() => {
                setSlideByOrientation('left')
              }}
              style={{
                border: 'none',
              }}
              className="pointer z-1 flex absolute vtex-shelf-1-x-arrow pointer z-1 flex absolute vtex-shelf-1-x-arrowLeft left-0 ph3"
            >
              <svg
                fill="none"
                width="20"
                height="20"
                viewBox="0 0 16 16"
                className=" romazi-components-0-x-caretIcon"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#nav-thin-caret--left" />
              </svg>
            </button>
            <Dots
              // perPage={perPage
              showDotsPerPage
              currentSlide={currentSlide}
              totalSlides={lines.length}
              onChangeSlide={() => {}}
              // onChangeSlide={handleChangeSlide}
              classes={{
                root: 'pv4',
                dot: `${handles.dots}`,
                activeDot: `${handles.dotsActive}`,
              }}
            />
            <button
              className="pointer z-1 flex absolute vtex-shelf-1-x-arrow pointer z-1 flex absolute vtex-shelf-1-x-arrowRight right-0 ph3"
              style={{
                border: 'none',
              }}
              onClick={() => {
                setSlideByOrientation('right')
              }}
            >
              <svg
                fill="none"
                width="20"
                height="20"
                viewBox="0 0 16 16"
                className="romazi-components-0-x-caretIcon"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#nav-thin-caret--right" />
              </svg>
            </button>
          </div>
        </SliderContainer>
      </div>
      <div className={handles.romaziPremiumTextsContainer}>
        <h3 className={handles.romaziPremiumTitle}>{currentLine.title}</h3>
        <p className={handles.romaziPremiumText}>{currentLine.text}</p>
        {currentLine.text2 && (
          <p className={handles.romaziPremiumText}>{currentLine.text2}</p>
        )}
        <button className={handles.romaziPremiumButton}>
          Conhecer a linha
        </button>
      </div>
      <div className={handles.romaziPremiumHarmonizeContainer}>
        <p className={handles.romaziPremiumHarmonizeTitle}>
          cores que harmonizam
        </p>
        <div className={handles.harmonizeColorsContainer}>
          {currentLine.harmonizeColors.map((item, index) => (
            <div
              key={index}
              className={handles.harmonizeColors}
              style={{
                backgroundColor: item,
              }}
            />
          ))}
        </div>
      </div>
      {!isMobile && (
        <div className={handles.logoSoulsContainer}>
          <img
            className={handles.logoSouls}
            src="https://romazi.vtexassets.com/assets/vtex.file-manager-graphql/images/9868e06a-d824-42ad-ae1e-9965254758ab___64f449dbe45c3b3b4319214ccb31c05d.png"
            alt="Linha Souls Logo"
          />
        </div>
      )}
    </div>
  )
}

// RomaziPremium.defaultProps = {
//   lines: [],
// }

RomaziPremium.schema = {
  title: 'Romazi Premium - Conteúdo',
  type: 'object',
  properties: {
    lines: {
      type: 'array',
      title: 'Romazi premium - linhas',
      items: {
        type: 'object',
        properties: {
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
            type: 'string',
            default: '',
          },
          text2: {
            title: 'Texto 2',
            type: 'string',
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
  },
}

export default RomaziPremium
