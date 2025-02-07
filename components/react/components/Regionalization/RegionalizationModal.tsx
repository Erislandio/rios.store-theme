import classNames from 'classnames'
import type { FormEvent } from 'react'
import React, { useCallback, useEffect, useReducer, useState } from 'react'
import InputMask from 'react-input-mask'
import Modal from 'react-modal'
import { useCssHandles } from 'vtex.css-handles'
import { Spinner } from 'vtex.styleguide'

import { useRegionalizationContext } from './context'
import './Regionalization.styles.css'
import { getCityByGeoLocation } from './utils/getCityByGeoLocation'
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
]

enum ActionTypes {
  SET_LOCATION = 'SET_LOCATION',
  SET_PERMISSION = 'SET_PERMISSION',
  SET_ADDRESS = 'SET_ADDRESS',
}
interface State {
  location: { latitude: number | null; longitude: number | null }
  locationAllowed: boolean | null
  address: string | null
}
interface Action {
  type: ActionTypes
  payload?: any
}

const initialState: State = {
  location: { latitude: null, longitude: null },
  locationAllowed: null,
  address: null,
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.SET_LOCATION:
      return {
        ...state,
        location: action.payload,
      }

    case ActionTypes.SET_PERMISSION:
      return {
        ...state,
        locationAllowed: action.payload,
      }

    case ActionTypes.SET_ADDRESS:
      return {
        ...state,
        address: action.payload,
      }

    default:
      return state
  }
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
    [postalCode, address]
  )

  const [state, dispatch] = useReducer(reducer, initialState)

  console.log('🚀 ~ state:', state)

  useEffect(() => {
    const savedPermission = localStorage.getItem('locationAllowed')

    if (savedPermission === 'true') {
      dispatch({
        type: ActionTypes.SET_PERMISSION,
        payload: JSON.parse(savedPermission),
      })
    }
  }, [])

  const checkGeolocationPermission = () => {
    navigator?.geolocation?.getCurrentPosition(
      async (position) => {
        dispatch({ type: ActionTypes.SET_PERMISSION, payload: true })
        dispatch({
          type: ActionTypes.SET_LOCATION,
          payload: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        })
        localStorage.setItem('locationAllowed', 'true')

        try {
          const geoLocationData = await getCityByGeoLocation(
            position.coords.latitude,
            position.coords.longitude
          )

          const { cityName, postalCodeLocation } = geoLocationData
          const region = await getRegionId(postalCodeLocation)

          if (region.regionId) {
            const { regionId } = region

            setRegionId(regionId)
          }

          setCityName(cityName)
        } catch (err) {
          console.error(err)
        }
      },
      (errorLocation) => {
        // eslint-disable-next-line vtex/prefer-early-return
        if (errorLocation.code === errorLocation.PERMISSION_DENIED) {
          dispatch({ type: ActionTypes.SET_PERMISSION, payload: false })
          localStorage.setItem('locationAllowed', 'false')
        }
      }
    )
  }

  return (
    <Modal
      className={handles.regionalizationModalContainer}
      overlayClassName={handles.regionalizationModalContainer__overlay}
      isOpen={isOpenModal}
      onRequestClose={handleCloseModal}
      ariaHideApp={false}
    >
      <div className={handles.regionalizationModal}>
        {!showConfirmationModal ? (
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
                onClick={checkGeolocationPermission}
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
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}

export default RegionalizationModal
