interface GeoLocationResponse {
  cityName: string
  postalCodeLocation: string
}

export async function getCityByGeoLocation(
  latitude: number,
  longitude: number
): Promise<GeoLocationResponse> {
  return fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
  )
    .then(async (resp) => resp.json())
    .then(async (resp) => {
      console.log('🚀 ~ .then ~ resp:', resp)
      const { city, postcode } = resp.address

      const uf = resp.address['ISO3166-2-lvl4'].split('-')[1]

      return {
        cityName: `${city} - ${uf}`,
        postalCodeLocation: postcode,
      }
    })
}
