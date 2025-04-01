import classNames from 'classnames'
import React, { useEffect, useReducer } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import './Regionalization.styles.css'
import { getCityByGeoLocation } from './utils/getCityByGeoLocation'
import { getRegionId } from './utils/getRegionId'

const CSS_HANDLES = ['useMyLocalizationButton'] as const

enum ActionTypes {
  SET_LOCATION = 'SET_LOCATION',
  SET_PERMISSION = 'SET_PERMISSION',
  SET_ADDRESS = 'SET_ADDRESS',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
}

interface State {
  location: { latitude: number | null; longitude: number | null }
  locationAllowed: boolean | null
  address: string | null
  loading: boolean
  error: string | null
}

interface Action {
  type: ActionTypes
  payload?: any
}

const initialState: State = {
  location: { latitude: null, longitude: null },
  locationAllowed: null,
  address: null,
  loading: false,
  error: null,
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.SET_LOCATION:
      return { ...state, location: action.payload, loading: false }

    case ActionTypes.SET_PERMISSION:
      return { ...state, locationAllowed: action.payload }

    case ActionTypes.SET_ADDRESS:
      return { ...state, address: action.payload }

    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload }

    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false }

    default:
      return state
  }
}

const UseMyLocationButton: StoreFrontFC<{
  setRegionId: any
  setCityName: any
}> = ({ setRegionId, setCityName }) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const savedPermission = localStorage.getItem('locationAllowed')

    if (savedPermission) {
      dispatch({
        type: ActionTypes.SET_PERMISSION,
        payload: savedPermission === 'true',
      })
    }
  }, [])

  const updateCityAndRegion = async (latitude: number, longitude: number) => {
    try {
      const geoLocationData = await getCityByGeoLocation(latitude, longitude)
      const { cityName, postalCodeLocation } = geoLocationData

      setCityName(cityName)

      const region = await getRegionId(postalCodeLocation)

      if (region?.regionId) {
        setRegionId(region.regionId)
      }
    } catch (err) {
      dispatch({
        type: ActionTypes.SET_ERROR,
        payload: 'Erro ao buscar informações da cidade.',
      })
      console.error(err)
    }
  }

  const getLocation = () => {
    if (!navigator.geolocation) {
      dispatch({
        type: ActionTypes.SET_ERROR,
        payload: 'Geolocalização não é suportada pelo navegador.',
      })

      return
    }

    dispatch({ type: ActionTypes.SET_LOADING, payload: true })

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords

        dispatch({ type: ActionTypes.SET_PERMISSION, payload: true })
        dispatch({
          type: ActionTypes.SET_LOCATION,
          payload: { latitude, longitude },
        })
        localStorage.setItem('locationAllowed', 'true')

        updateCityAndRegion(latitude, longitude)
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          dispatch({ type: ActionTypes.SET_PERMISSION, payload: false })
          dispatch({
            type: ActionTypes.SET_ERROR,
            payload: 'Permissão de localização negada.',
          })
          localStorage.setItem('locationAllowed', 'false')
        } else {
          dispatch({
            type: ActionTypes.SET_ERROR,
            payload: 'Erro ao obter localização.',
          })
        }
      }
    )
  }

  return (
    <button
      className={classNames(
        handles.useMyLocalizationButton,
        'flex justify-center items-center fw7 pointer',
        { 'opacity-50 cursor-not-allowed': state.loading }
      )}
      onClick={getLocation}
      disabled={state.loading}
    >
      {state.loading
        ? 'Obtendo localização...'
        : 'Utilizar localização automática'}
    </button>
  )
}

export default UseMyLocationButton
