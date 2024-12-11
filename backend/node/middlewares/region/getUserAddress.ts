export async function getUserAddress(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { Regions },
    state,
  } = ctx

  try {
    const { postalCode } = state

    const userAddress = await Regions.getUserAddress(postalCode)

    state.userAddress = userAddress

    next()
  } catch (error) {
    console.error(error)
  }
}
