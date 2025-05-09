import classNames from 'classnames'
import type { FormEvent } from 'react'
import React, { useCallback, useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import Modal from 'react-modal'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { Spinner } from 'vtex.styleguide'

import { useRegionalizationContext } from './context'
import './Regionalization.styles.css'
import UseMyLocationButton from './useMyLocationButton'
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
  'errorMessage',
  'addressCity',
  'buttonCloseContainer',
  'warningText',
  'warningContainer',
]

type CloseButtonProps = {
  handleCloseModal: () => void
}

const CloseButtonRegionalizationModal = ({
  handleCloseModal,
}: CloseButtonProps) => {
  return (
    <button onClick={handleCloseModal}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.25 11C0.25 5.06294 5.06294 0.25 11 0.25C16.9371 0.25 21.75 5.06294 21.75 11C21.75 16.9371 16.9371 21.75 11 21.75C5.06294 21.75 0.25 16.9371 0.25 11ZM11 1.75C5.89136 1.75 1.75 5.89136 1.75 11C1.75 16.1086 5.89136 20.25 11 20.25C16.1086 20.25 20.25 16.1086 20.25 11C20.25 5.89136 16.1086 1.75 11 1.75Z"
          fill="#38434D"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.3588 7.64124C14.6517 7.93413 14.6517 8.40901 14.3588 8.7019L8.70196 14.3587C8.40907 14.6516 7.93419 14.6516 7.6413 14.3587C7.34841 14.0659 7.34841 13.591 7.6413 13.2981L13.2982 7.64124C13.591 7.34835 14.0659 7.34835 14.3588 7.64124Z"
          fill="#38434D"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.6413 7.64124C7.93419 7.34835 8.40907 7.34835 8.70196 7.64124L14.3588 13.2981C14.6517 13.591 14.6517 14.0659 14.3588 14.3587C14.0659 14.6516 13.591 14.6516 13.2982 14.3587L7.6413 8.7019C7.34841 8.40901 7.34841 7.93413 7.6413 7.64124Z"
          fill="#38434D"
        />
      </svg>
    </button>
  )
}

const RegionalizationModal: StoreFrontFC<{ userLastAddress: string }> = ({
  userLastAddress,
}) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const { isOpenModal, setIsOpenModal, setRegionId, setCityName } =
    useRegionalizationContext()

  const [postalCode, setPostalCode] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false)

  const [address, setAddress] = useState<VtexPostalCodeResponse>()
  const [disabledButton, setDisabledButton] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isFirstAccess, setIsFirstAccess] = useState<boolean>(false)

  useEffect(() => {
    const hasModalBeenShown = localStorage?.getItem('hasModalBeenShown')

    setIsFirstAccess(!!hasModalBeenShown)
  }, [])

  const handleCloseModal = () => {
    setIsOpenModal(false)
  }

  const handleClick = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      try {
        const addressData = await searchPostalCode(postalCode)

        if (!addressData.city && !addressData.state) {
          setError(true)

          return
        }

        if (addressData) {
          setDisabledButton(false)
          setError(false)
          setAddress(addressData)

          return
        }

        setError(true)
      } catch {
        setError(true)
      }
    },
    [postalCode]
  )

  useEffect(() => {
    if (userLastAddress) {
      setShowConfirmationModal(true)
    }
  }, [userLastAddress])

  const confirmationClick = useCallback(
    async (event: any) => {
      setIsLoading(true)

      event.preventDefault()
      try {
        const region = await getRegionId(postalCode)

        if (region.regionId) {
          const { regionId } = region

          setRegionId(regionId)
        }

        if (address) {
          setCityName(`${address.city} - ${address.state}`)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    },
    [postalCode, address, setCityName, setRegionId]
  )

  return (
    <Modal
      className={handles.regionalizationModalContainer}
      overlayClassName={applyModifiers(
        handles.regionalizationModalContainer__overlay,
        !isFirstAccess ? '' : 'first-access'
      )}
      isOpen={isOpenModal}
      onRequestClose={handleCloseModal}
      shouldCloseOnOverlayClick={!!userLastAddress}
      ariaHideApp={false}
    >
      <div className={handles.regionalizationModal}>
        {!showConfirmationModal ? (
          <>
            {!!userLastAddress && (
              <div className={handles.buttonCloseContainer}>
                <CloseButtonRegionalizationModal
                  handleCloseModal={handleCloseModal}
                />
              </div>
            )}
            <div>
              <h3 className={handles.modalTitle}>Escolha sua Localização</h3>
              <p className={handles.modalText}>
                Dessa forma você terá acesso aos produtos e ofertas da sua
                região.
              </p>
            </div>
            <div>
              <UseMyLocationButton
                setCityName={setCityName}
                setRegionId={setRegionId}
              />
            </div>
            <div className="relative">
              <div className="flex justify-between items-center mb7">
                <form
                  onSubmit={handleClick}
                  className="flex justify-between items-start w-100"
                >
                  <div className="flex flex-column w-60 mr2">
                    <InputMask
                      className={handles.zipCodeInput}
                      mask="99999-999"
                      placeholder="CEP"
                      // value={postalCode}
                      onChange={(event) => setPostalCode(event.target.value)}
                      alwaysShowMask={false}
                      maskChar=""
                    />
                    <a
                      className={handles.modalText}
                      href="https://buscacepinter.correios.com.br/app/endereco/index.php?t"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Não sei meu CEP
                    </a>
                  </div>

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
                  <p className={handles.addressCity}>
                    {address.city}-{address.state}
                  </p>
                )}
                {error && <p className={handles.errorMessage}>CEP Inválido</p>}
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
                {isLoading ? <Spinner color="#fff" size={22} /> : 'Confirmar'}
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
                  onClick={handleCloseModal}
                  className={classNames(
                    handles.useMyLocalizationButton,
                    'flex justify-center items-center fw7 pointer'
                  )}
                >
                  Não alterar
                </button>
                <button
                  onClick={() => setShowConfirmationModal(false)}
                  className={classNames(
                    handles.confirmZipcode,
                    'flex justify-center items-center fw7 pointer'
                  )}
                >
                  Alterar minha região
                </button>
              </div>
              <div className={handles.warningContainer}>
                <p className={handles.warningText}>
                  Ao realizar alteração de CEP, os itens já adicionados poderão
                  sofrer indisponibilidade ou alteração de preço
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}

export default RegionalizationModal
