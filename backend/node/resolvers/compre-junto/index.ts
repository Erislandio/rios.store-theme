export const queries = {
  getBuyTogether: async (
    _: any,
    { productId }: { productId: string },
    ctx: any
  ) => {
    const complements = await ctx.clients.CustomCatalog.getComplements(
      productId
    )

    const filteredComplements = complements.filter((complement: any) => {
      return (
        complement.items[0].sellers[0].commertialOffer.AvailableQuantity > 0
      )
    })

    return filteredComplements
  },
}
