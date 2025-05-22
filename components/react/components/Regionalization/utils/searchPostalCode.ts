/**
 * @description this function will do a request do public API vtex
 * @param postalCode postal code
 * @returns zip code address information entered
 * @version 0.1.0
 * @since 0.1.0
 */

export async function searchPostalCode(
  postalCode: string
): Promise<VtexPostalCodeResponse> {
  const response = await fetch(
    `/api/checkout/pub/postal-code/BRA/${postalCode}`
  )

  return response.json()
}
