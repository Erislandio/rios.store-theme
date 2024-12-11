/**
 * @description this function will do a request do public API vtex
 * @param postalCode postal code
 * @returns zip code address information entered
 * @version 0.1.0
 * @since 0.1.0
 */

export async function getRegionId(
  postalCode: string
): Promise<RegionIdResponse> {
  const response = await fetch(
    `/_v/private/set-region?postalCode=${postalCode}`
  )

  return response.json()
}
