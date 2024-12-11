export async function getRegionId(ctx: Context) {
  const {
    clients: { Regions },
    state,
  } = ctx

  try {
    const { postalCode } = state

    const regionIdResponse = await Regions.getRegionId(postalCode)

    if (!regionIdResponse.length) {
      throw new Error('Cannot possible to get region id in VTEX')
    }

    const regionId = regionIdResponse[0].id

    state.regionId = regionId

    ctx.body = 200
    ctx.body = {
      regionId: regionId,
    }

    return
  } catch (error) {
    console.error(error)
  }
}
