import React from 'react'

import { useQuery } from 'react-apollo'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = [
  'profileContainer',
  'profileContainerLink',
  'profileContainerTitle',
  'profileContainerContent',
] as const

const ProfileIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="21"
    viewBox="0 0 17 21"
    fill="none"
  >
    <g clip-path="url(#clip0_11624_3386)">
      <path
        d="M4.42192 10.572C5.03917 10.585 5.8355 11.3296 6.41089 11.6056C7.89864 12.3191 9.3652 12.2532 10.8079 11.4822C11.245 11.2486 12.0557 10.5751 12.5187 10.5627C15.8365 10.476 16.8797 14.1586 16.9926 16.7568C17.0906 19.0083 16.1607 20.7316 13.6812 20.8862C10.2855 21.0979 6.6615 20.7238 3.242 20.8836C-0.141471 20.5365 -0.283464 17.683 0.210864 15.0096C0.608763 12.8578 1.84061 10.5165 4.42192 10.5715V10.572Z"
        fill="black"
      />
      <path
        d="M4.92897 2.32566C7.2316 0.098536 11.085 0.667251 12.6549 3.41431C14.4001 6.46856 12.2602 10.3562 8.7008 10.5601C4.17397 10.8195 1.68855 5.45982 4.92897 2.32566Z"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0_11624_3386">
        <rect
          width="17"
          height="20"
          fill="white"
          transform="translate(0 0.953125)"
        />
      </clipPath>
    </defs>
  </svg>
)

import { Link } from 'vtex.render-runtime'
import { Spinner } from 'vtex.styleguide'
import PROFILE from '../../graphql/profile.gql'

function renderProfile({
  email,
  firstName,
}: {
  email: string
  firstName: string
}) {
  if (firstName) {
    return firstName
  }

  return email.slice(0, email.indexOf('@')) || email
}

export default function ProfileContainer() {
  const { data, loading } = useQuery<{
    profile: { email: string; firstName: string; lastName: string }
  }>(PROFILE, {
    ssr: false,
    fetchPolicy: 'no-cache',
  })

  const { handles } = useCssHandles(CSS_HANDLES)

  console.log(data?.profile)

  return (
    <section className={handles.profileContainer}>
      <ProfileIcon />
      <div className={handles.profileContainerContent}>
        <p className={handles.profileContainerTitle}>Bem vindo!</p>
        {loading ? <Spinner size={10} /> : null}
        {!loading && data?.profile ? (
          <Link className={handles.profileContainerLink} to="/account">
            {renderProfile(data.profile)}
          </Link>
        ) : (
          !loading && (
            <Link className={handles.profileContainerLink} to="/login">
              Entre ou cadastre-se
            </Link>
          )
        )}
      </div>
    </section>
  )
}
