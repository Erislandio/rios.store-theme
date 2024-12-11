import classNames from 'classnames'
import type { FormEvent } from 'react'
import React, { useCallback, useState } from 'react'
import InputMask from 'react-input-mask'
import Modal from 'react-modal'
import { useCssHandles } from 'vtex.css-handles'

import { useRegionalizationContext } from './context'
import './Regionalization.styles.css'
import { getRegionId } from './utils/getRegionId'
import { searchPostalCode } from './utils/searchPostalCode'

const CSS_HANDLES: readonly string[] = [
  'regionalizationModalContainer',
  'regionalizationModalContainer__overlay',
  'regionalizationModal',
  'closeDiv',
  'closeButton',
  'modalText',
  'modalTextHighlight',
  'confirmZipcode',
  'zipCodeInput',
  'useMyLocalizationButton',
  'searchZipcode',
  'modalTitle',
  'secondModal',
]

export const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.7071 12L21.8536 21.1464C22.0488 21.3417 22.0488 21.6583 21.8536 21.8536C21.6583 22.0488 21.3417 22.0488 21.1464 21.8536L12 12.7071L2.85355 21.8536C2.65829 22.0488 2.34171 22.0488 2.14645 21.8536C1.95118 21.6583 1.95118 21.3417 2.14645 21.1464L11.2929 12L2.14645 2.85355C1.95118 2.65829 1.95118 2.34171 2.14645 2.14645C2.34171 1.95118 2.65829 1.95118 2.85355 2.14645L12 11.2929L21.1464 2.14645C21.3417 1.95118 21.6583 1.95118 21.8536 2.14645C22.0488 2.34171 22.0488 2.65829 21.8536 2.85355L12.7071 12Z"
      fill="#000"
    />
  </svg>
)

export const RegionalizationModal = () => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const { isOpenModal, setIsOpenModal, setRegionId, regionId } =
    useRegionalizationContext()
  console.log('🚀 ~ RegionalizationModal ~ regionId:', regionId)
  const [postalCode, setPostalCode] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [address, setAddress] = useState<VtexPostalCodeResponse>()
  const [disabledButton, setDisabledButton] = useState<boolean>(true)

  // const [zipCode, setZipCode] = useState<string>('')
  // const { setUserZipCode, setIsOpenModal, isOpenModal } =
  //   useRegionalizationContext()

  const handleCloseModal = () => {
    setIsOpenModal(false)
  }

  const handleClick = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      try {
        const address = await searchPostalCode(postalCode)

        if (!address.city && !address.state) {
          setError(true)

          return
        }

        if (address) {
          setDisabledButton(false)
          setError(false)
          setAddress(address)

          return
        }

        setError(true)
      } catch {
        setError(true)
      }
    },
    [postalCode]
  )

  const confirmationClick = useCallback(
    async (event: any) => {
      event.preventDefault()
      try {
        const region = await getRegionId(postalCode)

        if (region.regionId) {
          const { regionId } = region
          setRegionId(regionId)
        }
      } catch (error) {
        console.error(error)
      }
    },
    [postalCode]
  )

  const test = true

  return (
    <Modal
      className={handles.regionalizationModalContainer}
      overlayClassName={handles.regionalizationModalContainer__overlay}
      isOpen={isOpenModal}
      onRequestClose={handleCloseModal}
      ariaHideApp={false}
    >
      <div className={handles.regionalizationModal}>
        {!!test ? (
          <>
            <div>
              <h3 className={handles.modalTitle}>Escolha sua Localização</h3>
              <p className={handles.modalText}>
                Dessa forma você terá acesso aos produtos e ofertas da sua
                região.
              </p>
            </div>
            <div>
              <button
                className={classNames(
                  handles.useMyLocalizationButton,
                  'flex justify-center items-center fw7 pointer'
                )}
              >
                Utilizar localização automática
              </button>
            </div>
            <div className="relative">
              <div className="flex justify-between items-center mb7">
                <form
                  onSubmit={handleClick}
                  className="flex justify-between items-start w-100"
                >
                  <InputMask
                    className={handles.zipCodeInput}
                    mask="99999-999"
                    placeholder="CEP"
                    // value={postalCode}
                    onChange={(event) => setPostalCode(event.target.value)}
                    alwaysShowMask={false}
                    maskChar=""
                  />
                  <button
                    className={classNames(
                      handles.searchZipcode,
                      'flex justify-center items-center fw7 pointer'
                    )}
                  >
                    Buscar
                  </button>
                </form>
              </div>
              <div>
                {address && (
                  <span>
                    {address.city}-{address.state}
                  </span>
                )}
                {error && (
                  <span className={handles.errorMessage}>CEP Inválido</span>
                )}
              </div>
            </div>
            <div>
              <button
                disabled={disabledButton}
                onClick={confirmationClick}
                className={classNames(
                  handles.confirmZipcode,
                  'flex justify-center items-center fw7 pointer'
                )}
              >
                Confirmar
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={handles.secondModal}>
              <div>
                <h3 className={handles.modalTitle}>
                  Deseja alterar sua região?
                </h3>
                <p className={handles.modalText}>
                  Ao alterar o CEP, alguns produtos podem sofrer variação de
                  preço e disponibilidade. Ao inserir o CEP corretamente você
                  verá os preços, promoções e disponibilidade de acordo com a
                  região escolhida.
                </p>
              </div>
              <div>
                <button
                  className={classNames(
                    handles.useMyLocalizationButton,
                    'flex justify-center items-center fw7 pointer'
                  )}
                >
                  Não alterar
                </button>
                <button
                  className={classNames(
                    handles.confirmZipcode,
                    'flex justify-center items-center fw7 pointer'
                  )}
                >
                  Alterar minha região
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}

export default RegionalizationModal
