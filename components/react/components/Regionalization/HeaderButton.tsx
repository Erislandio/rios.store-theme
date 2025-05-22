import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useDevice } from 'vtex.device-detector'
import type { SessionSuccess } from 'vtex.session-client'
import { useFullSession } from 'vtex.session-client'
import { Spinner } from 'vtex.styleguide'

import { useRegionalizationContext } from './context'
import RegionalizationModal from './RegionalizationModal'

const CSS_HANDLES: readonly string[] = [
  'regionalizationHeaderContainer',
  'regionalizationButton',
  'regionaliseCity',
  'regionaliseChange',
]

const RegionalizationPin = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="21"
    viewBox="0 0 18 21"
    fill="none"
  >
    <path
      d="M14.9999 2.4804C13.4086 0.8891 11.2504 -0.00488283 8.99993 -0.00488281C6.74949 -0.0048828 4.59123 0.8891 2.99993 2.4804C1.40863 4.0717 0.514648 6.22996 0.514648 8.4804C0.514648 10.7308 1.40863 12.8891 2.99993 14.4804L8.26993 19.7604C8.36289 19.8541 8.47349 19.9285 8.59535 19.9793C8.71721 20.0301 8.84792 20.0562 8.97993 20.0562C9.11194 20.0562 9.24265 20.0301 9.36451 19.9793C9.48637 19.9285 9.59697 19.8541 9.68993 19.7604L14.9999 14.4304C16.5846 12.8457 17.4748 10.6965 17.4748 8.4554C17.4748 6.21434 16.5846 4.06508 14.9999 2.4804ZM13.5699 13.0004L8.99993 17.5904L4.42993 13.0004C3.52707 12.0967 2.91241 10.9456 2.66362 9.69269C2.41484 8.43973 2.54312 7.14115 3.03223 5.96108C3.52135 4.78101 4.34935 3.77245 5.41156 3.06288C6.47377 2.3533 7.72251 1.97458 8.99993 1.97458C10.2773 1.97458 11.5261 2.3533 12.5883 3.06288C13.6505 3.77245 14.4785 4.78101 14.9676 5.96108C15.4567 7.14115 15.585 8.43973 15.3362 9.69269C15.0875 10.9456 14.4728 12.0967 13.5699 13.0004ZM5.99993 5.4104C5.19264 6.22017 4.73932 7.31697 4.73932 8.4604C4.73932 9.60383 5.19264 10.7006 5.99993 11.5104C6.59969 12.1112 7.36352 12.5215 8.19558 12.6898C9.02764 12.8581 9.89088 12.777 10.677 12.4566C11.4631 12.1361 12.1371 11.5907 12.6144 10.8886C13.0917 10.1866 13.3511 9.35927 13.3599 8.5104C13.3644 7.9436 13.2553 7.38166 13.0388 6.85779C12.8224 6.33392 12.5032 5.85875 12.0999 5.4604C11.7036 5.05498 11.231 4.73194 10.7094 4.50986C10.1877 4.28779 9.62727 4.17107 9.06033 4.16643C8.49339 4.16178 7.93113 4.2693 7.4059 4.48279C6.88067 4.69628 6.40285 5.01153 5.99993 5.4104ZM10.6899 10.0904C10.311 10.4751 9.81014 10.7163 9.27306 10.7727C8.73597 10.829 8.19599 10.697 7.74544 10.3993C7.29488 10.1016 6.96173 9.65664 6.80294 9.14048C6.64415 8.62432 6.66958 8.06904 6.87489 7.56955C7.0802 7.07007 7.45263 6.65741 7.92851 6.40213C8.4044 6.14686 8.95418 6.06481 9.48387 6.17002C10.0135 6.27522 10.4902 6.56116 10.8324 6.97893C11.1746 7.3967 11.3611 7.92037 11.3599 8.4604C11.3454 9.07767 11.0864 9.66393 10.6399 10.0904H10.6899Z"
      fill="#0D1635"
    />
  </svg>
)

const RegionalizationHeader: StoreFrontFC = () => {
  const { isMobile } = useDevice()

  const { handles } = useCssHandles(CSS_HANDLES)
  const { data: sessionData } = useFullSession()

  const session = sessionData?.session as SessionSuccess
  const { setIsOpenModal } = useRegionalizationContext()
  const [userLastAddress, setUserLastAddress] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  const handleOpenModal = () => {
    setIsOpenModal(true)
  }

  useEffect(() => {
    setUserLastAddress(session?.namespaces?.public?.cityName?.value)

    if (!userLastAddress && session) {
      setIsOpenModal(true)

      return
    }

    if (!!userLastAddress && session) {
      setLoading(false)
    }

    setIsOpenModal(false)
  }, [session, userLastAddress, setIsOpenModal])

  return (
    <div
      className={classNames(
        handles.regionalizationHeaderContainer,
        'flex justify-center items-center'
      )}
    >
      <button
        data-testid="regionalization-header-button"
        className={classNames(
          handles.regionalizationButton,
          'flex justify-center items-center pointer'
        )}
        onClick={handleOpenModal}
      >
        <RegionalizationPin />
        {isMobile ? (
          <>
            <span className={handles.regionaliseCity}>Preços válidos: </span>
            <span className={`${handles.regionaliseChange}`}>
              {loading ? (
                <Spinner color="#1a3eb8" size={24} />
              ) : (
                userLastAddress
              )}
            </span>
          </>
        ) : (
          <>
            <span className={`${handles.regionaliseCity}`}>
              {loading ? (
                <Spinner color="#1a3eb8" size={24} />
              ) : (
                userLastAddress
              )}
            </span>
            <span className={handles.regionaliseChange}>Alterar</span>
          </>
        )}
      </button>
      <RegionalizationModal userLastAddress={userLastAddress} />
    </div>
  )
}

export default RegionalizationHeader
