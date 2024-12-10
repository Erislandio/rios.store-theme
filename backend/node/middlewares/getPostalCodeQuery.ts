export async function getPostalCodeQuery(
  ctx: Context,
  next: () => Promise<any>
) {
  const { state } = ctx

  const postalCode = ctx.query.postalCode as string

  if (!postalCode) {
    ctx.body = 'Error: postalCode is required in route query params'
    ctx.status = 400
    return
  }

  state.postalCode = postalCode.replace('-', '')

  await next()
}
