import React, { useEffect, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { canUseDOM } from 'vtex.render-runtime'
import { Modal } from 'vtex.styleguide'

const CSS_HANDLES = [
  'newsletterModalContainer',
  'newsletterModalContent',
  'newsletterModalContentTitle',
  'newsletterModalContentText',
  'newsletterModalCloseButton',
  'newsletterModal',
] as const

const CloseIcon = () => (
  <svg
    width="47"
    height="47"
    viewBox="0 0 47 47"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_17_13885)">
      <path
        d="M13.4658 34.3332C13.2416 34.334 13.0223 34.268 12.8358 34.1438C12.6492 34.0195 12.5039 33.8426 12.4182 33.6355C12.3325 33.4284 12.3104 33.2004 12.3546 32.9807C12.3988 32.761 12.5074 32.5594 12.6665 32.4015L32.4016 12.6637C32.6139 12.4513 32.9019 12.332 33.2022 12.332C33.5025 12.332 33.7905 12.4513 34.0029 12.6637C34.2152 12.876 34.3345 13.164 34.3345 13.4643C34.3345 13.7646 34.2152 14.0526 34.0029 14.265L14.265 34.0028C14.16 34.1077 14.0354 34.1909 13.8982 34.2475C13.7611 34.3042 13.6141 34.3334 13.4658 34.3332Z"
        fill="white"
      />
      <path
        d="M33.2038 34.3332C33.0552 34.333 32.9081 34.3034 32.771 34.2462C32.6338 34.1891 32.5093 34.1054 32.4046 34L12.6639 14.265C12.4515 14.0526 12.3322 13.7646 12.3322 13.4643C12.3322 13.164 12.4515 12.876 12.6639 12.6637C12.8762 12.4513 13.1642 12.332 13.4645 12.332C13.7648 12.332 14.0528 12.4513 14.2652 12.6637L34.003 32.4015C34.1622 32.5594 34.2708 32.761 34.315 32.9807C34.3592 33.2004 34.3371 33.4284 34.2514 33.6355C34.1657 33.8426 34.0203 34.0195 33.8338 34.1438C33.6472 34.268 33.4279 34.334 33.2038 34.3332Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_17_13885">
        <rect
          width="22"
          height="22"
          fill="white"
          transform="translate(12.3333 12.3333)"
        />
      </clipPath>
    </defs>
  </svg>
)

const NewsletterModal: StoreFrontFC<{ image: string }> = ({
  children,
  image,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const { handles } = useCssHandles(CSS_HANDLES)

  useEffect(() => {
    const hasShown = sessionStorage.getItem('hasShownNewsletterModal')

    if (hasShown) {
      return
    }

    const timer = setTimeout(() => {
      setIsOpen(true)
      sessionStorage.setItem('hasShownNewsletterModal', 'true')
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
  }

  if (!canUseDOM) return null

  if (!isOpen) return null

  return (
    <section className={handles.newsletterModal}>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        centered
        closeOnOverlayClick={false}
        showCloseButton
      >
        <div
          className={handles.newsletterModalContainer}
          style={{ backgroundImage: `url(${image})` }}
        >
          <button
            className={handles.newsletterModalCloseButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </button>
          <div className={handles.newsletterModalContent}>
            <h4 className={handles.newsletterModalContentTitle}>
              Assine nossa newsletter e fique por dentro das nossas
            </h4>
            <p className={handles.newsletterModalContentText}>Novidades</p>
            {children}
          </div>
        </div>
      </Modal>
    </section>
  )
}

NewsletterModal.defaultProps = {
  image: 'https://gruporios.vteximg.com.br/arquivos/api.png',
}

NewsletterModal.schema = {
  title: 'Newsletter Modal',
  description: 'Modal que aparece quando o usuário sai da página',
  properties: {
    image: {
      type: 'string',
      title: 'Image',
      description: 'Image',
      required: true,
      default: 'https://gruporios.vteximg.com.br/arquivos/api.png',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
  },
}

export default NewsletterModal
