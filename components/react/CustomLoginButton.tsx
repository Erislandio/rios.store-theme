import React, { useState } from 'react'
import { useQuery } from 'react-apollo'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { useDevice } from 'vtex.device-detector'
import { useRuntime } from 'vtex.render-runtime'
import { Button, Spinner } from 'vtex.styleguide'
import { ConditionalLayout } from './ConditionalLayout'
import PROFILE from './queries/profile.gql'

export const ProfileIcon = () => (
  <div style={{ minWidth: 25, minHeight: 25 }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="20"
      viewBox="0 0 17 20"
      fill="none"
    >
      <g clip-path="url(#clip0_11700_2437)">
        <path
          d="M4.42189 9.61887C5.03914 9.63185 5.83547 10.3765 6.41086 10.6525C7.89861 11.366 9.36517 11.3001 10.8079 10.529C11.245 10.2955 12.0556 9.62199 12.5187 9.60953C15.8365 9.52288 16.8797 13.2055 16.9925 15.8037C17.0906 18.0552 16.1607 19.7784 13.6811 19.9331C10.2855 20.1448 6.66147 19.7707 3.24197 19.9305C-0.141501 19.5833 -0.283494 16.7299 0.210833 14.0565C0.608733 11.9046 1.84058 9.56335 4.42189 9.61836V9.61887Z"
          fill="#27272A"
        />
        <path
          d="M4.92897 1.37253C7.2316 -0.854589 11.085 -0.285874 12.6549 2.46119C14.4001 5.51544 12.2602 9.40304 8.7008 9.60697C4.17397 9.86642 1.68855 4.5067 4.92897 1.37253Z"
          fill="#27272A"
        />
      </g>
      <defs>
        <clipPath id="clip0_11700_2437">
          <rect width="17" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  </div>
)

const CSS_HANDLES = [
  'customLoginButton',
  'customLoginButtonLabel',
  'customLoginButtonLabelWrapper',
  'customLoginButtonLabelBold',
  'customLoginButtonDropdown',
  'customLoginButtonDropdownLabel',
  'customLoginButtonDropdowndescription',
] as const

const CustomLoginButton: StoreFrontFC<{
  label: string
  bottomLabel: string
}> = ({ label, bottomLabel }) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const { isMobile } = useDevice()
  const [isOpen, setOpen] = useState(false)
  const { navigate } = useRuntime()
  const [isLoading, setLoading] = useState(false)
  const [isLoading2, setLoading2] = useState(false)

  const { data, loading } = useQuery<{
    profile: { email: string; firstName: string; lastName: string }
  }>(PROFILE, {
    ssr: false,
  })

  return (
    <div style={{ position: 'relative' }}>
      <button
        className={handles.customLoginButton}
        onClick={() => setOpen(!isOpen)}
      >
        <ConditionalLayout conditional={loading}>
          <Spinner size={20} />
          <ProfileIcon />
        </ConditionalLayout>
        <ConditionalLayout conditional={!isMobile && !loading}>
          {data?.profile?.email ? (
            <span className={handles.customLoginButtonLabel}>
              Olá <br />
              {data?.profile?.firstName ??
                `${data?.profile?.email?.slice(0, 12)}...`}
            </span>
          ) : (
            <div className={handles.customLoginButtonLabelWrapper}>
              <span className={handles.customLoginButtonLabel}>{label}</span>
              <b className={handles.customLoginButtonLabelBold}>
                {bottomLabel}
              </b>
            </div>
          )}
          <ProfileIcon />
        </ConditionalLayout>
      </button>
      {isOpen && !data?.profile && (
        <div
          className={handles.customLoginButtonDropdown}
          style={{
            position: 'absolute',
            top: '56px',
            right: 0,
            background: 'white',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
          }}
        >
          <h5 className={handles.customLoginButtonDropdownLabel}>
            Olá! seja bem-vindo(a)!
          </h5>
          <p className={handles.customLoginButtonDropdowndescription}>
            <b
              className={applyModifiers(
                handles.customLoginButtonDropdowndescription,
                'bold'
              )}
            >
              Entre
            </b>{' '}
            ou{' '}
            <b
              className={applyModifiers(
                handles.customLoginButtonDropdowndescription,
                'bold'
              )}
            >
              cadastre-se
            </b>{' '}
            para acessar seus pedidos e comprar mais rápido.
          </p>
          <div
            className={applyModifiers(
              handles.customLoginButtonLabelWrapper,
              'entrar'
            )}
          >
            <Button
              isLoading={isLoading}
              onClick={() => {
                setLoading(true)
                navigate({ to: `/login?returnUrl=${window.location.href}` })
              }}
            >
              Entrar
            </Button>
          </div>
          <div
            className={applyModifiers(
              handles.customLoginButtonLabelWrapper,
              'cadastrar'
            )}
          >
            <Button
              isLoading={isLoading2}
              onClick={() => {
                setLoading2(true)
                navigate({ to: `/login?returnUrl=${window.location.href}` })
              }}
            >
              Cadastre-se
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

CustomLoginButton.defaultProps = {
  label: 'Bem vindo!',
  bottomLabel: 'Entre ou cadastre-se',
}

CustomLoginButton.schema = {
  title: 'Login',
  description: 'Botão de login personalizado',
  type: 'object',
  properties: {
    label: {
      title: 'Label',
      description: 'Texto do botão de login',
      type: 'string',
      default: 'Bem vindo!',
    },
    bottomLabel: {
      title: 'Label inferior',
      description: 'Texto do botão de login',
      type: 'string',
      default: 'Entre ou cadastre-se',
    },
  },
}

export default CustomLoginButton
