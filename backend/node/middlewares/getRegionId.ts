export async function getRegionId(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { Regions },
    state,
  } = ctx

  try {
    const { postalCode } = state

    const regionIdresponse = await Regions.getRegionId(postalCode)
    console.log('🚀 ~ getRegionId ~ regionIdresponse:', regionIdresponse)

    await next()
  } catch (error) {
    console.log('=========================================>', error)
  }
}
