export async function getRegionId(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { Regions },
    state,
  } = ctx

  try {
    const { postalCode } = state

    const regionId = await Regions.getRegionId(postalCode, 'BRA', '1')

    console.log('🚀 ~ regionId:', regionId)

    await next()
  } catch (error) {
    console.log(error)
  }
}
