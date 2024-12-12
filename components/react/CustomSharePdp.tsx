import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Button, withToast, WithToastProps } from 'vtex.styleguide'

const Shareicon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.2243 7.33284C19.2243 4.98087 21.131 3.07422 23.483 3.07422C25.8349 3.07422 27.7416 4.98087 27.7416 7.33284C27.7416 9.6848 25.8349 11.5915 23.483 11.5915C21.131 11.5915 19.2243 9.6848 19.2243 7.33284ZM23.483 5.03974C22.2165 5.03974 21.1899 6.0664 21.1899 7.33284C21.1899 8.59927 22.2165 9.62594 23.483 9.62594C24.7494 9.62594 25.7761 8.59927 25.7761 7.33284C25.7761 6.0664 24.7494 5.03974 23.483 5.03974Z"
      fill="#2643A8"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.81055 15.8501C4.81055 13.4981 6.71721 11.5915 9.06917 11.5915C11.4211 11.5915 13.3278 13.4981 13.3278 15.8501C13.3278 18.202 11.4211 20.1087 9.06917 20.1087C6.71721 20.1087 4.81055 18.202 4.81055 15.8501ZM9.06917 13.557C7.80274 13.557 6.77606 14.5837 6.77606 15.8501C6.77606 17.1165 7.80274 18.1432 9.06917 18.1432C10.3356 18.1432 11.3623 17.1165 11.3623 15.8501C11.3623 14.5837 10.3356 13.557 9.06917 13.557Z"
      fill="#2643A8"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21.0477 8.5103C21.329 8.97451 21.1807 9.57882 20.7165 9.86007L12.4213 14.8858C11.9571 15.1671 11.3527 15.0188 11.0715 14.5545C10.7902 14.0903 10.9386 13.486 11.4028 13.2048L19.698 8.17901C20.1622 7.89777 20.7665 8.04609 21.0477 8.5103Z"
      fill="#2643A8"
    />
    <path
      fillRule="evenodd"
      clip-rule="evenodd"
      d="M11.0659 17.03C11.3421 16.5627 11.9447 16.4077 12.412 16.6838L21.1523 21.8486C21.6195 22.1247 21.7745 22.7273 21.4984 23.1946C21.2222 23.6619 20.6196 23.8168 20.1523 23.5407L11.4121 18.376C10.9448 18.0999 10.7898 17.4972 11.0659 17.03Z"
      fill="#2643A8"
    />
    <path
      fillRule="evenodd"
      clipRule-rule="evenodd"
      d="M23.483 22.0742C22.2165 22.0742 21.1899 23.1009 21.1899 24.3673C21.1899 25.6338 22.2165 26.6604 23.483 26.6604C24.7494 26.6604 25.7761 25.6338 25.7761 24.3673C25.7761 23.1009 24.7494 22.0742 23.483 22.0742ZM19.2243 24.3673C19.2243 22.0154 21.131 20.1087 23.483 20.1087C25.8349 20.1087 27.7416 22.0154 27.7416 24.3673C27.7416 26.7193 25.8349 28.6259 23.483 28.6259C21.131 28.6259 19.2243 26.7193 19.2243 24.3673Z"
      fill="#2643A8"
    />
  </svg>
)

const CSS_HANDLES = ['customShare'] as const

const CustomSharePdp: React.FC<WithToastProps> = ({ showToast }) => {
  const { handles } = useCssHandles(CSS_HANDLES)

  const handleCopy = () => {
    const url = window.location.href

    navigator.clipboard.writeText(url).then(
      () => {
        showToast({
          message: `URL copiada para a área de transferência!`,
        })
      },
      () => {
        showToast({
          message: 'Erro ao copiar a URL',
        })
      }
    )
  }

  return (
    <div className={handles.customShare}>
      <Button disabled={false} onClick={() => handleCopy()}>
        <Shareicon />
        {/* Compartilhar */}
      </Button>
    </div>
  )
}

export default withToast(CustomSharePdp)
